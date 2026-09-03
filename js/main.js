document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const OFFICIAL_PHONE = '5549999609130';

    /* ==========================================================================
       1. HERO CANVAS INTERATIVO OTIMIZADO
       ========================================================================== */
    const canvas = document.getElementById('hero-canvas');
    if (canvas && canvas.parentElement) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;
        let isHeroVisible = true;
        let animationFrameId = null;

        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? Math.min(Math.floor(width * 0.03), 32) : Math.min(Math.floor(width * 0.045), 55);
        const maxDistance = isMobile ? 95 : 125;
        let mouse = { x: null, y: null, radius: 130 };

        window.addEventListener('resize', () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        }, { passive: true });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.size = Math.random() * 2 + 1;
                this.baseAlpha = Math.random() * 0.45 + 0.25;
                this.color = `rgba(212, 175, 55, ${this.baseAlpha})`;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= Math.cos(angle) * force * 1.8;
                        this.y -= Math.sin(angle) * force * 1.8;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const particles = Array.from({ length: particleCount }, () => new Particle());

        function animateCanvas() {
            if (!isHeroVisible) {
                animationFrameId = null;
                return;
            }

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animateCanvas);
        }

        const heroElement = document.getElementById('hero');
        if (heroElement && 'IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isHeroVisible = entry.isIntersecting;
                    if (isHeroVisible && !animationFrameId) {
                        animateCanvas();
                    }
                });
            }, { threshold: 0.05 });
            heroObserver.observe(heroElement);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isHeroVisible = false;
            } else if (heroElement && heroElement.getBoundingClientRect().bottom > 0) {
                isHeroVisible = true;
                if (!animationFrameId) animateCanvas();
            }
        });

        animateCanvas();
    }

    /* ==========================================================================
       2. SCROLL SPY & NAVBAR STICKY
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        if (scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { passive: true });

    /* ==========================================================================
       3. ON-SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('revealed'));
    }

    /* ==========================================================================
       4. FILTROS E LIGHTBOX NAVEGÁVEL DO PORTFÓLIO
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    let activeCategory = 'all';
    let visibleItems = [...portfolioItems];
    let currentIndex = 0;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            activeCategory = btn.getAttribute('data-filter');

            visibleItems = portfolioItems.filter(item => {
                const category = item.getAttribute('data-category');
                const isMatch = activeCategory === 'all' || category === activeCategory;
                
                if (isMatch) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
                return isMatch;
            });
        });
    });

    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxWaBtn = document.getElementById('lightbox-wa-btn');

    function updateLightboxContent(index) {
        if (!visibleItems.length || index < 0 || index >= visibleItems.length) return;
        currentIndex = index;
        const currentItem = visibleItems[currentIndex];

        const img = currentItem.getAttribute('data-img');
        const title = currentItem.getAttribute('data-title');
        const categoryLabel = currentItem.getAttribute('data-category-label');
        const desc = currentItem.getAttribute('data-desc');

        lightboxImg.src = img;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = categoryLabel;
        lightboxDesc.textContent = desc;

        if (visibleItems.length <= 1) {
            if (lightboxPrev) lightboxPrev.style.display = 'none';
            if (lightboxNext) lightboxNext.style.display = 'none';
        } else {
            if (lightboxPrev) lightboxPrev.style.display = 'flex';
            if (lightboxNext) lightboxNext.style.display = 'flex';
        }
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const idx = visibleItems.indexOf(item);
            if (idx !== -1) {
                updateLightboxContent(idx);
                if (lightboxModal) {
                    lightboxModal.classList.add('active');
                    lightboxModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                }
            }
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

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextIdx = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightboxContent(nextIdx);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextIdx = (currentIndex + 1) % visibleItems.length;
            updateLightboxContent(nextIdx);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            const nextIdx = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightboxContent(nextIdx);
        } else if (e.key === 'ArrowRight') {
            const nextIdx = (currentIndex + 1) % visibleItems.length;
            updateLightboxContent(nextIdx);
        }
    });

    if (lightboxWaBtn) {
        lightboxWaBtn.addEventListener('click', () => {
            const title = lightboxTitle ? lightboxTitle.textContent : 'Projeto Ourograf';
            const msg = `Olá, Ourograf!\nEstava vendo o portfólio no site e gostei muito do projeto:\n*${title}*\n\nGostaria de solicitar um orçamento para um serviço similar na minha empresa.`;
            window.open(`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    /* ==========================================================================
       5. SIMULADOR DE ORÇAMENTO (TABS & INTEGRAÇÃO WHATSAPP)
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    window.selectTab = function(targetId) {
        tabBtns.forEach(b => {
            const isMatch = b.getAttribute('data-target') === targetId;
            b.classList.toggle('active', isMatch);
            b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
        tabContents.forEach(c => {
            c.classList.toggle('active', c.id === targetId);
        });
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            window.selectTab(targetId);
        });
    });

    function clearFieldError(input) {
        if (!input) return;
        input.classList.remove('input-invalid');
        const parent = input.closest('.input-group') || input.parentElement;
        const errorMsg = parent?.querySelector('.field-error-msg');
        if (errorMsg) errorMsg.remove();
    }

    function setFieldError(input, message = 'Por favor, preencha este campo obrigatório') {
        if (!input) return;
        input.classList.add('input-invalid');
        const parent = input.closest('.input-group') || input.parentElement;
        if (parent && !parent.querySelector('.field-error-msg')) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'field-error-msg';
            errorSpan.innerHTML = `⚠️ ${message}`;
            parent.appendChild(errorSpan);
        }
    }

    // Limpar erros ao digitar ou alterar
    document.querySelectorAll('.quote-form input, .quote-form select, .quote-form textarea').forEach(input => {
        input.addEventListener('input', () => clearFieldError(input));
        input.addEventListener('change', () => clearFieldError(input));
    });

    const modeRadios = document.querySelectorAll('.mode-radio input');
    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const form = e.target.closest('form');
            const mode = e.target.value;
            
            // Limpa mensagens de erro ao trocar de modo
            form.querySelectorAll('.input-invalid').forEach(inp => clearFieldError(inp));

            form.querySelectorAll('.form-section').forEach(sec => {
                sec.style.display = 'none';
                sec.classList.remove('active');
            });
            
            const targetSec = form.querySelector(`.form-section.mode-${mode}`);
            if (targetSec) {
                targetSec.style.display = 'block';
                targetSec.classList.add('active');
            }

            // Atualiza dynamic required para não travar campos ocultos
            const largura = form.querySelector('input[name="largura"]');
            const altura = form.querySelector('input[name="altura"]');
            const endereco = form.querySelector('input[name="endereco"]');

            if (mode === 'medidas') {
                if (largura) largura.required = true;
                if (altura) altura.required = true;
                if (endereco) endereco.required = false;
            } else if (mode === 'visita') {
                if (largura) largura.required = false;
                if (altura) altura.required = false;
                if (endereco) endereco.required = true;
            } else if (mode === 'padrao') {
                if (largura) largura.required = false;
                if (altura) altura.required = false;
                if (endereco) endereco.required = false;
            }
        });
    });

    const quoteForms = document.querySelectorAll('.quote-form');
    let isSubmitting = false;

    quoteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (isSubmitting) return;

            const productType = form.getAttribute('data-type') || 'Comunicação Visual';
            const activeModeRadio = form.querySelector('.mode-radio input:checked');
            const modeValue = activeModeRadio ? activeModeRadio.value : 'medidas';
            const modeLabel = activeModeRadio ? activeModeRadio.parentElement.textContent.trim() : '';

            let hasError = false;
            let firstInvalidInput = null;

            // Validação visual de campos obrigatórios ativos
            if (modeValue === 'medidas') {
                const largura = form.querySelector('input[name="largura"]');
                const altura = form.querySelector('input[name="altura"]');

                if (largura && (!largura.value || parseFloat(largura.value) <= 0)) {
                    setFieldError(largura, 'Informe a largura estimada');
                    hasError = true;
                    if (!firstInvalidInput) firstInvalidInput = largura;
                } else if (largura) {
                    clearFieldError(largura);
                }

                if (altura && (!altura.value || parseFloat(altura.value) <= 0)) {
                    setFieldError(altura, 'Informe a altura estimada');
                    hasError = true;
                    if (!firstInvalidInput) firstInvalidInput = altura;
                } else if (altura) {
                    clearFieldError(altura);
                }
            } else if (modeValue === 'visita') {
                const endereco = form.querySelector('input[name="endereco"]');
                if (endereco && !endereco.value.trim()) {
                    setFieldError(endereco, 'Informe o endereço ou cidade para a visita técnica');
                    hasError = true;
                    if (!firstInvalidInput) firstInvalidInput = endereco;
                } else if (endereco) {
                    clearFieldError(endereco);
                }
            }

            if (hasError) {
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                }
                return;
            }

            isSubmitting = true;
            setTimeout(() => { isSubmitting = false; }, 1500);

            let detailsLines = [];

            if (modeValue === 'medidas') {
                const largura = form.querySelector('input[name="largura"]')?.value;
                const altura = form.querySelector('input[name="altura"]')?.value;
                if (largura && altura) {
                    const unit = productType.includes('Fachada') ? 'm' : 'cm';
                    detailsLines.push(`📏 *Dimensões:* ${largura}${unit} de largura x ${altura}${unit} de altura`);
                    
                    if (unit === 'm') {
                        const areaM2 = (parseFloat(largura) * parseFloat(altura)).toFixed(2);
                        detailsLines.push(`📐 *Área Estimada:* aprox. ${areaM2} m²`);
                    }
                }
            } else if (modeValue === 'visita') {
                const endereco = form.querySelector('input[name="endereco"]')?.value;
                if (endereco) {
                    detailsLines.push(`📍 *Local para Visita Técnica:* ${endereco}`);
                }
            } else if (modeValue === 'padrao') {
                const tamanhoPadrao = form.querySelector('select[name="tamanho_padrao"]')?.value;
                const metroQuadrado = form.querySelector('select[name="metro_quadrado"]')?.value;
                if (tamanhoPadrao) detailsLines.push(`📐 *Tamanho Sugerido:* ${tamanhoPadrao}`);
                if (metroQuadrado) detailsLines.push(`📐 *Área Estimada:* ${metroQuadrado}`);
            }

            const tipo = form.querySelector('select[name="tipo"]')?.value;
            const acabamento = form.querySelector('select[name="acabamento"]')?.value;
            const aplicacao = form.querySelector('select[name="aplicacao"]')?.value;
            const obs = form.querySelector('textarea[name="obs"]')?.value?.trim();

            if (tipo) detailsLines.push(`🛠️ *Especificação:* ${tipo}`);
            if (acabamento) detailsLines.push(`✨ *Acabamento:* ${acabamento}`);
            if (aplicacao) detailsLines.push(`🎯 *Aplicação:* ${aplicacao}`);
            if (obs) detailsLines.push(`📝 *Observações:* ${obs}`);

            let message = `Olá, equipe Ourograf!\nSolicito um orçamento pelo simulador do site:\n\n`;
            message += `🏷️ *Serviço:* ${productType}\n`;
            if (modeLabel) message += `⚙️ *Opção:* ${modeLabel}\n`;
            if (detailsLines.length > 0) {
                message += detailsLines.join('\n') + '\n';
            }
            message += `\nAguardo as orientações e valores. Obrigado!`;

            const waUrl = `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    });
});
