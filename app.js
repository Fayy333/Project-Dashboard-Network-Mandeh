/**
 * ==========================================================================
 * APP.JS - Logika Dashboard Monitoring Jaringan KKN UGM Mandeh & Sei Nyalo
 * Fitur: 
 * - CRUD Lengkap (Tambah, Edit, Hapus Log Data)
 * - Pemetaan Menara / Tower BTS & Radius Jangkauan (Tower Merah Putih, dll)
 * - Google Earth 3D Deep Pin & Koordinat GPS Akurat
 * - Visualisasi Leaflet & Chart.js Multi-Layer
 * ==========================================================================
 */

// 1. DATASET PENGUKURAN SINYAL LAPANGAN
const INITIAL_DEMO_DATA = [
    { id: 1, timestamp: "2026-10-22 08:30", location: "Dermaga Tarusan / Nagari Mandeh", operator: "Telkomsel", lat: -1.168500, lng: 100.418200, rsrp: -86.0, rsrq: -8.5, sinr: 15.2, download: 28.4, upload: 12.1, latency: 32, terrain: "Pesisir dermaga teluk dengan latar bukit perairan tenang" },
    { id: 2, timestamp: "2026-10-22 08:50", location: "Kantor Wali Nagari Mandeh", operator: "by.U", lat: -1.171200, lng: 100.419500, rsrp: -88.5, rsrq: -9.2, sinr: 13.5, download: 24.2, upload: 10.4, latency: 35, terrain: "Dataran pesisir perkampungan nagari di kaki perbukitan" },
    { id: 3, timestamp: "2026-10-22 09:15", location: "Kawasan Wisata Pulau Cubadak", operator: "Telkomsel", lat: -1.218400, lng: 100.384200, rsrp: -106.0, rsrq: -14.0, sinr: 2.1, download: 4.2, upload: 1.1, latency: 98, terrain: "Pulau hutan tropis terpencil; sinyal terhalang kontur puncak pulau" },
    { id: 4, timestamp: "2026-10-22 09:40", location: "Dermaga Carocok Anau Mandeh", operator: "by.U", lat: -1.178900, lng: 100.431000, rsrp: -92.0, rsrq: -10.5, sinr: 11.0, download: 19.0, upload: 7.5, latency: 42, terrain: "Pesisir jalan lingkar Mandeh menghadap teluk tertutup" },
    { id: 5, timestamp: "2026-10-22 10:10", location: "Kantor Wali Nagari Sei Nyalo", operator: "Telkomsel", lat: -1.189500, lng: 100.428500, rsrp: -89.0, rsrq: -9.0, sinr: 14.0, download: 22.5, upload: 9.8, latency: 36, terrain: "Pusat pemerintahan nagari Sei Nyalo Mudiak Aia" },
    { id: 6, timestamp: "2026-10-22 10:30", location: "Kantor Wali Nagari Sei Nyalo", operator: "by.U", lat: -1.189500, lng: 100.428500, rsrp: -90.5, rsrq: -9.8, sinr: 12.2, download: 21.0, upload: 8.5, latency: 38, terrain: "Pusat fasilitas umum nagari dekat pesisir teluk" },
    { id: 7, timestamp: "2026-10-22 11:00", location: "Puncak Mandeh (Viewing Point)", operator: "Telkomsel", lat: -1.183400, lng: 100.412100, rsrp: -82.0, rsrq: -7.8, sinr: 18.5, download: 35.8, upload: 15.4, latency: 28, terrain: "Puncak elevasi tinggi (+120 mdpl); Line of Sight langsung bebas halangan" },
    { id: 8, timestamp: "2026-10-22 11:20", location: "Puncak Mandeh (Viewing Point)", operator: "by.U", lat: -1.183400, lng: 100.412100, rsrp: -84.0, rsrq: -8.2, sinr: 17.0, download: 33.5, upload: 14.2, latency: 30, terrain: "Puncak gardu pandang wisata Raja Ampat-nya Sumbar" },
    { id: 9, timestamp: "2026-10-22 11:50", location: "Kawasan Homestay & Pantai Nyalo", operator: "by.U", lat: -1.192100, lng: 100.425200, rsrp: -102.2, rsrq: -13.1, sinr: 3.5, download: 6.1, upload: 2.1, latency: 85, terrain: "Garis pantai berpasir; bayangan sinyal terhalang punggung bukit belakang" },
    { id: 10, timestamp: "2026-10-22 12:15", location: "SMP/SD Nagari Sei Nyalo", operator: "Telkomsel", lat: -1.194000, lng: 100.427000, rsrp: -91.0, rsrq: -9.8, sinr: 12.0, download: 20.1, upload: 8.9, latency: 39, terrain: "Area fasilitas pendidikan nagari di lembah pesisir" },
    { id: 11, timestamp: "2026-10-22 12:40", location: "Spot Tower Merah Putih Bukit Mandeh", operator: "Telkomsel", lat: -1.176200, lng: 100.408000, rsrp: -79.5, rsrq: -6.5, sinr: 21.0, download: 42.0, upload: 18.5, latency: 24, terrain: "Puncak bukit pemancar BTS terdekat (+160 mdpl); sinyal optimal" },
    { id: 12, timestamp: "2026-10-22 13:10", location: "Pulau Kapo-Kapo & Mangrove Mandeh", operator: "Indosat", lat: -1.231000, lng: 100.395000, rsrp: -104.5, rsrq: -13.5, sinr: 2.8, download: 5.5, upload: 1.5, latency: 92, terrain: "Kawasan pulau mangrove terpencil di perairan barat daya teluk" },
    { id: 13, timestamp: "2026-10-22 13:45", location: "Pulau Sironjong Gadang (Cliff Jump)", operator: "Telkomsel", lat: -1.214000, lng: 100.410500, rsrp: -94.2, rsrq: -10.2, sinr: 9.8, download: 17.5, upload: 6.8, latency: 45, terrain: "Pulau karang batu tegak (cliff); menerima sinyal pantulan dari bukit utama" },
    { id: 14, timestamp: "2026-10-22 14:15", location: "Dermaga Nelayan TPI Sungai Nyalo", operator: "XL", lat: -1.197500, lng: 100.432000, rsrp: -96.5, rsrq: -11.0, sinr: 8.4, download: 14.8, upload: 5.2, latency: 52, terrain: "Muara sungai nelayan berbatasan dengan mangrove dan teluk" }
];

// 2. DATASET MENARA / TOWER BTS SELULER DI KAWASAN MANDEH & SEI NYALO
const BTS_TOWERS = [{
        id: "bts-merah-putih",
        name: "Tower Merah Putih Bukit Mandeh",
        badge: "Macro BTS Utama (Telkomsel/Telkom Group)",
        operator: "Telkomsel / by.U",
        type: "Combat Hilltop Tower 4G LTE",
        lat: -1.176200,
        lng: 100.408000,
        height: "42 meter (+160 mdpl)",
        radiusMeters: 4200, // 4.2 km radius cakupan
        optimalRadiusMeters: 2200, // 2.2 km cakupan prima
        sectors: "3 Sektor (120° Azimuth)",
        frequency: "LTE Band 3 (1800 MHz) & Band 8 (900 MHz)",
        description: "Menara BTS Merah Putih strategis yang berdiri kokoh di puncak perbukitan Mandeh. Menjadi tulang punggung transmisi seluler untuk sebagian besar Teluk Mandeh, Puncak Mandeh, Dermaga Tarusan, Nagari Mandeh, dan jalur penyeberangan kapal wisata.",
        color: "#ef4444" // Merah
    },
    {
        id: "bts-sei-nyalo",
        name: "Tower Micro BTS Nagari Sei Nyalo",
        badge: "Micro BTS Pemukiman Nagari",
        operator: "Multi-Operator (Telkomsel & Indosat)",
        type: "Microcell Nagari Tower",
        lat: -1.189200,
        lng: 100.428800,
        height: "28 meter (+15 mdpl)",
        radiusMeters: 2000, // 2.0 km radius cakupan
        optimalRadiusMeters: 1000,
        sectors: "Omni-directional 360°",
        frequency: "LTE Band 1 (2100 MHz) & Band 3 (1800 MHz)",
        description: "Menara microcell di pusat Nagari Sei Nyalo Mudiak Aia. Mengcover pemukiman warga desa, perkantoran wali nagari, sekolah dasar/SMP, homestay wisata, dan dermaga perahu nelayan Nyalo.",
        color: "#0d9488" // Teal
    },
    {
        id: "bts-cubadak",
        name: "Tower Repeater Maritim Pulau Cubadak",
        badge: "Solar Repeater Maritim (Bakti Kominfo)",
        operator: "Telkomsel / Bakti Kominfo",
        type: "Solar Powered Maritime Repeater",
        lat: -1.215000,
        lng: 100.388000,
        height: "22 meter (+35 mdpl)",
        radiusMeters: 1600, // 1.6 km radius cakupan
        optimalRadiusMeters: 800,
        sectors: "2 Sektor Maritim (East/North-East)",
        frequency: "LTE Band 8 (900 MHz Jangkauan Jauh)",
        description: "Pemancar tenaga surya maritim di pesisir Pulau Cubadak untuk melayani resort wisata, perahu wisata, dan nelayan tradisional di perairan pulau-pulau luar Mandeh.",
        color: "#0284c7" // Ocean Blue
    },
    {
        id: "bts-tarusan-raya",
        name: "Tower Induk Gateway Tarusan Raya",
        badge: "Macro Gateway BTS",
        operator: "Telkomsel, XL, Indosat (Tower Bersama)",
        type: "Lattice Mast Backbone BTS",
        lat: -1.155000,
        lng: 100.425000,
        height: "52 meter (+20 mdpl)",
        radiusMeters: 5000, // 5.0 km radius cakupan
        optimalRadiusMeters: 2800,
        sectors: "3 Sektor (120°)",
        frequency: "LTE Band 1, 3, 8 & 40 (Carrier Aggregation)",
        description: "Tower induk transmisi fiber optik backbone Kecamatan Koto XI Tarusan yang menghubungkan jaringan darat Pesisir Selatan ke arah gerbang wisata Mandeh.",
        color: "#6366f1" // Indigo
    }
];

// 3. STATE VARIABEL APLIKASI
const FIXED_HISTORICAL_DATA = [...INITIAL_DEMO_DATA];

let activeDataset = [];
let leafletMap = null;
let mapMarkersGroup = null;
let mapRadiusGroup = null;
let btsLayerGroup = null;

let showRadiusCoverage = true;
let showBtsTowers = true; // Toggle Tower BTS & Jangkauannya

let baseLayers = {};
let currentBaseLayer = null;

let chartSpeedBar = null;
let chartCategoryDoughnut = null;
let chartTrendLine = null;

// TAB NAVIGATION SYSTEM
let currentActiveTab = 'map';

function switchTab(tabId) {
    currentActiveTab = tabId;

    // 1. Sembunyikan semua tab pane
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.add('hidden'));

    // 2. Tampilkan tab yang dipilih
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
        targetPane.classList.remove('hidden');
    }

    // 3. Update style tombol tab di menu bar
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active-tab', 'bg-teal-600', 'text-white', 'border-teal-600', 'shadow-sm');
        btn.classList.add('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
    });

    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
        activeBtn.classList.add('active-tab', 'bg-teal-600', 'text-white', 'border-teal-600', 'shadow-sm');
    }

    // 4. Update hash di URL agar bisa di-bookmark/refresh
    if (history.replaceState) {
        history.replaceState(null, null, `#${tabId}`);
    }

    // 5. Khusus Tab Peta & Grafik: Invalidate size agar render sempurna
    if (tabId === 'map') {
        setTimeout(() => {
            if (leafletMap) leafletMap.invalidateSize();
        }, 150);
    } else if (tabId === 'analytics') {
        setTimeout(() => {
            if (chartSpeedBar) chartSpeedBar.resize();
            if (chartCategoryDoughnut) chartCategoryDoughnut.resize();
            if (chartTrendLine) chartTrendLine.resize();
        }, 100);
    } else if (tabId === 'earth') {
        updateHubEarthDetails();
    }
}

function initTabs() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['map', 'overview', 'analytics', 'crud', 'report', 'earth'];
    const initialTab = validTabs.includes(hash) ? hash : 'map';
    switchTab(initialTab);
}

// 4. INISIALISASI SAAT DOM SIAP
window.addEventListener('DOMContentLoaded', () => {
    initLiveTimestamp();
    loadDatasetFromStorage();
    initLeafletMap();
    initChartInstances();
    populateFilterOptions();
    applyFilters();
    renderBtsTowersSummaryCard();
    initTabs();

    window.addEventListener('resize', () => {
        if (leafletMap) leafletMap.invalidateSize();
    });
});

