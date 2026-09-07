const trendData = [
  { month: "Mar", total: 818, mix: [11.2, 88.8, 0, 0] },
  { month: "Apr", total: 707, mix: [23.4, 67.3, 9.3, 0] },
  { month: "May", total: 700, mix: [17.9, 53.7, 24.2, 4.2] },
  { month: "Jun", total: 676, mix: [16, 39.4, 35.1, 9.6] },
  { month: "Jul", total: 513, mix: [38.4, 45.3, 3.5, 12.8] },
  { month: "Aug", total: 673, mix: [31.7, 50.5, 5.9, 11.9] },
];

const surfaceData = [
  {
    id: "ide",
    name: "IDE & editors",
    icon: "IDE",
    units: 530829,
    color: "#58a6ff",
    description: "Copilot usage recorded through supported editor and IDE integrations.",
    source: "VS Code / JetBrains / Zed / Visual Studio",
  },
  {
    id: "code-review",
    name: "Code Review",
    icon: "CR",
    units: 14485,
    color: "#3fb950",
    description: "AI units attributed to Copilot pull-request review workflows.",
    source: "GitHub Copilot code review",
  },
  {
    id: "external-agents",
    name: "External agents",
    icon: "AG",
    units: 9095,
    color: "#a371f7",
    description: "Agentic usage recorded through OpenCode and Claude Code integrations.",
    source: "OpenCode / Claude Code",
  },
  {
    id: "app",
    name: "Copilot app",
    icon: "APP",
    units: 6444,
    color: "#f0883e",
    description: "Usage attributed to the GitHub Copilot app.",
    source: "GitHub Copilot app",
  },
  {
    id: "cli",
    name: "Copilot CLI",
    icon: ">_",
    units: 4071,
    color: "#d2a8ff",
    description: "AI units attributed to Copilot command-line workflows.",
    source: "GitHub Copilot CLI",
  },
  {
    id: "cloud-agent",
    name: "GitHub Copilot Cloud Agent",
    icon: "CA",
    units: 727,
    color: "#d29922",
    description: "AI units attributed to GitHub Copilot Cloud Agent workflows.",
    source: "GitHub Copilot Cloud Agent",
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: "M",
    units: 12,
    color: "#db61a2",
    description: "A small amount of usage was attributed to the Copilot iOS client.",
    source: "GitHub Copilot for iOS",
  },
];

const totalSurfaceUnits = surfaceData.reduce((total, surface) => total + surface.units, 0);
let surfaceMode = "units";
let selectedSurfaceId = "ide";

function formatShare(units) {
  const share = (units / totalSurfaceUnits) * 100;
  if (share > 0 && share < 0.1) return "<0.1%";
  return `${share.toFixed(1)}%`;
}

function formatSurfaceValue(surface) {
  return surfaceMode === "units"
    ? surface.units.toLocaleString("en-US")
    : formatShare(surface.units);
}

function updateSurfaceDetail() {
  const surface = surfaceData.find((item) => item.id === selectedSurfaceId);
  if (!surface) return;

  document.querySelector("#surface-focus-label").textContent = surface.name;
  document.querySelector("#surface-focus-value").textContent = formatSurfaceValue(surface);
  document.querySelector("#surface-focus-unit").textContent =
    surfaceMode === "units" ? "AI units" : "share of total";
  document.querySelector("#surface-detail-icon").textContent = surface.icon;
  document.querySelector("#surface-detail-icon").style.background = surface.color;
  document.querySelector("#surface-detail-share").textContent = formatShare(surface.units);
  document.querySelector("#surface-detail-title").textContent = surface.name;
  document.querySelector("#surface-detail-value").textContent =
    `${surface.units.toLocaleString("en-US")} AI units`;
  document.querySelector("#surface-detail-copy").textContent = surface.description;
  document.querySelector("#surface-detail-source").textContent = surface.source;
}

function renderSurfaceRows() {
  const list = document.querySelector("#surface-list");
  if (!list) return;

  list.innerHTML = surfaceData
    .map((surface) => {
      const share = (surface.units / totalSurfaceUnits) * 100;
      const visibleWidth = surface.units > 0 ? Math.max(share, 0.8) : 0;
      const active = surface.id === selectedSurfaceId;
      return `
        <button
          class="surface-row${active ? " active" : ""}"
          type="button"
          data-surface-id="${surface.id}"
          aria-pressed="${active}"
        >
          <span class="surface-row-icon" style="background:${surface.color}">${surface.icon}</span>
          <span class="surface-row-name">${surface.name}</span>
          <span class="surface-row-track" aria-hidden="true">
            <i style="width:${visibleWidth}%;background:${surface.color}"></i>
          </span>
          <span class="surface-row-value">${formatSurfaceValue(surface)}</span>
        </button>
      `;
    })
    .join("");

  list.querySelectorAll("[data-surface-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSurfaceId = button.dataset.surfaceId;
      renderSurfaceRows();
      updateSurfaceDetail();
    });
  });
}

