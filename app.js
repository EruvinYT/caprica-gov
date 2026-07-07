// Republic of Caprica - Official Government Portal Logic Engine

document.addEventListener("DOMContentLoaded", () => {
  // --- Global Application State ---
  const state = {
    activePage: "home",
    researchFolder: JSON.parse(localStorage.getItem("caprica_research")) || [],
    theme: localStorage.getItem("caprica_theme") || "dark",
    selectedLegislationId: "leg-def-act", // default selection
    selectedConstId: "const-preamble",
    activeOfficialsTab: "executive",
    officialFilters: {
      party: "all",
      colony: "all",
      search: ""
    }
  };

  // --- Theme Manager ---
  function initTheme() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (state.theme === "light") {
      document.body.classList.add("light-theme");
      toggleBtn.innerHTML = getSunIcon();
    } else {
      document.body.classList.remove("light-theme");
      toggleBtn.innerHTML = getMoonIcon();
    }

    toggleBtn.addEventListener("click", () => {
      if (document.body.classList.contains("light-theme")) {
        document.body.classList.remove("light-theme");
        state.theme = "dark";
        toggleBtn.innerHTML = getMoonIcon();
      } else {
        document.body.classList.add("light-theme");
        state.theme = "light";
        toggleBtn.innerHTML = getSunIcon();
      }
      localStorage.setItem("caprica_theme", state.theme);
    });
  }

  // --- Client-Side Router ---
  function handleRoute() {
    const hash = window.location.hash || "#/home";
    const parts = hash.split("?");
    const path = parts[0];
    const queryParams = new URLSearchParams(parts[1] || "");

    // Extract Page Name
    let page = path.replace("#/", "");
    if (!page || page === "home") page = "home";

    // Set page state
    state.activePage = page;

    // Show/Hide appropriate HTML sections
    document.querySelectorAll(".page-section").forEach((section) => {
      section.classList.remove("active");
    });
    
    const targetSection = document.getElementById(`section-${page}`);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Update Nav Menu Links active state
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#/${page}`) {
        link.classList.add("active");
      }
    });

    // Close slideout drawer on page transition
    document.getElementById("research-drawer").classList.remove("open");

    // Route-specific initializations
    if (page === "home") {
      renderHome();
    } else if (page === "constitution") {
      const artId = queryParams.get("id");
      if (artId) state.selectedConstId = artId;
      renderConstitution();
    } else if (page === "officials") {
      const offId = queryParams.get("id");
      if (offId) {
        // Auto-detect branch based on ID prefix
        if (offId.startsWith("sen-")) {
          state.activeOfficialsTab = "senate";
        } else {
          state.activeOfficialsTab = "parliament";
        }
        // Save ID to state for highlighting
        state.highlightedOfficialId = offId;
      }
      renderOfficials();
    } else if (page === "legislation") {
      const legId = queryParams.get("id");
      if (legId) state.selectedLegislationId = legId;
      renderLegislation();
    } else if (page === "news") {
      renderNews();
      const newsId = queryParams.get("id");
      if (newsId) {
        openNewsModal(newsId);
      }
    }

    // Scroll to top of section
    window.scrollTo(0, 0);
  }

  // --- Global Autocomplete Search Engine ---
  function initSearch() {
    const searchInput = document.getElementById("global-search-input");
    const dropdown = document.getElementById("search-dropdown");

    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (!val) {
        dropdown.classList.remove("active");
        dropdown.innerHTML = "";
        return;
      }

      const results = {
        constitution: [],
        officials: [],
        legislation: [],
        news: []
      };

      // Search Constitution
      GOV_DATA.constitution.forEach((art) => {
        if (art.title.toLowerCase().includes(val) || art.text.toLowerCase().includes(val)) {
          results.constitution.push(art);
        }
      });

      // Search Officials (Senators, MPs, Executive)
      const executives = [GOV_DATA.executiveBranch.president, GOV_DATA.executiveBranch.vicePresident, GOV_DATA.executiveBranch.primeMinister];
      executives.forEach((exec) => {
        if (exec.name.toLowerCase().includes(val) || exec.title.toLowerCase().includes(val)) {
          results.officials.push({ name: exec.name, sub: exec.title, link: `#/officials?id=executive` });
        }
      });
      GOV_DATA.senators.forEach((sen) => {
        if (sen.name.toLowerCase().includes(val) || sen.colony.toLowerCase().includes(val)) {
          results.officials.push({ name: `Senator ${sen.name}`, sub: `${sen.colony} Represent.`, link: `#/officials?id=${sen.id}` });
        }
      });
      GOV_DATA.parliament.forEach((mp) => {
        if (mp.name.toLowerCase().includes(val) || mp.colony.toLowerCase().includes(val) || mp.party.toLowerCase().includes(val)) {
          results.officials.push({ name: `MP ${mp.name}`, sub: `${mp.colony} (${mp.party})`, link: `#/officials?id=mp-${mp.name.toLowerCase().replace(/ /g, "-")}` });
        }
      });

      // Search Legislation
      GOV_DATA.legislation.forEach((leg) => {
        if (leg.title.toLowerCase().includes(val) || leg.number.toLowerCase().includes(val) || leg.summary.toLowerCase().includes(val)) {
          results.legislation.push(leg);
        }
      });

      // Search News
      GOV_DATA.news.forEach((newsItem) => {
        if (newsItem.title.toLowerCase().includes(val) || newsItem.summary.toLowerCase().includes(val)) {
          results.news.push(newsItem);
        }
      });

      renderSearchDropdown(results);
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });

    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim()) dropdown.classList.add("active");
    });
  }

  function renderSearchDropdown(results) {
    const dropdown = document.getElementById("search-dropdown");
    dropdown.innerHTML = "";

    let hasResults = false;
    
    // Group: Constitution
    if (results.constitution.length > 0) {
      hasResults = true;
      const group = createSearchGroup("Constitution");
      results.constitution.slice(0, 3).forEach((art) => {
        group.appendChild(createSearchItem(art.title, "Colonial Founding Text", `#/constitution?id=${art.id}`));
      });
      dropdown.appendChild(group);
    }

    // Group: Officials
    if (results.officials.length > 0) {
      hasResults = true;
      const group = createSearchGroup("Government Officials");
      results.officials.slice(0, 4).forEach((off) => {
        group.appendChild(createSearchItem(off.name, off.sub, off.link));
      });
      dropdown.appendChild(group);
    }

    // Group: Legislation
    if (results.legislation.length > 0) {
      hasResults = true;
      const group = createSearchGroup("Laws & Bills");
      results.legislation.slice(0, 3).forEach((leg) => {
        group.appendChild(createSearchItem(`${leg.number}: ${leg.title}`, `${leg.type} • ${leg.status}`, `#/legislation?id=${leg.id}`));
      });
      dropdown.appendChild(group);
    }

    // Group: News
    if (results.news.length > 0) {
      hasResults = true;
      const group = createSearchGroup("Press Releases");
      results.news.slice(0, 3).forEach((item) => {
        group.appendChild(createSearchItem(item.title, item.date, `#/news?id=${item.id}`));
      });
      dropdown.appendChild(group);
    }

    if (!hasResults) {
      dropdown.innerHTML = `<div class="search-empty">No government archives match your query</div>`;
    }

    dropdown.classList.add("active");
  }

  function createSearchGroup(label) {
    const div = document.createElement("div");
    div.className = "search-category-group";
    div.innerHTML = `<div class="search-category-header">${label}</div>`;
    return div;
  }

  function createSearchItem(title, subtitle, link) {
    const a = document.createElement("a");
    a.className = "search-item";
    a.href = link;
    a.innerHTML = `
      ${title}
      <span class="search-item-sub">${subtitle}</span>
    `;
    a.addEventListener("click", () => {
      document.getElementById("search-dropdown").classList.remove("active");
      document.getElementById("global-search-input").value = "";
    });
    return a;
  }

  // --- Research Folder / Bookmarking Controller ---
  function initResearchFolder() {
    const drawer = document.getElementById("research-drawer");
    const openBtn = document.getElementById("open-research-btn");
    const closeBtn = document.getElementById("close-research-btn");
    const exportBtn = document.getElementById("export-research-btn");

    openBtn.addEventListener("click", () => drawer.classList.add("open"));
    closeBtn.addEventListener("click", () => drawer.classList.remove("open"));

    exportBtn.addEventListener("click", exportResearchNotes);

    updateResearchUI();
  }

  function toggleBookmark(type, id, title) {
    const index = state.researchFolder.findIndex((item) => item.id === id && item.type === type);
    if (index > -1) {
      state.researchFolder.splice(index, 1);
    } else {
      state.researchFolder.push({ type, id, title, savedAt: new Date().toLocaleDateString() });
    }
    localStorage.setItem("caprica_research", JSON.stringify(state.researchFolder));
    updateResearchUI();
    
    // Re-render current page elements to update bookmark buttons state
    if (state.activePage === "officials") renderOfficials();
    if (state.activePage === "legislation") renderLegislation();
    if (state.activePage === "constitution") renderConstitution();
  }

  function updateResearchUI() {
    const badge = document.getElementById("research-badge");
    const listContainer = document.getElementById("research-items-list");
    
    badge.textContent = state.researchFolder.length;
    badge.style.display = state.researchFolder.length > 0 ? "flex" : "none";

    if (state.researchFolder.length === 0) {
      listContainer.innerHTML = `
        <div class="research-empty-state">
          <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/></svg>
          <p>Your Research Folder is empty.</p>
          <p style="font-size: 0.75rem; margin-top: 4px;">Click the ribbon bookmarks icon beside laws, officials, or constitution articles to save references.</p>
        </div>
      `;
      document.getElementById("export-research-btn").style.display = "none";
      return;
    }

    document.getElementById("export-research-btn").style.display = "flex";
    listContainer.innerHTML = "";

    state.researchFolder.forEach((item) => {
      const card = document.createElement("div");
      card.className = "research-item-card";

      let link = `#/`;
      if (item.type === "official") link = `#/officials?id=${item.id}`;
      else if (item.type === "legislation") link = `#/legislation?id=${item.id}`;
      else if (item.type === "constitution") link = `#/constitution?id=${item.id}`;

      card.innerHTML = `
        <div class="research-item-type">${item.type}</div>
        <a href="${link}" class="research-item-title-link">${item.title}</a>
        <button class="research-remove-btn" title="Remove Archive">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      `;

      card.querySelector(".research-remove-btn").addEventListener("click", () => {
        toggleBookmark(item.type, item.id, item.title);
      });

      listContainer.appendChild(card);
    });
  }

  function exportResearchNotes() {
    if (state.researchFolder.length === 0) return;

    let content = `# Republic of Caprica - Colonial Archives Research Report\n`;
    content += `Compiled on: ${new Date().toLocaleString()}\n`;
    content += `Motto: "${GOV_DATA.officialMotto}"\n`;
    content += `========================================================\n\n`;

    state.researchFolder.forEach((item, idx) => {
      content += `${idx + 1}. [${item.type.toUpperCase()}] ${item.title}\n`;
      
      if (item.type === "constitution") {
        const art = GOV_DATA.constitution.find((c) => c.id === item.id);
        if (art) {
          content += `Source: Constitution of the Republic of Caprica\n\n`;
          content += `${art.text}\n`;
        }
      } else if (item.type === "legislation") {
        const leg = GOV_DATA.legislation.find((l) => l.id === item.id);
        if (leg) {
          content += `Source: Legislation Archives (${leg.type} ${leg.number})\n`;
          content += `Status: ${leg.status} | Sponsor: ${leg.sponsor}\n\n`;
          content += `Summary: ${leg.summary}\n\n`;
          content += `Bill Excerpt:\n${leg.fullText}\n`;
        }
      } else if (item.type === "official") {
        // Search Senate
        let off = GOV_DATA.senators.find((s) => s.id === item.id);
        if (off) {
          content += `Profile: Senator representing the Colony of ${off.colony}\n`;
          content += `Party: ${off.party} | Committee: ${off.committee}\n\n`;
          content += `Biography:\n${off.bio}\n`;
        } else {
          // Search Parliament
          off = GOV_DATA.parliament.find((mp) => `mp-${mp.name.toLowerCase().replace(/ /g, "-")}` === item.id);
          if (off) {
            content += `Profile: Member of Parliament representing ${off.constituency} (${off.colony})\n`;
            content += `Party: ${off.party} | Committee: ${off.committee}\n\n`;
            content += `Biography:\n${off.bio}\n`;
          } else {
            // Executive Check
            if (item.id === "executive") {
              content += `Executive Profile: Laura Roslin (President), Gaius Baltar (VP), Lee Adama (PM)\n\n`;
              content += `Presidential Profile:\n${GOV_DATA.executiveBranch.president.bio}\n`;
            }
          }
        }
      }
      content += `\n--------------------------------------------------------\n\n`;
    });

    // Create file download trigger
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "caprica_research_notes.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- Page Renderer: Home Dashboard ---
  function renderHome() {
    const newsContainer = document.getElementById("dash-news-grid");
    const billsContainer = document.getElementById("dash-bills-list");

    // Render Recent News Items on Dashboard
    newsContainer.innerHTML = "";
    GOV_DATA.news.slice(0, 2).forEach((item) => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <div class="news-meta">
          <span>${item.category}</span>
          <span>${item.date}</span>
        </div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-summary">${item.summary}</p>
        <span class="news-readmore">Read Official Gazette
          <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </span>
      `;
      card.addEventListener("click", () => {
        window.location.hash = `#/news?id=${item.id}`;
      });
      newsContainer.appendChild(card);
    });

    // Render Recent Bills on Dashboard
    billsContainer.innerHTML = "";
    const activeBills = GOV_DATA.legislation.filter(l => l.type === "Bill");
    activeBills.slice(0, 3).forEach((bill) => {
      const item = document.createElement("div");
      item.className = "leg-card-thumb";
      item.innerHTML = `
        <div class="leg-thumb-meta">
          <span>${bill.number} • ${bill.category}</span>
          <span class="leg-status-badge ${getStatusClass(bill.status)}">${bill.status}</span>
        </div>
        <div class="leg-thumb-title">${bill.title}</div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0;">Sponsor: ${bill.sponsor}</p>
      `;
      item.addEventListener("click", () => {
        window.location.hash = `#/legislation?id=${bill.id}`;
      });
      billsContainer.appendChild(item);
    });
  }

  // --- Page Renderer: Constitution Split Screen ---
  function renderConstitution() {
    const sidebar = document.getElementById("const-sidebar-nav");
    const docView = document.getElementById("const-doc-view");

    sidebar.innerHTML = "";
    docView.innerHTML = "";

    // Categories Grouping
    const groups = {};
    GOV_DATA.constitution.forEach((art) => {
      if (!groups[art.category]) {
        groups[art.category] = [];
      }
      groups[art.category].push(art);
    });

    // Render Sidebar Navigation
    for (const [category, articles] of Object.entries(groups)) {
      const catTitle = document.createElement("div");
      catTitle.className = "const-nav-cat";
      catTitle.textContent = category;
      sidebar.appendChild(catTitle);

      articles.forEach((art) => {
        const link = document.createElement("a");
        link.className = `const-nav-link ${state.selectedConstId === art.id ? "active" : ""}`;
        link.href = `#/constitution?id=${art.id}`;
        link.textContent = art.title;
        sidebar.appendChild(link);
      });
    }

    // Render Current Article in Document View
    const selectedArt = GOV_DATA.constitution.find((c) => c.id === state.selectedConstId) || GOV_DATA.constitution[0];
    const isBookmarked = state.researchFolder.some(item => item.id === selectedArt.id);

    const docCard = document.createElement("div");
    docCard.className = "const-card";
    docCard.innerHTML = `
      <div class="const-card-header">
        <h2 class="const-card-title">${selectedArt.title}</h2>
        <button class="bookmark-trigger ${isBookmarked ? 'active' : ''}" title="Add to Research Folder">
          <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
        </button>
      </div>
      <div class="const-card-body">
        ${selectedArt.text}
      </div>
    `;

    docCard.querySelector(".bookmark-trigger").addEventListener("click", () => {
      toggleBookmark("constitution", selectedArt.id, selectedArt.title);
    });

    docView.appendChild(docCard);
  }

  // --- Page Renderer: Government Directories ---
  function renderOfficials() {
    const grid = document.getElementById("officials-grid-container");
    const filtersDiv = document.getElementById("officials-filters");
    const tabs = document.querySelectorAll("#officials-tabs .tab-btn");

    // Setup active tab headers
    tabs.forEach((tab) => {
      tab.classList.remove("active");
      if (tab.dataset.tab === state.activeOfficialsTab) {
        tab.classList.add("active");
      }
    });

    // Render tab-specific UI
    grid.innerHTML = "";

    if (state.activeOfficialsTab === "executive") {
      filtersDiv.style.display = "none";
      renderExecutiveSpotlight(grid);
    } else {
      filtersDiv.style.display = "flex";
      setupDirectoryFilterOptions();
      renderLegislativeDirectory(grid);
    }
  }

  // Bind tab switches
  document.querySelectorAll("#officials-tabs .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeOfficialsTab = btn.dataset.tab;
      state.officialFilters.party = "all";
      state.officialFilters.colony = "all";
      state.officialFilters.search = "";
      
      const searchBox = document.getElementById("off-search");
      if (searchBox) searchBox.value = "";
      
      renderOfficials();
    });
  });

  function renderExecutiveSpotlight(container) {
    container.className = "executive-spotlight";

    const roles = ["president", "vicePresident", "primeMinister"];
    roles.forEach((roleKey) => {
      const exec = GOV_DATA.executiveBranch[roleKey];
      const isBookmarked = state.researchFolder.some(item => item.id === "executive");

      const card = document.createElement("div");
      card.className = "spotlight-card";
      card.innerHTML = `
        <button class="bookmark-trigger ${isBookmarked ? 'active' : ''}" title="Save Executive Info">
          <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
        </button>
        <div class="spotlight-role">${exec.title}</div>
        <h2 class="spotlight-name">${exec.name}</h2>
        <div class="spotlight-colony">Colony of Origin: ${exec.colony}</div>
        <p class="spotlight-bio">${exec.bio}</p>
        <div class="spotlight-duties-title">Constitutional Duties</div>
        <ul class="spotlight-duties">
          ${exec.duties.map((d) => `<li>${d}</li>`).join("")}
        </ul>
      `;

      card.querySelector(".bookmark-trigger").addEventListener("click", () => {
        toggleBookmark("official", "executive", "Colonial Executive Branch Details");
      });

      container.appendChild(card);
    });

    // Cabinet Table
    const cabinetWrapper = document.createElement("div");
    cabinetWrapper.style.gridColumn = "1 / -1";
    cabinetWrapper.className = "widget-panel";
    cabinetWrapper.innerHTML = `
      <div class="widget-title-container">
        <h3 class="widget-title">
          <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          Colonial Cabinet Ministers
        </h3>
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color); color: var(--primary-gold); font-family: var(--font-display); font-weight: 700;">
              <th style="padding: 12px 16px;">Cabinet Role</th>
              <th style="padding: 12px 16px;">Minister</th>
              <th style="padding: 12px 16px;">Colony</th>
              <th style="padding: 12px 16px;">Affiliation</th>
              <th style="padding: 12px 16px;">Portfolio Summary</th>
            </tr>
          </thead>
          <tbody>
            ${GOV_DATA.executiveBranch.cabinet.map((m) => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px 16px; font-weight: 600;">${m.role}</td>
                <td style="padding: 12px 16px; color: var(--primary-gold);">${m.name}</td>
                <td style="padding: 12px 16px;">${m.colony}</td>
                <td style="padding: 12px 16px; font-size: 0.8rem;"><span class="badge-tag tag-party">${m.party}</span></td>
                <td style="padding: 12px 16px; color: var(--text-muted); font-size: 0.85rem;">${m.bio}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
    container.appendChild(cabinetWrapper);
  }

  function setupDirectoryFilterOptions() {
    const partySelect = document.getElementById("filter-party");
    const colonySelect = document.getElementById("filter-colony");
    const searchBox = document.getElementById("off-search");

    // Clear previous option elements except 'All'
    partySelect.innerHTML = `<option value="all">All Parties</option>`;
    colonySelect.innerHTML = `<option value="all">All Colonies</option>`;

    // Gather unique values based on current active list
    const items = state.activeOfficialsTab === "senate" ? GOV_DATA.senators : GOV_DATA.parliament;
    const parties = new Set(items.map((i) => i.party));
    const colonies = new Set(items.map((i) => i.colony));

    parties.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      partySelect.appendChild(opt);
    });

    colonies.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      colonySelect.appendChild(opt);
    });

    // Retain filter state values
    partySelect.value = state.officialFilters.party;
    colonySelect.value = state.officialFilters.colony;
    searchBox.value = state.officialFilters.search;

    // Remove old event listeners by cloning
    const newPartySelect = partySelect.cloneNode(true);
    partySelect.parentNode.replaceChild(newPartySelect, partySelect);
    const newColonySelect = colonySelect.cloneNode(true);
    colonySelect.parentNode.replaceChild(newColonySelect, colonySelect);
    const newSearchBox = searchBox.cloneNode(true);
    searchBox.parentNode.replaceChild(newSearchBox, searchBox);

    // Bind clean event listeners
    newPartySelect.addEventListener("change", (e) => {
      state.officialFilters.party = e.target.value;
      renderOfficials();
    });
    newColonySelect.addEventListener("change", (e) => {
      state.officialFilters.colony = e.target.value;
      renderOfficials();
    });
    newSearchBox.addEventListener("input", (e) => {
      state.officialFilters.search = e.target.value;
      renderOfficials();
    });
  }

  function renderLegislativeDirectory(gridContainer) {
    gridContainer.className = "officials-grid";
    const dataset = state.activeOfficialsTab === "senate" ? GOV_DATA.senators : GOV_DATA.parliament;

    // Filter Items
    const filtered = dataset.filter((item) => {
      const partyMatch = state.officialFilters.party === "all" || item.party === state.officialFilters.party;
      const colonyMatch = state.officialFilters.colony === "all" || item.colony === state.officialFilters.colony;
      const searchMatch = !state.officialFilters.search || 
                          item.name.toLowerCase().includes(state.officialFilters.search.toLowerCase()) ||
                          item.bio.toLowerCase().includes(state.officialFilters.search.toLowerCase());
      return partyMatch && colonyMatch && searchMatch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 48px;">No politicians match the filter settings.</div>`;
      return;
    }

    filtered.forEach((politician) => {
      const id = state.activeOfficialsTab === "senate" 
        ? politician.id 
        : `mp-${politician.name.toLowerCase().replace(/ /g, "-")}`;
      
      const isBookmarked = state.researchFolder.some(item => item.id === id);
      const isHighlighted = state.highlightedOfficialId === id;

      const card = document.createElement("div");
      card.className = `official-card ${isHighlighted ? "highlighted-item" : ""}`;
      if (isHighlighted) {
        card.style.borderColor = "var(--primary-gold)";
        card.style.boxShadow = "0 0 12px var(--primary-gold-trans)";
        // Clear highlight flag after render
        setTimeout(() => { state.highlightedOfficialId = null; }, 1000);
      }

      // Calculate Initials for Avatar Icon
      const names = politician.name.split(" ");
      const initials = (names[0][0] + (names[names.length - 1] ? names[names.length - 1][0] : "")).toUpperCase();

      card.innerHTML = `
        <button class="bookmark-trigger ${isBookmarked ? 'active' : ''}" title="Add to Research Folder">
          <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
        </button>
        <div class="official-header">
          <div class="official-avatar">${initials}</div>
          <div class="official-meta">
            <h3 class="official-name">${politician.name}</h3>
            <span class="official-title">${state.activeOfficialsTab === 'senate' ? 'Senator' : 'Member of Parliament'}</span>
          </div>
        </div>
        <div class="tag-list">
          <span class="badge-tag tag-party">${politician.party}</span>
          <span class="badge-tag tag-colony">${politician.colony}</span>
        </div>
        <p class="official-bio">${politician.bio}</p>
        <div class="official-comm">
          <strong>Assignment:</strong> ${politician.committee || "Standing Committee"}
        </div>
      `;

      card.querySelector(".bookmark-trigger").addEventListener("click", () => {
        toggleBookmark("official", id, `${state.activeOfficialsTab === 'senate' ? 'Senator' : 'MP'} ${politician.name} (${politician.colony})`);
      });

      gridContainer.appendChild(card);
    });
  }

  // --- Page Renderer: Legislation Laws & Bills ---
  function renderLegislation() {
    const listContainer = document.getElementById("leg-list");
    const detailContainer = document.getElementById("leg-detail");

    listContainer.innerHTML = "";
    detailContainer.innerHTML = "";

    // Render legislation list
    GOV_DATA.legislation.forEach((leg) => {
      const card = document.createElement("div");
      card.className = `leg-card-thumb ${state.selectedLegislationId === leg.id ? "active" : ""}`;
      card.innerHTML = `
        <div class="leg-thumb-meta">
          <span>${leg.number} • ${leg.type}</span>
          <span class="leg-status-badge ${getStatusClass(leg.status)}">${leg.status}</span>
        </div>
        <div class="leg-thumb-title">${leg.title}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between;">
          <span>Category: ${leg.category}</span>
          <span>${leg.date.split(" ").slice(-1)[0]}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        state.selectedLegislationId = leg.id;
        renderLegislation();
      });

      listContainer.appendChild(card);
    });

    // Render detail section
    const activeLeg = GOV_DATA.legislation.find((l) => l.id === state.selectedLegislationId) || GOV_DATA.legislation[0];
    const isBookmarked = state.researchFolder.some(item => item.id === activeLeg.id);

    detailContainer.innerHTML = `
      <div class="leg-header">
        <button class="bookmark-trigger ${isBookmarked ? 'active' : ''}" style="top: 32px; right: 32px;" title="Bookmark Legislation">
          <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
        </button>
        <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: var(--primary-gold); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
          Official Gazette Archives • Republic of Caprica
        </div>
        <h1 class="leg-title">${activeLeg.title}</h1>
        <div class="leg-grid-meta">
          <div class="meta-field">
            <span class="meta-field-label">Document ID</span>
            <span class="meta-field-value">${activeLeg.number}</span>
          </div>
          <div class="meta-field">
            <span class="meta-field-label">Classification</span>
            <span class="meta-field-value">${activeLeg.type}</span>
          </div>
          <div class="meta-field">
            <span class="meta-field-label">Primary Sponsor</span>
            <span class="meta-field-value">${activeLeg.sponsor}</span>
          </div>
          <div class="meta-field">
            <span class="meta-field-label">Status</span>
            <span class="meta-field-value"><span class="leg-status-badge ${getStatusClass(activeLeg.status)}">${activeLeg.status}</span></span>
          </div>
        </div>
      </div>

      <div class="timeline-container">
        <div class="timeline-title">Legislative Path Timeline</div>
        <div class="leg-timeline">
          ${activeLeg.timeline.map((step, idx) => `
            <div class="timeline-step ${step.completed ? 'completed' : ''}">
              <div class="step-node" title="Step ${idx + 1}"></div>
              <div class="step-label">${step.label}</div>
              <div class="step-date">${step.date}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="margin-bottom: 24px; font-size: 0.95rem; line-height: 1.6;">
        <h3 style="font-family: var(--font-display); margin-bottom: 8px; font-size: 1.1rem; color: var(--text-main);">Executive Summary</h3>
        <p style="color: var(--text-muted); font-style: italic;">${activeLeg.summary}</p>
      </div>

      <div class="leg-document-body">
        <h3 style="font-family: var(--font-display); text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em; margin-bottom: 20px; text-align: center; color: var(--primary-gold);">
          Document Transcript Excerpt
        </h3>
        ${activeLeg.fullText}
      </div>
    `;

    detailContainer.querySelector(".bookmark-trigger").addEventListener("click", () => {
      toggleBookmark("legislation", activeLeg.id, `${activeLeg.type} ${activeLeg.number}: ${activeLeg.title}`);
    });
  }

  // Helper styles mappings
  function getStatusClass(status) {
    if (status === "Enacted") return "status-enacted";
    if (status === "Under Debate") return "status-debate";
    if (status === "Committee Review") return "status-committee";
    return "status-tabled";
  }

  // --- Page Renderer: News Portal ---
  function renderNews() {
    const container = document.getElementById("news-grid-container");
    container.innerHTML = "";

    GOV_DATA.news.forEach((item) => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <div class="news-meta">
          <span>${item.category}</span>
          <span>${item.date}</span>
        </div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-summary">${item.summary}</p>
        <span class="news-readmore">View Full Gazette Entry
          <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </span>
      `;
      card.addEventListener("click", () => {
        window.location.hash = `#/news?id=${item.id}`;
      });
      container.appendChild(card);
    });
  }

  // News Modal Logic
  function openNewsModal(newsId) {
    const item = GOV_DATA.news.find((n) => n.id === newsId);
    if (!item) return;

    const overlay = document.getElementById("news-modal-overlay");
    const modalContent = overlay.querySelector(".modal-content");

    modalContent.innerHTML = `
      <button class="modal-close" id="modal-close-btn" title="Close Modal">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
      <div class="modal-meta">${item.category} • ${item.date}</div>
      <h2 class="modal-title">${item.title}</h2>
      <div class="modal-body-text">${item.content}</div>
    `;

    overlay.classList.add("active");

    // Bind close listeners
    const closeBtn = modalContent.querySelector("#modal-close-btn");
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  function closeModal() {
    const overlay = document.getElementById("news-modal-overlay");
    overlay.classList.remove("active");
    // Clear query parameter in URL without losing hash
    window.location.hash = `#/${state.activePage}`;
  }

  // --- SVG Icons Generators ---
  function getSunIcon() {
    return `<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`;
  }

  function getMoonIcon() {
    return `<svg viewBox="0 0 24 24"><path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.7 3.2-8.7 7.7-9.8.6-.1 1.2.3 1.3.9.1.6-.2 1.2-.8 1.4-3.1 1.1-5.2 4.1-5.2 7.5 0 4.4 3.6 8 8 8 3.4 0 6.4-2.1 7.5-5.2.2-.6.8-.9 1.4-.8.6.1 1 .7.9 1.3C21 18.8 17 22 12.3 22z"/></svg>`;
  }

  // --- Mobile Hamburger Menu Controller ---
  function initMobileMenu() {
    const toggle = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("nav-menu-list");

    toggle.addEventListener("click", () => {
      const isVisible = menu.style.display === "flex";
      if (isVisible) {
        menu.style.display = "none";
      } else {
        menu.style.display = "flex";
        menu.style.flexDirection = "column";
        menu.style.position = "absolute";
        menu.style.top = "var(--header-height)";
        menu.style.left = "0";
        menu.style.width = "100%";
        menu.style.backgroundColor = "var(--bg-card)";
        menu.style.borderBottom = "1px solid var(--border-color)";
        menu.style.padding = "16px";
        menu.style.gap = "12px";
      }
    });

    // Reset when screen resizes to desktop width
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        menu.style.display = "";
        menu.style.flexDirection = "";
        menu.style.position = "";
        menu.style.width = "";
        menu.style.backgroundColor = "";
        menu.style.borderBottom = "";
        menu.style.padding = "";
        menu.style.gap = "";
      }
    });
  }

  // --- System Initializations ---
  initTheme();
  initSearch();
  initResearchFolder();
  initMobileMenu();

  // Listen for Route Changes
  window.addEventListener("hashchange", handleRoute);
  
  // Initial Route Load
  handleRoute();
});