function initLiveTimestamp() {
    const el = document.getElementById('liveTimestamp');
    if (!el) return;
    const now = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    el.textContent = now.toLocaleDateString('id-ID', options);
}

// 5. PENYIMPANAN LOCALSTORAGE
function loadDatasetFromStorage() {
    const saved = localStorage.getItem('kkn_mandeh_network_data_historic');
    if (saved) {
        try {
            activeDataset = JSON.parse(saved);
        } catch (e) {
            activeDataset = [...FIXED_HISTORICAL_DATA];
        }
    } else {
        activeDataset = [...FIXED_HISTORICAL_DATA];
        saveDatasetToStorage();
    }
}

function saveDatasetToStorage() {
    localStorage.setItem('kkn_mandeh_network_data_historic', JSON.stringify(activeDataset));
}

// 6. INISIALISASI PETA LEAFLET DENGAN LAYER GOOGLE MAPS & TOWER BTS
function initLeafletMap() {
    if (leafletMap !== null) {
        leafletMap.remove();
    }

    leafletMap = L.map('map', {
        center: [-1.1850, 100.4150],
        zoom: 13,
        zoomControl: true,
        attributionControl: true
    });

    baseLayers = {
        voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; CartoDB &copy; OpenStreetMap contributors | KKN Mandeh'
        }),
        googleHybrid: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps Satelit & Pulau Mandeh'
        }),
        googleRoadmap: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps Jalan'
        }),
        googleTerrain: L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: '&copy; Google Maps Kontur Bukit'
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri World Imagery'
        }),
        osm: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }),
        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; CartoDB Dark Matter'
        })
    };

    currentBaseLayer = baseLayers.voyager;
    currentBaseLayer.addTo(leafletMap);

    // Layer Groups
    btsLayerGroup = L.layerGroup().addTo(leafletMap);
    mapRadiusGroup = L.layerGroup().addTo(leafletMap);
    mapMarkersGroup = L.layerGroup().addTo(leafletMap);

    // Render Tower BTS & Jangkauannya
    renderBtsTowers();

    setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
    }, 300);
}

// 7. PEMETAAN MENARA / TOWER BTS BESERTA RADIUS JANGKAUANNYA
function renderBtsTowers() {
    if (!leafletMap || !btsLayerGroup) return;
    btsLayerGroup.clearLayers();

    BTS_TOWERS.forEach(bts => {
                const btsLatLng = [bts.lat, bts.lng];

                // 1. Lingkaran Luar: Jangkauan Sinyal Maksimal (Extended Coverage)
                const outerCircle = L.circle(btsLatLng, {
                    radius: bts.radiusMeters,
                    color: bts.color,
                    weight: 2,
                    dashArray: '6, 8',
                    opacity: 0.8,
                    fillColor: bts.color,
                    fillOpacity: 0.07
                });

                // 2. Lingkaran Dalam: Jangkauan Sinyal Optimal / Kuat (Core High-Throughput Zone)
                const innerCircle = L.circle(btsLatLng, {
                    radius: bts.optimalRadiusMeters,
                    color: bts.color,
                    weight: 1.5,
                    opacity: 0.9,
                    fillColor: bts.color,
                    fillOpacity: 0.16
                });

                btsLayerGroup.addLayer(outerCircle);
                btsLayerGroup.addLayer(innerCircle);

                // 3. Marker Ikon Menara Pemancar Merah Putih
                const isMerahPutih = bts.id === "bts-merah-putih";
                const btsIcon = L.divIcon({
                            className: 'custom-bts-marker-wrapper',
                            html: `
                <div class="bts-marker" title="${bts.name}">
                    <div class="bts-wave" style="border-color: ${bts.color};"></div>
                    <div class="${isMerahPutih ? 'bts-core-merah-putih' : 'bts-core-merah-putih'}" style="${!isMerahPutih ? `background: linear-gradient(135deg, ${bts.color} 50%, #ffffff 50%); border-color: ${bts.color};` : ''}">
                        <i class="fa-solid fa-tower-broadcast text-[12px] text-slate-900"></i>
                    </div>
                </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -18]
        });

        const btsMarker = L.marker(btsLatLng, { icon: btsIcon });
        const earthUrl = getGoogleEarth3DUrl(bts.lat, bts.lng);

        // Kartu Popup Menara BTS
        const btsPopupHTML = `
            <div class="w-80 font-sans bg-white text-slate-800 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
                <div class="p-4 bg-gradient-to-r from-red-600 via-rose-700 to-slate-900 text-white flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white shrink-0">
                            <i class="fa-solid fa-tower-broadcast text-base"></i>
                        </div>
                        <div>
                            <span class="text-[10px] uppercase font-bold tracking-wider text-rose-200 block">${bts.badge}</span>
                            <h4 class="text-xs sm:text-sm font-extrabold leading-snug">${bts.name}</h4>
                        </div>
                    </div>
                </div>

                <div class="p-4 space-y-3 text-xs">
                    <!-- Radius Jangkauan Badge -->
                    <div class="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between text-red-950">
                        <div>
                            <span class="text-[10px] text-red-600 uppercase font-bold block">Radius Jangkauan Efektif</span>
                            <strong class="text-base font-extrabold font-mono text-red-700">${(bts.radiusMeters / 1000).toFixed(1)} km</strong>
                            <span class="text-[10px] text-slate-500 font-sans block">Optimal: ${(bts.optimalRadiusMeters / 1000).toFixed(1)} km</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] text-slate-500 uppercase font-bold block">Tinggi / Elevasi</span>
                            <span class="text-xs font-bold text-slate-800 font-mono">${bts.height}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <div><span class="text-slate-400 block text-[10px]">Operator:</span> <strong>${bts.operator}</strong></div>
                        <div><span class="text-slate-400 block text-[10px]">Sektor:</span> <strong>${bts.sectors}</strong></div>
                        <div class="col-span-2 pt-1 border-t border-slate-200"><span class="text-slate-400 block text-[10px]">Pita Frekuensi:</span> <strong class="font-mono text-teal-800">${bts.frequency}</strong></div>
                    </div>

                    <div class="text-[11px] text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
                        <strong class="text-slate-800 block text-[10px] mb-0.5">Area Cakupan:</strong>
                        <p class="leading-relaxed">${bts.description}</p>
                    </div>

                    <!-- Koordinat Akurat -->
                    <div class="p-2 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-600 flex justify-between items-center">
                        <span>Lat: ${bts.lat.toFixed(6)}, Lng: ${bts.lng.toFixed(6)}</span>
                        <button onclick="copyCoordinates(${bts.lat}, ${bts.lng})" class="text-teal-700 hover:underline font-sans font-bold">Salin</button>
                    </div>

                    <a href="${earthUrl}" target="_blank" class="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
                        <i class="fa-solid fa-earth-americas text-cyan-200"></i> Buka Menara di Google Earth 3D
                    </a>
                    <a href="${getGoogleMapsDirectUrl(bts.lat, bts.lng)}" target="_blank" class="w-full py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
                        <i class="fa-solid fa-location-dot text-emerald-200"></i> Buka Rute / Lokasi di Google Maps
                    </a>
                </div>
            </div>
        `;

        btsMarker.bindPopup(btsPopupHTML, { className: 'custom-popup', maxWidth: 340 });
        btsLayerGroup.addLayer(btsMarker);
    });
}

// Toggle Menara BTS & Radius Jangkauan
function toggleBtsTowers() {
    showBtsTowers = !showBtsTowers;
    const btn = document.getElementById('btnToggleBTS');
    if (showBtsTowers) {
        btsLayerGroup.addTo(leafletMap);
        if (btn) btn.className = "px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-300 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm";
        showToast("Tower BTS & radius jangkauannya ditampilkan di peta.");
    } else {
        leafletMap.removeLayer(btsLayerGroup);
        if (btn) btn.className = "px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-medium transition flex items-center gap-1.5";
        showToast("Tower BTS disembunyikan.");
    }
}

// Fokuskan Peta ke Menara Tertentu
function focusToBts(btsId) {
    const tower = BTS_TOWERS.find(t => t.id === btsId);
    if (!tower || !leafletMap) return;

    // Pastikan layer BTS aktif
    if (!showBtsTowers) toggleBtsTowers();

    leafletMap.flyTo([tower.lat, tower.lng], 14, { animate: true, duration: 1.2 });
    showToast(`Peta difokuskan ke: ${tower.name} (Radius ${(tower.radiusMeters/1000).toFixed(1)} km)`);
}

// Render Komponen Kartu Ringkasan Tower BTS di Dashboard
function renderBtsTowersSummaryCard() {
    const container = document.getElementById('btsTowersSummaryList');
    if (!container) return;
    container.innerHTML = '';

    BTS_TOWERS.forEach(bts => {
        const card = document.createElement('div');
        card.className = "bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-2 text-xs";
        card.innerHTML = `
            <div class="flex items-start justify-between gap-2">
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-red-600 block">${bts.operator}</span>
                    <h4 class="font-extrabold text-slate-900 text-xs sm:text-sm">${bts.name}</h4>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 font-mono whitespace-nowrap">
                    Radius ${(bts.radiusMeters / 1000).toFixed(1)} km
                </span>
            </div>
            <p class="text-[11px] text-slate-500 line-clamp-2">${bts.description}</p>
            <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <span class="text-slate-400 font-mono text-[10px]"><i class="fa-solid fa-mountain mr-1"></i>${bts.height}</span>
                <div class="flex items-center gap-1.5">
                    <button onclick="focusToBts('${bts.id}')" class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg transition text-[10px] flex items-center gap-1">
                        <i class="fa-solid fa-crosshairs"></i> Lihat di Peta
                    </button>
                    <a href="${getGoogleEarth3DUrl(bts.lat, bts.lng)}" target="_blank" class="p-1 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold transition" title="Lihat di Google Earth 3D">
                        <i class="fa-solid fa-earth-americas"></i>
                    </a>
                    <a href="${getGoogleMapsDirectUrl(bts.lat, bts.lng)}" target="_blank" class="p-1 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold transition" title="Buka di Google Maps">
                        <i class="fa-solid fa-location-dot"></i>
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 8. TILE LAYER SWITCHER & UTILITY PETA
function switchBaseMap(type) {
    if (!leafletMap || !baseLayers[type]) return;

    leafletMap.removeLayer(currentBaseLayer);
    currentBaseLayer = baseLayers[type];
    currentBaseLayer.addTo(leafletMap);

    ['voyager', 'googleHybrid', 'googleRoadmap', 'googleTerrain', 'satellite', 'osm', 'dark'].forEach(k => {
        const btn = document.getElementById('btnLayer' + k.charAt(0).toUpperCase() + k.slice(1));
        if (btn) {
            if (k === type) {
                btn.className = "px-2.5 py-1 rounded-lg bg-teal-600 text-white shadow-sm transition";
            } else {
                btn.className = "px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 transition";
            }
        }
    });

    showToast(`Tampilan peta dialihkan ke: ${type.toUpperCase()}`);
}

function toggleCoverageRadius() {
    showRadiusCoverage = !showRadiusCoverage;
    const btn = document.getElementById('btnToggleRadius');
    if (showRadiusCoverage) {
        mapRadiusGroup.addTo(leafletMap);
        btn.className = "px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold transition flex items-center gap-1.5";
        showToast("Radius cakupan sampel sinyal diaktifkan.");
    } else {
        leafletMap.removeLayer(mapRadiusGroup);
        btn.className = "px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-medium transition flex items-center gap-1.5";
        showToast("Radius cakupan sampel disembunyikan.");
    }
}

function flyToLocation(lat, lng, zoom = 15) {
    if (!leafletMap) return;
    leafletMap.flyTo([lat, lng], zoom, { animate: true, duration: 1.2 });
    setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 500);
}

function centerMapToAll() {
    if (!leafletMap || activeDataset.length === 0) return;
    const bounds = activeDataset.map(d => [d.lat, d.lng]);
    leafletMap.fitBounds(bounds, { padding: [50, 50], animate: true });
    setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 300);
}

// 9. HELPER URL GOOGLE EARTH & GOOGLE MAPS
function getGoogleEarth3DUrl(lat, lng) {
    const latStr = lat.toFixed(6);
    const lngStr = lng.toFixed(6);
    return `https://earth.google.com/web/search/${latStr},+${lngStr}/@${latStr},${lngStr},120a,850d,45y,0h,0t,0r`;
}

function getGoogleMapsDirectUrl(lat, lng) {
    return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(6)},${lng.toFixed(6)}`;
}

function copyCoordinates(lat, lng) {
    const text = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Koordinat GPS [${text}] berhasil disalin ke clipboard!`);
        });
    } else {
        showToast(`Koordinat GPS: ${text}`);
    }
}

