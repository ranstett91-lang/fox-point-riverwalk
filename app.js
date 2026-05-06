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
      link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`);
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
    description: "A corridor-wide look at heat, heavy rain, wind, and sea-level rise. Wilmington is listed as a hot spot for sea-level risk.",
    source: "Core Amtrak evidence for corridor exposure"
  },
  {
    title: "Amtrak Climate Resilience Strategic Plan",
    file: "docs/reference/amtrak-climate-resilience-strategic-plan-2022.pdf",
    type: "pdf",
    label: "Report",
    size: "16.3 MB",
    description: "The main Amtrak strategy report. It explains why rail and nearby infrastructure need to adapt to stronger storms and higher water.",
    source: "Core Amtrak action framework"
  },
  {
    title: "Phase III NEC Climate Change Pilot Study Adaptation Plan",
    file: "docs/reference/nec-climate-change-pilot-adaptation-plan-2017.pdf",
    type: "pdf",
    label: "Report",
    size: "18.7 MB",
    description: "Amtrak's Wilmington-area pilot adaptation plan. Useful for showing that Fox Point sits within a corridor segment already studied for climate adaptation in detail.",
    source: "Best precedent for Wilmington-area adaptation"
  },
  {
    title: "Final DARP Public Notice for Fox Point State Park",
    file: "https://dnrec.delaware.gov/public-notices/whs20250010/",
    type: "web",
    label: "Web",
    size: "Jan 12, 2025 · DNREC",
    description: "DNREC's public notice for the final Damage Assessment and Restoration Plan. It establishes the OU-2 geography, living shoreline restoration objectives, and where the official DARP record is published.",
    source: "Best official DNREC entry point to the final DARP"
  },
  {
    title: "DNREC Facility Detail: Fox Point Park Phase II",
    file: "https://den.dnrec.delaware.gov/Detail/FacilityDetail.aspx?id=10002152&piid=26871",
    type: "web",
    label: "Web",
    size: "Live record",
    description: "DNREC's facility-detail page for Fox Point Park Phase II. Useful for the official document trail, remediation status, inspections, and linked public records.",
    source: "Best live DNREC record for ongoing site documentation"
  },
  {
    title: "Approved Federal Mitigation Plan for Edgemoor Expansion",
    file: "https://port.delaware.gov/wp-content/uploads/sites/227/2025/07/Approved-Federal-Mitigation-Plan.pdf",
    type: "pdf",
    label: "Report",
    size: "Jul 2025 · Port of Delaware",
    description: "The Diamond State Port mitigation plan that includes Fox Point wetland restoration among the compensatory mitigation commitments for Edgemoor expansion.",
    source: "Official source for the port mitigation linkage"
  },
  {
    title: "2025 Delaware Climate Action Plan",
    file: "https://documents.dnrec.delaware.gov/energy/Climate-Plan/2025-Delaware-Climate-Action-Plan.pdf",
    type: "pdf",
    label: "Report",
    size: "Dec 2025 · DNREC",
    description: "Delaware's statewide climate plan. Useful for resilience, sea-level rise, and public-infrastructure framing beyond the rail corridor itself.",
    source: "Best statewide resilience frame for partners and funders"
  },
  {
    title: "NOAA Settlement for Restoration at the DuPont Hay Road Site",
    file: "https://darrp.noaa.gov/hazardous-waste/settlement-finalized-restoration-dupont-hay-road-hazardous-waste-site",
    type: "web",
    label: "Web",
    size: "Feb 2023",
    description: "NOAA's official summary of the settlement that allocates $808,500 for restoration activities tied to the Edge Moor / Hay Road site.",
    source: "Best direct official source for the Chemours / NOAA restoration amount"
  },
  {
    title: "Fox Point Riverview Trail Overview",
    file: "https://delawaregreenways.org/trail/fox-point-riverview-trail/",
    type: "web",
    label: "Web",
    size: "Delaware Greenways",
    description: "Public-facing trail context showing that the corridor already reads as waterfront, mobility, and habitat infrastructure at the same time.",
    source: "Best quick public-value context"
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

      link.setAttribute(
        "aria-label",
        `${actionLabel}: ${resource.title} (opens in new tab)`
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
