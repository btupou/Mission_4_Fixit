console.log('Fixit Mission 4 Connected ✅');

document.addEventListener('DOMContentLoaded', () => {
  const backHref = document.body.dataset.back || null;
  const nextHref = document.body.dataset.next || null;

  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');

  function flashAndGo(button, target) {
    button.classList.add('is-selected');        // turn button green
    setTimeout(() => (window.location.href = target), 150); // navigate after flash
  }

  if (backBtn && backHref) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      flashAndGo(backBtn, backHref);
    });
  }

  if (nextBtn && nextHref) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      flashAndGo(nextBtn, nextHref);
    });
  }

  // Circle-button selection logic (works everywhere)
  document.querySelectorAll('.issue-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.issue-btn')
        .forEach((btn) => btn.classList.remove('is-selected'));
      button.classList.add('is-selected');
    });
  });
});