function getSignalCategory(rsrp) {
    if (rsrp >= -90) {
        return {
            name: "Sangat Baik",
            color: "#10b981", // emerald
            badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
            radius: 350
        };
    }
    if (rsrp >= -100) {
        return {
            name: "Sedang",
            color: "#f59e0b", // amber
            badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
            radius: 260
        };
    }
    return {
        name: "Lemah / Kritis",
        color: "#ef4444", // rose
        badgeClass: "bg-rose-50 text-rose-700 border border-rose-200",
        radius: 180
    };
}

// 10. UPDATE MARKER PENGUKURAN & POPUP DENGAN TOMBOL EDIT & HAPUS
function updateMapMarkers(filteredData) {
    if (!leafletMap) return;

    mapMarkersGroup.clearLayers();
    mapRadiusGroup.clearLayers();

    if (filteredData.length === 0) return;

    const bounds = [];

    filteredData.forEach(item => {
        const cat = getSignalCategory(item.rsrp);
        const latLng = [item.lat, item.lng];
        bounds.push(latLng);

        // Coverage radius sampel
        const coverageCircle = L.circle(latLng, {
            radius: cat.radius,
            color: cat.color,
            weight: 1.5,
            opacity: 0.7,
            fillColor: cat.color,
            fillOpacity: 0.15
        });
        mapRadiusGroup.addLayer(coverageCircle);

        // Marker beacon
        const isWeak = item.rsrp < -100;
        const markerIcon = L.divIcon({
            className: 'custom-beacon-wrapper',
            html: `
                <div class="beacon-marker" style="cursor: pointer;">
                    <div class="beacon-ring" style="background-color: ${cat.color};"></div>
                    <div class="beacon-core" style="background-color: ${cat.color};">
                        ${isWeak ? '!' : '<i class="fa-solid fa-wifi text-[7px]"></i>'}
                    </div>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -14]
        });

        const marker = L.marker(latLng, { icon: markerIcon });
        const earthUrl = getGoogleEarth3DUrl(item.lat, item.lng);
        const mapsUrl = getGoogleMapsDirectUrl(item.lat, item.lng);

        // Kartu Popup Lengkap dengan Tombol Edit & Hapus
        const popupHTML = `
            <div class="w-72 font-sans bg-white text-slate-800 rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                <div class="p-3.5 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-2">
                    <div>
                        <span class="text-[10px] uppercase font-bold tracking-wider text-teal-700 block">${item.operator}</span>
                        <h4 class="text-xs font-bold text-slate-900 leading-snug">${item.location}</h4>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${cat.badgeClass} whitespace-nowrap">
                        ${cat.name}
                    </span>
                </div>

                <div class="p-3.5 space-y-2.5 text-xs">
                    <!-- Koordinat GPS -->
                    <div class="p-2 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-[11px] font-mono text-blue-950">
                        <div>
                            <span class="text-[9px] text-blue-600 uppercase font-sans font-bold block">📍 Koordinat GPS Tepat</span>
                            <span class="font-bold">Lat: ${item.lat.toFixed(6)} | Lng: ${item.lng.toFixed(6)}</span>
                        </div>
                        <button onclick="copyCoordinates(${item.lat}, ${item.lng})" class="px-2 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg text-[10px] font-sans font-semibold text-blue-700 transition" title="Salin Koordinat GPS">
                            <i class="fa-regular fa-copy"></i> Salin
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 font-mono text-[11px]">
                        <div>
                            <span class="text-[10px] text-slate-500 block">RSRP Sinyal</span>
                            <strong class="text-sm font-extrabold" style="color: ${cat.color};">${item.rsrp} dBm</strong>
                        </div>
                        <div>
                            <span class="text-[10px] text-slate-500 block">Latency Ping</span>
                            <strong class="text-sm font-extrabold text-amber-600">${item.latency} ms</strong>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-600">
                        <div><span class="text-slate-400">Download:</span> <strong class="text-emerald-600 font-mono">${item.download} Mbps</strong></div>
                        <div><span class="text-slate-400">Upload:</span> <strong class="text-cyan-600 font-mono">${item.upload} Mbps</strong></div>
                        <div><span class="text-slate-400">RSRQ:</span> <strong class="text-slate-800 font-mono">${item.rsrq} dB</strong></div>
                        <div><span class="text-slate-400">SINR:</span> <strong class="text-slate-800 font-mono">${item.sinr} dB</strong></div>
                    </div>

                    <!-- Tombol Aksi: Google Earth 3D Pin, Google Maps, Edit, Hapus -->
                    <div class="pt-2 border-t border-slate-100 space-y-1.5">
                        <a href="${earthUrl}" target="_blank" class="w-full py-1.5 px-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
                            <i class="fa-solid fa-earth-americas text-cyan-200"></i> Langsung ke Google Earth 3D (Pin)
                        </a>
                        <div class="grid grid-cols-3 gap-1.5 text-[10px]">
                            <a href="${mapsUrl}" target="_blank" class="py-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg font-semibold flex items-center justify-center gap-1 transition">
                                <i class="fa-solid fa-location-dot text-rose-500"></i> Maps
                            </a>
                            <button onclick="openEditModal(${item.id})" class="py-1 px-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 rounded-lg font-semibold flex items-center justify-center gap-1 transition">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="confirmDeleteRecord(${item.id})" class="py-1 px-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-300 rounded-lg font-semibold flex items-center justify-center gap-1 transition">
                                <i class="fa-solid fa-trash-can"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        marker.bindPopup(popupHTML, { className: 'custom-popup', maxWidth: 320 });
        mapMarkersGroup.addLayer(marker);
    });

    if (bounds.length > 0) {
        leafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }

    setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 200);
}

// 11. CHART.JS CONFIGURATION
function initChartInstances() {
    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = '"Plus Jakarta Sans", sans-serif';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    Chart.defaults.plugins.tooltip.borderColor = '#e2e8f0';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.cornerRadius = 10;
    Chart.defaults.plugins.tooltip.padding = 10;

    const ctxBar = document.getElementById('speedBarChart').getContext('2d');
    chartSpeedBar = new Chart(ctxBar, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12, usePointStyle: true } } },
            scales: {
                x: { grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { font: { size: 10 } } },
                y: { beginAtZero: true, grid: { color: 'rgba(226, 232, 240, 0.8)' }, title: { display: true, text: 'Throughput (Mbps)' } }
            }
        }
    });

    const ctxDoughnut = document.getElementById('categoryDoughnutChart').getContext('2d');
    chartCategoryDoughnut = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, font: { size: 11 } } } }
        }
    });

    const ctxLine = document.getElementById('trendLineChart').getContext('2d');
    chartTrendLine = new Chart(ctxLine, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: { grid: { color: 'rgba(226, 232, 240, 0.6)' }, ticks: { font: { size: 10 } } },
                y: {
                    type: 'linear', position: 'left',
                    grid: { color: 'rgba(226, 232, 240, 0.8)' },
                    title: { display: true, text: 'RSRP (dBm)', color: '#4f46e5' },
                    ticks: { color: '#4f46e5' }
                },
                y1: {
                    type: 'linear', position: 'right',
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'Latency (ms)', color: '#d97706' },
                    ticks: { color: '#d97706' }
                }
            }
        }
    });
}

// 12. FILTER DROPDOWN & FILTER LOGIC
function populateFilterOptions() {
    const locSelect = document.getElementById('locationFilter');
    const opSelect = document.getElementById('operatorFilter');

    const currentLoc = locSelect.value;
    const currentOp = opSelect.value;

    const locations = [...new Set(activeDataset.map(d => d.location))].sort();
    const operators = [...new Set(activeDataset.map(d => d.operator))].sort();

    locSelect.innerHTML = '<option value="ALL">Semua Wilayah & Gugusan Pulau</option>';
    locations.forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc;
        opt.textContent = loc;
        locSelect.appendChild(opt);
    });

    opSelect.innerHTML = '<option value="ALL">Semua Operator Seluler</option>';
    operators.forEach(op => {
        const opt = document.createElement('option');
        opt.value = op;
        opt.textContent = op;
        opSelect.appendChild(opt);
    });

    if (locations.includes(currentLoc)) locSelect.value = currentLoc;
    if (operators.includes(currentOp)) opSelect.value = currentOp;
}

function applyFilters() {
    const locFilter = document.getElementById('locationFilter').value;
    const opFilter = document.getElementById('operatorFilter').value;
    const qualFilter = document.getElementById('signalQualityFilter').value;

    const filtered = activeDataset.filter(d => {
        const matchLoc = (locFilter === 'ALL' || d.location === locFilter);
        const matchOp = (opFilter === 'ALL' || d.operator === opFilter);
        
        let matchQual = true;
        if (qualFilter === 'GOOD') matchQual = (d.rsrp >= -90);
        else if (qualFilter === 'MEDIUM') matchQual = (d.rsrp >= -100 && d.rsrp < -90);
        else if (qualFilter === 'WEAK') matchQual = (d.rsrp < -100);

        return matchLoc && matchOp && matchQual;
    });

    const badge = document.getElementById('activeFilterBadge');
    const badgeText = document.getElementById('activeFilterText');
    if (locFilter !== 'ALL' || opFilter !== 'ALL' || qualFilter !== 'ALL') {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
        let desc = [];
        if (locFilter !== 'ALL') desc.push(locFilter);
        if (opFilter !== 'ALL') desc.push(opFilter);
        if (qualFilter !== 'ALL') desc.push(qualFilter);
        badgeText.textContent = `${filtered.length} Titik (${desc.join(' • ')})`;
    } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
    }

    refreshDashboardViews(filtered);
    if (typeof updateFilterPanelTags === 'function') updateFilterPanelTags();
}

function resetFilters() {
    document.getElementById('locationFilter').value = 'ALL';
    document.getElementById('operatorFilter').value = 'ALL';
    document.getElementById('signalQualityFilter').value = 'ALL';
    applyFilters();
    showToast('Filter telah direset ke seluruh data Mandeh.');
}

function refreshDashboardViews(dataToDisplay = activeDataset) {
    updateKPICards(dataToDisplay);
    updateMapMarkers(dataToDisplay);
    updateCharts(dataToDisplay);
    updateOperatorBenchmark(dataToDisplay);
    updateSummaryTable(dataToDisplay);
    updateRawDataTable(dataToDisplay);
    updateNavBadges(dataToDisplay);
    updateHubEarthDropdown(dataToDisplay);
}

function updateNavBadges(data) {
    const badge = document.getElementById('navLogCountBadge');
    if (badge) {
        badge.innerText = data.length;
    }
}

function updateHubEarthDropdown(data = activeDataset) {
    const select = document.getElementById('hubEarthLocationSelect');
    if (!select) return;
    
    const prevVal = select.value;
    select.innerHTML = '';
    
    data.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = `${item.location} (${item.operator} • ${item.rsrp} dBm)`;
        select.appendChild(opt);
    });

    if (prevVal && data.some(d => d.id === parseInt(prevVal))) {
        select.value = prevVal;
    }
    updateHubEarthDetails();
}

function updateHubEarthDetails() {
    const select = document.getElementById('hubEarthLocationSelect');
    const container = document.getElementById('hubEarthLocationDetails');
    const launchBtn = document.getElementById('hubBtnLaunchEarth3D');
    if (!select || !container || !launchBtn) return;

    const selectedId = parseInt(select.value);
    const item = activeDataset.find(d => d.id === selectedId) || activeDataset[0];
    if (!item) return;

    const cat = getSignalCategory(item.rsrp);
    const earthUrl = getGoogleEarth3DUrl(item.lat, item.lng);
    const mapsUrl = getGoogleMapsDirectUrl(item.lat, item.lng);
    launchBtn.href = earthUrl;

    const mapsBtn = document.getElementById('hubBtnLaunchMaps');
    if (mapsBtn) mapsBtn.href = mapsUrl;

    container.innerHTML = `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-teal-700">${item.operator}</span>
                <h4 class="text-base font-extrabold text-slate-900">${item.location}</h4>
                <p class="text-xs text-slate-500 mt-0.5">${item.terrain || 'Kawasan pesisir perairan teluk Mandeh.'}</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-bold ${cat.badgeClass}">${cat.name} (${item.rsrp} dBm)</span>
                <button onclick="copyCoordinates(${item.lat}, ${item.lng})" class="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition">
                    <i class="fa-regular fa-copy mr-1"></i> Salin GPS
                </button>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span class="text-[10px] text-slate-400 font-sans block">Garis Lintang (Lat)</span>
                <strong class="text-slate-800 text-sm font-extrabold">${item.lat.toFixed(6)}°</strong>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span class="text-[10px] text-slate-400 font-sans block">Garis Bujur (Lng)</span>
                <strong class="text-slate-800 text-sm font-extrabold">${item.lng.toFixed(6)}°</strong>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span class="text-[10px] text-slate-400 font-sans block">Throughput Unduh</span>
                <strong class="text-emerald-600 text-sm font-extrabold">${item.download} Mbps</strong>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span class="text-[10px] text-slate-400 font-sans block">Latensi Ping</span>
                <strong class="text-amber-600 text-sm font-extrabold">${item.latency} ms</strong>
            </div>
        </div>
    `;
}

