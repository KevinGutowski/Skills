// ========================================
// API Configuration
// ========================================
const API_BASE = '/api';

// ========================================
// State
// ========================================
let currentSkill = null;
let skillFiles = [];
let currentFile = null;
let hasUnsavedChanges = false;
let collections = [];
let currentView = 'preview'; // 'edit' or 'preview' - default to preview

// ========================================
// URL Parameters
// ========================================
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get('name'),
    collection: params.get('collection') || null,
    file: params.get('file') || null
  };
}

function updateUrlWithFile(filePath) {
  const params = new URLSearchParams(window.location.search);
  if (filePath) {
    params.set('file', filePath);
  } else {
    params.delete('file');
  }
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

// ========================================
// API Functions
// ========================================
async function fetchSkillData(name, collection) {
  try {
    // Fetch from the file API to get SKILL.md content
    const collectionPath = collection ? encodeURIComponent(collection) : '_';
    const response = await fetch(`${API_BASE}/skills/file/${collectionPath}/${encodeURIComponent(name)}/SKILL.md`);
    
    if (!response.ok) throw new Error('Failed to fetch skill');
    
    const data = await response.json();
    const skill = parseSkillMd(data.content);
    skill.collection = collection;
    skill.folderName = name;
    
    return skill;
  } catch (err) {
    console.error('Failed to fetch skill:', err);
    showToast('Failed to load skill', 'error');
    return null;
  }
}

function parseSkillMd(content) {
  const skill = {
    name: '',
    description: '',
    dependencies: '',
    body: ''
  };
  
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        if (key === 'name') skill.name = value;
        if (key === 'description') skill.description = value;
        if (key === 'dependencies') skill.dependencies = value;
      }
    }
    
    const bodyStart = content.indexOf('---', 4) + 3;
    skill.body = content.substring(bodyStart).trim();
  }
  
  return skill;
}

async function fetchSkillFiles(skillName, collection = null) {
  try {
    const collectionPath = collection ? encodeURIComponent(collection) : '_';
    const response = await fetch(`${API_BASE}/skills/files/${collectionPath}/${encodeURIComponent(skillName)}`);
    
    if (!response.ok) throw new Error('Failed to fetch skill files');
    
    const data = await response.json();
    return data.files || [];
  } catch (err) {
    console.error('Failed to fetch skill files:', err);
    return [];
  }
}

async function readSkillFile(skillName, filePath, collection = null) {
  try {
    const collectionPath = collection ? encodeURIComponent(collection) : '_';
    const response = await fetch(`${API_BASE}/skills/file/${collectionPath}/${encodeURIComponent(skillName)}/${encodeURIComponent(filePath)}`);
    
    if (!response.ok) throw new Error('Failed to read file');
    
    const data = await response.json();
    return data.content;
  } catch (err) {
    console.error('Failed to read skill file:', err);
    showToast('Failed to read file', 'error');
    return null;
  }
}

