// 🌸 Simple Bloom Prediction by Month (AI-like logic)
const month = new Date().getMonth() + 1; // 1-12
function getColor(bloomStart, bloomEnd) {
  return (month >= bloomStart && month <= bloomEnd) ? "#ff66b2" : "#cccccc";
}

// 🌍 Iraq bloom regions data (with bloom windows for logic)
const regions = [
  {
    name: "Zagros Mountains (Sulaymaniyah)",
    lat: 35.56,
    lon: 45.43,
    bloom: "March – April",
    bloomStart: 3,
    bloomEnd: 4,
    temp: "12–18°C",
    humidity: "40–55%",
    source: "https://www.oneearth.org/ecoregions/zagros-mountains-forest-steppe/",
  },
  {
    name: "Upper Mesopotamian / Jazira (Mosul)",
    lat: 36.34,
    lon: 43.13,
    bloom: "February – April",
    bloomStart: 2,
    bloomEnd: 4,
    temp: "14–22°C",
    humidity: "35–55%",
    source: "https://en.wikipedia.org/wiki/List_of_ecoregions_in_Iraq",
  },
  {
    name: "Tigris–Euphrates Plain (Baghdad)",
    lat: 33.32,
    lon: 44.37,
    bloom: "March – May",
    bloomStart: 3,
    bloomEnd: 5,
    temp: "18–25°C",
    humidity: "60–75%",
    source: "https://www.fao.org/4/i2877e/i2877e.pdf",
  },
  {
    name: "Mesopotamian Marshes (Al-Jubayish)",
    lat: 31.95,
    lon: 46.12,
    bloom: "Spring – Summer",
    bloomStart: 3,
    bloomEnd: 7,
    temp: "20–28°C",
    humidity: "50–80%",
    source: "https://whc.unesco.org/en/list/1481/",
  },
  {
    name: "Mesopotamian Shrub Desert (Ramadi)",
    lat: 33.42,
    lon: 43.30,
    bloom: "February – April (after rain)",
    bloomStart: 2,
    bloomEnd: 4,
    temp: "15–25°C",
    humidity: "20–40%",
    source: "https://www.oneearth.org/ecoregions/mesopotamian-shrub-desert/",
  },
  {
    name: "Coastal / Persian Gulf (Basra)",
    lat: 30.51,
    lon: 47.78,
    bloom: "Spring – Early Summer",
    bloomStart: 3,
    bloomEnd: 6,
    temp: "22–28°C",
    humidity: "20–50%",
    source: "https://en.wikipedia.org/wiki/List_of_ecoregions_in_Iraq",
  },
];

// 🗺️ Create map
const map = L.map("map").setView([33.3, 44.4], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data © OpenStreetMap contributors",
  maxZoom: 18,
}).addTo(map);

// 📍 Add bloom markers
regions.forEach((r) => {
  const color = getColor(r.bloomStart, r.bloomEnd);
  const marker = L.circleMarker([r.lat, r.lon], {
    radius: 10,
    color,
    fillColor: color,
    fillOpacity: 0.9,
    weight: 2,
  }).addTo(map);

  const html = `
    <div style="min-width: 220px">
      <b>${r.name}</b><br/>
      🌸 <b>Bloom</b>: ${r.bloom}<br/>
      🌡️ <b>Temp</b>: ${r.temp}<br/>
      💧 <b>Humidity</b>: ${r.humidity}<br/>
      <a href="${r.source}" target="_blank" rel="noopener noreferrer">Source</a>
    </div>
  `;
  marker.bindPopup(html);
});

// 🧭 Legend
const legend = document.getElementById("legend");
const monthName = new Date().toLocaleString(undefined, { month: "long" });
legend.innerHTML = `
  <div style="font-weight:600; margin-bottom:6px">Legend</div>
  <div class="row"><span class="swatch" style="background: var(--in-bloom)"></span> In bloom now (${monthName})</div>
  <div class="row"><span class="swatch" style="background: var(--out-bloom)"></span> Out of season</div>
`;