// 13. KPI STATISTIK
function updateKPICards(data) {
    const count = data.length;
    document.getElementById('kpiTotal').innerText = count;

    if (count === 0) {
        document.getElementById('kpiAvgDownload').innerHTML = `0 <span class="text-xs font-normal text-slate-400">Mbps</span>`;
        document.getElementById('kpiAvgUpload').innerHTML = `0 <span class="text-xs font-normal text-slate-400">Mbps</span>`;
        document.getElementById('kpiAvgLatency').innerHTML = `0 <span class="text-xs font-normal text-slate-400">ms</span>`;
        document.getElementById('kpiAvgRSRP').innerHTML = `0 <span class="text-xs font-normal text-slate-400">dBm</span>`;
        document.getElementById('kpiWeakPct').innerText = '0%';
        return;
    }

    const sumDl = data.reduce((acc, d) => acc + d.download, 0);
    const sumUl = data.reduce((acc, d) => acc + d.upload, 0);
    const sumLat = data.reduce((acc, d) => acc + d.latency, 0);
    const sumRsrp = data.reduce((acc, d) => acc + d.rsrp, 0);
    const weakCount = data.filter(d => d.rsrp < -100).length;

    document.getElementById('kpiAvgDownload').innerHTML = `${(sumDl / count).toFixed(1)} <span class="text-xs font-normal text-slate-400">Mbps</span>`;
    document.getElementById('kpiAvgUpload').innerHTML = `${(sumUl / count).toFixed(1)} <span class="text-xs font-normal text-slate-400">Mbps</span>`;
    document.getElementById('kpiAvgLatency').innerHTML = `${Math.round(sumLat / count)} <span class="text-xs font-normal text-slate-400">ms</span>`;
    document.getElementById('kpiAvgRSRP').innerHTML = `${(sumRsrp / count).toFixed(1)} <span class="text-xs font-normal text-slate-400">dBm</span>`;
    document.getElementById('kpiWeakPct').innerText = `${((weakCount / count) * 100).toFixed(0)}%`;
}

// 14. UPDATE GRAFIK
function updateCharts(data) {
    if (!chartSpeedBar || !chartCategoryDoughnut || !chartTrendLine) return;

    const locGroup = {};
    data.forEach(d => {
        if (!locGroup[d.location]) locGroup[d.location] = { dl: [], ul: [] };
        locGroup[d.location].dl.push(d.download);
        locGroup[d.location].ul.push(d.upload);
    });

    const locLabels = Object.keys(locGroup);
    const avgDl = locLabels.map(l => (locGroup[l].dl.reduce((a, b) => a + b, 0) / locGroup[l].dl.length).toFixed(1));
    const avgUl = locLabels.map(l => (locGroup[l].ul.reduce((a, b) => a + b, 0) / locGroup[l].ul.length).toFixed(1));

    chartSpeedBar.data = {
        labels: locLabels.map(l => l.length > 18 ? l.substring(0, 16) + '..' : l),
        datasets: [
            { label: 'Avg Download (Mbps)', data: avgDl, backgroundColor: '#0d9488', borderRadius: 8 },
            { label: 'Avg Upload (Mbps)', data: avgUl, backgroundColor: '#0284c7', borderRadius: 8 }
        ]
    };
    chartSpeedBar.update();

    let baik = 0, sedang = 0, lemah = 0;
    data.forEach(d => {
        if (d.rsrp >= -90) baik++;
        else if (d.rsrp >= -100) sedang++;
        else lemah++;
    });

    chartCategoryDoughnut.data = {
        labels: ['Sangat Baik (≥ -90 dBm)', 'Sedang (-91 s/d -100)', 'Lemah / Kritis (< -100)'],
        datasets: [{
            data: [baik, sedang, lemah],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            borderColor: '#ffffff',
            borderWidth: 3
        }]
    };
    chartCategoryDoughnut.update();

    const timelineLabels = data.map(d => `${d.location.substring(0, 10)}.. (${d.operator})`);
    const rsrpValues = data.map(d => d.rsrp);
    const latencyValues = data.map(d => d.latency);

    chartTrendLine.data = {
        labels: timelineLabels,
        datasets: [
            {
                label: 'RSRP Daya (dBm)',
                data: rsrpValues,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.08)',
                yAxisID: 'y',
                tension: 0.35,
                fill: true,
                pointBackgroundColor: '#4f46e5',
                pointRadius: 4
            },
            {
                label: 'Latency Respon (ms)',
                data: latencyValues,
                borderColor: '#d97706',
                backgroundColor: 'transparent',
                yAxisID: 'y1',
                tension: 0.35,
                borderDash: [5, 5],
                pointBackgroundColor: '#d97706',
                pointRadius: 4
            }
        ]
    };
    chartTrendLine.update();
}