async function saveSkillFile(skillName, filePath, content, collection = null) {
  try {
    const collectionPath = collection ? encodeURIComponent(collection) : '_';
    const response = await fetch(`${API_BASE}/skills/file/${collectionPath}/${encodeURIComponent(skillName)}/${encodeURIComponent(filePath)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    
    if (!response.ok) throw new Error('Failed to save file');
    
    return true;
  } catch (err) {
    console.error('Failed to save skill file:', err);
    showToast('Failed to save file', 'error');
    return false;
  }
}

async function deleteSkillFile(skillName, filePath, collection = null) {
  try {
    const collectionPath = collection ? encodeURIComponent(collection) : '_';
    const response = await fetch(`${API_BASE}/skills/file/${collectionPath}/${encodeURIComponent(skillName)}/${encodeURIComponent(filePath)}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Failed to delete file');
    
    return true;
  } catch (err) {
    console.error('Failed to delete skill file:', err);
    showToast('Failed to delete file', 'error');
    return false;
  }
}

async function deleteSkill(name, collection = null) {
  try {
    const skillPath = collection
      ? `${API_BASE}/skills/${encodeURIComponent(collection)}/${encodeURIComponent(name)}`
      : `${API_BASE}/skills/${encodeURIComponent(name)}`;
    
    const response = await fetch(skillPath, { method: 'DELETE' });
    
    if (!response.ok) throw new Error('Failed to delete skill');
    return true;
  } catch (err) {
    console.error('Failed to delete skill:', err);
    showToast('Failed to delete skill', 'error');
    return false;
  }
}

async function fetchCollections() {
  try {
    const response = await fetch(`${API_BASE}/collections`);
    if (!response.ok) throw new Error('Failed to fetch collections');
    collections = await response.json();
    updateCollectionSelect();
  } catch (err) {
    console.error('Failed to fetch collections:', err);
  }
}

async function updateSkillMetadata(originalName, originalCollection, newData) {
  try {
    // Read the current ZIP
    const skillPath = originalCollection 
      ? `${API_BASE}/skills/${encodeURIComponent(originalCollection)}/${encodeURIComponent(originalName)}`
      : `${API_BASE}/skills/${encodeURIComponent(originalName)}`;
    
    const response = await fetch(skillPath);
    if (!response.ok) throw new Error('Failed to fetch skill');
    
    const blob = await response.blob();
    const zip = await JSZip.loadAsync(blob);
    
    // Find and update SKILL.md
    let skillMdPath = null;
    let rootFolder = null;
    zip.forEach((relativePath, zipEntry) => {
      if (relativePath.endsWith('SKILL.md') && !zipEntry.dir) {
        skillMdPath = relativePath;
        rootFolder = relativePath.split('/')[0];
      }
    });
    
    if (!skillMdPath) {
      throw new Error('No SKILL.md found in ZIP');
    }
    
    // Read current SKILL.md and update frontmatter
    const oldContent = await zip.file(skillMdPath).async('string');
    const bodyMatch = oldContent.match(/^---\n[\s\S]*?\n---\n*([\s\S]*)$/);
    const body = bodyMatch ? bodyMatch[1].trim() : '';
    
    // Generate new SKILL.md
    let newContent = `---\nname: ${newData.name}\ndescription: ${newData.description}`;
    if (newData.dependencies) {
      newContent += `\ndependencies: ${newData.dependencies}`;
    }
    newContent += `\n---\n\n${body}`;
    
    // Update the file in the ZIP
    zip.file(skillMdPath, newContent);
    
    // If name changed, rename the folder
    if (newData.name !== originalName) {
      const files = {};
      zip.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          files[relativePath] = zipEntry;
        }
      });
      
      // Remove old files and add with new folder name
      for (const [oldPath, entry] of Object.entries(files)) {
        const newPath = oldPath.replace(rootFolder, newData.name);
        if (newPath !== oldPath) {
          const content = await entry.async('uint8array');
          zip.remove(oldPath);
          zip.file(newPath, content);
        }
      }
    }
    
    // Generate new ZIP
    const zipData = await zip.generateAsync({ type: 'base64' });
    
    // Delete old skill if name or collection changed
    if (originalName !== newData.name || originalCollection !== newData.collection) {
      await fetch(skillPath, { method: 'DELETE' });
    }
    
    // Save new skill
    const saveResponse = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: newData.name, 
        data: zipData,
        collection: newData.collection || null
      })
    });
    
    if (!saveResponse.ok) throw new Error('Failed to save skill');
    
    return true;
  } catch (err) {
    console.error('Failed to update skill metadata:', err);
    showToast('Failed to update skill', 'error');
    return false;
  }
}

async function downloadSkillZip(skill) {
  try {
    const skillPath = skill.collection 
      ? `${API_BASE}/skills/${encodeURIComponent(skill.collection)}/${encodeURIComponent(skill.folderName)}`
      : `${API_BASE}/skills/${encodeURIComponent(skill.folderName)}`;
    
    const response = await fetch(skillPath);
    if (!response.ok) throw new Error('Failed to fetch skill');
    
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skill.folderName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (err) {
    console.error('Failed to download ZIP:', err);
    return false;
  }
}

// ========================================
// Toast Notifications
// ========================================
function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });
  
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========================================
// DOM Elements
// ========================================
const skillTitle = document.getElementById('skillTitle');
const collectionBadge = document.getElementById('collectionBadge');
const skillDescription = document.getElementById('skillDescription');
const skillDependencies = document.getElementById('skillDependencies');
const depsBlock = document.getElementById('depsBlock');
const fileTree = document.getElementById('fileTree');
const currentFileName = document.getElementById('currentFileName');
const emptyEditor = document.getElementById('emptyEditor');
const codeEditor = document.getElementById('codeEditor');
const markdownPreview = document.getElementById('markdownPreview');
const editorActions = document.getElementById('editorActions');
const btnSaveFile = document.getElementById('btnSaveFile');
const btnAddFile = document.getElementById('btnAddFile');
const btnViewEdit = document.getElementById('btnViewEdit');
const btnViewPreview = document.getElementById('btnViewPreview');
const btnEditMeta = document.getElementById('btnEditMeta');
const btnDownload = document.getElementById('btnDownload');
const btnDeleteSkill = document.getElementById('btnDeleteSkill');

