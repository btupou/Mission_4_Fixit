console.log('Fixit Mission 4 + Mission X Connected ✅');

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     ✅ Using JavaScript to create meaningful interactions:
        (1) Conditional "Other" text field
        (2) Live character counter with 200-character limit
        (3)Image preview gallery (add one-by-one; max 3)
     ========================================================= */

  // --- Back / Next navigation ------------------------------------
  const backPage = document.body.dataset.back;
  const nextPage = document.body.dataset.next;
  const backBtn  = document.getElementById('backBtn');
  const nextBtn  = document.getElementById('nextBtn');

  // --- Inputs found on pages -------------------------------------
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const checkboxes   = document.querySelectorAll('input[type="checkbox"]');
  const issueButtons = document.querySelectorAll('.issue-btn');

  // --- Where-page elements  ------------------
  const mapBox    = document.getElementById('map');
  const locateBtn = document.getElementById('locateBtn');

  // ✅ Enables Next
  function updateNextState() {
    if (!nextBtn) return;

    // Character-limit box (only applies on pages that have #details)
    const details   = document.getElementById('details');
    const overLimit = (() => {
      if (!details) return false;
      const max = parseInt(details.dataset.max || details.getAttribute('maxlength') || '200', 10);
      return details.value.length > max;
    })();

    // Photo gate (only applies on upload page that has #photo-input)
    const photoInput = document.getElementById('photo-input');
    const photoOK    = photoInput ? photoInput.dataset.valid === '1' : true;

    // ✅ Location gate (where page): require geolocation success if map exists
    const geoOK = mapBox ? mapBox.dataset.valid === '1' : true;

    // Choice-based rules
    let enabledByChoices;
    if (radioButtons.length > 0 || checkboxes.length > 0) {
      const anyChecked = document.querySelector(
        '.surface-form input[type="radio"]:checked, .surface-form input[type="checkbox"]:checked'
      );
      enabledByChoices = !!anyChecked;
    } else if (issueButtons.length > 0) {
      const anySelected = document.querySelector('.issue-btn.is-selected');
      enabledByChoices = !!anySelected;
    } else {
      enabledByChoices = true; // pages with no choices
    }

    // ✅ Final decision
    nextBtn.disabled = !(enabledByChoices && !overLimit && photoOK && geoOK);
    nextBtn.classList.toggle('is-selected', !nextBtn.disabled); // ✅ Next green when ready
  }

 
  updateNextState();

  // Re-check when radios/checkboxes change
  radioButtons.forEach(r => r.addEventListener('change', updateNextState));
  checkboxes.forEach(c => c.addEventListener('change', updateNextState));

  // --- Issue circle buttons (single-select) ----------------------
  document.querySelectorAll('.issue-grid, .content').forEach(group => {
    const buttons = group.querySelectorAll('.issue-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-selected'));
        button.classList.add('is-selected');
        updateNextState();

        // ✅ (1) USE JAVASCRIPT: "Other" text field
        if (document.body.id === 'emmaissue') {
          const otherBtn  = document.querySelector('.issue-btn[data-issue="Other"]');
          const otherWrap = document.getElementById('other-wrap');
          if (otherBtn && otherWrap) {
            otherWrap.style.display = otherBtn.classList.contains('is-selected') ? 'block' : 'none';
          }
        }
      });
    });
  });

  // Keep "Other" visible after back/refresh on emmaissue.html
  if (document.body.id === 'emmaissue') {
    const otherBtn  = document.querySelector('.issue-btn[data-issue="Other"]');
    const otherWrap = document.getElementById('other-wrap');
    if (otherBtn && otherWrap) {
      otherWrap.style.display = otherBtn.classList.contains('is-selected') ? 'block' : 'none';
    }
  }

  // --- Back / Next button clicks --------------------------------
  if (backBtn && backPage) {
    backBtn.addEventListener('click', e => {
      e.preventDefault();
      backBtn.classList.add('is-selected');
      setTimeout(() => (window.location.href = backPage), 150);
    });
  }

  if (nextBtn && nextPage) {
    nextBtn.addEventListener('click', e => {
      e.preventDefault();
      if (!nextBtn.disabled) {
        nextBtn.classList.add('is-selected');
        setTimeout(() => (window.location.href = nextPage), 150);
      }
    });
  }

  // ✅ (2) ADD JAVASCRIPT: Live character counter with 200-character limit
  (function setupCharCounter() {
    const details = document.getElementById('details');
    const counter = document.getElementById('char-count');
    const msg     = document.getElementById('char-msg');

    if (!details || !counter) return;

    const max = parseInt(details.dataset.max || details.getAttribute('maxlength') || '200', 10);

    function paint(state, text) {
      counter.classList.remove('count-ok','count-error');
      counter.classList.add(state);
      if (msg) msg.textContent = text || '';
    }

    function sync() {
      const len = details.value.length;
      counter.textContent = len;

      if (len > max) {
        paint('count-error', 'Over character limit');
        details.classList.add('over-limit');
      } else {
        paint('count-ok', '');
        details.classList.remove('over-limit');
      }
      updateNextState();
    }

    sync();
    details.addEventListener('input', sync);
  })();

  // ✅ (3)ADD JAVASCRIPT : Image preview (upload max 3 photos with preview)
  (function setupImagePreview_Simple() {
    const input   = document.getElementById('photo-input');
    const preview = document.getElementById('photo-preview');
    const errorEl = document.getElementById('photo-error');
    const MAX_FILES  = 3;
    const MAX_BYTES  = 5 * 1024 * 1024; // 5MB
    const validTypes = ['image/jpeg','image/png','image/webp','image/gif'];

    if (!input || !preview) return;

    let galleryCount = 0; // how many thumbnails currently shown

    function setValidity(ok, msg='') {
      input.dataset.valid = ok ? '1' : '0';
      if (errorEl) errorEl.textContent = msg;
      updateNextState();
    }

    function addThumb(file) {
      const url = URL.createObjectURL(file);

      const wrap = document.createElement('div');
      wrap.style.display = 'flex';
      wrap.style.flexDirection = 'column';
      wrap.style.alignItems = 'center';
      wrap.style.gap = '6px';

      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Selected photo preview';
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '8px';
      img.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)';

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-photo';
      removeBtn.textContent = 'Remove';

      removeBtn.addEventListener('click', () => {
        URL.revokeObjectURL(url);
        wrap.remove();
        galleryCount = Math.max(0, galleryCount - 1);
        setValidity(galleryCount > 0, '');
      });

      wrap.appendChild(img);
      wrap.appendChild(removeBtn);
      preview.appendChild(wrap);
    }

    input.addEventListener('change', () => {
      const files = Array.from(input.files || []);
      if (!files.length) return;

      const file = files[0];

      if (!validTypes.includes(file.type)) {
        setValidity(galleryCount > 0, 'Please choose JPG, PNG, WebP, or GIF.');
        input.value = '';
        return;
      }
      if (file.size > MAX_BYTES) {
        setValidity(galleryCount > 0, 'Each file must be ≤ 5 MB.');
        input.value = '';
        return;
      }
      if (galleryCount >= MAX_FILES) {
        setValidity(true, `Limit reached (${MAX_FILES}). Remove one to add another.`);
        input.value = '';
        return;
      }

      addThumb(file);
      galleryCount += 1;
      setValidity(true, '');

      // allow picking the same file again after removal
      input.value = '';
    });

    setValidity(false, '');
  })();

  // Expose for geo success callback
