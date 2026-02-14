// Modern Boot sequence and initialization
document.addEventListener('DOMContentLoaded', async function() {
    const bootSequence = document.getElementById('boot-sequence');
    const mainContent = document.getElementById('main-content');

    // Hide main content initially
    mainContent.classList.add('hidden');

    await loadMarkdownContent();
    initializeThemeSystem();
    initializeNavigation();
    initializeInteractiveTerminal();
    initializeDynamicRole();

    // Show main content after boot sequence with fade
    setTimeout(() => {
        bootSequence.style.opacity = '0';
        bootSequence.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            bootSequence.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.animation = 'fadeIn 0.8s ease forwards';
            initializeTypewriter();
            initializeParallax();
        }, 500);
    }, 1800);

    // Add smooth reveal animations
    observeElements();
});

// -----------------------------
// Theme system (cycle with `themes`)
// -----------------------------

const THEME_ORDER = [
    // keep default first; next themes should be visually distinct
    'default',
    'dracula',
    'tokyo',
    'solarized',
    'amber',
    'ice',
    'violet',
    'sunset',
    'mint',
    'mono',
    'cyber'
];

const DEFAULT_DYNAMIC_ROLES = [
    'shipping polished frontend at scale',
    'building secure fullstack workflows',
    'optimizing UX for performance-critical apps',
    'designing AI-assisted product experiences'
];

let dynamicRoles = [...DEFAULT_DYNAMIC_ROLES];
let portfolioContent = null;

let currentThemeIndex = 0;
let lastNonDefaultTheme = 'cyber';

function applyTheme(themeName) {
    if (themeName === 'default') {
        document.body.removeAttribute('data-theme');
    } else {
        document.body.setAttribute('data-theme', themeName);
        lastNonDefaultTheme = themeName;
    }
    safeStorageSet('portfolio.theme', themeName);
}

function getCurrentThemeName() {
    return document.body.getAttribute('data-theme') || 'default';
}

function initializeThemeSystem() {
    const savedTheme = safeStorageGet('portfolio.theme');
    const initialTheme = savedTheme && THEME_ORDER.includes(savedTheme) ? savedTheme : 'default';
    currentThemeIndex = Math.max(0, THEME_ORDER.indexOf(initialTheme));
    if (initialTheme !== 'default') lastNonDefaultTheme = initialTheme;
    applyTheme(initialTheme);
}

function safeStorageGet(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // ignore (file:// restrictions, private mode, etc.)
    }
}

function initializeDynamicRole() {
    const roleEl = document.getElementById('dynamic-role-text');
    if (!roleEl) return;
    const roles = dynamicRoles.length ? dynamicRoles : DEFAULT_DYNAMIC_ROLES;

    let roleIndex = 0;
    roleEl.textContent = roles[roleIndex];

    setInterval(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleEl.style.opacity = '0';
        setTimeout(() => {
            roleEl.textContent = roles[roleIndex];
            roleEl.style.opacity = '1';
        }, 180);
    }, 2600);
}

async function loadMarkdownContent() {
    try {
        const markdown = await loadContentMarkdown();
        const parsed = parseMarkdownContent(markdown);
        portfolioContent = parsed;
        renderPortfolioContent(parsed);
    } catch (error) {
        console.error('Failed to load portfolio content from content.md', error);
        renderContentLoadError(error);
    }
}

async function loadContentMarkdown() {
    if (window.location.protocol === 'file:') {
        throw new Error('content.md cannot be loaded over file:// due to browser CORS restrictions.');
    }

    try {
        const response = await fetch('content.md', { cache: 'no-store' });
        if (response.ok) {
            return await response.text();
        }
    } catch {
        // fall through to XHR fallback
    }

    // Fallback for stricter environments.
    const xhrText = await loadContentMarkdownWithXhr();
    if (xhrText) {
        return xhrText;
    }

    throw new Error('Unable to load content.md');
}

function loadContentMarkdownWithXhr() {
    return new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'content.md', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                const okHttp = xhr.status >= 200 && xhr.status < 300;
                const okFile = window.location.protocol === 'file:' && xhr.status === 0 && !!xhr.responseText;
                if (okHttp || okFile) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(`XHR failed: ${xhr.status}`));
                }
            };
            xhr.onerror = () => reject(new Error('XHR network error'));
            xhr.send();
        } catch (error) {
            reject(error);
        }
    });
}

function parseMarkdownContent(markdown) {
    const jsonMatch = markdown.match(/```json\s*([\s\S]*?)\s*```/i);
    if (!jsonMatch) {
        throw new Error('Missing JSON code block in content.md');
    }

    return JSON.parse(jsonMatch[1]);
}

