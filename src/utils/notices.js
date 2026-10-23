// DB Störungsmeldungen, siehe README.md neben notices.json auf dem Server
const NOTICES_URL = "https://api.victorlobe.me/Bahnfinder/notices.json";

let noticesPromise;

function fetchNotices() {
  return fetch(NOTICES_URL, { cache: "no-store" }).then((response) => {
    if (!response.ok) {
      throw new Error(`notices.json konnte nicht geladen werden (HTTP ${response.status})`);
    }
    return response.json();
  });
}

// Beim Build einmal für alle Seiten geladen. Schlägt der Abruf fehl, bricht der Build ab,
// damit keine Seite ohne Störungsmeldung veröffentlicht wird.
// Im Dev-Server bei jedem Aufruf neu, damit Änderungen an notices.json sofort sichtbar sind.
export function getNotices() {
  if (import.meta.env.DEV) {
    return fetchNotices();
  }
  noticesPromise ??= fetchNotices();
  return noticesPromise;
}

export async function getCurrentIncident() {
  const notices = await getNotices();
  return notices.incidents.find((incident) => incident.id === notices.current) ?? null;
}

export async function getIncident(id) {
  const notices = await getNotices();
  const incident = notices.incidents.find((incident) => incident.id === id);
  if (!incident) {
    throw new Error(`Störung ${id} fehlt in notices.json`);
  }
  return incident;
}