// 15. BENCHMARK OPERATOR
function updateOperatorBenchmark(data) {
    const container = document.getElementById('operatorBenchmarkContainer');
    if (!container) return;
    container.innerHTML = '';

    const opGroup = {};
    data.forEach(d => {
        if (!opGroup[d.operator]) {
            opGroup[d.operator] = { count: 0, sumDl: 0, sumRsrp: 0, sumLat: 0 };
        }
        opGroup[d.operator].count++;
        opGroup[d.operator].sumDl += d.download;
        opGroup[d.operator].sumRsrp += d.rsrp;
        opGroup[d.operator].sumLat += d.latency;
    });

    const operators = Object.keys(opGroup);
    if (operators.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Tidak ada data operator.</p>`;
        return;
    }

    operators.forEach(op => {
        const g = opGroup[op];
        const avgDl = (g.sumDl / g.count).toFixed(1);
        const avgRsrp = (g.sumRsrp / g.count).toFixed(1);
        const avgLat = Math.round(g.sumLat / g.count);

        const card = document.createElement('div');
        card.className = "bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5";
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-teal-600"></span> ${op}
                </span>
                <span class="text-[10px] text-slate-500 font-mono font-semibold">${g.count} Sampel</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-200">
                <div>
                    <span class="text-[9px] text-slate-500 block">Download</span>
                    <strong class="text-teal-700 font-mono">${avgDl} M</strong>
                </div>
                <div>
                    <span class="text-[9px] text-slate-500 block">Latency</span>
                    <strong class="text-amber-600 font-mono">${avgLat} ms</strong>
                </div>
                <div>
                    <span class="text-[9px] text-slate-500 block">Avg RSRP</span>
                    <strong class="text-indigo-600 font-mono">${avgRsrp} dBm</strong>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 16. TABEL RINGKASAN
function updateSummaryTable(data) {
    const tbody = document.getElementById('summaryTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center p-6 text-slate-400">Tidak ada data sesuai kriteria filter.</td></tr>`;
        return;
    }

    const groups = {};
    data.forEach(d => {
        const key = `${d.location}|||${d.operator}`;
        if (!groups[key]) groups[key] = { location: d.location, operator: d.operator, rsrps: [] };
        groups[key].rsrps.push(d.rsrp);
    });

    Object.values(groups).forEach(g => {
        const count = g.rsrps.length;
        const avgRsrp = (g.rsrps.reduce((a, b) => a + b, 0) / count).toFixed(1);

        const sorted = [...g.rsrps].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const medianRsrp = (sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2).toFixed(1);

        const weakCount = g.rsrps.filter(r => r < -100).length;
        const weakPct = ((weakCount / count) * 100).toFixed(0);

        let badge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Stabil</span>`;
        if (weakPct > 50) {
            badge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Perlu Optimasi</span>`;
        } else if (weakPct > 0) {
            badge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Sedang</span>`;
        }

        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition";
        tr.innerHTML = `
            <td class="p-3.5 font-semibold text-slate-900">${g.location}</td>
            <td class="p-3.5"><span class="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 border border-slate-200 font-semibold text-[11px]">${g.operator}</span></td>
            <td class="p-3.5 text-center font-mono font-bold text-slate-700">${count}</td>
            <td class="p-3.5 text-right font-mono text-teal-700 font-semibold">${avgRsrp} dBm</td>
            <td class="p-3.5 text-right font-mono text-slate-600">${medianRsrp} dBm</td>
            <td class="p-3.5 text-right font-mono font-bold ${weakPct > 0 ? 'text-rose-600' : 'text-slate-600'}">${weakPct}%</td>
            <td class="p-3.5 text-center">${badge}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 17. TABEL RAW DATA DENGAN TOMBOL EDIT & HAPUS
let currentRawSearchTerm = '';
function handleRawTableSearch() {
    const input = document.getElementById('rawSearchInput');
    currentRawSearchTerm = (input ? input.value : '').toLowerCase().trim();
    const locFilter = document.getElementById('locationFilter').value;
    const opFilter = document.getElementById('operatorFilter').value;
    const qualFilter = document.getElementById('signalQualityFilter').value;

    const filtered = activeDataset.filter(d => {
        const matchLoc = (locFilter === 'ALL' || d.location === locFilter);
        const matchOp = (opFilter === 'ALL' || d.operator === opFilter);
        let matchQual = true;
        if (qualFilter === 'GOOD') matchQual = (d.rsrp >= -90);
        else if (qualFilter === 'MEDIUM') matchQual = (d.rsrp >= -100 && d.rsrp < -90);
        else if (qualFilter === 'WEAK') matchQual = (d.rsrp < -100);

        const matchSearch = !currentRawSearchTerm || 
            d.location.toLowerCase().includes(currentRawSearchTerm) ||
            d.operator.toLowerCase().includes(currentRawSearchTerm);

        return matchLoc && matchOp && matchQual && matchSearch;
    });

    updateRawDataTable(filtered);
}

function updateRawDataTable(data) {
    const tbody = document.getElementById('rawDataTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" class="text-center p-6 text-slate-400">Tidak ada log data ditemukan.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const cat = getSignalCategory(item.rsrp);
        const earthUrl = getGoogleEarth3DUrl(item.lat, item.lng);
        const mapsUrl = getGoogleMapsDirectUrl(item.lat, item.lng);

        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition text-slate-700";
        tr.innerHTML = `
            <td class="p-3 font-mono text-[11px] text-slate-500">${item.timestamp}</td>
            <td class="p-3">
                <span class="font-semibold text-slate-900 block">${item.location}</span>
                <span class="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                    <span>${item.lat.toFixed(6)}, ${item.lng.toFixed(6)}</span>
                    <button onclick="copyCoordinates(${item.lat}, ${item.lng})" class="text-slate-400 hover:text-teal-700" title="Salin Lat, Lng"><i class="fa-regular fa-copy"></i></button>
                </span>
            </td>
            <td class="p-3"><span class="font-bold text-teal-700">${item.operator}</span></td>
            <td class="p-3 text-right font-mono font-extrabold" style="color:${cat.color}">${item.rsrp}</td>
            <td class="p-3 text-right font-mono text-slate-500">${item.rsrq}</td>
            <td class="p-3 text-right font-mono text-slate-500">${item.sinr}</td>
            <td class="p-3 text-right font-mono text-slate-700">${item.download} / ${item.upload}</td>
            <td class="p-3 text-right font-mono text-amber-600 font-semibold">${item.latency} ms</td>
            <td class="p-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${cat.badgeClass}">${cat.name}</span></td>
            <td class="p-3 text-center no-print">
                <div class="flex items-center justify-center gap-1">
                    <a href="${earthUrl}" target="_blank" class="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold inline-flex items-center gap-1 transition" title="Buka Google Earth 3D (Pin GPS)">
                        <i class="fa-solid fa-earth-americas text-blue-600"></i> Earth
                    </a>
                    <a href="${mapsUrl}" target="_blank" class="p-1 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 text-[10px] transition" title="Buka di Google Maps">
                        <i class="fa-solid fa-location-dot text-rose-500"></i>
                    </a>
                </div>
            </td>
            <td class="p-3 text-center no-print">
                <div class="flex items-center justify-center gap-1">
                    <button onclick="openEditModal(${item.id})" class="text-amber-600 hover:text-amber-800 p-1.5 rounded-lg hover:bg-amber-50 transition" title="Edit Log Data">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="confirmDeleteRecord(${item.id})" class="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition" title="Hapus Data">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 18. FITUR CRUD: EDIT DATA LOG
function openEditModal(id) {
    const item = activeDataset.find(d => d.id === id);
    if (!item) {
        showToast("Data log tidak ditemukan.", true);
        return;
    }

    document.getElementById('editId').value = item.id;
    document.getElementById('editLocation').value = item.location;
    document.getElementById('editOperator').value = item.operator;
    document.getElementById('editRSRP').value = item.rsrp;
    document.getElementById('editRSRQ').value = item.rsrq;
    document.getElementById('editSINR').value = item.sinr;
    document.getElementById('editDownload').value = item.download;
    document.getElementById('editUpload').value = item.upload;
    document.getElementById('editLatency').value = item.latency;
    document.getElementById('editLat').value = item.lat;
    document.getElementById('editLng').value = item.lng;
    document.getElementById('editTerrain').value = item.terrain || '';

    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

function handleEditFormSubmit(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const index = activeDataset.findIndex(d => d.id === id);

    if (index === -1) {
        showToast("Gagal memperbarui data: ID tidak ditemukan.", true);
        return;
    }

    // Update data pada array
    activeDataset[index] = {
        ...activeDataset[index],
        location: document.getElementById('editLocation').value,
        operator: document.getElementById('editOperator').value,
        lat: parseFloat(document.getElementById('editLat').value),
        lng: parseFloat(document.getElementById('editLng').value),
        rsrp: parseFloat(document.getElementById('editRSRP').value),
        rsrq: parseFloat(document.getElementById('editRSRQ').value),
        sinr: parseFloat(document.getElementById('editSINR').value),
        download: parseFloat(document.getElementById('editDownload').value),
        upload: parseFloat(document.getElementById('editUpload').value),
        latency: parseInt(document.getElementById('editLatency').value),
        terrain: document.getElementById('editTerrain').value
    };

    saveDatasetToStorage();
    closeEditModal();
    populateFilterOptions();
    applyFilters();
    showToast(`Data log "${activeDataset[index].location}" berhasil diperbarui!`);
}

// 19. FITUR CRUD: HAPUS DATA LOG DENGAN KONFIRMASI
function confirmDeleteRecord(id) {
    const item = activeDataset.find(d => d.id === id);
    const locName = item ? item.location : "titik ini";

    if (confirm(`Apakah Anda yakin ingin menghapus data log pengukuran di "${locName}"?`)) {
        deleteRecord(id);
    }
}

function deleteRecord(id) {
    activeDataset = activeDataset.filter(d => d.id !== id);
    saveDatasetToStorage();
    populateFilterOptions();
    applyFilters();
    showToast('Data log pengukuran telah dihapus.');
}

// 20. FITUR CRUD: TAMBAH DATA LOG BARU
function openAddModal() {
    document.getElementById('addModal').classList.remove('hidden');
    autoFillMandehCenter();
}

function closeAddModal() {
    document.getElementById('addModal').classList.add('hidden');
}

function autoFillMandehCenter() {
    document.getElementById('inputLat').value = -1.183400;
    document.getElementById('inputLng').value = 100.417000;
}

function autoFillNyaloCenter() {
    document.getElementById('inputLat').value = -1.189500;
    document.getElementById('inputLng').value = 100.428500;
}

function getCurrentGPS(targetPrefix = 'input') {
    if ("geolocation" in navigator) {
        showToast("Mengakses sensor GPS perangkat...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById(`${targetPrefix}Lat`).value = position.coords.latitude.toFixed(6);
                document.getElementById(`${targetPrefix}Lng`).value = position.coords.longitude.toFixed(6);
                showToast("Koordinat GPS berhasil diperoleh!");
            },
            (error) => {
                showToast("Gagal mengambil GPS otomatis. Mengisi titik default Mandeh.", true);
                if (targetPrefix === 'input') autoFillMandehCenter();
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    } else {
        showToast("Perangkat tidak mendukung geolokasi GPS.", true);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newRecord = {
        id: Date.now(),
        timestamp: dateStr,
        location: document.getElementById('inputLocation').value,
        operator: document.getElementById('inputOperator').value,
        lat: parseFloat(document.getElementById('inputLat').value),
        lng: parseFloat(document.getElementById('inputLng').value),
        rsrp: parseFloat(document.getElementById('inputRSRP').value),
        rsrq: parseFloat(document.getElementById('inputRSRQ').value),
        sinr: parseFloat(document.getElementById('inputSINR').value),
        download: parseFloat(document.getElementById('inputDownload').value),
        upload: parseFloat(document.getElementById('inputUpload').value),
        latency: parseInt(document.getElementById('inputLatency').value),
        terrain: document.getElementById('inputTerrain') ? document.getElementById('inputTerrain').value : "Input lapangan baru di pesisir Mandeh / Sei Nyalo"
    };

    activeDataset.unshift(newRecord);
    saveDatasetToStorage();
    closeAddModal();
    populateFilterOptions();
    applyFilters();
    showToast('Log pengukuran Mandeh berhasil disimpan!');
    document.getElementById('addDataForm').reset();
}

// 21. MODAL GOOGLE EARTH DENGAN DETAIL KOORDINAT LENGKAP
function openEarthModal() {
    const modal = document.getElementById('earthModal');
    const select = document.getElementById('earthLocationSelect');
    select.innerHTML = '';

    activeDataset.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = `${item.location} [${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}] (${item.operator} • ${item.rsrp} dBm)`;
        select.appendChild(opt);
    });

    updateEarthDetails();
    modal.classList.remove('hidden');
}

function closeEarthModal() {
    document.getElementById('earthModal').classList.add('hidden');
}

function updateEarthDetails() {
    const select = document.getElementById('earthLocationSelect');
    const container = document.getElementById('earthLocationDetails');
    const launchBtn = document.getElementById('btnLaunchEarth3D');
    const mapsModalBtn = document.getElementById('btnLaunchMapsModal');
    const selectedId = parseInt(select.value);

    const item = activeDataset.find(d => d.id === selectedId) || activeDataset[0];
    if (!item) return;

    const cat = getSignalCategory(item.rsrp);
    const earthUrl = getGoogleEarth3DUrl(item.lat, item.lng);
    const mapsUrl = getGoogleMapsDirectUrl(item.lat, item.lng);
    launchBtn.href = earthUrl;
    if (mapsModalBtn) mapsModalBtn.href = mapsUrl;

    container.innerHTML = `
        <div class="flex items-start justify-between gap-3">
            <div>
                <h5 class="text-sm font-extrabold text-slate-900">${item.location}</h5>
                <span class="text-xs text-teal-700 font-bold">${item.operator}</span>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${cat.badgeClass}">${cat.name}</span>
        </div>

        <div class="bg-blue-50/90 rounded-2xl p-3.5 border border-blue-200 space-y-2">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <i class="fa-solid fa-crosshairs text-blue-600"></i> Koordinat Target Google Earth 3D
                </span>
                <button onclick="copyCoordinates(${item.lat}, ${item.lng})" class="px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg text-[10px] font-sans font-bold text-blue-700 transition">
                    <i class="fa-regular fa-copy mr-1"></i> Salin Lintang & Bujur
                </button>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm">
                    <span class="text-[10px] text-slate-500 font-sans block">Garis Lintang (Latitude)</span>
                    <strong class="text-sm text-blue-900 font-extrabold">${item.lat.toFixed(6)}°</strong>
                </div>
                <div class="bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm">
                    <span class="text-[10px] text-slate-500 font-sans block">Garis Bujur (Longitude)</span>
                    <strong class="text-sm text-blue-900 font-extrabold">${item.lng.toFixed(6)}°</strong>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-xs font-mono">
            <div class="bg-white p-2 rounded-xl border border-slate-200"><span class="text-slate-400 block text-[10px]">RSRP Sinyal</span><strong style="color:${cat.color}">${item.rsrp} dBm</strong></div>
            <div class="bg-white p-2 rounded-xl border border-slate-200"><span class="text-slate-400 block text-[10px]">Kecepatan DL</span><strong class="text-emerald-600">${item.download} Mbps</strong></div>
            <div class="bg-white p-2 rounded-xl border border-slate-200"><span class="text-slate-400 block text-[10px]">Latensi Ping</span><strong class="text-amber-600">${item.latency} ms</strong></div>
        </div>

        <div class="p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-700 text-xs">
            <strong>Kondisi Bentang Alam / Medan:</strong>
            <p class="mt-0.5 text-slate-600">${item.terrain || 'Kawasan pesisir perairan teluk dan gugusan pulau karang Mandeh.'}</p>
        </div>
    `;
}

// 22. EKSPOR FILE KML UNTUK GOOGLE EARTH (DESKTOP & WEB)
function exportKMLGoogleEarth() {
    if (activeDataset.length === 0) {
        showToast("Tidak ada data untuk diekspor ke KML.", true);
        return;
    }

    let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Pemetaan Sinyal Telekomunikasi Mandeh &amp; Sei Nyalo - KKN UGM 2026</name>
    <description>Hasil survei kualitas jaringan operator seluler dan Menara BTS di Kawasan Wisata Mandeh dan Nagari Sei Nyalo Mudiak Aia.</description>
    
    <Style id="signalGood"><IconStyle><color>ff10b981</color><scale>1.2</scale><Icon><href>http://maps.google.com/mapfiles/kml/paddle/grn-circle.png</href></Icon></IconStyle></Style>
    <Style id="signalMedium"><IconStyle><color>fff59e0b</color><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png</href></Icon></IconStyle></Style>
    <Style id="signalWeak"><IconStyle><color>ffef4444</color><scale>1.3</scale><Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon></IconStyle></Style>
    <Style id="btsTowerStyle"><IconStyle><color>ff2563eb</color><scale>1.4</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/tower.png</href></Icon></IconStyle></Style>
`;

    // Folder Tower BTS
    kml += `  <Folder><name>Menara / Tower BTS</name>\n`;
    BTS_TOWERS.forEach(bts => {
        kml += `    <Placemark>
      <name><![CDATA[${bts.name}]]></name>
      <styleUrl>#btsTowerStyle</styleUrl>
      <description><![CDATA[
        <p><strong>Tipe:</strong> ${bts.type}</p>
        <p><strong>Operator:</strong> ${bts.operator}</p>
        <p><strong>Radius Jangkauan:</strong> ${(bts.radiusMeters / 1000).toFixed(1)} km</p>
        <p><strong>Tinggi:</strong> ${bts.height}</p>
        <p><strong>Frekuensi:</strong> ${bts.frequency}</p>
        <p><strong>Deskripsi:</strong> ${bts.description}</p>
      ]]></description>
      <Point><coordinates>${bts.lng},${bts.lat},0</coordinates></Point>
    </Placemark>\n`;
    });
    kml += `  </Folder>\n`;

    // Folder Titik Pengukuran Sinyal
    kml += `  <Folder><name>Titik Log Pengukuran Sinyal</name>\n`;
    activeDataset.forEach(d => {
        let styleId = "signalGood";
        if (d.rsrp < -100) styleId = "signalWeak";
        else if (d.rsrp < -90) styleId = "signalMedium";

        kml += `    <Placemark>
      <name><![CDATA[${d.location} (${d.operator})]]></name>
      <styleUrl>#${styleId}</styleUrl>
      <description><![CDATA[
        <p><strong>Provider:</strong> ${d.operator}</p>
        <p><strong>Garis Lintang:</strong> ${d.lat.toFixed(6)}</p>
        <p><strong>Garis Bujur:</strong> ${d.lng.toFixed(6)}</p>
        <p><strong>RSRP Daya:</strong> ${d.rsrp} dBm</p>
        <p><strong>Download:</strong> ${d.download} Mbps | <strong>Upload:</strong> ${d.upload} Mbps</p>
        <p><strong>Latency Ping:</strong> ${d.latency} ms</p>
        <p><strong>Kondisi Medan:</strong> ${d.terrain || '-'}</p>
      ]]></description>
      <Point><coordinates>${d.lng},${d.lat},0</coordinates></Point>
    </Placemark>\n`;
    });
    kml += `  </Folder>\n`;

    kml += `  </Document>\n</kml>`;

    const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Sinyal_Dan_Tower_BTS_Mandeh_GoogleEarth_${new Date().toISOString().substring(0,10)}.kml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("File KML Menara BTS & Titik Sinyal berhasil diunduh!");
}

// 23. EKSPOR RAW CSV
function exportRawCSV() {
    if (activeDataset.length === 0) {
        showToast("Tidak ada data untuk diekspor.", true);
        return;
    }

    const headers = ["ID", "Timestamp", "Location", "Operator", "Latitude", "Longitude", "RSRP_dBm", "RSRQ_dB", "SINR_dB", "Download_Mbps", "Upload_Mbps", "Latency_ms", "Terrain"];
    const rows = activeDataset.map(d => [
        d.id, `"${d.timestamp}"`, `"${d.location}"`, `"${d.operator}"`, d.lat, d.lng, d.rsrp, d.rsrq, d.sinr, d.download, d.upload, d.latency, `"${d.terrain || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Log_Sinyal_Mandeh_Nyalo_UGM_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Raw CSV berhasil diunduh.");
}

// 24. EKSPOR SUMMARY CSV
function exportSummaryCSV() {
    const groups = {};
    activeDataset.forEach(d => {
        const key = `${d.location}|||${d.operator}`;
        if (!groups[key]) groups[key] = { location: d.location, operator: d.operator, rsrps: [] };
        groups[key].rsrps.push(d.rsrp);
    });

    const headers = ["Location", "Operator", "Sample_Count", "Avg_RSRP_dBm", "Median_RSRP_dBm", "Weak_Signal_Percentage"];
    const rows = Object.values(groups).map(g => {
        const count = g.rsrps.length;
        const avgRsrp = (g.rsrps.reduce((a, b) => a + b, 0) / count).toFixed(1);
        const sorted = [...g.rsrps].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const medianRsrp = (sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2).toFixed(1);
        const weakCount = g.rsrps.filter(r => r < -100).length;
        const weakPct = ((weakCount / count) * 100).toFixed(1);

        return [`"${g.location}"`, `"${g.operator}"`, count, avgRsrp, medianRsrp, `"${weakPct}%"`];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Ringkasan_Agregasi_Mandeh_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Ringkasan CSV berhasil diunduh.");
}

function triggerCSVUpload() {
    document.getElementById('csvFileInput').click();
}

function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        parseCSVAndAppend(e.target.result);
    };
    reader.readAsText(file);
}

function parseCSVAndAppend(csvText) {
    const lines = csvText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
        showToast("Format CSV tidak valid atau baris kosong.", true);
        return;
    }

    let addedCount = 0;
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
        if (cols.length >= 8) {
            const newRec = {
                id: Date.now() + i,
                timestamp: cols[1] || new Date().toISOString().substring(0,16),
                location: cols[2] || "Import CSV Lokasi",
                operator: cols[3] || "Telkomsel",
                lat: parseFloat(cols[4]) || -1.1834,
                lng: parseFloat(cols[5]) || 100.4170,
                rsrp: parseFloat(cols[6]) || -95.0,
                rsrq: parseFloat(cols[7]) || -10.0,
                sinr: parseFloat(cols[8]) || 10.0,
                download: parseFloat(cols[9]) || 12.0,
                upload: parseFloat(cols[10]) || 5.0,
                latency: parseInt(cols[11]) || 40,
                terrain: cols[12] || "Data import CSV lapangan"
            };
            activeDataset.unshift(newRec);
            addedCount++;
        }
    }

    if (addedCount > 0) {
        saveDatasetToStorage();
        populateFilterOptions();
        applyFilters();
        showToast(`Berhasil mengimpor ${addedCount} baris data CSV!`);
    } else {
        showToast("Gagal memproses baris data CSV.", true);
    }
}

function resetToDemoData() {
    activeDataset = [...FIXED_HISTORICAL_DATA];
    saveDatasetToStorage();
    populateFilterOptions();
    resetFilters();
    showToast('Data pengukuran historis tahun lalu berhasil dipulihkan.');
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');

    toastMsg.innerText = message;
    if (isError) {
        toastIcon.className = "fa-solid fa-circle-xmark text-rose-400 text-base";
    } else {
        toastIcon.className = "fa-solid fa-circle-check text-emerald-400 text-base";
    }

    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3500);
}

// ============================================================
// EXTENDED TAB SYSTEM — support new tabs (ai, recommender, qrcode, report-letter)
// ============================================================
function switchTab(tabId) {
    window.currentActiveTab = tabId;

    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.add('hidden'));

    const targetPane = document.getElementById('tab-' + tabId);
    if (targetPane) targetPane.classList.remove('hidden');

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active-tab', 'bg-teal-600', 'text-white', 'border-teal-600', 'shadow-sm');
        btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
    });

    const activeBtn = document.getElementById('nav-' + tabId);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
        activeBtn.classList.add('active-tab', 'bg-teal-600', 'text-white', 'border-teal-600', 'shadow-sm');
    }

    if (history.replaceState) history.replaceState(null, null, '#' + tabId);

    if (tabId === 'map') {
        setTimeout(() => { if (typeof leafletMap !== 'undefined' && leafletMap) leafletMap.invalidateSize(); }, 150);
    } else if (tabId === 'analytics') {
        setTimeout(() => {
            if (typeof chartSpeedBar !== 'undefined' && chartSpeedBar) chartSpeedBar.resize();
            if (typeof chartCategoryDoughnut !== 'undefined' && chartCategoryDoughnut) chartCategoryDoughnut.resize();
            if (typeof chartTrendLine !== 'undefined' && chartTrendLine) chartTrendLine.resize();
        }, 100);
    } else if (tabId === 'earth') {
        if (typeof updateHubEarthDetails === 'function') updateHubEarthDetails();
    } else if (tabId === 'recommender') {
        renderRecommendations();
    }
}

// Fix initLeafletMap — use googleHybrid as default layer, remove voyager/dark
function initLeafletMap() {
    if (typeof leafletMap !== 'undefined' && leafletMap !== null) leafletMap.remove();

    leafletMap = L.map('map', {
        center: [-1.1850, 100.4150],
        zoom: 13,
        zoomControl: true,
        attributionControl: true
    });

    baseLayers = {
        googleHybrid: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20, attribution: '© Google Maps Satelit'
        }),
        googleRoadmap: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20, attribution: '© Google Maps Jalan'
        }),
        googleTerrain: L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20, attribution: '© Google Maps Terrain'
        })
    };

    currentBaseLayer = baseLayers.googleHybrid;
    currentBaseLayer.addTo(leafletMap);

    btsLayerGroup = L.layerGroup().addTo(leafletMap);
    if (typeof mapRadiusGroup !== 'undefined') mapRadiusGroup = L.layerGroup().addTo(leafletMap);
    mapMarkersGroup = L.layerGroup().addTo(leafletMap);

    if (typeof renderBtsTowers === 'function') renderBtsTowers();
    setTimeout(() => { if (leafletMap) leafletMap.invalidateSize(); }, 300);
}

// Fix switchBaseMap — only 3 layers
function switchBaseMap(type) {
    if (!leafletMap || !baseLayers || !baseLayers[type]) return;

    leafletMap.removeLayer(currentBaseLayer);
    currentBaseLayer = baseLayers[type];
    currentBaseLayer.addTo(leafletMap);

    const layerKeys = ['googleHybrid', 'googleRoadmap', 'googleTerrain'];
    layerKeys.forEach(k => {
        const btn = document.getElementById('btnLayer' + k.charAt(0).toUpperCase() + k.slice(1));
        if (btn) {
            if (k === type) {
                btn.className = 'px-2.5 py-1 rounded-lg bg-teal-600 text-white shadow-sm transition';
            } else {
                btn.className = 'px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 transition';
            }
        }
    });

    const names = { googleHybrid: 'Satelit', googleRoadmap: 'Jalan', googleTerrain: 'Relief' };
    if (typeof showToast === 'function') showToast('Tampilan peta: ' + (names[type] || type));
}
// ============================================================
// RECOMMENDER ENGINE — QRIS & LIVE STREAMING SPOTS
// ============================================================
function renderRecommendations() {
    if (typeof activeDataset === 'undefined' || activeDataset.length === 0) {
        const empty = '<div class="text-center text-slate-400 text-xs py-8"><i class="fa-solid fa-circle-info text-2xl block mb-2"></i>Tambahkan data log terlebih dahulu</div>';
        const qC = document.getElementById('qrisRecommendations');
        const sC = document.getElementById('streamingRecommendations');
        const bC = document.getElementById('blankSpotWarnings');
        if (qC) qC.innerHTML = empty;
        if (sC) sC.innerHTML = empty;
        if (bC) bC.innerHTML = empty;
        return;
    }

    const data = activeDataset;

    // QRIS: Upload >= 5 Mbps AND Latency <= 50ms
    const qrisSpots = data.filter(d => (d.upload || 0) >= 5 && (d.latency || 999) <= 50).sort((a, b) => b.upload - a.upload);
    const qrisContainer = document.getElementById('qrisRecommendations');
    if (qrisContainer) {
        if (qrisSpots.length === 0) {
            qrisContainer.innerHTML = '<div class="text-center text-slate-400 text-xs py-8"><i class="fa-solid fa-circle-xmark text-2xl block mb-2"></i>Belum ada spot yang memenuhi syarat QRIS stabil</div>';
        } else {
            qrisContainer.innerHTML = qrisSpots.map((d, i) => {
                const rankBadge = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
                return `<div class="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span class="text-lg shrink-0">${rankBadge}</span>
                    <div class="flex-grow min-w-0">
                        <p class="text-xs font-bold text-slate-900 truncate">${d.location}</p>
                        <p class="text-[10px] text-emerald-700 font-semibold">${d.operator} · Upload ${d.upload} Mbps · Latency ${d.latency}ms</p>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">QRIS ✓</span>
                </div>`;
            }).join('');
        }
    }

    // Streaming: Upload >= 8 Mbps AND SINR >= 10 dB
    const streamSpots = data.filter(d => (d.upload || 0) >= 8 && (d.sinr || 0) >= 10).sort((a, b) => b.upload - a.upload);
    const streamContainer = document.getElementById('streamingRecommendations');
    if (streamContainer) {
        if (streamSpots.length === 0) {
            streamContainer.innerHTML = '<div class="text-center text-slate-400 text-xs py-8"><i class="fa-solid fa-circle-xmark text-2xl block mb-2"></i>Belum ada spot yang memenuhi syarat streaming</div>';
        } else {
            streamContainer.innerHTML = streamSpots.map((d, i) => {
                const rankBadge = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
                return `<div class="flex items-center gap-3 p-3 bg-rose-50 rounded-2xl border border-rose-100">
                    <span class="text-lg shrink-0">${rankBadge}</span>
                    <div class="flex-grow min-w-0">
                        <p class="text-xs font-bold text-slate-900 truncate">${d.location}</p>
                        <p class="text-[10px] text-rose-700 font-semibold">${d.operator} · Upload ${d.upload} Mbps · SINR ${d.sinr} dB</p>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 shrink-0">🎥 Live OK</span>
                </div>`;
            }).join('');
        }
    }

    // Blank Spots
    const blankSpots = data.filter(d => (d.rsrp || 0) < -100).sort((a, b) => a.rsrp - b.rsrp);
    const blankContainer = document.getElementById('blankSpotWarnings');
    if (blankContainer) {
        if (blankSpots.length === 0) {
            blankContainer.innerHTML = '<div class="p-5 text-center text-emerald-600 text-xs"><i class="fa-solid fa-circle-check text-2xl block mb-2"></i>Tidak ada zona blank spot terdeteksi pada dataset saat ini.</div>';
        } else {
            blankContainer.innerHTML = '<div class="p-4 space-y-3">' + blankSpots.map(d => `
                <div class="flex items-start gap-3 p-3 bg-rose-50 rounded-2xl border border-rose-200">
                    <i class="fa-solid fa-triangle-exclamation text-rose-500 mt-0.5 shrink-0"></i>
                    <div class="flex-grow">
                        <p class="text-xs font-bold text-rose-900">${d.location}</p>
                        <p class="text-[10px] text-slate-600 mt-0.5">${d.operator} · RSRP <strong class="text-rose-600">${d.rsrp} dBm</strong> · Download ${d.download} Mbps · Latency ${d.latency}ms</p>
                        <p class="text-[10px] text-rose-700 mt-1 font-medium">⚠ Sinyal kritis — tidak layak QRIS/streaming. Perlu repeater atau BTS baru.</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <a href="${getGoogleMapsDirectUrl(d.lat, d.lng)}" target="_blank" class="text-[10px] px-2 py-1 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-700 font-bold hover:bg-emerald-100 transition whitespace-nowrap flex items-center gap-1">
                            <i class="fa-solid fa-location-dot"></i> Maps
                        </a>
                        <button onclick="copyCoordinates(${d.lat}, ${d.lng})" class="text-[10px] px-2 py-1 bg-white border border-rose-200 rounded-lg text-rose-700 font-bold hover:bg-rose-50 transition whitespace-nowrap">Salin GPS</button>
                    </div>
                </div>
            `).join('') + '</div>';
        }
    }
}

// ============================================================
// QR CODE CROWDSOURCING GENERATOR
// ============================================================
function generateQRCode() {
    const locationEl = document.getElementById('qrLocationSelect');
    const operatorEl = document.getElementById('qrOperatorSelect');
    if (!locationEl || !operatorEl) return;

    const location = locationEl.value;
    const operator = operatorEl.value;

    const baseUrl = window.location.href.split('#')[0];
    const params = new URLSearchParams({ loc: location, op: operator, src: 'qr-crowdsource' });
    const reportUrl = baseUrl + '#crud?' + params.toString();

    const qrSize = 200;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(reportUrl)}&color=0d9488&bgcolor=ffffff&ecc=M&margin=10`;

    const qrDisplay = document.getElementById('qrCodeDisplay');
    const qrInfo = document.getElementById('qrCodeInfo');
    if (qrDisplay) qrDisplay.classList.add('hidden');
    if (qrInfo) qrInfo.classList.remove('hidden');

    const canvas = document.getElementById('qrCodeCanvas');
    if (canvas) {
        canvas.innerHTML = `
            <div class="p-4 bg-white border-2 border-teal-500 rounded-2xl shadow-lg text-center">
                <img src="${qrApiUrl}" alt="QR Code ${location}" class="w-48 h-48 rounded-xl mx-auto"
                    onerror="this.alt='QR Code (Butuh internet)'; this.style.display='none'; this.parentElement.innerHTML += '<div class=\\'text-xs text-slate-400 py-8\\'>Hubungkan internet untuk generate QR</div>'">
                <div class="text-center mt-2 text-[10px] font-bold text-teal-700">📡 Lapor Sinyal di Sini</div>
            </div>
        `;
    }

    const locationLabel = document.getElementById('qrLocationLabel');
    if (locationLabel) locationLabel.textContent = '📍 ' + location + ' | ' + operator;

    const urlDisplay = document.getElementById('qrUrlDisplay');
    if (urlDisplay) urlDisplay.textContent = reportUrl.length > 60 ? reportUrl.substring(0, 57) + '...' : reportUrl;

    window._currentQRUrl = qrApiUrl;
    window._currentQRLocation = location;
    if (typeof showToast === 'function') showToast('QR Code untuk ' + location + ' berhasil dibuat!');
}

function downloadQRCode() {
    if (!window._currentQRUrl) return;
    const link = document.createElement('a');
    link.href = window._currentQRUrl;
    link.download = 'QR_Sinyal_' + (window._currentQRLocation || 'Mandeh').replace(/[^a-zA-Z0-9]/g, '_') + '.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof showToast === 'function') showToast('QR Code PNG diunduh!');
}

// ============================================================
// SURAT REKOMENDASI RESMI AUTO-GENERATE
// ============================================================
function generateLetter() {
    const waliName = (document.getElementById('letterHeadName') || {}).value || 'Wali Nagari';
    const targetEl = document.getElementById('letterTarget');
    const subjectEl = document.getElementById('letterSubject');
    const letterNo = (document.getElementById('letterNumber') || {}).value || '470/01/KNN/X/2026';

    if (!targetEl || !subjectEl) return;
    const targetFull = targetEl.options[targetEl.selectedIndex].text;
    const subject = subjectEl.value;
    const subjectFull = subjectEl.options[subjectEl.selectedIndex].text;

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const data = typeof activeDataset !== 'undefined' ? activeDataset : [];
    const weak = data.filter(d => (d.rsrp || 0) < -100);
    const avgRsrp = data.length > 0 ? (data.reduce((s, d) => s + (d.rsrp || 0), 0) / data.length).toFixed(1) : '-';
    const avgDl = data.length > 0 ? (data.reduce((s, d) => s + (d.download || 0), 0) / data.length).toFixed(1) : '-';
    const weakPct = data.length > 0 ? ((weak.length / data.length) * 100).toFixed(1) : '0.0';
    const weakLocList = [...new Set(weak.map(d => d.location))].slice(0, 5);

    let subjectText = '';
    let bodyText = '';

    if (subject === 'blankspot') {
        subjectText = 'Permohonan Penanganan Wilayah Blank Spot Jaringan Seluler di Kawasan Wisata Mandeh dan Nagari Sei Nyalo Mudiak Aia';
        bodyText = `Berdasarkan hasil survei dan pengukuran lapangan yang dilaksanakan oleh Tim Kuliah Kerja Nyata - Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) Universitas Gadjah Mada Sub-unit Nagari Sei Nyalo &amp; Mandeh, Kecamatan Koto XI Tarusan, telah ditemukan <strong>${weak.length} titik lokasi</strong> yang terindikasi sebagai wilayah blank spot dengan kualitas sinyal sangat lemah (RSRP &lt; -100 dBm).

Titik-titik kritis tersebut antara lain:
${weakLocList.map((loc, i) => `${i+1}. ${loc}`).join('<br>')}
${weak.length > 5 ? `... dan ${weak.length - 5} lokasi lainnya.` : ''}

Kondisi ini berdampak langsung pada:
<ol class="list-decimal list-inside space-y-1 mt-2">
  <li>Terhambatnya akses layanan kesehatan digital dan administrasi online warga nagari;</li>
  <li>Tidak optimalnya layanan SPBE (Sistem Pemerintahan Berbasis Elektronik) di kantor nagari;</li>
  <li>Kerugian ekonomi sektor wisata akibat sulitnya transaksi digital QRIS dan pemasaran online bagi pelaku UMKM;</li>
  <li>Terbatasnya akses informasi dan pendidikan digital bagi masyarakat, khususnya pelajar.</li>
</ol>

Rata-rata kualitas sinyal terukur di kawasan ini adalah RSRP <strong>${avgRsrp} dBm</strong> dengan kecepatan unduh rata-rata <strong>${avgDl} Mbps</strong>, di mana <strong>${weakPct}%</strong> dari total sampel tergolong lemah/kritis.`;
    } else {
        subjectText = subjectFull + ' di Kawasan Wisata Mandeh dan Nagari Sei Nyalo Mudiak Aia';
        bodyText = `Berdasarkan hasil survei dan pengukuran lapangan yang dilaksanakan oleh Tim KKN-PPM UGM Sub-unit Nagari Sei Nyalo &amp; Mandeh, diperoleh data bahwa kondisi jaringan seluler di kawasan ini memerlukan perhatian serius.

Data pengukuran menunjukkan rata-rata kualitas sinyal RSRP <strong>${avgRsrp} dBm</strong> dengan throughput unduh rata-rata <strong>${avgDl} Mbps</strong>. Sebanyak <strong>${weakPct}%</strong> dari total <strong>${data.length}</strong> titik sampel terindikasi sinyal lemah/kritis.`;
    }

    const letterHtml = `
        <div id="printableOfficialLetter" style="font-family: 'Times New Roman', Times, serif; color: #000000; background: #ffffff; padding: 32px 36px; max-width: 680px; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border-radius: 8px; line-height: 1.5; font-size: 11pt;">
            <!-- Kop Surat -->
            <div style="text-align: center; border-bottom: 3px double #000000; padding-bottom: 12px; margin-bottom: 16px;">
                <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">PEMERINTAH NAGARI SEI NYALO MUDIAK AIA</div>
                <div style="font-size: 11pt; font-weight: bold;">Kecamatan Koto XI Tarusan, Kabupaten Pesisir Selatan</div>
                <div style="font-size: 11pt;">Provinsi Sumatera Barat</div>
                <div style="font-size: 8.5pt; color: #555555; margin-top: 2px;">Jl. Mandeh No. 1, Kec. Koto XI Tarusan, Kab. Pesisir Selatan 25664</div>
            </div>

            <!-- Nomor Surat & Informasi Header -->
            <table style="width: 100%; font-size: 10.5pt; margin-bottom: 14px; border-collapse: collapse;">
                <tr>
                    <td style="width: 80px; vertical-align: top;">Nomor</td>
                    <td style="width: 15px; vertical-align: top;">:</td>
                    <td style="vertical-align: top; font-weight: bold;">${letterNo}</td>
                    <td style="text-align: right; vertical-align: top;">Sei Nyalo, ${dateStr}</td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">Lampiran</td>
                    <td style="vertical-align: top;">:</td>
                    <td colspan="2" style="vertical-align: top;">1 (satu) berkas Data Pengukuran Sinyal Lapangan</td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">Perihal</td>
                    <td style="vertical-align: top;">:</td>
                    <td colspan="2" style="vertical-align: top; font-weight: bold;">${subjectText}</td>
                </tr>
            </table>

            <!-- Tujuan Surat -->
            <div style="font-size: 10.5pt; margin-bottom: 14px; line-height: 1.4;">
                <div>Kepada Yth.</div>
                <div style="font-weight: bold;">${targetFull}</div>
                <div>di Tempat</div>
            </div>

            <!-- Salam Pembuka -->
            <div style="font-size: 10.5pt; margin-bottom: 8px;">Assalamu'alaikum Warahmatullahi Wabarakatuh,</div>
            <div style="font-size: 10.5pt; margin-bottom: 10px;">Dengan hormat,</div>

            <!-- Isi Surat -->
            <div style="font-size: 10.5pt; text-align: justify; margin-bottom: 12px; line-height: 1.5;">${bodyText}</div>

            <!-- Penutup -->
            <div style="font-size: 10.5pt; text-align: justify; margin-bottom: 12px; line-height: 1.5;">
                Sehubungan dengan hal tersebut di atas, kami sangat mengharapkan perhatian dan tindak lanjut dari Bapak/Ibu untuk segera melakukan evaluasi dan intervensi terhadap kondisi infrastruktur jaringan telekomunikasi di kawasan ini, demi mendukung:
                <ol style="margin-top: 6px; margin-bottom: 6px; padding-left: 22px;">
                    <li style="margin-bottom: 4px;">Pengembangan ekonomi digital UMKM dan wisata bahari Kawasan Mandeh;</li>
                    <li style="margin-bottom: 4px;">Peningkatan kualitas layanan publik berbasis digital di tingkat nagari;</li>
                    <li style="margin-bottom: 4px;">Pemerataan akses internet yang merupakan hak konstitusional warga negara.</li>
                </ol>
            </div>

            <div style="font-size: 10.5pt; text-align: justify; margin-bottom: 8px;">Demikian surat permohonan dan rekomendasi ini kami sampaikan. Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih.</div>
            <div style="font-size: 10.5pt; margin-bottom: 18px;">Wassalamu'alaikum Warahmatullahi Wabarakatuh.</div>

            <!-- Tanda Tangan -->
            <table style="width: 100%; font-size: 10.5pt; margin-top: 24px; border-collapse: collapse;">
                <tr>
                    <td style="width: 50%; text-align: center; vertical-align: top;">
                        <div>Mengetahui,</div>
                        <div style="font-weight: bold;">Koordinator Tim KKN-PPM UGM</div>
                        <div style="font-size: 9.5pt; color: #444444;">Sub-unit Mandeh &amp; Sei Nyalo</div>
                        <div style="height: 65px;"></div>
                        <div style="font-weight: bold; border-top: 1px solid #000000; width: 170px; margin: 0 auto; padding-top: 2px;">Koordinator Lapangan</div>
                        <div style="font-size: 8.5pt; color: #555555;">NIM. 22/XXXXXX/SV/XXXXX</div>
                    </td>
                    <td style="width: 50%; text-align: center; vertical-align: top;">
                        <div>Nagari Sei Nyalo, ${dateStr}</div>
                        <div style="font-weight: bold;">Wali Nagari Sei Nyalo Mudiak Aia</div>
                        <div style="font-size: 9.5pt; color: #444444;">Kec. Koto XI Tarusan</div>
                        <div style="height: 65px;"></div>
                        <div style="font-weight: bold; border-top: 1px solid #000000; width: 170px; margin: 0 auto; padding-top: 2px;">${waliName}</div>
                        <div style="font-size: 8.5pt; color: #555555;">NIP. —</div>
                    </td>
                </tr>
            </table>

            <!-- Tembusan -->
            <div style="margin-top: 24px; padding-top: 8px; border-top: 1px solid #dddddd; font-size: 8.5pt; color: #444444;">
                <div style="font-weight: bold;">Tembusan:</div>
                <ol style="margin-top: 2px; padding-left: 18px; margin-bottom: 0;">
                    <li>Bupati Pesisir Selatan (sebagai laporan)</li>
                    <li>Kepala Dinas Komunikasi dan Informatika Kab. Pesisir Selatan</li>
                    <li>Camat Koto XI Tarusan</li>
                    <li>Arsip Nagari</li>
                </ol>
            </div>
        </div>
    `;

    const preview = document.getElementById('letterPreview');
    if (preview) {
        preview.innerHTML = letterHtml;
        // Scroll otomatis ke pratinjau surat
        preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (typeof showToast === 'function') showToast('Surat Rekomendasi berhasil ditampilkan! Silakan pilih Unduh Word atau PDF.');
}


// ============================================================
// FILTER PANEL (HAMBURGER 3 GARIS) HANDLERS
// ============================================================
function toggleMainMenu() {
    const menu = document.getElementById('mainMenuDropdown');
    const overlay = document.getElementById('mainMenuOverlay');
    if (!menu || !overlay) return;

    if (menu.classList.contains('translate-x-full')) {
        openMainMenu();
    } else {
        closeMainMenu();
    }
}

function openMainMenu() {
    const menu = document.getElementById('mainMenuDropdown');
    const overlay = document.getElementById('mainMenuOverlay');
    if (!menu || !overlay) return;

    overlay.classList.remove('hidden');
    menu.classList.remove('translate-x-full', 'invisible', 'pointer-events-none');
    menu.style.visibility = 'visible';
    menu.style.pointerEvents = 'auto';
    document.body.classList.add('overflow-hidden');
}

function closeMainMenu() {
    const menu = document.getElementById('mainMenuDropdown');
    const overlay = document.getElementById('mainMenuOverlay');
    if (!menu || !overlay) return;

    menu.classList.add('translate-x-full', 'invisible', 'pointer-events-none');
    menu.style.visibility = 'hidden';
    menu.style.pointerEvents = 'none';
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    const mainMenu = document.getElementById('mainMenuDropdown');
    if (mainMenu && !mainMenu.classList.contains('translate-x-full')) {
        closeMainMenu();
        return;
    }

    if (typeof closeAddModal === 'function') closeAddModal();
});

function toggleFilterPanel() {
    const panel = document.getElementById('filterPanel');
    const overlay = document.getElementById('filterOverlay');
    if (!panel || !overlay) return;

    const isHidden = panel.classList.contains('translate-x-full');
    if (isHidden) {
        openFilterPanel();
    } else {
        closeFilterPanel();
    }
}

function openFilterPanel() {
    const panel = document.getElementById('filterPanel');
    const overlay = document.getElementById('filterOverlay');
    if (!panel || !overlay) return;

    overlay.classList.remove('hidden');
    panel.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');
    updateFilterPanelTags();
}

function closeFilterPanel() {
    const panel = document.getElementById('filterPanel');
    const overlay = document.getElementById('filterOverlay');
    if (!panel || !overlay) return;

    panel.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function updateFilterPanelTags() {
    const locFilter = (document.getElementById('locationFilter') || {}).value || 'ALL';
    const opFilter = (document.getElementById('operatorFilter') || {}).value || 'ALL';
    const qualFilter = (document.getElementById('signalQualityFilter') || {}).value || 'ALL';
    const tagsContainer = document.getElementById('filterTagsPanel');
    const dot = document.getElementById('filterActiveDot');

    const isAnyActive = (locFilter !== 'ALL' || opFilter !== 'ALL' || qualFilter !== 'ALL');
    if (dot) {
        if (isAnyActive) dot.classList.remove('hidden');
        else dot.classList.add('hidden');
    }

    if (!tagsContainer) return;

    if (!isAnyActive) {
        tagsContainer.innerHTML = '<span class="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">Belum ada filter aktif</span>';
        return;
    }

    let tagsHtml = '';
    if (locFilter !== 'ALL') {
        tagsHtml += `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-full text-xs font-medium"><i class="fa-solid fa-map-pin text-[10px]"></i> ${locFilter}</span>`;
    }
    if (opFilter !== 'ALL') {
        tagsHtml += `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-medium"><i class="fa-solid fa-signal text-[10px]"></i> ${opFilter}</span>`;
    }
    if (qualFilter !== 'ALL') {
        const qText = qualFilter === 'GOOD' ? 'Sangat Baik' : (qualFilter === 'MEDIUM' ? 'Sedang' : 'Lemah/Kritis');
        tagsHtml += `<span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium"><i class="fa-solid fa-wifi text-[10px]"></i> ${qText}</span>`;
    }
    tagsContainer.innerHTML = tagsHtml;
}


// Helper: Buka Kawasan Mandeh atau Titik Terpilih di Google Maps
function openMapsCurrentLocation() {
    if (typeof leafletMap !== 'undefined' && leafletMap) {
        const center = leafletMap.getCenter();
        const url = getGoogleMapsDirectUrl(center.lat, center.lng);
        window.open(url, '_blank');
    } else {
        window.open('https://www.google.com/maps/search/?api=1&query=-1.185000,100.415000', '_blank');
    }
}


// ============================================================
// FITUR LEBARKAN PETA (FULLSCREEN / EXPAND VIEW)
// ============================================================
let isMapExpanded = false;

function toggleMapFullscreen() {
    const card = document.getElementById('mapCardContainer');
    const icon = document.getElementById('iconMapFullscreen');
    const text = document.getElementById('textMapFullscreen');
    const btn = document.getElementById('btnMapFullscreen');
    if (!card) return;

    isMapExpanded = !isMapExpanded;

    if (isMapExpanded) {
        card.classList.add('map-fullscreen-card');
        document.body.classList.add('overflow-hidden');
        if (icon) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        }
        if (text) text.textContent = 'Kecilkan';
        if (btn) {
            btn.classList.remove('bg-slate-100', 'text-slate-700');
            btn.classList.add('bg-teal-600', 'text-white', 'border-teal-600');
        }
        if (typeof showToast === 'function') showToast('Peta dilebarkan ke layar penuh (Tekan Esc untuk keluar).');
    } else {
        card.classList.remove('map-fullscreen-card');
        document.body.classList.remove('overflow-hidden');
        if (icon) {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        }
        if (text) text.textContent = 'Lebarkan';
        if (btn) {
            btn.classList.add('bg-slate-100', 'text-slate-700');
            btn.classList.remove('bg-teal-600', 'text-white', 'border-teal-600');
        }
    }

    // Invalidate size agar leaflet menyesuaikan dimensi layar baru
    setTimeout(() => {
        if (typeof leafletMap !== 'undefined' && leafletMap) {
            leafletMap.invalidateSize();
            if (activeDataset && activeDataset.length > 0) {
                const bounds = activeDataset.map(d => [d.lat, d.lng]);
                leafletMap.fitBounds(bounds, { padding: [50, 50], animate: true });
            }
        }
    }, 200);
}

// Tutup fullscreen saat tekan ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMapExpanded) {
        toggleMapFullscreen();
    }
});


// ============================================================
// TOGGLE INDIKATOR SINYAL RSRP (FLOATING LEGEND)
// ============================================================
let isLegendVisible = true;

function toggleMapLegend() {
    const legend = document.getElementById('mapSignalLegend');
    const btn = document.getElementById('btnToggleLegend');
    const text = document.getElementById('textToggleLegend');
    if (!legend) return;

    isLegendVisible = !isLegendVisible;

    if (isLegendVisible) {
        legend.classList.remove('hidden');
        if (btn) {
            btn.classList.remove('bg-slate-100', 'text-slate-600', 'border-slate-300');
            btn.classList.add('bg-teal-50', 'text-teal-700', 'border-teal-200');
        }
        if (text) text.textContent = 'Indikator Sinyal';
        if (typeof showToast === 'function') showToast('Indikator sinyal ditampilkan.');
    } else {
        legend.classList.add('hidden');
        if (btn) {
            btn.classList.remove('bg-teal-50', 'text-teal-700', 'border-teal-200');
            btn.classList.add('bg-slate-100', 'text-slate-600', 'border-slate-300');
        }
        if (text) text.textContent = 'Indikator (Sembunyi)';
        if (typeof showToast === 'function') showToast('Indikator sinyal disembunyikan agar tampilan peta lebih leluasa.');
    }
}

// ============================================================
// GENERATOR & DOWNLOAD DOKUMEN PDF & WORD (TANPA DIALOG PRINT)
// ============================================================
function downloadLetterPDF() {
    // Pastikan surat sudah di-generate
    const checkEl = document.getElementById('printableOfficialLetter');
    if (!checkEl) {
        generateLetter();
    }
    
    const targetElement = document.getElementById('printableOfficialLetter');
    if (!targetElement) return;

    const letterNo = (document.getElementById('letterNumber') || {}).value || 'Surat_Rekomendasi';
    const cleanFileName = `Surat_Rekomendasi_Mandeh_${letterNo.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    // Clone element dan buat wrapper di luar viewport agar styling 100% utuh tanpa pengaruh scroll/overflow
    const clone = targetElement.cloneNode(true);
    clone.style.width = '700px';
    clone.style.maxWidth = '700px';
    clone.style.boxShadow = 'none';
    clone.style.margin = '0';
    clone.style.padding = '24px 30px';
    clone.style.background = '#ffffff';

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '0';
    container.style.width = '700px';
    container.style.background = '#ffffff';
    container.style.zIndex = '-9999';
    container.appendChild(clone);
    document.body.appendChild(container);

    const opt = {
        margin:       [8, 10, 8, 10],
        filename:     cleanFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            letterRendering: true,
            scrollY: 0,
            scrollX: 0
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (typeof showToast === 'function') showToast('Sedang memproses dan mengunduh berkas PDF resmi...');

    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(clone).save().then(() => {
            document.body.removeChild(container);
            if (typeof showToast === 'function') showToast('File PDF Surat Rekomendasi berhasil diunduh!');
        }).catch(err => {
            console.error('PDF error:', err);
            document.body.removeChild(container);
            window.print();
        });
    } else {
        document.body.removeChild(container);
        window.print();
    }
}

// Download Dokumen Surat Format Microsoft Word (.doc)
function downloadLetterWord() {
    const checkEl = document.getElementById('printableOfficialLetter');
    if (!checkEl) {
        generateLetter();
    }

    const targetElement = document.getElementById('printableOfficialLetter');
    if (!targetElement) return;

    const letterNo = (document.getElementById('letterNumber') || {}).value || 'Surat_Rekomendasi';
    const cleanFileName = `Surat_Rekomendasi_Mandeh_${letterNo.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;

    // Buat header HTML yang kompatibel dengan Microsoft Word
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' ` +
                   `xmlns:w='urn:schemas-microsoft-com:office:word' ` +
                   `xmlns='http://www.w3.org/TR/REC-html40'>` +
                   `<head><meta charset='utf-8'><title>Surat Rekomendasi</title>` +
                   `<style>` +
                   `@page Section1 {size:595.3pt 841.9pt; margin:72.0pt 72.0pt 72.0pt 72.0pt; mso-header-margin:35.4pt; mso-footer-margin:35.4pt; mso-paper-source:0;}` +
                   `div.Section1 {page:Section1;}` +
                   `body {font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.5; color: #000;}` +
                   `table {border-collapse: collapse; width: 100%;}` +
                   `</style></head><body><div class="Section1">`;
    const footer = `</div></body></html>`;

    const sourceHTML = header + targetElement.innerHTML + footer;
    const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = cleanFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (typeof showToast === 'function') showToast('Berkas Microsoft Word (.doc) berhasil diunduh!');
}

function downloadReportPDF() {
    // Buat container terisolasi untuk cetak laporan teknis ringkasan
    const summaryContainer = document.querySelector('#tab-report .bg-white') || document.getElementById('tab-report');
    if (!summaryContainer) return;

    const opt = {
        margin:       [10, 10, 10, 10],
        filename:     `Laporan_Teknis_Jaringan_Mandeh_${new Date().toISOString().substring(0, 10)}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    if (typeof showToast === 'function') showToast('Sedang memproses unduhan PDF Laporan...');

    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(summaryContainer).save().then(() => {
            if (typeof showToast === 'function') showToast('File PDF Laporan Teknis berhasil diunduh!');
        }).catch(err => {
            console.error('PDF error:', err);
            window.print();
        });
    } else {
        window.print();
    }
}