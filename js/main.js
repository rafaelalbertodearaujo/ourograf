document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================================================
       1. HERO CANVAS INTERATIVO (PARTÍCULAS & REDE DOURADA)
       ========================================================================= */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor(width * 0.05), 65);
        const maxDistance = 130;
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('resize', () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        });

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.size = Math.random() * 2.2 + 1;
                this.baseAlpha = Math.random() * 0.5 + 0.3;
                this.color = `rgba(212, 175, 55, ${this.baseAlpha})`;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Interação com o Mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= Math.cos(angle) * force * 2;
                        this.y -= Math.sin(angle) * force * 2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Desenhar Linhas de Conexão
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }


    /* =========================================================================
       2. SCROLL SPY & NAVBAR STICKY
       ========================================================================= */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Navbar scrolled background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // ScrollSpy ativação de links
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
            });
        });
    }


    /* =========================================================================
       3. ON-SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================= */
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));


    /* =========================================================================
       4. FILTROS DA GALERIA DE PORTFÓLIO
       ========================================================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* =========================================================================
       5. MODAL LIGHTBOX DINÂMICO DO PORTFÓLIO
       ========================================================================= */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxWaBtn = document.getElementById('lightbox-wa-btn');

    let currentProjectTitle = '';

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.getAttribute('data-img');
            const title = item.getAttribute('data-title');
            const categoryLabel = item.getAttribute('data-category-label');
            const desc = item.getAttribute('data-desc');

            currentProjectTitle = title;

            lightboxImg.src = img;
            lightboxImg.alt = title;
            lightboxTitle.textContent = title;
            lightboxCategory.textContent = categoryLabel;
            lightboxDesc.textContent = desc;

            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Ação do Botão de WhatsApp no Lightbox
    if (lightboxWaBtn) {
        lightboxWaBtn.addEventListener('click', () => {
            const phone = '5549999473009';
            const msg = `Ol\xE1, Ourograf! \uD83D\uDC4B\nVi o projeto no portf\xF3lio do site (*${currentProjectTitle}*) e gostaria de solicitar um or\xE7amento similar para a minha empresa. \uD83D\uDCCB`;
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }


    /* =========================================================================
       6. SIMULADOR DE ORÇAMENTO (TABS, MÓDOS & GERADOR WHATSAPP)
       ========================================================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    window.selectTab = function(targetId) {
        tabBtns.forEach(b => {
            if (b.getAttribute('data-target') === targetId) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        tabContents.forEach(c => {
            if (c.id === targetId) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            window.selectTab(targetId);
        });
    });

    // Lógica para alternar os modos (Medidas Exatas vs Padrão/Visita)
    const modeRadios = document.querySelectorAll('.mode-radio input');
    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const form = e.target.closest('form');
            const mode = e.target.value; // ex: 'medidas', 'visita', 'padrao'
            
            form.querySelectorAll('.form-section').forEach(sec => {
                sec.style.display = 'none';
                sec.classList.remove('active');
            });
            
            const targetSec = form.querySelector(`.form-section.mode-${mode}`);
            if (targetSec) {
                targetSec.style.display = 'block';
                targetSec.classList.add('active');
            }
        });
    });

    const waButtons = document.querySelectorAll('.generate-wa');
    const phone = '5549999473009';

    waButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const form = e.target.closest('form');
            if (!form) return;

            const productType = form.getAttribute('data-type');
            
            // Verifica o modo atual escolhido
            const activeModeRadio = form.querySelector('.mode-radio input:checked');
            const modeName = activeModeRadio ? activeModeRadio.nextElementSibling.textContent : '';
            
            let text = `Ol\xE1, Ourograf! \uD83D\uDC4B\nGostaria de solicitar um or\xE7amento para: *${productType}*\nModo: *${modeName}*\n\n`;

            const inputs = form.querySelectorAll('input, select, textarea');
            let hasMissingImportant = false;

            // Filtra inputs visíveis
            const activeInputs = Array.from(inputs).filter(input => {
                if (input.type === 'radio') return false;
                const section = input.closest('.form-section');
                return !section || section.classList.contains('active');
            });

            activeInputs.forEach(input => {
                const name = input.getAttribute('name');
                const val = input.value.trim();

                if (input.hasAttribute('required') && !val) {
                    hasMissingImportant = true;
                    input.style.borderColor = '#EF4444';
                } else if (input.hasAttribute('required')) {
                    input.style.borderColor = '';
                }

                if (val) {
                    let label = name.charAt(0).toUpperCase() + name.slice(1);
                    if (name === 'obs') label = 'Observa\xE7\xF5es';
                    if (name === 'tipo') label = 'Tipo de Fachada';
                    if (name === 'acabamento') label = 'Acabamento';
                    if (name === 'aplicacao') label = 'Aplica\xE7\xE3o';
                    if (name === 'endereco') label = 'Endere\xE7o para Visita';
                    if (name === 'tamanho_padrao') label = 'Tamanho Estimado';
                    if (name === 'metro_quadrado') label = 'Área Estimada';

                    if (name === 'largura' || name === 'altura') {
                        const unit = input.placeholder.includes('Metros') ? 'm' : 'cm';
                        text += `\u25B8 *${label}:* ${val} ${unit}\n`;
                    } else {
                        text += `\u25B8 *${label}:* ${val}\n`;
                    }
                }
            });

            if (hasMissingImportant) {
                alert('Por favor, preencha os campos obrigatórios em vermelho para calcularmos o or\xE7amento.');
                form.style.animation = 'none';
                void form.offsetWidth;
                form.style.animation = 'shake 0.4s';
                return;
            }

            text += `\nAguardo o retorno para prosseguirmos! \uD83D\uDCCB`;
            const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            window.open(waLink, '_blank');
        });
    });
});

// Estilo de erro dinâmico (shake)
const shakeStyle = document.createElement('style');
shakeStyle.innerHTML = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}
`;
document.head.appendChild(shakeStyle);