// Edit Modal
const editModalOverlay = document.getElementById('editModalOverlay');
const editModalClose = document.getElementById('editModalClose');
const editForm = document.getElementById('editForm');
const editName = document.getElementById('editName');
const editDescription = document.getElementById('editDescription');
const editDependencies = document.getElementById('editDependencies');
const editCollection = document.getElementById('editCollection');
const btnEditCancel = document.getElementById('btnEditCancel');

// Add File Modal
const addFileModalOverlay = document.getElementById('addFileModalOverlay');
const addFileModalClose = document.getElementById('addFileModalClose');
const addFileForm = document.getElementById('addFileForm');
const newFileName = document.getElementById('newFileName');
const btnAddFileCancel = document.getElementById('btnAddFileCancel');

// ========================================
// Rendering
// ========================================
function renderSkillInfo(skill) {
  document.title = `${skill.name} — Skill Forge`;
  skillTitle.textContent = skill.name;
  skillDescription.textContent = skill.description || '-';
  
  if (skill.collection) {
    collectionBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><g class="nc-icon-wrapper" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z" fill="currentColor" fill-opacity="0.3" data-color="color-2" data-stroke="none" stroke="none"></path> <path d="M2.25 8.75V4.75C2.25 3.645 3.145 2.75 4.25 2.75H6.201C6.808 2.75 7.381 3.025 7.761 3.498L8.364 4.25H13.75C14.855 4.25 15.75 5.145 15.75 6.25V9.094"></path> <path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z"></path></g></svg>${escapeHtml(skill.collection)}`;
    collectionBadge.style.display = 'inline-flex';
  } else {
    collectionBadge.style.display = 'none';
  }
  
  if (skill.dependencies) {
    skillDependencies.textContent = skill.dependencies;
    depsBlock.style.display = 'block';
  } else {
    depsBlock.style.display = 'none';
  }
}

function renderFileTree(files) {
  if (!files || files.length === 0) {
    fileTree.innerHTML = '<p class="no-files">No files found</p>';
    return;
  }
  
  // Build tree structure
  const tree = {};
  const rootFolder = files[0]?.name.split('/')[0] || '';
  
  for (const file of files) {
    const parts = file.name.split('/');
    let current = tree;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        // File
        if (!current._files) current._files = [];
        current._files.push({
          name: part,
          fullPath: file.name,
          size: file.size
        });
      } else {
        // Folder
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
  }
  
  // Render tree
  function renderNode(node, depth = 0) {
    let html = '';
    
    // Render files first (but SKILL.md at the top)
    if (node._files) {
      const sortedFiles = [...node._files].sort((a, b) => {
        if (a.name === 'SKILL.md') return -1;
        if (b.name === 'SKILL.md') return 1;
        return a.name.localeCompare(b.name);
      });
      
      for (const file of sortedFiles) {
        const icon = getFileIcon(file.name);
        const isSkillMd = file.name === 'SKILL.md';
        html += `
          <button class="file-tree-item ${isSkillMd ? 'skill-md' : ''}" data-path="${escapeHtml(file.fullPath)}" style="padding-left: ${depth * 16}px" type="button">
            <span class="file-icon">${icon}</span>
            <span class="file-name">${escapeHtml(file.name)}</span>
          </button>
        `;
      }
    }
    
    // Render subfolders
    for (const [key, value] of Object.entries(node)) {
      if (key === '_files') continue;
      
      html += `
        <div class="folder-item" style="padding-left: ${depth * 16}px">
          <span class="folder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18"><g class="nc-icon-wrapper" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z" fill="currentColor" fill-opacity="0.3" data-color="color-2" data-stroke="none" stroke="none"></path> <path d="M2.25 8.75V4.75C2.25 3.645 3.145 2.75 4.25 2.75H6.201C6.808 2.75 7.381 3.025 7.761 3.498L8.364 4.25H13.75C14.855 4.25 15.75 5.145 15.75 6.25V9.094"></path> <path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z"></path></g></svg>
          </span>
          <span class="folder-name">${escapeHtml(key)}</span>
        </div>
      `;
      html += renderNode(value, depth + 1);
    }
    
    return html;
  }
  
  // Skip the root folder in rendering
  const rootNode = tree[rootFolder] || tree;
  fileTree.innerHTML = renderNode(rootNode, 0);
  
  // Add click handlers
  fileTree.querySelectorAll('.file-tree-item').forEach(item => {
    item.addEventListener('click', () => selectFile(item.dataset.path));
  });
}

function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return `<span class="file-ext-badge">.${ext}</span>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

// ========================================
// File Selection & Editing
// ========================================
async function selectFile(filePath, updateUrl = true) {
  if (hasUnsavedChanges) {
    if (!confirm('You have unsaved changes. Discard them?')) {
      return;
    }
  }
  
  const content = await readSkillFile(currentSkill.folderName, filePath, currentSkill.collection);
  if (content === null) return;
  
  currentFile = filePath;
  hasUnsavedChanges = false;
  
  // Update URL with current file
  if (updateUrl) {
    updateUrlWithFile(filePath);
  }
  
  const fileName = filePath.split('/').pop();
  currentFileName.textContent = fileName;
  
  // Update active state in file tree
  fileTree.querySelectorAll('.file-tree-item').forEach(item => {
    item.classList.toggle('active', item.dataset.path === filePath);
  });
  
  // Show editor
  emptyEditor.style.display = 'none';
  editorActions.style.display = 'flex';
  codeEditor.value = content;
  
  // Preserve current view mode, but default to preview for markdown files
  const isMarkdown = fileName.endsWith('.md');
  if (isMarkdown && currentView === 'preview') {
    showPreview();
  } else if (!isMarkdown) {
    // Non-markdown files always show edit mode
    showEdit();
  } else {
    // Markdown file but in edit mode - stay in edit mode
    showEdit();
  }
}

function showEdit() {
  currentView = 'edit';
  btnViewEdit.classList.add('active');
  btnViewPreview.classList.remove('active');
  codeEditor.style.display = 'block';
  markdownPreview.style.display = 'none';
}

function showPreview() {
  currentView = 'preview';
  btnViewPreview.classList.add('active');
  btnViewEdit.classList.remove('active');
  codeEditor.style.display = 'none';
  markdownPreview.style.display = 'block';
  
  const content = codeEditor.value;
  let htmlContent = '';
  let bodyContent = content;
  
  // Check for YAML frontmatter and render it specially
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n*/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    bodyContent = content.slice(frontmatterMatch[0].length);
    
    // Parse frontmatter fields
    const fields = {};
    frontmatter.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        if (value) fields[key] = value;
      }
    });
    
    // Render frontmatter as metadata block
    if (Object.keys(fields).length > 0) {
      htmlContent += '<div class="frontmatter-block">';
      for (const [key, value] of Object.entries(fields)) {
        htmlContent += `<div class="frontmatter-field"><span class="frontmatter-key">${escapeHtml(key)}</span><span class="frontmatter-value">${escapeHtml(value)}</span></div>`;
      }
      htmlContent += '</div>';
    }
  }
  
  // Render the markdown body
  htmlContent += marked.parse(bodyContent);
  markdownPreview.innerHTML = htmlContent;
  
  // Intercept clicks on internal markdown links
  markdownPreview.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if it's a relative link to a file in this skill (not external)
    if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Resolve the file path relative to current file
        const currentDir = currentFile ? currentFile.split('/').slice(0, -1).join('/') : '';
        let targetPath;
        
        if (href.startsWith('/')) {
          // Absolute path from skill root
          const rootFolder = skillFiles[0]?.name.split('/')[0] || '';
          targetPath = rootFolder + href;
        } else {
          // Relative path from current file's directory
          targetPath = currentDir ? `${currentDir}/${href}` : href;
        }
        
        // Normalize the path (handle ../)
        const parts = targetPath.split('/');
        const normalized = [];
        for (const part of parts) {
          if (part === '..') {
            normalized.pop();
          } else if (part !== '.') {
            normalized.push(part);
          }
        }
        targetPath = normalized.join('/');
        
        // Check if the file exists in skillFiles
        const fileExists = skillFiles.some(f => f.name === targetPath);
        
        if (fileExists) {
          selectFile(targetPath);
        } else {
          showToast(`File not found: ${href}`, 'error');
        }
      });
    }
  });
}

