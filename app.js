const resources = [
  {
    title: "Amtrak Climate Vulnerability Assessment Summary",
    file: "2022-Amtrak-Climate-Vulnerability-Assessment-Summary-Report-092222.pdf",
    type: "pdf",
    label: "Report",
    size: "60.1 MB",
    description: "A corridor-wide look at heat, heavy rain, wind, and sea-level rise. Wilmington is listed as a hot spot for sea-level risk.",
    source: "Best for climate risk facts and corridor data"
  },
  {
    title: "Amtrak Climate Resilience Strategic Plan",
    file: "2022-Amtrak-Climate-Resilience-Strategic-Plan.pdf",
    type: "pdf",
    label: "Report",
    size: "16.3 MB",
    description: "The main Amtrak strategy report. It explains why rail and nearby infrastructure need to adapt to stronger storms and higher water.",
    source: "Best for high-level climate and resilience framing"
  },
  {
    title: "NEC Climate Change Pilot Adaptation Plan",
    file: "phase-iii-amtrak-nec-climate-change-pilot-study-adaptation-plan-0417.pdf",
    type: "pdf",
    label: "Report",
    size: "18.7 MB",
    description: "An earlier planning study that helps show how resilience thinking has been building over time along the corridor.",
    source: "Best for precedent and long-term planning context"
  },
  {
    title: "Claymont to Fox Point Presentation",
    file: "Claymont to Fox Point.pptx",
    type: "slides",
    label: "Slides",
    size: "69.7 MB",
    description: "Presentation file with project framing and funding notes, including living shoreline and settlement-based opportunities.",
    source: "Best for project narrative and funding leads"
  },
  {
    title: "FY27 Expenditure Plan",
    file: "FY27 Expenditure Plan Final.pdf",
    type: "pdf",
    label: "Report",
    size: "244 KB",
    description: "A compact funding reference that may help with implementation timing and public-budget discussions.",
    source: "Best for local funding context"
  },
  {
    title: "Submerged Aquatic Vegetation Priorities",
    file: "Priorities Doc__Submerged Aquatic Vegetation.pdf",
    type: "pdf",
    label: "Report",
    size: "1.1 MB",
    description: "Useful for explaining habitat value and why shoreline work can support river health.",
    source: "Best for habitat and ecology context"
  },
  {
    title: "Vacant Density 2017",
    file: "VacantDensity_2017.pdf",
    type: "pdf",
    label: "Report",
    size: "6.7 MB",
    description: "Land-use context that can support the wider Claymont waterfront story.",
    source: "Best for redevelopment context"
  },
  {
    title: "Wetland Delineation Reference",
    file: "WETLAND DELINEATION FIRST STATE CROSSING.pdf",
    type: "pdf",
    label: "Report",
    size: "20.0 MB",
    description: "A wetland and permitting reference that supports shoreline restoration and environmental review discussions.",
    source: "Best for wetland and permitting context"
  },
  {
    title: "DE Greenways Aerial Image",
    file: "DE%20Greenways%20(Fox%20Point%20State%20Park.jpeg.png",
    type: "image",
    label: "Image",
    size: "3.7 MB",
    description: "An aerial view of the site and corridor. Useful for orientation, storytelling, and future diagram overlays.",
    source: "Best for site orientation"
  }
];

const grid = document.querySelector("#resourceGrid");
const searchInput = document.querySelector("#resourceSearch");
const filterRow = document.querySelector("#filterRow");
const emptyState = document.querySelector("#emptyState");
const template = document.querySelector("#resourceCardTemplate");

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
    link.textContent = resource.type === "slides" ? "Open slides" : "Open file";
    link.setAttribute("aria-label", `${link.textContent}: ${resource.title}`);

    grid.appendChild(fragment);
  });

  emptyState.hidden = filteredResources.length !== 0;
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) {
    return;
  }

  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip === button);
  });
  renderResources();
});

searchInput.addEventListener("input", renderResources);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

renderResources();
