// ========================================
// API Configuration
// ========================================
const API_BASE = '/api';

// ========================================
// State
// ========================================
let skills = [];
let collections = [];
let currentSkillFiles = [];
let currentEditingFile = null;

// ========================================
// SKILL.md Generation
// ========================================
function generateSkillMd(skill) {
  let output = `---\nname: ${skill.name}\ndescription: ${skill.description}`;
  
  if (skill.dependencies) {
    output += `\ndependencies: ${skill.dependencies}`;
  }
  
  output += `\n---`;
  
  if (skill.body) {
    output += `\n\n${skill.body}`;
  }
  
  return output;
}

// ========================================
// ZIP File Operations
// ========================================
async function createSkillZip(skill) {
  const zip = new JSZip();
  const folderName = skill.name;
  const folder = zip.folder(folderName);
  
  const skillMd = generateSkillMd(skill);
  folder.file('SKILL.md', skillMd);
  
  const base64 = await zip.generateAsync({ type: 'base64' });
  return base64;
}

async function createSkillZipBlob(skill) {
  const zip = new JSZip();
  const folderName = skill.name;
  const folder = zip.folder(folderName);
  
  const skillMd = generateSkillMd(skill);
  folder.file('SKILL.md', skillMd);
  
  return await zip.generateAsync({ type: 'blob' });
}

