// Gestion du Thème
const themeBtn = document.getElementById("toggle-theme");
const isEn = window.location.href.includes("_en.html");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        
        if (isEn) {
            themeBtn.textContent = isDark ? "Light theme" : "Dark theme";
        } else {
            themeBtn.textContent = isDark ? "Thème clair" : "Thème sombre";
        }
    });
}

// Gestion de la Langue
const langBtn = document.getElementById("toggle-lang");
if (langBtn) {
    if (isEn) langBtn.textContent = "FR";
    langBtn.addEventListener("click", () => {
        const currentUrl = window.location.href;
        if (isEn) {
            window.location.href = currentUrl.replace("_en.html", ".html");
        } else {
            window.location.href = currentUrl.replace(".html", "_en.html");
        }
    });
}

// Gestion de la Modale (Uniquement si les éléments existent)
const detailButtons = document.querySelectorAll('.btn-details');
const modal = document.getElementById('project-modal');
const techContainer = document.getElementById('modal-tech');
const closeBtn = document.querySelector('.close-btn');

if (modal && techContainer) {
    detailButtons.forEach(btn => {
        btn.onclick = () => {
            document.getElementById('modal-title').innerText = btn.dataset.title;
            document.getElementById('modal-description').innerText = btn.dataset.desc;
            document.getElementById('modal-img').src = btn.dataset.img;
            techContainer.innerHTML = "";
            const languages = btn.dataset.tech.split(',');
            languages.forEach(lang => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.innerText = lang.trim();
                techContainer.appendChild(span);
            });
            modal.style.display = "block";
        };
    });

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    window.onclick = (e) => { 
        if(e.target == modal) modal.style.display = "none"; 
    };
}

// Animation au défilement (Scroll Reveal)
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
});