function renderPortfolioContent(content) {
    renderBootSequence(content.boot || []);
    renderNavigation(content.navigation || {});
    renderSections(content.sections || {});

    if (content.sections?.about?.dynamicRoles?.length) {
        dynamicRoles = content.sections.about.dynamicRoles;
    }
}

function renderBootSequence(lines) {
    const bootEl = document.getElementById('boot-sequence');
    if (!bootEl) return;

    const safeLines = Array.isArray(lines) && lines.length
        ? lines
        : ['Initializing system...', 'Loading content...', 'System ready'];

    bootEl.innerHTML = safeLines
        .map((line) => `<p class="boot-line">${escapeHtml(line)}</p>`)
        .join('');
}

function renderNavigation(nav) {
    const promptEl = document.getElementById('nav-prompt');
    const commandsEl = document.getElementById('nav-commands');
    if (!commandsEl) return;

    if (promptEl) {
        promptEl.textContent = nav.prompt || 'ls commands';
    }

    const items = Array.isArray(nav.items) ? nav.items : [];
    const resume = nav.resume || {};
    const sectionButtons = items
        .map((item, index) => {
            const activeClass = index === 0 ? ' active-btn' : '';
            return `<button class="cmd-btn${activeClass}" data-section="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`;
        })
        .join('');

    const resumeButton = resume.label && resume.href
        ? `<a class="cmd-btn resume-btn nav-resume" href="${escapeHtml(resume.href)}" download>${escapeHtml(resume.label)}</a>`
        : '';

    commandsEl.innerHTML = sectionButtons + resumeButton;
}

function renderSections(sections) {
    renderSectionShell('about', sections.about);
    renderSectionShell('skills', sections.skills);
    renderSectionShell('experience', sections.experience);
    renderSectionShell('projects', sections.projects);
    renderSectionShell('education', sections.education);
    renderSectionShell('contact', sections.contact);

    renderAboutContent(sections.about || {});
    renderSkillsContent(sections.skills || {});
    renderExperienceContent(sections.experience || {});
    renderProjectsContent(sections.projects || {});
    renderEducationContent(sections.education || {});
    renderContactContent(sections.contact || {});
}

function renderSectionShell(sectionId, sectionData) {
    const promptEl = document.getElementById(`prompt-${sectionId}`);
    const statusEl = document.getElementById(`status-${sectionId}`);

    if (promptEl) {
        promptEl.textContent = sectionData?.prompt || `./${sectionId}.sh`;
    }

    if (statusEl) {
        const text = sectionData?.status || `Executing ${sectionId}.sh...`;
        statusEl.textContent = text;
        statusEl.setAttribute('data-text', text);
        statusEl.classList.remove('typed');
        statusEl.style.borderRight = '2px solid var(--terminal-green)';
    }
}

function renderAboutContent(about) {
    const el = document.getElementById('content-about');
    if (!el) return;

    const name = about.name || '';
    const title = about.title || '';
    const summary = about.summary || '';
    const titleText = about.titleHeading || '> whoami';
    const summaryHeading = about.summaryHeading || '> cat profile.txt';

    el.innerHTML = `
        <h2 class="section-title">${escapeHtml(titleText)}</h2>
        <p class="typing-text" data-text="${escapeHtml(name)}">${escapeHtml(name)}</p>
        <p class="typing-text" data-text="${escapeHtml(title)}">${escapeHtml(title)}</p>
        <p class="dynamic-role-line">
            <span class="dynamic-role-label">status:</span>
            <span id="dynamic-role-text" class="dynamic-role-text"></span>
            <span class="dynamic-role-cursor">▋</span>
        </p>
        <br />
        <h3 class="subsection-title">${escapeHtml(summaryHeading)}</h3>
        <p class="typing-text" data-text="${escapeHtml(summary)}">${escapeHtml(summary)}</p>
    `;
}

function renderSkillsContent(skills) {
    const el = document.getElementById('content-skills');
    if (!el) return;

    const title = skills.title || '> Technical Stack';
    const categories = Array.isArray(skills.categories) ? skills.categories : [];

    const html = categories
        .map((category) => {
            const tags = (category.items || [])
                .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
                .join('');
            return `
                <div class="skill-category">
                    <h3 class="subsection-title">$ cat ${escapeHtml(category.file || 'skills.txt')}</h3>
                    <div class="skill-tags">${tags}</div>
                </div>
            `;
        })
        .join('');

    el.innerHTML = `<h2 class="section-title">${escapeHtml(title)}</h2>${html}`;
}

