// ── PASSWORD GATE ──
// NOTE: This is a COSMETIC gate, not real access control.
//   - APP_PASSWORD is shipped in cleartext to every visitor.
//   - The PDFs and images in /resources are served by the static host
//     and can be downloaded directly without passing this gate.
// For real privacy, use Vercel Password Protection or a server-side check.
// Change APP_PASSWORD here to set the site password.
const APP_PASSWORD = 'foxpoint';

const pwGate  = document.querySelector('#pwGate');
const pwForm  = document.querySelector('#pwForm');
const pwInput = document.querySelector('#pwInput');
const pwError = document.querySelector('#pwError');

// Fail-closed: <body> renders with `pw-active` already applied. We only
// REMOVE it after a successful auth check or successful unlock, so a JS
// failure leaves the gate covering the page rather than exposing it.
function unlock() {
  if (pwGate) pwGate.hidden = true;
  document.body.classList.remove('pw-active');
}

// sessionStorage can throw (Safari private mode, blocked storage,
// sandboxed iframes, quota). Wrap reads/writes so a throw doesn't halt
// the rest of the script and break the resource library below.
function safeGetAuth() {
  try {
    return sessionStorage.getItem('fp_auth') === '1';
  } catch {
    return false;
  }
}

function safeSetAuth() {
  try {
    sessionStorage.setItem('fp_auth', '1');
  } catch {
    /* storage unavailable — auth simply won't persist this session */
  }
}

if (safeGetAuth()) {
  unlock();
}

if (pwForm) {
  pwForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Trim to handle paste/autofill leading or trailing whitespace.
    if (pwInput.value.trim() === APP_PASSWORD) {
      safeSetAuth();
      if (pwError) pwError.hidden = true;
      unlock();
    } else {
      if (pwError) pwError.hidden = false;
      pwInput.value = '';
      pwInput.focus();
    }
  });
}

// ── RESOURCE LIBRARY ──
const resources = [
  {
    title: "Amtrak Climate Vulnerability Assessment Summary",
    file: "2022-Amtrak-Climate-Vulnerability-Assessment-Summary-Report-092222.pdf",
    type: "pdf",
    label: "Report",
    size: "60.1 MB",
    description: "A corridor-wide look at heat, heavy rain, wind, and sea-level rise. Wilmington is listed as a hot spot for sea-level risk.",
    source: "Primary evidence for Amtrak corridor risk"
  },
  {
    title: "Amtrak Climate Resilience Strategic Plan",
    file: "2022-Amtrak-Climate-Resilience-Strategic-Plan.pdf",
    type: "pdf",
    label: "Report",
    size: "16.3 MB",
    description: "The main Amtrak strategy report. It explains why rail and nearby infrastructure need to adapt to stronger storms and higher water.",
    source: "Primary evidence for Amtrak resilience framing"
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
    description: "An early narrative deck that sketches the project vision and possible funding pathways.",
    source: "Early project framing, not final commitment"
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

renderResources();