async function saveCurrentFile() {
  if (!currentFile || !currentSkill) return;
  
  const content = codeEditor.value;
  const success = await saveSkillFile(currentSkill.folderName, currentFile, content, currentSkill.collection);
  
  if (success) {
    hasUnsavedChanges = false;
    showToast('File saved', 'success');
    
    // If we edited SKILL.md, refresh the skill info
    if (currentFile.endsWith('SKILL.md')) {
      currentSkill = await fetchSkillData(currentSkill.folderName, currentSkill.collection);
      if (currentSkill) {
        renderSkillInfo(currentSkill);
      }
    }
    
    // Refresh file list to update sizes
    skillFiles = await fetchSkillFiles(currentSkill.folderName, currentSkill.collection);
    renderFileTree(skillFiles);
    
    // Re-select the current file to update active state
    fileTree.querySelectorAll('.file-tree-item').forEach(item => {
      item.classList.toggle('active', item.dataset.path === currentFile);
    });
  }
}

async function deleteCurrentFile() {
  if (!currentFile || !currentSkill) return;
  
  const fileName = currentFile.split('/').pop();
  if (fileName === 'SKILL.md') {
    showToast('Cannot delete SKILL.md - it is required', 'error');
    return;
  }
  
  if (!confirm(`Delete "${fileName}"? This cannot be undone.`)) return;
  
  const success = await deleteSkillFile(currentSkill.folderName, currentFile, currentSkill.collection);
  
  if (success) {
    showToast('File deleted', 'success');
    currentFile = null;
    hasUnsavedChanges = false;
    
    // Reset editor state
    emptyEditor.style.display = 'flex';
    editorActions.style.display = 'none';
    codeEditor.style.display = 'none';
    markdownPreview.style.display = 'none';
    currentFileName.textContent = 'Select a file';
    
    // Refresh file list
    skillFiles = await fetchSkillFiles(currentSkill.folderName, currentSkill.collection);
    renderFileTree(skillFiles);
  }
}

