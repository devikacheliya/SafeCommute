// Global state (single declarations)
let map = null;
let marker = null;
let accuracyCircle = null;
// mini map instance (small floating preview)
let miniMap = null;
let miniMarker = null;
let miniAccuracy = null;
let watchId = null;
let startLocation = null;
let lastLocation = null;
let movementStopTimer = null; // timer for detecting stopped movement
let checkinTimerId = null; // user check-in timer
let mediaStream = null;
let mediaRecorder = null;

function updateStatus(text, level) {
    const el = document.getElementById('status');
    if (!el) return;
    el.innerText = text;
    el.classList.remove('status-ok', 'status-warn', 'status-error');
    if (level === 'ok') el.classList.add('status-ok');
    else if (level === 'warn') el.classList.add('status-warn');
    else if (level === 'error') el.classList.add('status-error');
}

function updateCoords(lat, lng, accuracy) {
    const el = document.getElementById('coords');
    if (!el) return;
    if (lat == null || lng == null) el.innerText = 'Coordinates: —';
    else el.innerText = `Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)} (±${Math.round(accuracy||0)}m)`;
}

function initMap(lat, lng, elId = 'map') {
    if (typeof L === 'undefined') {
        alert('Leaflet is not loaded. Map unavailable.');
        return;
    }
    const mapEl = document.getElementById(elId);
    if (!mapEl) {
        console.error('Map element #' + elId + ' not found');
        return;
    }

    try {
        // If an existing Leaflet map exists in a different container, remove it first
        if (map && map._container && map._container.id !== elId) {
            try { map.remove(); } catch (e) { console.warn('Error removing old map', e); }
            map = null; marker = null; accuracyCircle = null;
        }

        if (!map) {
            map = L.map(elId).setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © OpenStreetMap contributors'
            }).addTo(map);
        } else {
            map.setView([lat, lng]);
        }

        if (!marker) marker = L.marker([lat, lng]).addTo(map);
        else marker.setLatLng([lat, lng]);

        if (!accuracyCircle) {
            accuracyCircle = L.circle([lat, lng], { radius: 50, color: '#1976d2', opacity: 0.18, fillOpacity: 0.08 }).addTo(map);
        } else {
            accuracyCircle.setLatLng([lat, lng]);
        }
    } catch (err) {
        console.error('Error initializing map', err);
    }
}

function startTrip() {
    if (!navigator.geolocation) {
        alert('Geolocation not available in this browser.');
        return;
    }

    updateStatus('Trip Started... Tracking location', 'ok');

    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        startLocation = { lat, lng };
        lastLocation = { lat, lng };

        initMap(lat, lng);
        updateCoords(lat, lng, pos.coords.accuracy);

        // Toggle UI
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        if (startBtn) startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-block';

        sendSMS('Trip started. Sharing live location.');

        // start tracking with error handler and high accuracy
        watchId = navigator.geolocation.watchPosition(trackPosition, (err) => {
            console.error('watchPosition error', err);
            updateStatus('Location error: ' + (err.message || err.code), 'error');
        }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 });

    }, (err) => {
        console.error('getCurrentPosition error', err);
        updateStatus('Unable to get current location: ' + (err.message || err.code), 'error');
        alert('Unable to get current location: ' + (err.message || err.code));
    }, { enableHighAccuracy: true, timeout: 10000 });
}

// Stop tracking and timers
function stopTrip() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
    if (checkinTimerId) {
        clearTimeout(checkinTimerId);
        checkinTimerId = null;
    }
    if (movementStopTimer) {
        clearTimeout(movementStopTimer);
        movementStopTimer = null;
    }
    updateStatus('Trip stopped.', 'warn');
    updateCoords(null, null, null);

    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    if (startBtn) startBtn.style.display = 'inline-block';
    if (stopBtn) stopBtn.style.display = 'none';
}

