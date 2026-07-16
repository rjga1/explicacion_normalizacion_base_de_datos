// Script de control de la aplicación de explicaciones de BD
document.addEventListener('DOMContentLoaded', () => {
  // Elements selection
  const searchInput = document.getElementById('search-input');
  const exerciseItems = document.querySelectorAll('#exercise-list .exercise-item');
  const noResultsMessage = document.getElementById('no-results-message');
  const mainTitle = document.getElementById('exercise-title');
  const tabButtons = document.querySelectorAll('.tab-button');
  
  const descPane = document.getElementById('description-content');
  const pane1nf = document.getElementById('content-1nf');
  const pane2nf = document.getElementById('content-2nf');
  const pane3nf = document.getElementById('content-3nf');
  const erContainer = document.getElementById('er-diagram-container');
  const comparisonBox = document.querySelector('.comparison-box');
  const announcer = document.getElementById('search-results-announcer');
  
  let currentExerciseId = 1;
  let activeTabId = 'tab-desc';

  // Helper function to remove accents/diacritics for search
  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Helper function to render Excel-like tables dynamically
  function renderExcelTables(tablesList, connectionsList) {
    if (!tablesList || tablesList.length === 0) {
      return "<p>No hay tablas definidas para esta etapa.</p>";
    }
    
    let html = `<div class="excel-grid">`;
    tablesList.forEach(table => {
      html += `
        <div class="excel-card">
          <div class="excel-header">${table.name}</div>
          <div class="excel-body">
      `;
      table.fields.forEach(field => {
        const isPk = field.startsWith('*');
        html += `<div class="excel-field ${isPk ? 'excel-pk' : ''}">${field}</div>`;
      });
      html += `
          </div>
        </div>
      `;
    });
    html += `</div>`;
    
    if (connectionsList && connectionsList.length > 0) {
      html += `
        <div class="connections-section">
          <h5>Vinculación de Campos (Relaciones Clave)</h5>
          <ul class="connections-list">
      `;
      connectionsList.forEach(conn => {
        html += `<li>${conn}</li>`;
      });
      html += `
          </ul>
        </div>
      `;
    }
    
    return html;
  }

  // Load a specific exercise
  function loadExercise(id) {
    const ex = window.dbExercises.find(e => e.id === id);
    if (!ex) return;
    
    currentExerciseId = id;
    
    // Update active class in sidebar
    exerciseItems.forEach(item => {
      if (parseInt(item.getAttribute('data-id'), 10) === id) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'true');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });
    
    // Update title
    const titlePart = ex.title.substring(ex.title.indexOf('.') + 1).trim();
    mainTitle.textContent = `Ejercicio ${ex.id}: ${titlePart}`;
    
    // Update text panes
    descPane.innerHTML = `<p>${ex.description}</p>`;
    pane1nf.innerHTML = `${ex.content1nf || ''}${renderExcelTables(ex.tables1nf)}`;
    pane2nf.innerHTML = `${ex.content2nf || ''}${renderExcelTables(ex.tables2nf)}`;
    pane3nf.innerHTML = `${ex.content3nf || ''}${renderExcelTables(ex.tables3nf, ex.connections)}`;
    
    // Update SVG E-R diagram
    erContainer.innerHTML = `<div class="diagram-canvas">${ex.erDiagram}</div>`;
    
    // Update comparison
    comparisonBox.innerHTML = ex.comparison;
    
    console.log(`[App] Ejercicio cargado: ${id} - ${titlePart}`);
  }

  // Switch between tabs
  function switchTab(tabId) {
    activeTabId = tabId;
    
    // Update active states on tab buttons
    tabButtons.forEach(btn => {
      if (btn.id === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
    
    // Hide all panes, show correct one
    const panes = [
      { id: 'tab-desc', element: descPane },
      { id: 'tab-1nf', element: pane1nf },
      { id: 'tab-2nf', element: pane2nf },
      { id: 'tab-3nf', element: pane3nf },
      { id: 'tab-er', element: erContainer }
    ];
    
    panes.forEach(pane => {
      if (pane.id === tabId) {
        pane.element.classList.remove('hidden');
        pane.element.classList.add('active');
        pane.element.setAttribute('aria-hidden', 'false');
      } else {
        pane.element.classList.add('hidden');
        pane.element.classList.remove('active');
        pane.element.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Filter exercises in sidebar on search
  function filterExercises() {
    const query = removeAccents(searchInput.value.trim().toLowerCase());
    let visibleCount = 0;
    
    exerciseItems.forEach(item => {
      const text = removeAccents(item.textContent.toLowerCase());
      const idStr = item.getAttribute('data-id');
      
      if (text.includes(query) || idStr === query) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });
    
    // Handle no results message
    if (visibleCount === 0) {
      noResultsMessage.classList.remove('hidden');
      announcer.textContent = "No se encontraron ejercicios.";
    } else {
      noResultsMessage.classList.add('hidden');
      announcer.textContent = `${visibleCount} ejercicios encontrados.`;
    }
  }

  // Handle direct hash navigation
  function handleHash() {
    const hash = window.location.hash;
    let targetId = 1;
    if (hash && hash.startsWith('#exercise=')) {
      const idStr = hash.replace('#exercise=', '');
      const parsedId = parseInt(idStr, 10);
      if (!isNaN(parsedId) && parsedId >= 1 && parsedId <= 14) {
        targetId = parsedId;
      }
    }
    loadExercise(targetId);
  }

  // Keyboard navigation for exercise list
  exerciseItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
      const visibleItems = Array.from(exerciseItems).filter(el => !el.classList.contains('hidden'));
      const currentIdx = visibleItems.indexOf(item);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIdx !== -1 && currentIdx < visibleItems.length - 1) {
          visibleItems[currentIdx + 1].focus();
        } else if (visibleItems.length > 0) {
          visibleItems[0].focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIdx > 0) {
          visibleItems[currentIdx - 1].focus();
        } else if (visibleItems.length > 0) {
          visibleItems[visibleItems.length - 1].focus();
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Hover/Active interactive highlights for E-R diagram via delegation
  document.addEventListener('mouseover', (e) => {
    const entity = e.target.closest('.svg-entity');
    if (entity) {
      entity.classList.add('hover');
    }
    const rel = e.target.closest('.svg-relationship');
    if (rel) {
      rel.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const entity = e.target.closest('.svg-entity');
    if (entity) {
      const related = e.relatedTarget;
      if (!related || !entity.contains(related)) {
        entity.classList.remove('hover');
      }
    }
    const rel = e.target.closest('.svg-relationship');
    if (rel) {
      const related = e.relatedTarget;
      if (!related || !rel.contains(related)) {
        rel.classList.remove('hover');
      }
    }
  });

  document.addEventListener('focusin', (e) => {
    const entity = e.target.closest('.svg-entity');
    if (entity) {
      entity.classList.add('active');
    }
    const rel = e.target.closest('.svg-relationship');
    if (rel) {
      rel.classList.add('active');
    }
  });

  document.addEventListener('focusout', (e) => {
    const entity = e.target.closest('.svg-entity');
    if (entity) {
      entity.classList.remove('active');
    }
    const rel = e.target.closest('.svg-relationship');
    if (rel) {
      rel.classList.remove('active');
    }
  });

  // Event Listeners setup
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.id);
    });
  });

  exerciseItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.getAttribute('data-id'), 10);
      loadExercise(id);
    });
  });

  searchInput.addEventListener('input', filterExercises);
  window.addEventListener('hashchange', handleHash);

  // Initialize application
  console.log("[App] Inicializando aplicación...");
  handleHash();
  switchTab('tab-desc');
});