// ========================================
// Modals
// ========================================
function updateCollectionSelect() {
  const options = '<option value="">No Collection</option>' + 
    collections.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('');
  
  editCollection.innerHTML = options;
}

function openEditModal() {
  if (!currentSkill) return;
  
  editName.value = currentSkill.name;
  editDescription.value = currentSkill.description;
  editDependencies.value = currentSkill.dependencies || '';
  editCollection.value = currentSkill.collection || '';
  
  editModalOverlay.classList.add('active');
  editName.focus();
}

function closeEditModal() {
  editModalOverlay.classList.remove('active');
}

function openAddFileModal() {
  newFileName.value = '';
  addFileModalOverlay.classList.add('active');
  newFileName.focus();
}

function closeAddFileModal() {
  addFileModalOverlay.classList.remove('active');
}

// ========================================
// Event Handlers
// ========================================
codeEditor.addEventListener('input', () => {
  hasUnsavedChanges = true;
});

btnSaveFile.addEventListener('click', saveCurrentFile);

btnViewEdit.addEventListener('click', showEdit);
btnViewPreview.addEventListener('click', showPreview);

btnAddFile.addEventListener('click', openAddFileModal);
btnEditMeta.addEventListener('click', openEditModal);

btnDownload.addEventListener('click', async () => {
  if (!currentSkill) return;
  
  const success = await downloadSkillZip(currentSkill);
  if (success) {
    showToast(`Downloaded ${currentSkill.folderName}.zip`, 'success');
  } else {
    showToast('Failed to download skill', 'error');
  }
});

btnDeleteSkill.addEventListener('click', async () => {
  if (!currentSkill) return;
  
  if (confirm(`Delete "${currentSkill.name}"? This will remove the skill from disk.`)) {
    const success = await deleteSkill(currentSkill.name, currentSkill.collection);
    if (success) {
      showToast('Skill deleted', 'success');
      window.location.href = 'index.html';
    }
  }
});

// Edit Modal Events
editModalClose.addEventListener('click', closeEditModal);
btnEditCancel.addEventListener('click', closeEditModal);
editModalOverlay.addEventListener('click', (e) => {
  if (e.target === editModalOverlay) closeEditModal();
});

