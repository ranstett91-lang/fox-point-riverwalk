// ── SKIP LINK ──
// Move keyboard focus into <main>, not just the URL hash.
(function initSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.querySelector('#main-content');

  if (!skipLink || !mainContent) return;

  skipLink.addEventListener('click', () => {
    window.requestAnimationFrame(() => {
      try {
        mainContent.focus({ preventScroll: true });
      } catch {
        mainContent.focus();
      }
    });
  });
})();

// ── NAV ACTIVE STATE ──
// Highlight the section that has most recently crossed the top reading line.
(function initNavHighlight() {
  const navLinks = Array.from(document.querySelectorAll('.topbar-links a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-current', isCurrent);

      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  let frameId = 0;

  const updateActiveSection = () => {
    frameId = 0;

    const activationOffset = 140;
    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationOffset) {
        activeSection = section;
      }
    });

    setActive(activeSection.id);
  };

  const scheduleUpdate = () => {
    if (!frameId) {
      frameId = window.requestAnimationFrame(updateActiveSection);
    }
  };

  scheduleUpdate();
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  navLinks.forEach((link) => link.addEventListener('click', scheduleUpdate));
})();
// ── RESOURCE LIBRARY ──
const resources = [
  {
    title: "Amtrak Climate Vulnerability Assessment Summary",
    file: "docs/reference/amtrak-climate-vulnerability-assessment-summary-2022.pdf",
    type: "pdf",
    label: "Report",
    size: "60.1 MB",
    description: "An Amtrak report on heat, storms, wind, and rising water across the corridor. It names Wilmington as a high-risk shoreline area.",
    source: "Main Amtrak source on climate risk"
  },
  {
    title: "Amtrak Climate Resilience Strategic Plan",
    file: "docs/reference/amtrak-climate-resilience-strategic-plan-2022.pdf",
    type: "pdf",
    label: "Report",
    size: "16.3 MB",
    description: "Amtrak’s main plan for dealing with stronger storms, hotter weather, and rising water.",
    source: "Main Amtrak plan for climate response"
  },
  {
    title: "Phase III NEC Climate Change Pilot Study Adaptation Plan",
    file: "docs/reference/nec-climate-change-pilot-adaptation-plan-2017.pdf",
    type: "pdf",
    label: "Report",
    size: "18.7 MB",
    description: "An earlier Amtrak plan focused on the Wilmington area. It shows this part of the corridor has already been studied in detail.",
    source: "Amtrak example for the Wilmington area"
  },
  {
    title: "Final DARP Public Notice for Fox Point State Park",
    file: "https://dnrec.delaware.gov/public-notices/whs20250010/",
    type: "web",
    label: "Web",
    size: "Jan 12, 2025 · DNREC",
    description: "DNREC’s public notice for the final restoration plan. It shows the project area, the shoreline goals, and where the full record is posted.",
    source: "Good DNREC starting point for the final plan"
  },
  {
    title: "DNREC Facility Detail: Fox Point Park Phase II",
    file: "https://den.dnrec.delaware.gov/Detail/FacilityDetail.aspx?id=10002152&piid=26871",
    type: "web",
    label: "Web",
    size: "Live record",
    description: "DNREC’s live record for Fox Point Park Phase II. It links to site documents, inspections, and cleanup status.",
    source: "Live DNREC record for the site"
  },
  {
    title: "Approved Federal Mitigation Plan for Edgemoor Expansion",
    file: "https://port.delaware.gov/wp-content/uploads/sites/227/2025/07/Approved-Federal-Mitigation-Plan.pdf",
    type: "pdf",
    label: "Report",
    size: "Jul 2025 · Port of Delaware",
    description: "The Port of Delaware plan that links Fox Point wetland work to required offset work for the Edgemoor expansion.",
    source: "Port of Delaware source on the link to Fox Point"
  },
  {
    title: "2025 Delaware Climate Action Plan",
    file: "https://documents.dnrec.delaware.gov/energy/Climate-Plan/2025-Delaware-Climate-Action-Plan.pdf",
    type: "pdf",
    label: "Report",
    size: "Dec 2025 · DNREC",
    description: "Delaware’s statewide climate plan. It gives broader context for sea-level rise, public safety, and public infrastructure.",
    source: "Statewide climate source"
  },
  {
    title: "NOAA Settlement for Restoration at the DuPont Hay Road Site",
    file: "https://darrp.noaa.gov/hazardous-waste/settlement-finalized-restoration-dupont-hay-road-hazardous-waste-site",
    type: "web",
    label: "Web",
    size: "Feb 2023",
    description: "NOAA’s summary of the settlement that sets aside $808,500 for restoration tied to the Edge Moor and Hay Road site.",
    source: "Official source for the Chemours settlement amount"
  },
  {
    title: "Fox Point Riverview Trail Overview",
    file: "https://delawaregreenways.org/trail/fox-point-riverview-trail/",
    type: "web",
    label: "Web",
    size: "Delaware Greenways",
    description: "A public-facing trail page that helps show Fox Point as a place for shoreline access, habitat, and movement at the same time.",
    source: "Quick source on public benefit"
  }
];

