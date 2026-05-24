let subjects = [
  {
    id: "math",
    name: "Mathematics",
    units: [
      { id: "algebra", title: "Algebra", content: "<h3>Topics...</h3><p>Custom content for Algebra</p>" },
      { id: "calculus", title: "Calculus", content: "<h3>Topics...</h3><p>Derivatives, Integrals...</p>" }
    ]
  },
  {
    id: "engineering",
    name: "Engineering",
    units: [
      // ... your units
    ]
  }
  // Add more...
];

let currentSubjectId = null;

// Render sidebar subjects
function renderSubjectList() {
  const list = document.getElementById('subject-list');
  list.innerHTML = '';
  
  subjects.forEach(subject => {
    const li = document.createElement('li');
    li.textContent = subject.name;
    li.classList.toggle('active', subject.id === currentSubjectId);
    li.onclick = () => loadSubject(subject.id);
    list.appendChild(li);
  });
}

// Load a subject and its units
function loadSubject(subjectId) {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return;
  
  currentSubjectId = subjectId;
  document.getElementById('current-subject-title').textContent = subject.name;
  
  const contentArea = document.getElementById('subject-content');
  contentArea.innerHTML = `
    <h2>Units</h2>
    <div class="units-grid">
      ${subject.units.map(unit => `
        <div class="unit-card" onclick="openUnit('${subject.id}', '${unit.id}')">
          <h3>${unit.title}</h3>
          <p>Click to view content</p>
        </div>
      `).join('')}
    </div>
    
    <button onclick="addNewUnit()">+ Add New Unit</button>
  `;
  
  renderSubjectList(); // Refresh active state
}

// Open specific unit content
function openUnit(subjectId, unitId) {
  const subject = subjects.find(s => s.id === subjectId);
  const unit = subject.units.find(u => u.id === unitId);
  
  if (unit) {
    document.getElementById('subject-content').innerHTML = `
      <button onclick="loadSubject('${subjectId}')">← Back to Units</button>
      <h2>${unit.title}</h2>
      <div>${unit.content}</div>
    `;
  }
}

// Add new subject dynamically
function addNewSubject() {
  const input = document.getElementById('new-subject-name');
  const name = input.value.trim();
  
  if (!name) return;
  
  const newSubject = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name: name,
    units: []
  };
  
  subjects.push(newSubject);
  input.value = '';
  renderSubjectList();
  loadSubject(newSubject.id); // Auto-open the new subject
}

// Add new unit to current subject
function addNewUnit() {
  if (!currentSubjectId) return;
  
  const title = prompt("Enter unit title:");
  if (!title) return;
  
  const subject = subjects.find(s => s.id === currentSubjectId);
  subject.units.push({
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title: title,
    content: `<p>Custom content for ${title}. You can edit this later.</p>`
  });
  
  loadSubject(currentSubjectId); // Refresh
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSubjectList();
  if (subjects.length > 0) {
    loadSubject(subjects[0].id);
  }
});