function renderSurfaceDonut() {
  const donut = document.querySelector("#surface-donut");
  if (!donut) return;

  let offset = 0;
  const stops = surfaceData.map((surface) => {
    const start = offset;
    offset += (surface.units / totalSurfaceUnits) * 100;
    return `${surface.color} ${start}% ${offset}%`;
  });
  donut.style.background = `conic-gradient(${stops.join(",")})`;
  donut.setAttribute(
    "aria-label",
    surfaceData.map((surface) => `${surface.name} ${formatShare(surface.units)}`).join(", "),
  );
}

function initializeSurfaceExplorer() {
  if (!document.querySelector("#surface-list")) return;

  document.querySelectorAll("[data-surface-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      surfaceMode = button.dataset.surfaceMode;
      document.querySelectorAll("[data-surface-mode]").forEach((toggle) => {
        const active = toggle === button;
        toggle.classList.toggle("active", active);
        toggle.setAttribute("aria-pressed", String(active));
      });
      renderSurfaceRows();
      updateSurfaceDetail();
    });
  });

  renderSurfaceRows();
  renderSurfaceDonut();
  updateSurfaceDetail();
}

function renderTrendChart() {
  const chart = document.querySelector("#trend-chart");
  if (!chart) return;

  const width = 900;
  const height = 250;
  const plotTop = 26;
  const plotBottom = 182;
  const mixTop = 201;
  const mixHeight = 8;
  const left = 42;
  const right = 32;
  const min = 400;
  const max = 900;
  const step = (width - left - right) / (trendData.length - 1);
  const x = (index) => left + index * step;
  const y = (value) => plotBottom - ((value - min) / (max - min)) * (plotBottom - plotTop);
  const points = trendData.map((item, index) => `${x(index)},${y(item.total)}`).join(" ");
  const areaPoints = `${left},${plotBottom} ${points} ${x(trendData.length - 1)},${plotBottom}`;
  const colors = ["#6e7681", "#58a6ff", "#a371f7", "#3fb950"];

  const grid = [400, 600, 800]
    .map(
      (value) => `
        <line class="trend-grid-line" x1="${left}" y1="${y(value)}" x2="${width - right}" y2="${y(value)}" />
        <text class="trend-axis" x="${left - 10}" y="${y(value) + 3}" text-anchor="end">${value}</text>
      `,
    )
    .join("");

  const pointsMarkup = trendData
    .map((item, index) => {
      const pointX = x(index);
      const pointY = y(item.total);
      return `
        <g class="trend-point-group" tabindex="0">
          <title>${item.month}: ${item.total} merged pull requests</title>
          <circle class="trend-point" cx="${pointX}" cy="${pointY}" r="5" />
          <text class="trend-label" x="${pointX}" y="${pointY - 14}" text-anchor="middle">${item.total}</text>
        </g>
        <text class="trend-month" x="${pointX}" y="238" text-anchor="middle">${item.month}</text>
      `;
    })
    .join("");

  const mixBars = trendData
    .map((item, index) => {
      const barWidth = 58;
      let offset = x(index) - barWidth / 2;
      return item.mix
        .map((value, mixIndex) => {
          if (!value) return "";
          const segmentWidth = (value / 100) * barWidth;
          const segment = `<rect x="${offset}" y="${mixTop}" width="${segmentWidth}" height="${mixHeight}" rx="2" fill="${colors[mixIndex]}" />`;
          offset += segmentWidth;
          return segment;
        })
        .join("");
    })
    .join("");

  chart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#58a6ff" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#58a6ff" stop-opacity="0" />
        </linearGradient>
      </defs>
      ${grid}
      <polygon class="trend-area" points="${areaPoints}" />
      <polyline class="trend-line" points="${points}" />
      ${pointsMarkup}
      ${mixBars}
    </svg>
  `;
}

function initializeSectionNav() {
  const links = [...document.querySelectorAll(".section-nav a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current.target.id}`);
      });
    },
    { rootMargin: "-28% 0px -62% 0px", threshold: [0, 0.15, 0.4] },
  );

  sections.forEach((section) => observer.observe(section));
}

initializeSurfaceExplorer();
renderTrendChart();
initializeSectionNav();
