const apps = [
  {
    id: "metricas",
    name: "Dashboard de métricas",
    description: "Acompanhe cortes produzidos, histórico e evolução dos indicadores.",
    category: "Métricas",
    categoryId: "metricas",
    url: "https://dashmetricas-plum.vercel.app",
    label: "PRODUÇÃO DE CORTES",
    accent: "violet",
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5m0 14h16M8 15l3-4 3 2 5-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="6" r="1.5" fill="currentColor"/></svg>',
    tags: ["dashboard", "cortes", "indicadores", "ads", "dados"],
  },
  {
    id: "entregas",
    name: "Painel de entregas",
    description: "Organize tarefas operacionais por etapa e acompanhe o progresso.",
    category: "Operação",
    categoryId: "operacao",
    url: "https://matheuslacetfp.github.io/dash_entregas/",
    label: "OPERAÇÃO",
    accent: "blue",
    icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><path d="m15 17 1.5 1.5L20 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    tags: ["tarefas", "kanban", "entregas", "progresso", "operacional"],
  },
  {
    id: "semanal",
    name: "Fluxo de entrega",
    description: "Visualize as etapas e o planejamento semanal da operação de conteúdo.",
    category: "Operação",
    categoryId: "operacao",
    url: "https://matheuslacetfp.github.io/report-semanal/",
    label: "RELATÓRIO SEMANAL",
    accent: "amber",
    icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 3v4m8-4v4M4 10h16m-11 4h2m3 0h2m-7 3h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    tags: ["semanal", "relatório", "conteúdo", "fluxo", "planejamento"],
  },
  {
    id: "producao",
    name: "Fluxo de produção ADS",
    description: "Acompanhe o processo de produção de mídia e vídeo para anúncios.",
    category: "Produção",
    categoryId: "producao",
    url: "https://matheuslacetfp.github.io/fluxo-de-produtos-ADS/",
    label: "MÍDIA E VÍDEO",
    accent: "pink",
    icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="m15.5 10 5-3v10l-5-3" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m8 10 4 2-4 2v-4Z" fill="currentColor"/></svg>',
    tags: ["ads", "vídeo", "mídia", "criativos", "fluxo", "produção"],
  },
];

const categories = [
  { id: "todos", label: "Todos os apps", icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.7"/></svg>' },
  { id: "favoritos", label: "Favoritos", icon: '<svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>' },
  { id: "operacao", label: "Operação", icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16M4 12h10M4 19h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="1.7"/><circle cx="15" cy="19" r="2" stroke="currentColor" stroke-width="1.7"/></svg>' },
  { id: "producao", label: "Produção", icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 18V6m0 12h16M8 14l3-4 3 3 5-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { id: "metricas", label: "Métricas", icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 19V9m7 10V5m7 14v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' },
];

const favoriteKey = "suite:favorites";
const categoryNav = document.querySelector("#category-nav");
const filterRow = document.querySelector("#filter-row");
const appsGrid = document.querySelector("#apps-grid");
const searchInput = document.querySelector("#app-search");
const emptyState = document.querySelector("#empty-state");
const visibleCount = document.querySelector("#visible-count");
let activeCategory = "todos";
let query = "";
let favorites = readFavorites();

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
    return new Set(Array.isArray(stored) ? stored.filter((id) => apps.some((app) => app.id === id)) : []);
  } catch (error) {
    console.warn("Não foi possível carregar os favoritos salvos neste navegador.", error);
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(favoriteKey, JSON.stringify([...favorites]));
  } catch (error) {
    console.warn("Não foi possível salvar os favoritos neste navegador.", error);
  }
}

function renderNavigation() {
  categoryNav.innerHTML = categories.map((category) => `
    <button class="nav-item${activeCategory === category.id ? " active" : ""}" type="button" data-category="${category.id}" aria-current="${activeCategory === category.id ? "page" : "false"}">
      <span class="nav-icon">${category.icon}</span><span>${category.label}</span>
      ${category.id === "favoritos" ? `<span class="nav-count">${favorites.size}</span>` : ""}
    </button>`).join("");

  filterRow.innerHTML = categories.map((category) => `
    <button class="filter-chip${activeCategory === category.id ? " active" : ""}" type="button" data-category="${category.id}">${category.label}${category.id === "favoritos" ? ` <span>${favorites.size}</span>` : ""}</button>`).join("");

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      render();
    });
  });
}

function filteredApps() {
  return apps.filter((app) => {
    const matchesCategory = activeCategory === "todos"
      || (activeCategory === "favoritos" ? favorites.has(app.id) : app.categoryId === activeCategory);
    const searchable = [app.name, app.description, app.category, app.label, ...app.tags].join(" ").toLocaleLowerCase("pt-BR");
    return matchesCategory && searchable.includes(query.toLocaleLowerCase("pt-BR").trim());
  });
}

function renderCards(filtered) {
  appsGrid.innerHTML = filtered.map((app) => `
    <article class="app-card accent-${app.accent}">
      <div class="card-topline">
        <span class="app-icon">${app.icon}</span>
        <button class="favorite-button${favorites.has(app.id) ? " is-favorite" : ""}" type="button" data-favorite="${app.id}" aria-label="${favorites.has(app.id) ? "Remover dos" : "Adicionar aos"} favoritos" aria-pressed="${favorites.has(app.id)}">
          <svg viewBox="0 0 24 24" fill="${favorites.has(app.id) ? "currentColor" : "none"}" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="card-category"><span></span>${app.label}</div>
      <h3>${app.name}</h3>
      <p class="card-description">${app.description}</p>
      <div class="card-footer">
        <span class="category-tag">${app.category}</span>
        <a class="open-app" href="${app.url}" target="_blank" rel="noopener noreferrer">Abrir aplicativo <span aria-hidden="true">↗</span></a>
      </div>
    </article>`).join("");

  appsGrid.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const { favorite } = button.dataset;
      if (favorites.has(favorite)) favorites.delete(favorite);
      else favorites.add(favorite);
      saveFavorites();
      render();
    });
  });
}

function render() {
  renderNavigation();
  const filtered = filteredApps();
  renderCards(filtered);
  visibleCount.textContent = `(${filtered.length})`;
  emptyState.hidden = filtered.length > 0;
  appsGrid.hidden = filtered.length === 0;
}

searchInput.addEventListener("input", () => {
  query = searchInput.value;
  render();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    query = "";
    render();
  }
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  activeCategory = "todos";
  query = "";
  searchInput.value = "";
  render();
  searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelector("#app-count").textContent = String(apps.length).padStart(2, "0");
render();
