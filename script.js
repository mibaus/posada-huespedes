// Simple navigation script with history

document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const actionBtns = document.querySelectorAll('.action-btn');
    const backBtns = document.querySelectorAll('.back-btn');
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
            if (navigationHistory.length > 0) {
                const previousScreen = navigationHistory.pop();
                showScreen(previousScreen);
            } else {
                showScreen('home');
            }
        });
    });

    function showScreen(id) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
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
