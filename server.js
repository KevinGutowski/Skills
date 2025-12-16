const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8765;
const SKILLS_DIR = path.join(__dirname, 'skills');
const COLLECTION_SUFFIX = '__collection';

// Ensure skills directory exists
if (!fs.existsSync(SKILLS_DIR)) {
  fs.mkdirSync(SKILLS_DIR, { recursive: true });
}

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper: Check if folder is a collection
function isCollection(folderName) {
  return folderName.endsWith(COLLECTION_SUFFIX);
}

// Helper: Get collection display name
function getCollectionDisplayName(folderName) {
  return folderName.replace(COLLECTION_SUFFIX, '');
}

// Helper: Get collection folder name
function getCollectionFolderName(displayName) {
  return displayName + COLLECTION_SUFFIX;
}

// Helper: Check if folder is a skill
function isSkill(folderPath) {
  return fs.existsSync(path.join(folderPath, 'SKILL.md'));
}

// Helper: Read SKILL.md and parse frontmatter
function parseSkillMd(skillMdPath) {
  const content = fs.readFileSync(skillMdPath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  const skill = {
    name: '',
    description: '',
    dependencies: '',
    body: ''
  };
  
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

// Helper: Generate SKILL.md content
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

// Get all collections
function getCollections() {
  const entries = fs.readdirSync(SKILLS_DIR);
  const collections = [];
  
  for (const entry of entries) {
    const fullPath = path.join(SKILLS_DIR, entry);
    if (fs.statSync(fullPath).isDirectory() && isCollection(entry)) {
      collections.push({
        name: getCollectionDisplayName(entry),
        folderName: entry
      });
    }
  }
  
  return collections;
}

// Get all skills
function getAllSkills() {
  const skills = [];
  
  // Scan root level for skills
  const rootEntries = fs.readdirSync(SKILLS_DIR);
  for (const entry of rootEntries) {
    const fullPath = path.join(SKILLS_DIR, entry);
    if (fs.statSync(fullPath).isDirectory() && !isCollection(entry) && isSkill(fullPath)) {
      const skillMdPath = path.join(fullPath, 'SKILL.md');
      const skill = parseSkillMd(skillMdPath);
      skill.collection = null;
      skill.folderName = entry;
      skills.push(skill);
    }
  }
  
  // Scan collections for skills
  const collections = getCollections();
  for (const collection of collections) {
    const collectionPath = path.join(SKILLS_DIR, collection.folderName);
    const collectionEntries = fs.readdirSync(collectionPath);
    
    for (const entry of collectionEntries) {
      const fullPath = path.join(collectionPath, entry);
      if (fs.statSync(fullPath).isDirectory() && isSkill(fullPath)) {
        const skillMdPath = path.join(fullPath, 'SKILL.md');
        const skill = parseSkillMd(skillMdPath);
        skill.collection = collection.name;
        skill.folderName = entry;
        skills.push(skill);
      }
    }
  }
  
  return skills;
}

// Get skill path
function getSkillPath(skillName, collection = null) {
  if (collection) {
    const collectionFolder = getCollectionFolderName(collection);
    return path.join(SKILLS_DIR, collectionFolder, skillName);
  }
  return path.join(SKILLS_DIR, skillName);
}

// Create ZIP from skill folder
function createZipFromFolder(skillPath, skillName) {
  const tempZip = path.join(__dirname, 'temp', `${skillName}.zip`);
  fs.mkdirSync(path.dirname(tempZip), { recursive: true });
  
  try {
    // Create ZIP with the skill folder structure
    execSync(`cd "${skillPath}/.." && zip -r "${tempZip}" "${skillName}"`, { encoding: 'utf8' });
    return tempZip;
  } catch (err) {
    console.error('Error creating ZIP:', err);
    return null;
  }
}

// Extract ZIP to folder
function extractZipToFolder(zipPath, targetPath) {
  try {
    fs.mkdirSync(targetPath, { recursive: true });
    execSync(`unzip -o "${zipPath}" -d "${targetPath}"`, { encoding: 'utf8' });
    
    // Check if ZIP has a root folder
    const extracted = fs.readdirSync(targetPath);
    if (extracted.length === 1 && fs.statSync(path.join(targetPath, extracted[0])).isDirectory()) {
      // Move contents up one level
      const rootFolder = extracted[0];
      const rootPath = path.join(targetPath, rootFolder);
      const files = fs.readdirSync(rootPath);
      
      for (const file of files) {
        fs.renameSync(path.join(rootPath, file), path.join(targetPath, file));
      }
      
      fs.rmdirSync(rootPath);
    }
    
    return true;
  } catch (err) {
    console.error('Error extracting ZIP:', err);
    return false;
  }
}

// HTTP Server
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  
  // API: Get all collections
  if (pathname === '/api/collections' && req.method === 'GET') {
    const collections = getCollections().map(c => ({ name: c.name }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(collections));
    return;
  }
  
  // API: Create collection
  if (pathname === '/api/collections' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name } = JSON.parse(body);
        const folderName = getCollectionFolderName(name);
        const collectionPath = path.join(SKILLS_DIR, folderName);
        
        if (fs.existsSync(collectionPath)) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Collection already exists' }));
          return;
        }
        
        fs.mkdirSync(collectionPath, { recursive: true });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ name }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }
  
  // API: Delete collection
  if (pathname.startsWith('/api/collections/') && req.method === 'DELETE') {
    const collectionName = decodeURIComponent(pathname.split('/').pop());
    const folderName = getCollectionFolderName(collectionName);
    const collectionPath = path.join(SKILLS_DIR, folderName);
    
    try {
      // Check if empty
      const entries = fs.readdirSync(collectionPath);
      if (entries.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Collection must be empty' }));
        return;
      }
      
      fs.rmdirSync(collectionPath);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  // API: Get all skills
  if (pathname === '/api/skills' && req.method === 'GET') {
    const skills = getAllSkills();
    console.log(`[API] GET /api/skills - Returning ${skills.length} skills`);
    skills.forEach(s => console.log(`  - ${s.name} (${s.collection || 'root'})`));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(skills));
    return;
  }
  
  // API: Create or import skill
  if (pathname === '/api/skills' && req.method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload (import)
      let body = Buffer.alloc(0);
      req.on('data', chunk => body = Buffer.concat([body, chunk]));
      req.on('end', () => {
        try {
          // Simple multipart parsing
          const boundary = contentType.split('boundary=')[1];
          const parts = body.toString('binary').split(`--${boundary}`);
          
          const imported = [];
          for (const part of parts) {
            if (part.includes('filename=')) {
              const filenameMatch = part.match(/filename="(.+?)"/);
              if (!filenameMatch) continue;
              
              const filename = filenameMatch[1];
              if (!filename.endsWith('.zip')) continue;
              
              // Extract file content
              const contentStart = part.indexOf('\r\n\r\n') + 4;
              const contentEnd = part.lastIndexOf('\r\n');
              const fileContent = Buffer.from(part.substring(contentStart, contentEnd), 'binary');
              
              // Save temp ZIP
              const tempZip = path.join(__dirname, 'temp', filename);
              fs.mkdirSync(path.dirname(tempZip), { recursive: true });
              fs.writeFileSync(tempZip, fileContent);
              
              // Extract to skills folder
              const skillName = filename.replace('.zip', '');
              const collection = url.searchParams.get('collection');
              const skillPath = getSkillPath(skillName, collection);
              
              if (extractZipToFolder(tempZip, skillPath)) {
                imported.push(skillName);
              }
              
              // Cleanup
              fs.unlinkSync(tempZip);
            }
          }
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ imported }));
        } catch (err) {
          console.error('Import error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    } else {
      // Handle JSON (create new skill)
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { name, description, dependencies, body: bodyContent, collection } = JSON.parse(body);
          
          const skillPath = getSkillPath(name, collection);
          
          if (fs.existsSync(skillPath)) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Skill already exists' }));
            return;
          }
          
          // Create skill folder and SKILL.md
          fs.mkdirSync(skillPath, { recursive: true });
          
          const skill = { name, description, dependencies, body: bodyContent };
          const skillMd = generateSkillMd(skill);
          fs.writeFileSync(path.join(skillPath, 'SKILL.md'), skillMd);
          
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(skill));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
    return;
  }
  
  // API: Download skill as ZIP (with collection)
  // Skip if this is a file/files API call (those are handled later)
  if (pathname.match(/^\/api\/skills\/(.+?)\/(.+)$/) && req.method === 'GET' && !pathname.includes('/skills/file') && !pathname.includes('/skills/files')) {
    const parts = pathname.split('/').filter(Boolean);
    const collectionOrSkill = decodeURIComponent(parts[2]);
    const skillName = parts[3] ? decodeURIComponent(parts[3]) : null;
    
    const collection = skillName ? collectionOrSkill : null;
    const actualSkillName = skillName || collectionOrSkill;
    
    const skillPath = getSkillPath(actualSkillName, collection);
    
    if (!fs.existsSync(skillPath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Skill not found' }));
      return;
    }
    
    // Create ZIP on demand
    const zipPath = createZipFromFolder(skillPath, actualSkillName);
    if (!zipPath) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to create ZIP' }));
      return;
    }
    
    const zipContent = fs.readFileSync(zipPath);
    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${actualSkillName}.zip"`
    });
    res.end(zipContent);
    
    // Cleanup temp ZIP
    fs.unlinkSync(zipPath);
    return;
  }
  
  // API: Download skill as ZIP (without collection - uncategorized skills)
  if (pathname.match(/^\/api\/skills\/([^\/]+)$/) && req.method === 'GET') {
    const parts = pathname.split('/').filter(Boolean);
    const skillName = decodeURIComponent(parts[2]);
    
    // Skip reserved paths
    if (skillName === 'file' || skillName === 'files') {
      // Let other handlers deal with these
    } else {
      const skillPath = getSkillPath(skillName, null);
      
      if (!fs.existsSync(skillPath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Skill not found' }));
        return;
      }
      
      // Create ZIP on demand
      const zipPath = createZipFromFolder(skillPath, skillName);
      if (!zipPath) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to create ZIP' }));
        return;
      }
      
      const zipContent = fs.readFileSync(zipPath);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${skillName}.zip"`
      });
      res.end(zipContent);
      
      // Cleanup temp ZIP
      fs.unlinkSync(zipPath);
      return;
    }
  }
  
  // API: Update skill metadata
  // Skip file-related paths (handled by other routes)
  if (pathname.match(/^\/api\/skills\/(.+)$/) && req.method === 'PUT' && !pathname.includes('/skills/file/')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { oldName, oldCollection, name, description, dependencies, body: bodyContent, collection } = JSON.parse(body);
        
        const oldPath = getSkillPath(oldName, oldCollection);
        const newPath = getSkillPath(name, collection);
        
        if (!fs.existsSync(oldPath)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Skill not found' }));
          return;
        }
        
        // Update SKILL.md
        const skill = { name, description, dependencies, body: bodyContent };
        const skillMd = generateSkillMd(skill);
        fs.writeFileSync(path.join(oldPath, 'SKILL.md'), skillMd);
        
        // Move if name or collection changed
        if (oldPath !== newPath) {
          fs.mkdirSync(path.dirname(newPath), { recursive: true });
          fs.renameSync(oldPath, newPath);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(skill));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }
  
  // API: Delete skill
  // Skip if this is a file/files API call (those are handled later)
  if (pathname.match(/^\/api\/skills\/(.+?)\/(.+)$/) && req.method === 'DELETE' && !pathname.includes('/skills/file')) {
    const parts = pathname.split('/').filter(Boolean);
    const collectionOrSkill = decodeURIComponent(parts[2]);
    const skillName = parts[3] ? decodeURIComponent(parts[3]) : null;
    
    const collection = skillName ? collectionOrSkill : null;
    const actualSkillName = skillName || collectionOrSkill;
    
    const skillPath = getSkillPath(actualSkillName, collection);
    
    try {
      fs.rmSync(skillPath, { recursive: true });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  // API: Move skill
  if (pathname === '/api/skills/move' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, fromCollection, toCollection } = JSON.parse(body);
        
        const fromPath = getSkillPath(name, fromCollection);
        const toPath = getSkillPath(name, toCollection);
        
        if (!fs.existsSync(fromPath)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Skill not found' }));
          return;
        }
        
        fs.mkdirSync(path.dirname(toPath), { recursive: true });
        fs.renameSync(fromPath, toPath);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }
  
  // API: List files in skill
  if (pathname.match(/^\/api\/skills\/files\/(.+?)\/(.+)$/) && req.method === 'GET') {
    const parts = pathname.split('/').filter(Boolean);
    const collectionOrRoot = decodeURIComponent(parts[3]);
    const skillName = decodeURIComponent(parts[4]);
    
    const collection = collectionOrRoot === '_' ? null : collectionOrRoot;
    const skillPath = getSkillPath(skillName, collection);
    
    try {
      const files = [];
      
      function scanDir(dir, prefix = '') {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
          const fullPath = path.join(dir, entry);
          const relativePath = prefix ? `${prefix}/${entry}` : entry;
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDir(fullPath, relativePath);
          } else {
            files.push({
              name: relativePath,
              size: stat.size
            });
          }
        }
      }
      
      scanDir(skillPath);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ files }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  // API: Read file from skill
  if (pathname.match(/^\/api\/skills\/file\/(.+?)\/(.+?)\/(.+)$/) && req.method === 'GET') {
    const parts = pathname.split('/').filter(Boolean);
    const collectionOrRoot = decodeURIComponent(parts[3]);
    const skillName = decodeURIComponent(parts[4]);
    const filePath = decodeURIComponent(parts.slice(5).join('/'));
    
    const collection = collectionOrRoot === '_' ? null : collectionOrRoot;
    const skillPath = getSkillPath(skillName, collection);
    const fullFilePath = path.join(skillPath, filePath);
    
    try {
      const content = fs.readFileSync(fullFilePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ content }));
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
    }
    return;
  }
  
  // API: Write file to skill
  if (pathname.match(/^\/api\/skills\/file\/(.+?)\/(.+?)\/(.+)$/) && req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const parts = pathname.split('/').filter(Boolean);
        const collectionOrRoot = decodeURIComponent(parts[3]);
        const skillName = decodeURIComponent(parts[4]);
        const filePath = decodeURIComponent(parts.slice(5).join('/'));
        
        const { content } = JSON.parse(body);
        
        const collection = collectionOrRoot === '_' ? null : collectionOrRoot;
        const skillPath = getSkillPath(skillName, collection);
        const fullFilePath = path.join(skillPath, filePath);
        
        fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });
        fs.writeFileSync(fullFilePath, content);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }
  
  // API: Delete file from skill
  if (pathname.match(/^\/api\/skills\/file\/(.+?)\/(.+?)\/(.+)$/) && req.method === 'DELETE') {
    const parts = pathname.split('/').filter(Boolean);
    const collectionOrRoot = decodeURIComponent(parts[3]);
    const skillName = decodeURIComponent(parts[4]);
    const filePath = decodeURIComponent(parts.slice(5).join('/'));
    
    const collection = collectionOrRoot === '_' ? null : collectionOrRoot;
    const skillPath = getSkillPath(skillName, collection);
    const fullFilePath = path.join(skillPath, filePath);
    
    try {
      fs.unlinkSync(fullFilePath);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  // Serve static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);
  
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   ⚒  Skill Forge Server                              ║
║                                                       ║
║   Running at: http://localhost:${PORT}                  ║
║   Skills stored as folders in: ./skills/              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
