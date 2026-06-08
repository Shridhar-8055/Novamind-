// Get Started onboarding wizard — step navigation, progress, and submit to Google Sheets
(function () {
    // ── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BETWEEN THE QUOTES BELOW ──
    const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzEG__Cx_kxSob33atkPwGYwINnx_7adZG7xcGvsAO_47DnEydIlpDKVnpdQZwauM_KMA/exec';
    // ───────────────────────────────────────────────────────────────────────

    const steps = Array.from(document.querySelectorAll('.gs-step'));
    const segments = Array.from(document.querySelectorAll('.gs-seg'));
    const backBtn = document.getElementById('gsBack');
    const answers = {};
    let current = 0;

    // Clean column name for the Sheet: prefer the step's data-field, else its title
    function fieldKey(stepEl) {
        if (stepEl.dataset.field) return stepEl.dataset.field;
        const t = stepEl.querySelector('.gs-title');
        return t ? t.textContent.replace(/\s+/g, ' ').trim() : 'Question';
    }

    function render() {
        steps.forEach((s, i) => s.classList.toggle('active', i === current));
        segments.forEach((seg, i) => seg.classList.toggle('filled', i <= current));
        backBtn.classList.toggle('show', current > 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function next() {
        if (current < steps.length - 1) { current++; render(); }
    }
    function back() {
        if (current > 0) { current--; render(); }
    }

    // Option cards — record the choice, then advance
    document.querySelectorAll('.gs-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const stepEl = opt.closest('.gs-step');
            const parent = opt.closest('.gs-options');
            if (parent) parent.querySelectorAll('.gs-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            const h4 = opt.querySelector('h4');
            answers[fieldKey(stepEl)] = h4 ? h4.textContent.trim() : opt.textContent.trim();
            setTimeout(next, 180);
        });
    });

    // Multi-select chips — toggle selection
    document.querySelectorAll('.gs-chip').forEach(chip => {
        chip.addEventListener('click', () => chip.classList.toggle('selected'));
    });

    // Continue / link buttons — capture any input/chips in this step, then advance
    document.querySelectorAll('[data-next]').forEach(btn => {
        btn.addEventListener('click', () => {
            const stepEl = btn.closest('.gs-step');
            const q = fieldKey(stepEl);
            const input = stepEl.querySelector('.gs-input');
            const chipsAll = stepEl.querySelectorAll('.gs-chip');
            if (btn.classList.contains('gs-link')) {
                if (input) answers[q] = 'No website';
            } else if (input) {
                answers[q] = input.value.trim() || '(skipped)';
            }
            if (chipsAll.length) {
                const sel = Array.from(stepEl.querySelectorAll('.gs-chip.selected')).map(c => c.textContent.trim());
                answers[q] = sel.length ? sel.join(', ') : '(none selected)';
            }
            next();
        });
    });

    if (backBtn) backBtn.addEventListener('click', back);

    // Submit collected answers to Google Sheets (fire-and-forget)
    function submit() {
        if (!SHEET_ENDPOINT) return Promise.resolve();
        const payload = Object.assign({ Timestamp: new Date().toLocaleString() }, answers);
        return fetch(SHEET_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        }).catch(function () {});
    }

    // Final "Meet my team" button — submit, then navigate
    const finalBtn = document.querySelector('.gs-step:last-child a.gs-btn');
    if (finalBtn) {
        finalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const href = finalBtn.getAttribute('href');
            finalBtn.textContent = 'Saving…';
            submit().finally(function () { window.location.href = href; });
        });
    }

    render();
})();
