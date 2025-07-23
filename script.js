document.addEventListener('DOMContentLoaded', function() {
    // Atualizar o ano atual no rodapé
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Menu mobile toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Alternar tema claro/escuro
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        
        // Alternar ícone do tema
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Efeito de scroll no header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Verificar se o elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    // Verificar visibilidade das barras de habilidades ao rolar
    function checkSkillsVisibility() {
        const skillsSection = document.getElementById('habilidades');
        
        if (skillsSection && isElementInViewport(skillsSection)) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillsVisibility);
        }
    }

    // Adicionar evento de rolagem para verificar visibilidade
    window.addEventListener('scroll', checkSkillsVisibility);
    
    // Verificar visibilidade inicial
    checkSkillsVisibility();

    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
                el.textContent = '';
            });
    
            let isValid = true;
    
            // Validate name
            const nome = document.getElementById('nome');
            if (!nome.value.trim()) {
                document.getElementById('nome-error').textContent = 'Nome é obrigatório';
                document.getElementById('nome-error').style.display = 'block';
                isValid = false;
            }
    
            // Validate email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                document.getElementById('email-error').textContent = 'Email é obrigatório';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                document.getElementById('email-error').textContent = 'Email inválido';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
    
            // Validate subject
            const assunto = document.getElementById('assunto');
            if (!assunto.value.trim()) {
                document.getElementById('assunto-error').textContent = 'Assunto é obrigatório';
                document.getElementById('assunto-error').style.display = 'block';
                isValid = false;
            }
    
            // Validate message
            const mensagem = document.getElementById('mensagem');
            if (!mensagem.value.trim()) {
                document.getElementById('mensagem-error').textContent = 'Mensagem é obrigatória';
                document.getElementById('mensagem-error').style.display = 'block';
                isValid = false;
            }
    
            if (!isValid) {
                e.preventDefault(); // Impede envio só se inválido
            } else {
                // Exibe feedback de sucesso (opcional, o Formspree também envia resposta)
                formSuccess.style.display = 'block';
                formSuccess.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
    
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
    
                // Permite envio para o Formspree normalmente
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});