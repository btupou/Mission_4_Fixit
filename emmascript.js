console.log('Fixit Mission 4 Connected ✅');

document.addEventListener('DOMContentLoaded', () => {
  // --- Back / Next navigation ------------------------------------
  const backPage = document.body.dataset.back;
  const nextPage = document.body.dataset.next;
  const backBtn  = document.getElementById('backBtn');
  const nextBtn  = document.getElementById('nextBtn');

  // Enable Next only if radio buttons are selected
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  function checkRadios() {
    if (radioButtons.length === 0) {
      nextBtn && (nextBtn.disabled = false);
      return;
    }
    const anySelected = document.querySelector('input[type="radio"]:checked');
    nextBtn && (nextBtn.disabled = !anySelected);
  }
  checkRadios();
  radioButtons.forEach(r => r.addEventListener('change', checkRadios));

  // Back button click
  if (backBtn && backPage) {
    backBtn.addEventListener('click', e => {
      e.preventDefault();
      backBtn.classList.add('is-selected');
      setTimeout(() => window.location.href = backPage, 150);
    });
  }

  // Next button click
  if (nextBtn && nextPage) {
    nextBtn.addEventListener('click', e => {
      e.preventDefault();
      if (!nextBtn.disabled) {
        nextBtn.classList.add('is-selected');
        setTimeout(() => window.location.href = nextPage, 150);
      }
    });
  }

  // Circle buttons
   // Make every .issue-btn turn green/white when clicked
  document.querySelectorAll('.issue-btn').forEach(button => {
    button.addEventListener('click', () => {
      // only one selected within each .issue-grid
      const group = button.closest('.issue-grid') || document;
      group.querySelectorAll('.issue-btn').forEach(b => b.classList.remove('is-selected'));
      button.classList.add('is-selected');
    });
  });
});
