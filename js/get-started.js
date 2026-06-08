// Get Started onboarding wizard — step navigation + progress
(function () {
    const steps = Array.from(document.querySelectorAll('.gs-step'));
    const segments = Array.from(document.querySelectorAll('.gs-seg'));
    const backBtn = document.getElementById('gsBack');
    let current = 0;

    function render() {
        steps.forEach((s, i) => s.classList.toggle('active', i === current));
        segments.forEach((seg, i) => seg.classList.toggle('filled', i <= current));
        backBtn.classList.toggle('show', current > 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function next() {
        if (current < steps.length - 1) {
            current++;
            render();
        }
    }

    function back() {
        if (current > 0) {
            current--;
            render();
        }
    }

    // Auto-advance option cards
    document.querySelectorAll('.gs-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const parent = opt.closest('.gs-options');
            if (parent) parent.querySelectorAll('.gs-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            setTimeout(next, 180);
        });
    });

    // Continue / link buttons that advance
    document.querySelectorAll('[data-next]').forEach(btn => {
        btn.addEventListener('click', next);
    });

    // Multi-select chips (toggle only, advance via its Continue button)
    document.querySelectorAll('.gs-chip').forEach(chip => {
        chip.addEventListener('click', () => chip.classList.toggle('selected'));
    });

    if (backBtn) backBtn.addEventListener('click', back);

    render();
})();
