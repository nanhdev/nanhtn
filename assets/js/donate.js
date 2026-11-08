document.addEventListener('DOMContentLoaded', function() {
  const donateTriggers = document.querySelectorAll('.donate-trigger, #donate-btn, #floating-donate-btn');
  const donateModal = document.getElementById('donate-modal');
  const donateOverlay = document.getElementById('donate-overlay');
  const donateClose = document.getElementById('donate-close');
  const copyBtn = document.getElementById('copy-stk-btn');
  const stkText = document.getElementById('stk-text');

  function openDonateModal() {
    if (donateModal) {
      donateModal.classList.add('active');
    }
  }

  function closeDonateModal() {
    if (donateModal) {
      donateModal.classList.remove('active');
    }
  }

  donateTriggers.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openDonateModal();
    });
  });

  if (donateOverlay) {
    donateOverlay.addEventListener('click', closeDonateModal);
  }

  if (donateClose) {
    donateClose.addEventListener('click', closeDonateModal);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && donateModal && donateModal.classList.contains('active')) {
      closeDonateModal();
    }
  });

  if (copyBtn && stkText) {
    copyBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const textToCopy = stkText.textContent.trim();

      const showCopiedFeedback = () => {
        const tooltip = copyBtn.querySelector('.copy-tooltip');
        const icon = copyBtn.querySelector('i');
        const originalText = tooltip ? tooltip.textContent : 'Sao chép';

        if (tooltip) tooltip.textContent = 'Đã chép!';
        if (icon) icon.className = 'fa-solid fa-check';
        copyBtn.classList.add('copied');

        setTimeout(() => {
          if (tooltip) tooltip.textContent = originalText;
          if (icon) icon.className = 'fa-regular fa-copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(showCopiedFeedback)
          .catch(() => fallbackCopy(textToCopy, showCopiedFeedback));
      } else {
        fallbackCopy(textToCopy, showCopiedFeedback);
      }
    });
  }

  function fallbackCopy(text, callback) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand('copy');
      callback();
    } catch (err) {
      console.error('Không thể sao chép:', err);
    }
    document.body.removeChild(tempInput);
  }
});