// 📍 TRACK POSITION
function trackPosition(pos) {
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;

    if (marker) marker.setLatLng([lat, lng]);
    if (map) map.setView([lat, lng]);
    if (accuracyCircle) accuracyCircle.setLatLng([lat, lng]).setRadius(pos.coords.accuracy || 50);

    // update mini map if present
    if (miniMarker) miniMarker.setLatLng([lat, lng]);
    if (miniMap) try { miniMap.setView([lat, lng]); } catch(e){}
    if (miniAccuracy) miniAccuracy.setLatLng([lat, lng]).setRadius(pos.coords.accuracy || 50);

    updateCoords(lat, lng, pos.coords.accuracy);

    const distanceMovedMeters = getDistanceMeters(lastLocation, { lat, lng });

    // If user stopped moving (threshold: 10 meters)
    if (distanceMovedMeters < 10) {
        if (!movementStopTimer) {
            movementStopTimer = setTimeout(() => {
                alert('⚠️ You have stopped for too long. Alerting contacts.');
                sendSMS('User has stopped moving. Check safety.');
            }, 60000); // 1 minute
        }
    } else {
        if (movementStopTimer) {
            clearTimeout(movementStopTimer);
            movementStopTimer = null;
        }
    }

    lastLocation = { lat, lng };
}

// 📏 DISTANCE CALC (haversine) -> returns meters
function getDistanceMeters(a, b) {
    if (!a || !b) return Infinity;
    const toRad = (v) => v * Math.PI / 180;
    const R = 6371000; // Earth radius in meters
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const aHarv = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
    return R * c;
}

// Unified alert/sharing helper — uses Web Share API, then deep-link fallbacks
function sendSMS(msg) {
    console.log('Alert message:', msg);

    const shareText = msg + '\n\nLocation: ' + (lastLocation ? `https://www.openstreetmap.org/?mlat=${lastLocation.lat}&mlon=${lastLocation.lng}#map=18/${lastLocation.lat}/${lastLocation.lng}` : 'Location not available');

    // Prefer Web Share API when available (mobile/modern browsers)
    if (navigator.share) {
        navigator.share({ title: 'SafeCommute Alert', text: shareText }).then(() => {
            console.log('Shared via Web Share API');
        }).catch(err => {
            console.warn('Web Share failed', err);
            fallbackShareOptions(shareText);
        });
        return;
    }

    // Otherwise use deep links (WhatsApp / Telegram) or copy to clipboard
    fallbackShareOptions(shareText);
}

function fallbackShareOptions(text) {
    const encoded = encodeURIComponent(text);

    // Automatically open WhatsApp without prompt
    const wa = `https://wa.me/?text=${encoded}`;
    window.open(wa, '_blank');
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => alert('Alert text copied to clipboard'))
            .catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); alert('Alert text copied to clipboard'); }
    catch (e) { alert('Copy failed — please copy manually:\n\n' + text); }
    document.body.removeChild(ta);
}

function triggerSOS() {
    alert('🚨 EMERGENCY SOS ACTIVATED');

    sendSMS('🚨 EMERGENCY! I need help. Sharing my live location.');

    startAudioRecording();
}

function startAudioRecording() {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
        alert('Recording not supported in this browser.');
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaStream = stream;
        mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            // stop tracks
            if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
            mediaStream = null;
            mediaRecorder = null;
            alert('Audio recorded for evidence.');
            // option: upload blob or save locally
            window.lastRecordedAudio = blob;
        };

        mediaRecorder.start();
        document.getElementById('status').innerText = 'Recording audio...';

        setTimeout(() => {
            if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
        }, 5000);

    }).catch(err => {
        console.error('getUserMedia error', err);
        alert('Unable to start audio recording: ' + (err.message || err.name));
    });
}

function fakeCall() {
    alert("📞 Incoming call from 'Family'...");
}

function startTimer() {
    const input = document.getElementById('timerInput');
    const minutes = input ? parseFloat(input.value) : NaN;
    if (isNaN(minutes) || minutes <= 0) {
        alert('Enter a valid minutes value');
        return;
    }

    if (checkinTimerId) clearTimeout(checkinTimerId);
    checkinTimerId = setTimeout(() => {
        alert('⏰ No check-in detected. Sending alert!');
        sendSMS('User missed check-in. Please verify safety.');
        checkinTimerId = null;
    }, minutes * 60000);
}

function cancelTimer() {
    if (checkinTimerId) {
        clearTimeout(checkinTimerId);
        checkinTimerId = null;
    }
}

