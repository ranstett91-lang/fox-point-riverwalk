const resources = [
  {
    title: "FY27 Expenditure Plan",
    file: "FY27 Expenditure Plan Final.pdf",
    type: "pdf",
    label: "Report",
    size: "244 KB",
    description: "A compact planning reference that can support implementation timing and public funding conversations."
  },
  {
    title: "Submerged Aquatic Vegetation Priorities",
    file: "Priorities Doc__Submerged Aquatic Vegetation.pdf",
    type: "pdf",
    label: "Report",
    size: "1.1 MB",
    description: "Ecological context that can help support habitat and water-quality positioning for the shoreline."
  },
  {
    title: "Vacant Density 2017",
    file: "VacantDensity_2017.pdf",
    type: "pdf",
    label: "Report",
    size: "6.7 MB",
    description: "Land-use context that can support broader planning and redevelopment storytelling."
  },
  {
    title: "Wetland Delineation Reference",
    file: "WETLAND DELINEATION FIRST STATE CROSSING.pdf",
    type: "pdf",
    label: "Report",
    size: "20.0 MB",
    description: "Wetland and permitting context that reinforces the shoreline restoration and resilience story."
  },
  {
    title: "DE Greenways Aerial Image",
    file: "DE%20Greenways%20(Fox%20Point%20State%20Park.jpeg.png",
    type: "image",
    label: "Image",
    size: "3.7 MB",
    description: "Aerial image anchoring the visual identity of the site and future concept storytelling."
  }
];

const grid = document.querySelector("#resourceGrid");
const searchInput = document.querySelector("#resourceSearch");
const filterRow = document.querySelector("#filterRow");
const emptyState = document.querySelector("#emptyState");
const template = document.querySelector("#resourceCardTemplate");
const installButton = document.querySelector("#installButton");

let activeFilter = "all";
let deferredInstallPrompt;

function renderResources() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredResources = resources.filter((resource) => {
    const matchesFilter = activeFilter === "all" || resource.type === activeFilter;
    const haystack = `${resource.title} ${resource.description} ${resource.label}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });

  grid.replaceChildren();

  filteredResources.forEach((resource) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".resource-type").textContent = resource.label;
    fragment.querySelector(".resource-size").textContent = resource.size;
    fragment.querySelector(".resource-title").textContent = resource.title;
    fragment.querySelector(".resource-description").textContent = resource.description;

    const link = fragment.querySelector(".resource-link");
    link.href = resource.file;
    link.textContent = resource.type === "audio" ? "Play audio" : "Open file";
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

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

renderResources();