editName.addEventListener('input', (e) => {
  e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, '');
});

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const newData = {
    name: editName.value.trim(),
    description: editDescription.value.trim(),
    dependencies: editDependencies.value.trim(),
    collection: editCollection.value || null
  };
  
  const success = await updateSkillMetadata(
    currentSkill.name,
    currentSkill.collection,
    newData
  );
  
  if (success) {
    showToast('Skill updated', 'success');
    
    // If name or collection changed, redirect to new URL
    if (newData.name !== currentSkill.name || newData.collection !== currentSkill.collection) {
      const newUrl = `skill.html?name=${encodeURIComponent(newData.name)}${newData.collection ? `&collection=${encodeURIComponent(newData.collection)}` : ''}`;
      window.location.href = newUrl;
    } else {
      closeEditModal();
      currentSkill = await fetchSkillData(newData.name, newData.collection);
      if (currentSkill) {
        renderSkillInfo(currentSkill);
      }
    }
  }
});

// Add File Modal Events
addFileModalClose.addEventListener('click', closeAddFileModal);
btnAddFileCancel.addEventListener('click', closeAddFileModal);
addFileModalOverlay.addEventListener('click', (e) => {
  if (e.target === addFileModalOverlay) closeAddFileModal();
});

addFileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const fileName = newFileName.value.trim();
  if (!fileName) return;
  
  // Determine initial content based on file extension
  let initialContent = '';
  const baseName = fileName.split('/').pop(); // Get just the filename without path
  if (fileName.endsWith('.md')) {
    initialContent = `# ${baseName.replace('.md', '')}\n\nAdd your content here.`;
  } else if (fileName.endsWith('.py')) {
    initialContent = '# Python script\n\n';
  } else if (fileName.endsWith('.js')) {
    initialContent = '// JavaScript\n\n';
  }
  
  // The API expects paths relative to the skill folder
  const success = await saveSkillFile(currentSkill.folderName, fileName, initialContent, currentSkill.collection);
  
  if (success) {
    showToast('File created', 'success');
    closeAddFileModal();
    
    // Refresh file list and select the new file
    skillFiles = await fetchSkillFiles(currentSkill.folderName, currentSkill.collection);
    renderFileTree(skillFiles);
    selectFile(fileName);
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (addFileModalOverlay.classList.contains('active')) {
      closeAddFileModal();
    } else if (editModalOverlay.classList.contains('active')) {
      closeEditModal();
    }
  }
  
  // Save with Cmd/Ctrl + S
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    if (currentFile) {
      saveCurrentFile();
    }
  }
});

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', (e) => {
  if (hasUnsavedChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// ========================================
// Initialize
// ========================================
async function init() {
  const { name, collection, file } = getUrlParams();
  
  if (!name) {
    showToast('No skill specified', 'error');
    window.location.href = 'index.html';
    return;
  }
  
  // Fetch collections first
  await fetchCollections();
  
  // Fetch skill data
  currentSkill = await fetchSkillData(name, collection);
  
  if (!currentSkill) {
    showToast('Skill not found', 'error');
    window.location.href = 'index.html';
    return;
  }
  
  renderSkillInfo(currentSkill);
  
  // Fetch and render files
  skillFiles = await fetchSkillFiles(name, collection);
  renderFileTree(skillFiles);
  
  // If a file is specified in the URL, select it; otherwise default to SKILL.md
  if (file) {
    // Find the file in skillFiles (could be with or without the root folder prefix)
    const matchingFile = skillFiles.find(f => f.name === file || f.name.endsWith('/' + file));
    if (matchingFile) {
      selectFile(matchingFile.name, false); // Don't update URL since we're loading from URL
    } else {
      showToast(`File not found: ${file}`, 'error');
      // Fall back to SKILL.md
      const skillMdFile = skillFiles.find(f => f.name.endsWith('/SKILL.md') || f.name === 'SKILL.md');
      if (skillMdFile) {
        selectFile(skillMdFile.name);
      }
    }
  } else {
    // Auto-select SKILL.md if it exists
    const skillMdFile = skillFiles.find(f => f.name.endsWith('/SKILL.md') || f.name === 'SKILL.md');
    if (skillMdFile) {
      selectFile(skillMdFile.name);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
