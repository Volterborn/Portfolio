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
/* --- LOGIQUE DE FILTRE DES PROJETS --- */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Gérer la classe 'active' sur les boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Récupérer le filtre cliqué
            const filterValue = btn.getAttribute('data-filter');

            // 3. Afficher/Masquer les cartes avec animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block'; 
                    // Petite animation de réapparition
                    card.animate([
                        { transform: 'scale(0.95)', opacity: 0 },
                        { transform: 'scale(1)', opacity: 1 }
                    ], {
                        duration: 300,
                        easing: 'ease-out'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --- GESTION DU FORMULAIRE ET NOTIFICATION --- */
const contactForm = document.querySelector('.contact-form');
const notification = document.getElementById('notification');

if (contactForm && notification) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêche la redirection vers la page Formspree

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Important pour que Formspree réponde en JSON
                }
            });

            if (response.ok) {
                // SUCCÈS : On affiche le pop-up vert
                notification.textContent = "Message envoyé avec succès ! 🚀";
                notification.classList.remove('error');
                notification.classList.add('show');
                
                // On vide le formulaire
                contactForm.reset();

                // On cache le pop-up après 4 secondes
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 4000);
            } else {
                // ERREUR : Si Formspree rejette (ex: email invalide)
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            // GESTION D'ERREUR
            notification.textContent = "Oups ! Une erreur est survenue.";
            notification.classList.add('error'); // Deviendra rouge grâce au CSS
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }
    });
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