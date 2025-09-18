console.log('Fixit Mission 4 Connected ✅');

document.addEventListener('DOMContentLoaded', () => {
  // --- Back / Next navigation --------------
  const backPage = document.body.dataset.back;
  const nextPage = document.body.dataset.next;
  const backBtn  = document.getElementById('backBtn');
  const nextBtn  = document.getElementById('nextBtn');

  // --- Enable Next only after a required choice -------
// Find all possible things the user might select
const radioButtons = document.querySelectorAll('input[type="radio"]');
const checkboxes   = document.querySelectorAll('input[type="checkbox"]'); // 🌟🌟allow multi-select pages
const issueButtons = document.querySelectorAll('.issue-btn'); // circle buttons


  // Check if a selection has been made and update the Next button
  function updateNextState() {
    if (!nextBtn) return;

    // If page has radio buttons, require one to be checked, 
    // allow checkboxes: require at least one radio OR checkbox checked
    if (radioButtons.length > 0 || checkboxes.length > 0) {
      // Only check the form on the page the user is currently viewing, so choices on other pages don’t affect this one.
      const anyChecked = document.querySelector('.surface-form input[type="radio"]:checked, .surface-form input[type="checkbox"]:checked');
      nextBtn.disabled = !anyChecked;
    }
    // Else if page has circle buttons, require one to be selected
    else if (issueButtons.length > 0) {
      const anySelected = document.querySelector('.issue-btn.is-selected');
      nextBtn.disabled = !anySelected;
    }
    // Else (no choices), Next can stay enabled
    else {
      nextBtn.disabled = false;
    }

    // Turn Next dark green when enabled
    nextBtn.classList.toggle('is-selected', !nextBtn.disabled);
  }

  // Run once on page load to set correct state
  updateNextState();

  // --- Radio buttons --------------------------
  // Enable Next when a radio option is picked
  radioButtons.forEach(r =>
    r.addEventListener('change', updateNextState)
  );

  // --- Checkboxes ------------------------------
  // Enable Next when a checkbox is changed (for multi-select pages)
  checkboxes.forEach(c =>
    c.addEventListener('change', updateNextState)
  );

  // --- Circle buttons ---------------------
  // Make every .issue-btn turn green/white when clicked
  // and allow only one selected within each .issue-grid group,
  // EXCEPT on the Describe page where users can select more than one surface choice if they want to.
  document.querySelectorAll('.issue-grid, .content').forEach(group => {
    const buttons = group.querySelectorAll('.issue-btn');

    const allowMulti = document.body.id === 'emmadescribe'; // only this page allows multi

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (allowMulti) {
          // On Describe page: toggle this button on/off
          button.classList.toggle('is-selected');
        } else {
          // All other pages: single-select only
          buttons.forEach(b => b.classList.remove('is-selected'));
          button.classList.add('is-selected');
        }
        updateNextState();
      });
    });
  });

  // --- Back button click ----------------------------------------
  if (backBtn && backPage) {
    backBtn.addEventListener('click', e => {
      e.preventDefault();
      backBtn.classList.add('is-selected');
      setTimeout(() => window.location.href = backPage, 150);
    });
  }

  // --- Next button click ----------------------------------------
  if (nextBtn && nextPage) {
    nextBtn.addEventListener('click', e => {
      e.preventDefault();
      if (!nextBtn.disabled) {
        nextBtn.classList.add('is-selected');
        setTimeout(() => window.location.href = nextPage, 150);
      }
    });
  }
});
