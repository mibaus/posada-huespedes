// Simple navigation script with history

document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const actionBtns = document.querySelectorAll('.action-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const floatingBackBtn = document.querySelector('.floating-back-btn');
    let navigationHistory = ['home'];

    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const currentScreen = document.querySelector('.screen.active').id;
            navigationHistory.push(currentScreen);
            showScreen(target);
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            goBack();
        });
    });

    // Manejar botón flotante
    if (floatingBackBtn) {
        floatingBackBtn.addEventListener('click', function() {
            goBack();
        });
    }

    function goBack() {
        if (navigationHistory.length > 0) {
            const previousScreen = navigationHistory.pop();
            showScreen(previousScreen);
        } else {
            showScreen('home');
        }
    }

    function showScreen(id) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
        
        // Mostrar/ocultar botón flotante según la pantalla
        if (floatingBackBtn) {
            if (id === 'home') {
                floatingBackBtn.style.display = 'none';
            } else {
                floatingBackBtn.style.display = 'flex';
            }
        }

        // Aplicar filtro predeterminado al entrar a secciones con filtro
        const activeScreen = document.getElementById(id);
        const zoneFilter = activeScreen.querySelector('.zone-filter');
        if (zoneFilter) {
            // Intentar aplicar filtro "Nono" si existe, sino mostrar "Todas"
            const nonoBtn = activeScreen.querySelector('[data-zone-filter="nono"]');
            const todasBtn = activeScreen.querySelector('[data-zone-filter="todas"]');
            
            setTimeout(() => {
                if (nonoBtn) {
                    // Si existe botón Nono, activarlo
                    nonoBtn.click();
                } else if (todasBtn) {
                    // Si no existe Nono, activar "Todas"
                    todasBtn.click();
                }
            }, 50);
        }
    }

    // Inicializar filtros de zona
    initZoneFilters();

    function initZoneFilters() {
        const zoneFilterBtns = document.querySelectorAll('.zone-btn');
        
        zoneFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const screen = this.closest('.screen');
                const filterValue = this.getAttribute('data-zone-filter');
                
                // Actualizar estado activo de botones
                const allBtns = screen.querySelectorAll('.zone-btn');
                allBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar cards
                filterCards(screen, filterValue);
            });
        });
    }

    function filterCards(screen, zone) {
        const cards = screen.querySelectorAll('.card[data-zone]');
        
        cards.forEach(card => {
            if (zone === 'todas') {
                card.classList.remove('hidden');
            } else {
                if (card.getAttribute('data-zone') === zone) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    }

    // Inicializar tabs de biblioteca
    initBibliotecaTabs();

    function initBibliotecaTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                const screen = this.closest('.screen');
                
                // Actualizar estado activo de botones
                const allTabBtns = screen.querySelectorAll('.tab-btn');
                allTabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Mostrar contenido correspondiente
                const allTabContents = screen.querySelectorAll('.tab-content');
                allTabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetContent = screen.querySelector(`#${targetTab}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Reinicializar iconos de Lucide
                lucide.createIcons();
            });
        });
    }
});

// Función para copiar al portapapeles
function copyToClipboard(elementId, button) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    // Usar la API moderna del portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Error al copiar:', err);
            fallbackCopy(text, button);
        });
    } else {
        fallbackCopy(text, button);
    }
}

// Método alternativo para navegadores antiguos
function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    
    document.body.removeChild(textArea);
}

// Mostrar feedback visual al copiar
function showCopyFeedback(button) {
    const icon = button.querySelector('i');
    const originalIcon = icon.getAttribute('data-lucide');
    
    // Cambiar a icono de check
    icon.setAttribute('data-lucide', 'check');
    lucide.createIcons();
    button.classList.add('copied');
    
    // Volver al icono original después de 2 segundos
    setTimeout(() => {
        icon.setAttribute('data-lucide', originalIcon);
        lucide.createIcons();
        button.classList.remove('copied');
    }, 2000);
}

// Función para solicitar libros o juegos de mesa
function solicitarItem(nombre, tipo) {
    const tipoTexto = tipo === 'libro' ? 'el libro' : 'el juego';
    const mensaje = `Hola, soy huésped de Posada de Nono. Me gustaría solicitar ${tipoTexto} "${nombre}". ¿Está disponible?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroWhatsApp = '5493516178200';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
}
