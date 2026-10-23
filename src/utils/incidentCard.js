// HTML für eine Störung aus notices.json.
// Wird beim Build (DBFuckedUpCard.astro) und live im Browser (DBFuckedUpCurrent.astro) verwendet,
// damit das Markup nur an einer Stelle steht.

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Rot während einer Störung, grün wenn behoben
function colorsFor(incident) {
  return incident.status === "ongoing"
    ? { card: "bg-red-900 border-red-700", ticker: "bg-red-800", details: "bg-red-800/60", button: "bg-red-700 hover:bg-red-600" }
    : { card: "bg-green-900 border-green-700", ticker: "bg-green-800", details: "bg-green-800/60", button: "bg-green-700 hover:bg-green-600" };
}

// `code` im Text wird wie auf der alten Seite als <code> dargestellt
function renderParagraph(paragraph) {
  return paragraph
    .split("`")
    .map((part, index) => (index % 2 === 1 ? `<code class="rounded bg-black/30 px-1.5 py-0.5">${escapeHTML(part)}</code>` : escapeHTML(part)))
    .join("");
}

export function currentIncidentAlt(incident) {
  return incident.status === "ongoing" ? "Störung im DB Verkehrsnetz" : "Störung im DB Verkehrsnetz behoben";
}

export function renderIncidentCard(incident, alt) {
  const colors = colorsFor(incident);

  const ticker = incident.liveTicker
    .map((item, index) => `
      <li key="${index}" class="flex flex-col text-sm">
        <span class="flex gap-2 items-center">
          <span class="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
          <span class="flex-grow">
            ${escapeHTML(item.message)}
            ${item.subtitle ? `<span class="mt-1 block secondaryLabelColor">${escapeHTML(item.subtitle)}</span>` : ""}
          </span>
        </span>
        <span class="text-gray-300 text-xs mt-1 ml-4">${escapeHTML(item.time)}</span>
      </li>`)
    .join("");

  const technicalDetails = incident.technicalDetails
    ? `
    <details class="mt-4 rounded-md ${colors.details} px-4 py-3">
      <summary class="cursor-pointer text-sm font-semibold secondaryLabelColor">
        ${escapeHTML(incident.technicalDetails.title ?? "Technische Details")}
      </summary>
      ${incident.technicalDetails.paragraphs.map((paragraph) => `<p class="mt-3 text-sm leading-relaxed secondaryLabelColor">${renderParagraph(paragraph)}</p>`).join("")}
    </details>`
    : "";

  const button = incident.button
    ? `
    <div class="mt-6 flex justify-center">
      <a
        href="${escapeHTML(incident.button.url)}"
        class="${colors.button} text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
      >
        ${escapeHTML(incident.button.title)}
      </a>
    </div>`
    : "";

  return `
<div class="mt-16 flex justify-center">
  <div class="w-full max-w-md text-white rounded-lg shadow-lg p-6 border ${colors.card}">
    <div class="flex justify-center">
      <img
        src="${escapeHTML(incident.image)}"
        alt="${escapeHTML(alt)}"
        class="w-24 h-24 object-contain"
      />
    </div>

    <h2 class="text-center text-xl font-semibold mt-4">${escapeHTML(incident.title)}</h2>

    <p class="text-center text-sm mt-2 leading-relaxed">
      ${escapeHTML(incident.description)}
    </p>

    <ul class="mt-4 ${colors.ticker} rounded-md py-4 px-6 space-y-4">${ticker}
    </ul>
${technicalDetails}${button}
  </div>
</div>`;
}