async function parseSkillZip(blob) {
  const zip = await JSZip.loadAsync(blob);
  
  let skillMdPath = null;
  
  zip.forEach((relativePath, zipEntry) => {
    if (relativePath.endsWith('SKILL.md') && !zipEntry.dir) {
      skillMdPath = relativePath;
    }
  });
  
  if (!skillMdPath) {
    throw new Error('No SKILL.md found in ZIP');
  }
  
  const skillMdContent = await zip.file(skillMdPath).async('string');
  return parseSkillMd(skillMdContent);
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

// ========================================
// API Functions
// ========================================
async function fetchCollections() {
  try {
    const response = await fetch(`${API_BASE}/collections`);
    if (!response.ok) throw new Error('Failed to fetch collections');
    collections = await response.json();
    updateCollectionSelects();
  } catch (err) {
    console.error('Failed to fetch collections:', err);
  }
}

async function createCollection(name) {
  try {
    const response = await fetch(`${API_BASE}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create collection');
    }
    
    return true;
  } catch (err) {
    console.error('Failed to create collection:', err);
    showToast(err.message, 'error');
    return false;
  }
}

async function deleteCollection(name) {
  try {
    const response = await fetch(`${API_BASE}/collections/${encodeURIComponent(name)}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to delete collection');
    }
    
    return true;
  } catch (err) {
    console.error('Failed to delete collection:', err);
    showToast(err.message, 'error');
    return false;
  }
}

async function fetchSkills() {
  try {
    const response = await fetch(`${API_BASE}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    
    skills = await response.json();
    renderSkills();
  } catch (err) {
    console.error('Failed to fetch skills:', err);
    showToast('Failed to load skills', 'error');
  }
}

async function saveSkill(skill, originalName = null, originalCollection = null) {
  try {
    if (originalName && (originalName !== skill.name || originalCollection !== skill.collection)) {
      // Update existing skill (rename/move)
      const response = await fetch(`${API_BASE}/skills/${encodeURIComponent(originalName)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldName: originalName,
          oldCollection: originalCollection || null,
          name: skill.name,
          description: skill.description,
          dependencies: skill.dependencies || '',
          body: skill.body || '',
          collection: skill.collection || null
        })
      });
      
      if (!response.ok) throw new Error('Failed to update skill');
    } else {
      // Create new skill
      const response = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: skill.name,
          description: skill.description,
          dependencies: skill.dependencies || '',
          body: skill.body || '',
          collection: skill.collection || null
        })
      });
      
      if (!response.ok) throw new Error('Failed to save skill');
    }
    
    return true;
  } catch (err) {
    console.error('Failed to save skill:', err);
    showToast('Failed to save skill', 'error');
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

async function moveSkill(name, fromCollection, toCollection) {
  try {
    const response = await fetch(`${API_BASE}/skills/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, fromCollection, toCollection })
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to move skill');
    }
    
    return true;
  } catch (err) {
    console.error('Failed to move skill:', err);
    showToast(err.message, 'error');
    return false;
  }
}

async function importSkillFiles(files, collection = null) {
  const formData = new FormData();
  
  for (const file of files) {
    if (file.name.endsWith('.zip')) {
      formData.append('files', file);
    }
  }
  
  try {
    const url = collection 
      ? `${API_BASE}/skills?collection=${encodeURIComponent(collection)}`
      : `${API_BASE}/skills`;
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Failed to import skills');
    
    const result = await response.json();
    return result.imported || [];
  } catch (err) {
    console.error('Failed to import skills:', err);
    showToast('Failed to import skills', 'error');
    return [];
  }
}

// ========================================
// Skill Files API Functions
// ========================================
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
const skillsContainer = document.getElementById('skillsContainer');
const emptyState = document.getElementById('emptyState');
const skillCount = document.getElementById('skillCount');

// Toolbar
const btnNewCollection = document.getElementById('btnNewCollection');
const btnImport = document.getElementById('btnImport');
const btnImportEmpty = document.getElementById('btnImportEmpty');
const fileInput = document.getElementById('fileInput');
const btnCreate = document.getElementById('btnCreate');
const btnCreateEmpty = document.getElementById('btnCreateEmpty');

// Skill Modal
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const skillForm = document.getElementById('skillForm');
const btnCancel = document.getElementById('btnCancel');
const btnSubmitText = document.getElementById('btnSubmitText');

// Skill Form Fields
const originalNameInput = document.getElementById('originalName');
const originalCollectionInput = document.getElementById('originalCollection');
const skillCollectionSelect = document.getElementById('skillCollection');
const skillNameInput = document.getElementById('skillName');
const skillDescriptionInput = document.getElementById('skillDescription');
const skillDependenciesInput = document.getElementById('skillDependencies');
const skillBodyInput = document.getElementById('skillBody');
const nameCount = document.getElementById('nameCount');
const descCount = document.getElementById('descCount');

// Tab Toggle
const tabButtons = document.querySelectorAll('.tab-btn');
const bodyPreview = document.getElementById('bodyPreview');

// View Modal
const viewModalOverlay = document.getElementById('viewModalOverlay');
const viewModalTitle = document.getElementById('viewModalTitle');
const viewModalClose = document.getElementById('viewModalClose');
const viewCollectionBadge = document.getElementById('viewCollectionBadge');
const viewFileName = document.getElementById('viewFileName');
const viewDescription = document.getElementById('viewDescription');
const viewDepsContainer = document.getElementById('viewDepsContainer');
const viewDependencies = document.getElementById('viewDependencies');
const viewBody = document.getElementById('viewBody');
const viewBodySection = document.getElementById('viewBodySection');
const skillOutput = document.getElementById('skillOutput');
const btnDownload = document.getElementById('btnDownload');
const btnMove = document.getElementById('btnMove');
const btnEdit = document.getElementById('btnEdit');
const btnDelete = document.getElementById('btnDelete');

// Files UI
const filesList = document.getElementById('filesList');
const btnAddFile = document.getElementById('btnAddFile');
const viewFileContent = document.getElementById('viewFileContent');
const currentFileName = document.getElementById('currentFileName');
const fileEditor = document.getElementById('fileEditor');
const btnBackToFiles = document.getElementById('btnBackToFiles');
const btnSaveFile = document.getElementById('btnSaveFile');
const btnDeleteFile = document.getElementById('btnDeleteFile');

// Collection Modal
const collectionModalOverlay = document.getElementById('collectionModalOverlay');
const collectionModalTitle = document.getElementById('collectionModalTitle');
const collectionModalClose = document.getElementById('collectionModalClose');
const collectionForm = document.getElementById('collectionForm');
const collectionNameInput = document.getElementById('collectionName');
const btnCollectionCancel = document.getElementById('btnCollectionCancel');

// Move Modal
const moveModalOverlay = document.getElementById('moveModalOverlay');
const moveModalClose = document.getElementById('moveModalClose');
const moveForm = document.getElementById('moveForm');
const moveTargetSelect = document.getElementById('moveTarget');
const btnMoveCancel = document.getElementById('btnMoveCancel');

let currentViewSkill = null;

// ========================================
// Update Collection Selects
// ========================================
function updateCollectionSelects() {
  const options = '<option value="">No Collection</option>' + 
    collections.map(c => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join('');
  
  skillCollectionSelect.innerHTML = options;
  moveTargetSelect.innerHTML = options;
}

// ========================================
// Rendering
// ========================================
function renderSkills() {
  skillCount.textContent = skills.length;
  
  if (skills.length === 0 && collections.length === 0) {
    skillsContainer.innerHTML = '';
    emptyState.classList.add('visible');
    return;
  }
  
  emptyState.classList.remove('visible');
  
  // Group skills by collection
  const rootSkills = skills.filter(s => !s.collection);
  const collectionMap = new Map();
  
  for (const collection of collections) {
    collectionMap.set(collection.name, []);
  }
  
  for (const skill of skills) {
    if (skill.collection) {
      if (!collectionMap.has(skill.collection)) {
        collectionMap.set(skill.collection, []);
      }
      collectionMap.get(skill.collection).push(skill);
    }
  }
  
  let html = '';
  
  // Render collections
  for (const [collectionName, collectionSkills] of collectionMap) {
    html += `
      <div class="collection" data-collection="${escapeHtml(collectionName)}">
        <div class="collection-header">
          <div class="collection-info">
            <span class="collection-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g class="nc-icon-wrapper" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z" fill="currentColor" fill-opacity="0.3" data-color="color-2" data-stroke="none" stroke="none"></path> <path d="M2.25 8.75V4.75C2.25 3.645 3.145 2.75 4.25 2.75H6.201C6.808 2.75 7.381 3.025 7.761 3.498L8.364 4.25H13.75C14.855 4.25 15.75 5.145 15.75 6.25V9.094"></path> <path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z"></path></g></svg>
            </span>
            <h3 class="collection-name">${escapeHtml(collectionName)}</h3>
            <span class="collection-count">${collectionSkills.length} skill${collectionSkills.length !== 1 ? 's' : ''}</span>
          </div>
          <div class="collection-actions">
            <button class="btn-icon-only btn-delete-collection" title="Delete collection">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><g class="nc-icon-wrapper" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path opacity="0.3" d="M13.605 4.75L13.099 14.35C13.043 15.4201 12.165 16.25 11.102 16.25H6.89703C5.83303 16.25 4.95602 15.42 4.90002 14.35L4.39404 4.75" fill="currentColor" data-color="color-2" data-stroke="none" stroke="none"></path> <path d="M2.75 4.75H15.25"></path> <path d="M6.75 4.75V2.75C6.75 2.2 7.198 1.75 7.75 1.75H10.25C10.802 1.75 11.25 2.2 11.25 2.75V4.75"></path> <path d="M13.8557 4.75L13.35 14.35C13.294 15.4201 12.416 16.25 11.353 16.25H6.64798C5.58398 16.25 4.70697 15.42 4.65097 14.35L4.14526 4.75"></path> <path d="M7.32495 8L7.59213 13.25"></path> <path d="M10.675 8L10.4078 13.25"></path></g></svg>
            </button>
          </div>
        </div>
        <div class="collection-skills">
          ${collectionSkills.length > 0 ? collectionSkills.map(skill => renderSkillCard(skill)).join('') : 
            '<p class="collection-empty">No skills in this collection</p>'}
        </div>
      </div>
    `;
  }
  
  // Render root skills
  if (rootSkills.length > 0) {
    html += `
      <div class="skills-section">
        ${collections.length > 0 ? '<h3 class="section-title">Uncategorized</h3>' : ''}
        <div class="skills-grid">
          ${rootSkills.map(skill => renderSkillCard(skill)).join('')}
        </div>
      </div>
    `;
  }
  
  skillsContainer.innerHTML = html;
  
  // Add click handlers for skill cards - navigate to skill page
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const folderName = card.dataset.folderName;
      const collection = card.dataset.collection || null;
      // Navigate to skill detail page
      const url = `skill.html?name=${encodeURIComponent(folderName)}${collection ? `&collection=${encodeURIComponent(collection)}` : ''}`;
      window.location.href = url;
    });
  });
  
  // Add click handlers for delete collection buttons
  document.querySelectorAll('.btn-delete-collection').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const collectionEl = btn.closest('.collection');
      const collectionName = collectionEl.dataset.collection;
      
      if (confirm(`Delete collection "${collectionName}"? The collection must be empty.`)) {
        const success = await deleteCollection(collectionName);
        if (success) {
          showToast('Collection deleted', 'success');
          await fetchCollections();
          await fetchSkills();
        }
      }
    });
  });
}

function renderSkillCard(skill) {
  return `
    <article class="skill-card" data-folder-name="${escapeHtml(skill.folderName || skill.name)}" data-collection="${skill.collection || ''}">
      <h3 class="skill-card-name">${escapeHtml(skill.name)}</h3>
      <p class="skill-card-description">${escapeHtml(skill.description)}</p>
    </article>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

// ========================================
// Skill Modal
// ========================================
function openCreateModal(defaultCollection = null) {
  modalTitle.textContent = 'New Skill';
  btnSubmitText.textContent = 'Create Skill';
  originalNameInput.value = '';
  originalCollectionInput.value = '';
  skillForm.reset();
  skillCollectionSelect.value = defaultCollection || '';
  updateCharCounts();
  resetTabToEdit();
  modalOverlay.classList.add('active');
  skillNameInput.focus();
}

function openEditModal(skill) {
  modalTitle.textContent = 'Edit Skill';
  btnSubmitText.textContent = 'Save Changes';
  originalNameInput.value = skill.name;
  originalCollectionInput.value = skill.collection || '';
  skillCollectionSelect.value = skill.collection || '';
  skillNameInput.value = skill.name;
  skillDescriptionInput.value = skill.description;
  skillDependenciesInput.value = skill.dependencies || '';
  skillBodyInput.value = skill.body || '';
  updateCharCounts();
  resetTabToEdit();
  modalOverlay.classList.add('active');
  skillNameInput.focus();
}

function closeSkillModal() {
  modalOverlay.classList.remove('active');
}

function resetTabToEdit() {
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabButtons[0].classList.add('active');
  bodyPreview.classList.remove('active');
  skillBodyInput.classList.remove('hidden');
}

function updateCharCounts() {
  nameCount.textContent = skillNameInput.value.length;
  descCount.textContent = skillDescriptionInput.value.length;
}

// ========================================
// View Modal
// ========================================
async function openViewModal(skill) {
  currentViewSkill = skill;
  currentEditingFile = null;
  viewModalTitle.textContent = skill.name;
  viewFileName.textContent = `${skill.name}.zip`;
  viewDescription.textContent = skill.description;
  
  if (skill.collection) {
    viewCollectionBadge.style.display = 'inline-flex';
    viewCollectionBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><g class="nc-icon-wrapper" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z" fill="currentColor" fill-opacity="0.3" data-color="color-2" data-stroke="none" stroke="none"></path> <path d="M2.25 8.75V4.75C2.25 3.645 3.145 2.75 4.25 2.75H6.201C6.808 2.75 7.381 3.025 7.761 3.498L8.364 4.25H13.75C14.855 4.25 15.75 5.145 15.75 6.25V9.094"></path> <path d="M4.25 6.75H13.75C14.855 6.75 15.75 7.645 15.75 8.75V13.25C15.75 14.355 14.855 15.25 13.75 15.25H4.25C3.145 15.25 2.25 14.355 2.25 13.25V8.75C2.25 7.645 3.145 6.75 4.25 6.75Z"></path></g></svg>${escapeHtml(skill.collection)}`;
  } else {
    viewCollectionBadge.style.display = 'none';
  }
  
  if (skill.dependencies) {
    viewDepsContainer.style.display = 'block';
    viewDependencies.textContent = skill.dependencies;
  } else {
    viewDepsContainer.style.display = 'none';
  }
  
  if (skill.body) {
    viewBody.innerHTML = marked.parse(skill.body);
  } else {
    viewBody.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No body content</p>';
  }
  
  skillOutput.textContent = generateSkillMd(skill);
  
  // Reset file view state
  viewFileContent.style.display = 'none';
  viewBodySection.style.display = 'block';
  
  // Fetch and display files
  await loadSkillFiles();
  
  viewModalOverlay.classList.add('active');
}

async function loadSkillFiles() {
  if (!currentViewSkill) return;
  
  const files = await fetchSkillFiles(currentViewSkill.name, currentViewSkill.collection);
  currentSkillFiles = files;
  renderFilesList(files);
}

function renderFilesList(files) {
  if (!files || files.length === 0) {
    filesList.innerHTML = '<p style="color: var(--text-muted); font-style: italic; padding: 0.5rem;">No files found</p>';
    return;
  }
  
  // Sort files: SKILL.md first, then alphabetically
  const sortedFiles = [...files].sort((a, b) => {
    if (a.name.endsWith('SKILL.md')) return -1;
    if (b.name.endsWith('SKILL.md')) return 1;
    return a.name.localeCompare(b.name);
  });
  
  filesList.innerHTML = sortedFiles.map(file => {
    const fileName = file.name.split('/').pop();
    const isSkillMd = fileName === 'SKILL.md';
    const icon = fileName.endsWith('.md') ? '📄' : '📁';
    const sizeStr = file.size > 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${file.size} B`;
    
    return `
      <div class="file-item ${isSkillMd ? 'skill-md' : ''}" data-path="${escapeHtml(file.name)}">
        <div class="file-info">
          <span class="file-icon">${icon}</span>
          <span class="file-name">${escapeHtml(fileName)}</span>
        </div>
        <span class="file-size">${sizeStr}</span>
      </div>
    `;
  }).join('');
  
  // Add click handlers
  filesList.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', () => openFileEditor(item.dataset.path));
  });
}

async function openFileEditor(filePath) {
  if (!currentViewSkill) return;
  
  const content = await readSkillFile(currentViewSkill.name, filePath, currentViewSkill.collection);
  if (content === null) return;
  
  currentEditingFile = filePath;
  currentFileName.textContent = filePath.split('/').pop();
  fileEditor.value = content;
  
  viewFileContent.style.display = 'block';
  viewBodySection.style.display = 'none';
}

function closeFileEditor() {
  currentEditingFile = null;
  viewFileContent.style.display = 'none';
  viewBodySection.style.display = 'block';
}

function closeViewModal() {
  viewModalOverlay.classList.remove('active');
  currentViewSkill = null;
  currentEditingFile = null;
  currentSkillFiles = [];
}

// ========================================
// Collection Modal
// ========================================
function openCollectionModal() {
  collectionModalTitle.textContent = 'New Collection';
  collectionForm.reset();
  collectionModalOverlay.classList.add('active');
  collectionNameInput.focus();
}

function closeCollectionModal() {
  collectionModalOverlay.classList.remove('active');
}

// ========================================
// Move Modal
// ========================================
function openMoveModal() {
  if (!currentViewSkill) return;
  
  moveTargetSelect.value = currentViewSkill.collection || '';
  moveModalOverlay.classList.add('active');
}

function closeMoveModal() {
  moveModalOverlay.classList.remove('active');
}

// ========================================
// Event Handlers
// ========================================

// Collection
btnNewCollection.addEventListener('click', openCollectionModal);
collectionModalClose.addEventListener('click', closeCollectionModal);
btnCollectionCancel.addEventListener('click', closeCollectionModal);

collectionModalOverlay.addEventListener('click', (e) => {
  if (e.target === collectionModalOverlay) closeCollectionModal();
});

collectionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = collectionNameInput.value.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '');
  
  if (!name) {
    showToast('Please enter a valid collection name', 'error');
    return;
  }
  
  const success = await createCollection(name);
  if (success) {
    showToast('Collection created', 'success');
    closeCollectionModal();
    await fetchCollections();
    renderSkills();
  }
});

// Import
btnImport.addEventListener('click', () => fileInput.click());
btnImportEmpty.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  
  const imported = await importSkillFiles(files);
  
  if (imported.length > 0) {
    showToast(`Imported ${imported.length} skill${imported.length > 1 ? 's' : ''}`, 'success');
    await fetchSkills();
  }
  
  fileInput.value = '';
});

// Skill Modal Events
btnCreate.addEventListener('click', () => openCreateModal());
btnCreateEmpty.addEventListener('click', () => openCreateModal());
modalClose.addEventListener('click', closeSkillModal);
btnCancel.addEventListener('click', closeSkillModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeSkillModal();
});

// Character counts and validation
skillNameInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, '');
  updateCharCounts();
});
skillDescriptionInput.addEventListener('input', updateCharCounts);

collectionNameInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, '');
});

// Tab toggle
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    if (tab === 'preview') {
      const markdown = skillBodyInput.value;
      if (markdown.trim()) {
        bodyPreview.innerHTML = marked.parse(markdown);
      } else {
        bodyPreview.innerHTML = '<p class="preview-empty">Nothing to preview yet</p>';
      }
      bodyPreview.classList.add('active');
      skillBodyInput.classList.add('hidden');
    } else {
      bodyPreview.classList.remove('active');
      skillBodyInput.classList.remove('hidden');
    }
  });
});

// Form submission
skillForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const originalName = originalNameInput.value;
  const originalCollection = originalCollectionInput.value || null;
  
  const skill = {
    name: skillNameInput.value.trim(),
    description: skillDescriptionInput.value.trim(),
    dependencies: skillDependenciesInput.value.trim(),
    body: skillBodyInput.value.trim(),
    collection: skillCollectionSelect.value || null
  };
  
  // Check for duplicate names in same location
  if (!originalName || originalName !== skill.name || originalCollection !== skill.collection) {
    const existing = skills.find(s => s.name === skill.name && s.collection === skill.collection);
    if (existing) {
      showToast('A skill with this name already exists in this location', 'error');
      return;
    }
  }
  
  const success = await saveSkill(skill, originalName, originalCollection);
  
  if (success) {
    showToast(originalName ? 'Skill updated' : 'Skill created', 'success');
    closeSkillModal();
    await fetchSkills();
  }
});

// View Modal Events
viewModalClose.addEventListener('click', closeViewModal);

viewModalOverlay.addEventListener('click', (e) => {
  if (e.target === viewModalOverlay) closeViewModal();
});

btnEdit.addEventListener('click', () => {
  if (currentViewSkill) {
    closeViewModal();
    openEditModal(currentViewSkill);
  }
});

btnDelete.addEventListener('click', async () => {
  if (!currentViewSkill) return;
  
  if (confirm(`Delete "${currentViewSkill.name}"? This will remove the ZIP file from disk.`)) {
    const success = await deleteSkill(currentViewSkill.name, currentViewSkill.collection);
    if (success) {
      showToast('Skill deleted', 'success');
      closeViewModal();
      await fetchSkills();
    }
  }
});

btnDownload.addEventListener('click', async () => {
  if (!currentViewSkill) return;
  
  try {
    const blob = await createSkillZipBlob(currentViewSkill);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentViewSkill.name}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${currentViewSkill.name}.zip`, 'success');
  } catch (err) {
    console.error('Failed to download:', err);
    showToast('Failed to download skill', 'error');
  }
});

// File Management Events
btnBackToFiles.addEventListener('click', closeFileEditor);

btnSaveFile.addEventListener('click', async () => {
  if (!currentViewSkill || !currentEditingFile) return;
  
  const content = fileEditor.value;
  const success = await saveSkillFile(currentViewSkill.name, currentEditingFile, content, currentViewSkill.collection);
  
  if (success) {
    showToast('File saved', 'success');
    // Reload the skill to update the display
    await fetchSkills();
    // Re-find the skill in the updated list
    const updatedSkill = skills.find(s => 
      s.name === currentViewSkill.name && 
      s.collection === currentViewSkill.collection
    );
    if (updatedSkill) {
      currentViewSkill = updatedSkill;
      // Update the view
      if (updatedSkill.body) {
        viewBody.innerHTML = marked.parse(updatedSkill.body);
      }
      skillOutput.textContent = generateSkillMd(updatedSkill);
    }
    await loadSkillFiles();
  }
});

btnDeleteFile.addEventListener('click', async () => {
  if (!currentViewSkill || !currentEditingFile) return;
  
  const fileName = currentEditingFile.split('/').pop();
  if (fileName === 'SKILL.md') {
    showToast('Cannot delete SKILL.md - it is required', 'error');
    return;
  }
  
  if (!confirm(`Delete "${fileName}"? This cannot be undone.`)) return;
  
  const success = await deleteSkillFile(currentViewSkill.name, currentEditingFile, currentViewSkill.collection);
  
  if (success) {
    showToast('File deleted', 'success');
    closeFileEditor();
    await loadSkillFiles();
  }
});

btnAddFile.addEventListener('click', async () => {
  if (!currentViewSkill) return;
  
  const fileName = prompt('Enter file name (e.g., REFERENCE.md, examples/usage.md):');
  if (!fileName) return;
  
  // Clean up the filename
  const cleanName = fileName.trim();
  if (!cleanName) return;
  
  // Get the root folder name from existing files
  if (currentSkillFiles.length === 0) {
    showToast('Cannot determine skill folder', 'error');
    return;
  }
  
  const rootFolder = currentSkillFiles[0].name.split('/')[0];
  const fullPath = `${rootFolder}/${cleanName}`;
  
  const success = await saveSkillFile(currentViewSkill.name, fullPath, '# New File\n\nAdd your content here.', currentViewSkill.collection);
  
  if (success) {
    showToast('File created', 'success');
    await loadSkillFiles();
    openFileEditor(fullPath);
  }
});

// Move Modal Events
btnMove.addEventListener('click', openMoveModal);
moveModalClose.addEventListener('click', closeMoveModal);
btnMoveCancel.addEventListener('click', closeMoveModal);

moveModalOverlay.addEventListener('click', (e) => {
  if (e.target === moveModalOverlay) closeMoveModal();
});

moveForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!currentViewSkill) return;
  
  const toCollection = moveTargetSelect.value || null;
  const fromCollection = currentViewSkill.collection || null;
  
  if (toCollection === fromCollection) {
    closeMoveModal();
    return;
  }
  
  const success = await moveSkill(currentViewSkill.name, fromCollection, toCollection);
  
  if (success) {
    showToast('Skill moved', 'success');
    closeMoveModal();
    closeViewModal();
    await fetchSkills();
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (moveModalOverlay.classList.contains('active')) {
      closeMoveModal();
    } else if (collectionModalOverlay.classList.contains('active')) {
      closeCollectionModal();
    } else if (modalOverlay.classList.contains('active')) {
      closeSkillModal();
    } else if (viewModalOverlay.classList.contains('active')) {
      closeViewModal();
    }
  }
  
  if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
    e.preventDefault();
    if (!modalOverlay.classList.contains('active') && 
        !viewModalOverlay.classList.contains('active') &&
        !collectionModalOverlay.classList.contains('active') &&
        !moveModalOverlay.classList.contains('active')) {
      openCreateModal();
    }
  }
});

// ========================================
// Initialize
// ========================================
async function init() {
  await fetchCollections();
  await fetchSkills();
}

document.addEventListener('DOMContentLoaded', init);
