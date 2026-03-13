document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-switch');
    if (!langBtn) return;

    // Load saved language or default to 'zh'
    let currentLang = localStorage.getItem('lang') || 'zh';
    setLang(currentLang);

    langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', currentLang);
        setLang(currentLang);
    });

    function setLang(lang) {
        // Update button text
        langBtn.textContent = lang === 'zh' ? 'EN' : '中文';
        
        // Update all elements with data-zh and data-en
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(el => {
            if (el.tagName.toLowerCase() === 'input' && el.type === 'submit') {
                 el.value = el.getAttribute(`data-${lang}`);
            } else {
                 el.innerHTML = el.getAttribute(`data-${lang}`);
            }
        });
        
        // Also set html lang attribute
        document.documentElement.lang = lang;
    }
});