// Initialize map on page load: try geolocation, else use a sensible default
document.addEventListener('DOMContentLoaded', () => {
    const defaultLat = 20.0; // fallback center
    const defaultLng = 0.0;
    if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded yet; map will not initialize.');
        return;
    }

    // Attach button handlers
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const sosBtn = document.getElementById('sosBtn');
    const fakeCallBtn = document.getElementById('fakeCallBtn');
    const shareBtn = document.getElementById('shareBtn');
    const timerBtn = document.getElementById('timerBtn');

    if (startBtn) startBtn.addEventListener('click', startTrip);
    if (stopBtn) stopBtn.addEventListener('click', stopTrip);
    if (sosBtn) sosBtn.addEventListener('click', triggerSOS);
    if (fakeCallBtn) fakeCallBtn.addEventListener('click', fakeCall);
    if (shareBtn) shareBtn.addEventListener('click', shareLocation);
    if (timerBtn) timerBtn.addEventListener('click', startTimer);
    const viewMapBtn = document.getElementById('viewMapBtn');
    const mapModal = document.getElementById('mapModal');
    const closeMap = document.getElementById('closeMap');
    if (viewMapBtn) viewMapBtn.addEventListener('click', openMapModal);
    if (closeMap) closeMap.addEventListener('click', closeMapModal);
    if (mapModal) mapModal.addEventListener('click', (e) => { if (e.target === mapModal) closeMapModal(); });

    // Try to initialize embedded map area on load (keeps a small floating mini-map visible)
    const miniEl = document.getElementById('miniMap');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            // initialize both page map (if present) and mini map
            if (document.getElementById('map')) initMap(pos.coords.latitude, pos.coords.longitude, 'map');
            if (miniEl) initMiniMap(pos.coords.latitude, pos.coords.longitude);
            updateCoords(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
        }, (err) => {
            console.warn('Geolocation failed or denied:', err);
            if (document.getElementById('map')) initMap(defaultLat, defaultLng, 'map');
            if (miniEl) initMiniMap(defaultLat, defaultLng);
            updateStatus('Location unavailable — using fallback map view', 'warn');
        }, { enableHighAccuracy: false, timeout: 5000 });
    } else {
        if (document.getElementById('map')) initMap(defaultLat, defaultLng, 'map');
        if (miniEl) initMiniMap(defaultLat, defaultLng);
    }

    // Update permission status if supported
    if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((p) => {
            if (p.state === 'denied') updateStatus('Location permission denied', 'error');
            else if (p.state === 'prompt') updateStatus('Location permission: prompt', 'warn');
            else updateStatus('Ready', 'ok');
            p.onchange = () => updateStatus('Location permission: ' + p.state, p.state === 'granted' ? 'ok' : 'warn');
        });
    }
});

function shareLocation() {
    if (!lastLocation) {
        alert('No location available to share. Start trip first.');
        return;
    }
    sendSMS('Sharing current location:');
}

// Open the modal map popup and initialize Leaflet inside it
function openMapModal() {
    const modal = document.getElementById('mapModal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');

    const lat = lastLocation ? lastLocation.lat : 20.0;
    const lng = lastLocation ? lastLocation.lng : 0.0;

    initMap(lat, lng, 'modalMap');
    // Let browser render then invalidate size so Leaflet paints correctly
    setTimeout(() => { try { if (map) map.invalidateSize(); } catch (e) { /* ignore */ } }, 250);
}

function closeMapModal() {
    const modal = document.getElementById('mapModal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
}

// Initialize a small floating mini-map (separate from modal/main map)
function initMiniMap(lat, lng) {
    const elId = 'miniMap';
    if (typeof L === 'undefined') return;
    const mapEl = document.getElementById(elId);
    if (!mapEl) return;

    try {
        if (miniMap && miniMap._container && miniMap._container.id !== elId) {
            try { miniMap.remove(); } catch (e) {}
            miniMap = null; miniMarker = null; miniAccuracy = null;
        }

        if (!miniMap) {
            miniMap = L.map(elId, { attributionControl: false, zoomControl: false }).setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(miniMap);
        } else miniMap.setView([lat, lng]);

        if (!miniMarker) miniMarker = L.marker([lat, lng]).addTo(miniMap);
        else miniMarker.setLatLng([lat, lng]);

        if (!miniAccuracy) miniAccuracy = L.circle([lat, lng], { radius: 50, color: '#1976d2', opacity: 0.18, fillOpacity: 0.08 }).addTo(miniMap);
        else miniAccuracy.setLatLng([lat, lng]);

        // open modal when clicking mini map
        mapEl.onclick = openMapModal;
    } catch (err) {
        console.error('Error initializing mini map', err);
    }
}