window.updateNextState = updateNextState;
});

/* =========================================================
   ✅ Use Web API feature:   Geolocation + Leaflet map
   Enables Next when user either:
   (1) Clicks Locate Me 
   (2) Clicks the map / drags the pin
   (3) Types an address 
   ========================================================= */
(function setupGeoMap() {
  const btn     = document.getElementById('locateBtn');
  const mapBox  = document.getElementById('map');
  const addr    = document.getElementById('manual-address');
  const errorEl = document.getElementById('geo-error');
  if (!mapBox) return;

  // Initial map view 
  const map = L.map('map').setView([-36.8485, 174.7633], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const marker = L.marker([-36.8485, 174.7633], { draggable: true }).addTo(map);

  // Mark location as valid and enable Next button
  function markValid() {
    mapBox.dataset.valid = '1';
    btn?.classList.add('is-selected');        // visual confirmation
    if (window.updateNextState) window.updateNextState();
    if (errorEl) errorEl.textContent = '';
  }

  // Allow user to drag or click on the map
  marker.on('dragend', () => {
    const { lat, lng } = marker.getLatLng();
    map.setView([lat, lng], 16);
    markValid();
  });

  map.on('click', e => {
    marker.setLatLng(e.latlng);
    map.setView(e.latlng, 16);
    markValid();
  });

  // Locate Me button (Geolocation API)
  if (btn) {
    btn.type = 'button';
    btn.addEventListener('click', () => {
      btn.classList.add('is-selected');

      // Error Message: 
if ((location.protocol !== 'https:' && location.hostname !== 'localhost') || !navigator.geolocation) {
  if (errorEl) {
    errorEl.textContent = 'Map not loading. Drag the pin to your location, or type it in the box below.';
  }
  return;
}

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          marker.setLatLng([coords.latitude, coords.longitude]);
          map.setView([coords.latitude, coords.longitude], 16);
          markValid();
        },
        // ✅ Error message 
        (err) => {
          const SIMPLE_MSG = 'Map not loading. Drag the pin to your location, or type it in the box below.';
          if (errorEl) errorEl.textContent = SIMPLE_MSG;
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  }

  // Manual address typing: enable Next once used
  if (addr) {
    addr.addEventListener('input', () => {
      if (addr.value.trim().length > 4) {
        markValid();
      } else {
        mapBox.dataset.valid = '0';
        if (window.updateNextState) window.updateNextState();
      }
    });
  }
})();