function renderExperienceContent(experience) {
    const el = document.getElementById('content-experience');
    if (!el) return;

    const title = experience.title || '> Work Experience';
    const jobs = Array.isArray(experience.items) ? experience.items : [];

    const html = jobs
        .map((job) => `
            <div class="experience-item">
                <h3 class="subsection-title">$ cat ${escapeHtml(job.file || 'experience.log')}</h3>
                <p class="job-title"><span class="highlight">${escapeHtml(job.role || '')}</span> @ ${escapeHtml(job.company || '')}</p>
                <p class="job-date">${escapeHtml(job.date || '')}</p>
                <ul class="achievement-list">
                    ${(job.achievements || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
                </ul>
            </div>
        `)
        .join('');

    el.innerHTML = `<h2 class="section-title">${escapeHtml(title)}</h2>${html}`;
}

function renderProjectsContent(projects) {
    const el = document.getElementById('content-projects');
    if (!el) return;

    const title = projects.title || '> Featured Projects';
    const items = Array.isArray(projects.items) ? projects.items : [];

    const html = items
        .map((project) => {
            const linkHtml = project.link?.url
                ? `<p class="project-link">🔗 <a href="${escapeHtml(project.link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.link.label || project.link.url)}</a></p>`
                : '';
            const stackHtml = project.stack?.length
                ? `<p class="project-subtitle">Tech Stack: ${escapeHtml(project.stack.join(', '))}</p>`
                : '';
            return `
                <div class="project-item">
                    <h3 class="subsection-title">$ cat ${escapeHtml(project.file || 'project.txt')}</h3>
                    <p class="project-title"><span class="highlight">${escapeHtml(project.name || '')}</span></p>
                    <p class="project-subtitle">${escapeHtml(project.subtitle || '')}</p>
                    ${linkHtml}
                    <ul class="achievement-list">
                        ${(project.achievements || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                    ${stackHtml}
                </div>
            `;
        })
        .join('');

    el.innerHTML = `<h2 class="section-title">${escapeHtml(title)}</h2>${html}`;
}

function renderEducationContent(education) {
    const el = document.getElementById('content-education');
    if (!el) return;

    const title = education.title || '> Education';
    const items = Array.isArray(education.items) ? education.items : [];

    const html = items
        .map((item) => `
            <div class="education-item">
                <h3 class="subsection-title">$ cat ${escapeHtml(item.file || 'degree.txt')}</h3>
                <p class="degree-title"><span class="highlight">${escapeHtml(item.degree || '')}</span></p>
                <p class="university">${escapeHtml(item.institution || '')}</p>
                <p class="education-details">${escapeHtml(item.details || '')}</p>
                <p class="education-date">${escapeHtml(item.date || '')}</p>
            </div>
        `)
        .join('');

    el.innerHTML = `<h2 class="section-title">${escapeHtml(title)}</h2>${html}`;
}

function renderContactContent(contact) {
    const el = document.getElementById('content-contact');
    if (!el) return;

    const title = contact.title || '> Contact Information';
    const resumeLabel = contact.resume?.label || '⬇ download_resume.pdf';
    const resumeHref = contact.resume?.href || 'assets/Kumar_Jyotirmay_Resume.pdf';
    const items = Array.isArray(contact.items) ? contact.items : [];

    const cards = items
        .map((item) => {
            const valueHtml = item.href
                ? `<a href="${escapeHtml(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(item.value || '')}</a>`
                : `<span>${escapeHtml(item.value || '')}</span>`;
            return `
                <div class="contact-item">
                    <span class="contact-icon">${escapeHtml(item.icon || '•')}</span>
                    <span class="contact-label">${escapeHtml(item.label || '')}:</span>
                    ${valueHtml}
                </div>
            `;
        })
        .join('');

    const messagePrompt = contact.messagePrompt || `echo "Let's build something amazing together!"`;
    const message = contact.message || "Let's build something amazing together! 🚀";

    el.innerHTML = `
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <div class="resume-cta">
            <a class="cmd-btn resume-btn" href="${escapeHtml(resumeHref)}" download>${escapeHtml(resumeLabel)}</a>
        </div>
        <div class="contact-grid">${cards}</div>
        <br />
        <div class="terminal-prompt">
            <p class="prompt"><span class="user">guest@portfolio</span>:<span class="path">~</span>$ ${escapeHtml(messagePrompt)}</p>
            <p class="success-message">${escapeHtml(message)}</p>
        </div>
    `;
}

