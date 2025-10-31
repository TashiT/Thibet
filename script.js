// Translations
const translations = {
    bo: {
        'nav.home': 'གདོང་ངོས།',
        'nav.about': 'སྐོར།',
        'nav.callforpapers': 'རྩོམ་སྒྲིག་སྐོར།',
        'nav.submission': 'བསྐུར་ཐབས།',
        'nav.contact': 'འབྲེལ་ལམ།',
        'hero.badge': 'དུས་དེབ་གསར་འདོན་གྱི་བརྡ་ཐོ།',
        'hero.headline': 'བོད་ཀྱི་སྐད་ཡིག་ཞིབ་འཇུག་གི་རིག་གཞུང་དུས་དེབ།',
        'hero.subheadline': 'ནན་ཁའེ་སློབ་ཆེན་དང་ཨོ་རེ་གོན་སློབ་ཆེན་གྱིས་པར་སྐྲུན།',
        'hero.deadline': 'བསྐུར་བའི་མཐའ་དུས་ (ཐོག་མའི་གྲངས་):',
        'hero.announcement': 'བརྡ་ཐོའི་ཚེས་གྲངས་:',
        'hero.readcall': 'རྩོམ་སྒྲིག་སྐོར་ཀློག་པ།',
        'hero.submit': 'རྩོམ་ཡིག་སྐུར་བ།',
        'about.title': 'དུས་དེབ་སྐོར།',
        'about.scope.title': 'ཁྱབ་ཁོངས།',
        'about.topics.title': 'ཞིབ་འཇུག་གི་བརྗོད་གཞི།',
        'about.institutions.title': 'འབྲེལ་ལས་ཁང་།',
        'about.editorial': 'རྩོམ་སྒྲིག་ཁང་:',
        'about.review.title': 'དཔད་བཤེར་ལམ་ལུགས།',
        'cfp.title': 'རྩོམ་སྒྲིག་སྐོར།',
        'submission.title': 'བསྐུར་ཐབས་ཀྱི་ལམ་སྟོན།',
        'submission.email.title': 'ཡིག་ཆའི་གློག་འཕྲིན།',
        'submission.format.title': 'ཡིག་ཆའི་རྣམ་པ།',
        'submission.deadline.title': 'གལ་ཆེའི་ཚེས་གྲངས།',
        'submission.deadline.inaugural': 'ཐོག་མའི་གྲངས་ཀྱི་མཐའ་དུས་:',
        'submission.guidelines.title': 'རྣམ་བཞག་ལམ་སྟོན།',
        'contact.title': 'འབྲེལ་ལམ།',
        'contact.email': 'གློག་འཕྲིན།',
        'contact.office': 'རྩོམ་སྒྲིག་ཁང་།',
        'contact.partners': 'མཉམ་ལས་སློབ་ཆེན།'
    },
    zh: {
        'nav.home': '首页',
        'nav.about': '关于',
        'nav.callforpapers': '征稿启事',
        'nav.submission': '投稿',
        'nav.contact': '联系',
        'hero.badge': '期刊创刊公告',
        'hero.headline': '藏语文研究学术期刊',
        'hero.subheadline': '南开大学与俄勒冈大学联合出版',
        'hero.deadline': '投稿截止时间（创刊号）:',
        'hero.announcement': '公告日期:',
        'hero.readcall': '阅读完整征稿启事',
        'hero.submit': '提交稿件',
        'about.title': '关于期刊',
        'about.scope.title': '范围',
        'about.topics.title': '研究主题',
        'about.institutions.title': '主办单位',
        'about.editorial': '编辑部:',
        'about.review.title': '审稿流程',
        'cfp.title': '征稿启事',
        'submission.title': '投稿指南',
        'submission.email.title': '投稿邮箱',
        'submission.format.title': '文件格式要求',
        'submission.deadline.title': '重要日期',
        'submission.deadline.inaugural': '创刊号截止日期:',
        'submission.guidelines.title': '格式规范',
        'contact.title': '联系我们',
        'contact.email': '邮箱',
        'contact.office': '编辑部',
        'contact.partners': '合作单位'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.callforpapers': 'Call for Papers',
        'nav.submission': 'Submission',
        'nav.contact': 'Contact',
        'hero.badge': 'Journal Launch Announcement',
        'hero.headline': 'Academic Journal for Tibetan Language Studies',
        'hero.subheadline': 'Published by Nankai University & University of Oregon',
        'hero.deadline': 'Submission Deadline (Inaugural Issue):',
        'hero.announcement': 'Announcement Date:',
        'hero.readcall': 'Read Full Call for Papers',
        'hero.submit': 'Submit Manuscript',
        'about.title': 'About the Journal',
        'about.scope.title': 'Scope',
        'about.topics.title': 'Research Topics',
        'about.institutions.title': 'Affiliated Institutions',
        'about.editorial': 'Editorial Office:',
        'about.review.title': 'Review Process',
        'cfp.title': 'Call for Papers',
        'submission.title': 'Submission Guidelines',
        'submission.email.title': 'Submission Email',
        'submission.format.title': 'File Format Requirements',
        'submission.deadline.title': 'Important Dates',
        'submission.deadline.inaugural': 'Inaugural Issue Deadline:',
        'submission.guidelines.title': 'Formatting Guidelines',
        'contact.title': 'Contact Us',
        'contact.email': 'Email',
        'contact.office': 'Editorial Office',
        'contact.partners': 'Partner Institutions'
    }
};

// Current language
let currentLang = 'bo';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Set initial language based on browser or default to Tibetan
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
        switchLanguage('zh');
    } else if (browserLang.startsWith('en')) {
        switchLanguage('en');
    } else {
        switchLanguage('bo');
    }
});

// Switch language function
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Show/hide language-specific content
    document.querySelectorAll('[data-lang-content]').forEach(element => {
        const contentLang = element.getAttribute('data-lang-content');
        if (contentLang === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && ['bo', 'zh', 'en'].includes(savedLang)) {
        switchLanguage(savedLang);
    }
});

// Add active state to navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Print functionality (for future use)
function printCallForPapers() {
    window.print();
}

// Copy email to clipboard
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal mailto to work, but also show a tooltip
            const email = this.textContent;
            console.log('Email address:', email);
        });
    });
});

// Add animation to cards on hover
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.about-card, .submission-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});