const grid        = document.querySelector("#resourceGrid");
const searchInput = document.querySelector("#resourceSearch");
const filterRow   = document.querySelector("#filterRow");
const emptyState  = document.querySelector("#emptyState");
const template    = document.querySelector("#resourceCardTemplate");

if (grid && searchInput && filterRow && emptyState && template) {
  let activeFilter = "all";

  function renderResources() {
    const query = searchInput.value.trim().toLowerCase();
    const filteredResources = resources.filter((resource) => {
      const matchesFilter = activeFilter === "all" || resource.type === activeFilter;
      const haystack = `${resource.title} ${resource.description} ${resource.label} ${resource.source}`.toLowerCase();
      return matchesFilter && haystack.includes(query);
    });

    grid.replaceChildren();

    // PDFs larger than this trigger a visible "large file" hint and an
    // expanded aria-label, so funders on mobile know what they're opening.
    const LARGE_FILE_THRESHOLD_MB = 10;

    const parseSizeMb = (size) => {
      if (!size || typeof size !== "string") return null;
      const match = size.match(/([\d.]+)\s*MB/i);
      return match ? parseFloat(match[1]) : null;
    };

    filteredResources.forEach((resource) => {
      const fragment = template.content.cloneNode(true);
      fragment.querySelector(".resource-type").textContent = resource.label;
      fragment.querySelector(".resource-size").textContent = resource.size;
      fragment.querySelector(".resource-title").textContent = resource.title;
      fragment.querySelector(".resource-description").textContent = resource.description;
      fragment.querySelector(".resource-source").textContent = resource.source;

      const link = fragment.querySelector(".resource-link");
      link.href = resource.file;

      const actionLabel =
        resource.type === "web" ? "Open source" :
        resource.type === "pdf" ? "Open report" :
        "Open file";
      link.textContent = actionLabel;

      const sizeMb = parseSizeMb(resource.size);
      const hasFileSize = sizeMb !== null;
      const isLargeFile = resource.type === "pdf" && hasFileSize && sizeMb >= LARGE_FILE_THRESHOLD_MB;

      const hint = fragment.querySelector(".resource-largefile-hint");
      if (isLargeFile) {
        hint.hidden = false;
        hint.textContent = `Large file · ${resource.size} · opens in new tab`;
      }

      // aria-label only mentions size when the size field is an actual
      // file size, not a date string like "Jul 2025 · Port of Delaware".
      const ariaSuffix =
        isLargeFile ? `(opens ${resource.size} PDF in new tab)` :
        resource.type === "pdf" && hasFileSize ? `(opens ${resource.size} PDF in new tab)` :
        resource.type === "pdf" ? "(opens PDF in new tab)" :
        "(opens in new tab)";

      link.setAttribute(
        "aria-label",
        `${actionLabel}: ${resource.title} ${ariaSuffix}`
      );

      grid.appendChild(fragment);
    });

    emptyState.hidden = filteredResources.length !== 0;
  }

  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeFilter = button.dataset.filter;

    document.querySelectorAll(".filter-chip").forEach((chip) => {
      const isActive = chip === button;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });

    renderResources();
  });

  searchInput.addEventListener("input", renderResources);

  renderResources();
}