function renderContentLoadError(error) {
    const bootEl = document.getElementById('boot-sequence');
    const navPrompt = document.getElementById('nav-prompt');
    const navCommands = document.getElementById('nav-commands');
    const detail = error && error.message ? `detail: ${error.message}` : 'detail: unknown';
    if (bootEl) {
        bootEl.innerHTML = `
            <p class="boot-line">Initializing system...</p>
            <p class="boot-line">Loading content.md...</p>
            <p class="boot-line">[ERROR] Could not load content source</p>
            <p class="boot-line">Use HTTP, not file://</p>
            <p class="boot-line">$ python3 -m http.server 5500</p>
            <p class="boot-line">Open: http://localhost:5500</p>
            <p class="boot-line">${escapeHtml(detail)}</p>
        `;
    }
    if (navPrompt) navPrompt.textContent = 'ls commands';
    if (navCommands) navCommands.innerHTML = '';
}

function initializeInteractiveTerminal() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    if (!form || !input || !output) return;

    const appendLine = (text, className = '') => {
        const line = document.createElement('p');
        line.className = `terminal-line ${className}`.trim();
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    };

    const navigateToSection = (sectionId) => {
        const button = document.querySelector(`.cmd-btn[data-section="${sectionId}"]`);
        if (button) {
            button.click();
            appendLine(`navigated to ${sectionId}`, 'terminal-muted');
        }
    };

    const cycleTheme = () => {
        const current = getCurrentThemeName();
        const idx = THEME_ORDER.indexOf(current);
        currentThemeIndex = idx >= 0 ? idx : 0;
        currentThemeIndex = (currentThemeIndex + 1) % THEME_ORDER.length;
        const nextTheme = THEME_ORDER[currentThemeIndex];
        applyTheme(nextTheme);
        return nextTheme;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const raw = input.value.trim();
        const parts = raw.split(/\s+/);
        const cmd = (parts[0] || '').toLowerCase();
        const arg = (parts[1] || '').toLowerCase();
        if (!raw) return;

        appendLine(`$ ${raw}`, 'terminal-command');

        switch (cmd) {
            case 'help':
                appendLine('commands: whoami, about, skills, experience, projects, education, contact, resume, theme/themes (cycle), theme <name>, theme toggle, matrix, clear');
                break;
            case 'whoami':
                appendLine(`${portfolioContent?.sections?.about?.name || 'Portfolio'} | ${portfolioContent?.sections?.about?.title || 'Developer'}`);
                break;
            case 'about':
            case 'skills':
            case 'experience':
            case 'projects':
            case 'education':
            case 'contact':
                navigateToSection(cmd);
                break;
            case 'resume': {
                const resumeLink = document.querySelector('.resume-btn');
                if (resumeLink) {
                    resumeLink.click();
                    appendLine('resume download started.', 'terminal-muted');
                } else {
                    appendLine('resume link missing.', 'terminal-error');
                }
                break;
            }
            case 'theme':
                if (arg === 'toggle') {
                    if (getCurrentThemeName() === 'default') {
                        applyTheme(lastNonDefaultTheme || 'cyber');
                        appendLine(`theme: ${getCurrentThemeName()}`, 'terminal-muted');
                    } else {
                        applyTheme('default');
                        appendLine('theme: default', 'terminal-muted');
                    }
                } else if (arg && THEME_ORDER.includes(arg)) {
                    applyTheme(arg);
                    appendLine(`theme set → ${arg}`, 'terminal-muted');
                } else {
                    const nextTheme = cycleTheme();
                    appendLine(`theme switched → ${nextTheme}`, 'terminal-muted');
                }
                break;
            case 'themes': {
                const nextTheme = cycleTheme();
                appendLine(`theme switched → ${nextTheme}`, 'terminal-muted');
                break;
            }
            case 'matrix':
                if (toggleMatrixMode()) {
                    appendLine('matrix mode enabled. welcome to the rabbit hole.');
                } else {
                    appendLine('matrix mode disabled.', 'terminal-muted');
                }
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            default:
                appendLine(`command not found: ${raw}. type "help"`, 'terminal-error');
        }

        input.value = '';
    });
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Modern Navigation with ripple effect
function initializeNavigation() {
    const buttons = document.querySelectorAll('.cmd-btn[data-section]');
    const sections = document.querySelectorAll('.section');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const targetSection = this.getAttribute('data-section');
            
            // Create ripple
            createRipple(e, this);
            
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active-btn'));
            this.classList.add('active-btn');
            
            // Hide all sections with fade out
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    section.classList.remove('active');
                    section.classList.add('hidden');
                }, 300);
            });
            
            // Show target section with fade in
            setTimeout(() => {
                const target = document.getElementById(targetSection);
                if (target) {
                    target.classList.remove('hidden');
                    target.style.opacity = '0';
                    target.classList.add('active');
                    
                    // Smooth scroll to section
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Fade in
                    setTimeout(() => {
                        target.style.opacity = '1';
                        initializeTypewriter();
                    }, 100);
                }
            }, 350);
        });
    });
}

