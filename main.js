function copyAddr(btn) {
  const addr = btn.getAttribute('data-addr');
  if (!addr) return;
  navigator.clipboard.writeText(addr).then(() => {
    btn.classList.add('copied');
    showToast();
    setTimeout(() => btn.classList.remove('copied'), 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = addr;
    ta.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(); } catch(e) {}
    document.body.removeChild(ta);
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Fade-in on scroll
  const cards = document.querySelectorAll('.server-card, .bedrock-card, .status-banner');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, background 0.2s';
    observer.observe(card);
  });
});