// Ripple effect function
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const rippleContainer = element.querySelector('.ripple');
    if (rippleContainer) {
        rippleContainer.remove();
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Typewriter effect with smooth animation
function initializeTypewriter() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        // Skip if already animated
        if (element.classList.contains('typed')) {
            return;
        }
        
        const text = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';
        element.classList.add('typed');
        
        let charIndex = 0;
        const delay = index * 200; // Stagger animations
        
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    
                    // Add subtle glow effect while typing
                    element.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.5)';
                } else {
                    clearInterval(typeInterval);
                    // Remove typing cursor and glow after completion
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        element.style.textShadow = 'none';
                    }, 500);
                }
            }, 25); // Slightly faster typing
        }, delay);
    });
}

// Intersection Observer for reveal animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe info boxes and items
    document.querySelectorAll('.info-box, .experience-item, .project-item, .education-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effect for subtle depth
function initializeParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.ascii-art, .nav-section');
                
                parallaxElements.forEach(el => {
                    const speed = 0.5;
                    el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// -----------------------------
// Matrix mode (toggleable)
// -----------------------------

const matrixState = {
    enabled: false,
    intervalId: null
};

function enableMatrixMode() {
    if (matrixState.enabled) return;
    matrixState.enabled = true;
    matrixState.intervalId = createMatrixRain();
}

function disableMatrixMode() {
    if (!matrixState.enabled) return;
    matrixState.enabled = false;
    if (matrixState.intervalId) {
        clearInterval(matrixState.intervalId);
        matrixState.intervalId = null;
    }
    const canvas = document.getElementById('matrix-rain-canvas');
    if (canvas) canvas.remove();
}

function toggleMatrixMode() {
    if (matrixState.enabled) {
        disableMatrixMode();
        return false;
    }
    enableMatrixMode();
    return true;
}

// Matrix rain effect (optional - can be enabled)
function createMatrixRain() {
    const existingCanvas = document.getElementById('matrix-rain-canvas');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    canvas.style.opacity = '0.18';
    canvas.style.mixBlendMode = 'screen';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 20, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#39ff14';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const intervalId = setInterval(draw, 40);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    return intervalId;
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt/Option + number keys for quick navigation
    if (e.altKey) {
        const keyMap = {
            '1': 'about',
            '2': 'skills',
            '3': 'experience',
            '4': 'projects',
            '5': 'education',
            '6': 'contact'
        };
        
        const section = keyMap[e.key];
        if (section) {
            const button = document.querySelector(`[data-section="${section}"]`);
            if (button) {
                button.click();
            }
        }
    }
    
    // Ctrl/Cmd + K to clear (scroll to top)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Easter egg - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateMatrixMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMatrixMode() {
    console.log('%c🎉 Matrix Mode Activated! 🎉', 'color: #00ff41; font-size: 20px; font-weight: bold;');
    enableMatrixMode();
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '>>> MATRIX MODE ACTIVATED <<<';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #00ff41;
        font-size: 30px;
        font-family: monospace;
        z-index: 9999;
        text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
        animation: fadeOut 3s forwards;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add glitch effect on hover for title
const terminalTitle = document.querySelector('.terminal-title');
if (terminalTitle) {
    let glitchInterval;
    
    terminalTitle.addEventListener('mouseenter', function() {
        const originalText = this.textContent;
        let iterations = 0;
        
        glitchInterval = setInterval(() => {
            this.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                this.textContent = originalText;
            }
        }, 30);
    });
}

// Console Easter Egg
console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIxMCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMGZmNDEiPkhlbGxvLCBIYWNrZXIhPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwZmY0MSI+VHJ5IHRoZSBLb25hbWkgY29kZTo8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzAwZmY0MSI+4oaRIOKGkSDihrMg4oazIOKGkCDihpIg4oaQIOKGkiBCIEE8L3RleHQ+PC9zdmc+") no-repeat;');
console.log('%c👨‍💻 Welcome to the console, fellow developer!', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%cIf you\'re reading this, you\'re already awesome! 🚀', 'color: #00d9ff; font-size: 14px;');
console.log('%cTry pressing: Alt + 1-6 for quick navigation', 'color: #ffff00; font-size: 12px;');

// Performance monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('%c⚡ Page Load Time: ' + pageLoadTime + 'ms', 'color: #00ff41; font-size: 12px;');
        }, 0);
    });
}
