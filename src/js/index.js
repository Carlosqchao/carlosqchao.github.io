const asciiText = `
  ____           _         ____   _____ 
 |  _ \\         | |       / __ \\ / ____|
 | |_) |_ __ ___| |_ ___ | |  | | (___  
 |  _ <| '__/ _ \\ __/ _ \\| |  | |\\___ \\ 
 | |_) | | |  __/ || (_) | |__| |____) |
 |____/|_|  \\___|\\__\\___/ \\____/|_____/ 
`;

const colors = ['#00ff88', '#ff0066', '#00ccff', '#ffaa00', '#aa00ff', '#ff4444'];
let currentColorIndex = 0;
let matrixEnabled = true;

function typeWriter() {
    const asciiElement = document.getElementById('asciiArt');
    asciiElement.innerHTML = '';

    const chars = asciiText.split('');
    let index = 0;

    function addChar() {
        if (index < chars.length) {
            const char = chars[index];
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            span.style.animationDelay = `${index * 0.008}s`;
            asciiElement.appendChild(span);
            index++;
            setTimeout(addChar, 15);
        } else {
            asciiElement.classList.add('loaded');
        }
    }
    addChar();
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

function createMatrix() {
    const matrixBg = document.getElementById('matrixBg');

    function addMatrixChar() {
        if (matrixBg.children.length > 10) return;

        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = String.fromCharCode(33 + Math.random() * 94);
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        matrixBg.appendChild(char);

        setTimeout(() => {
            if (char.parentNode) {
                char.remove();
            }
        }, 2000);
    }

    if (matrixEnabled) {
        addMatrixChar();
        setTimeout(createMatrix, 300);
    }
}



// Inicializar animación cuando se carga la página
window.addEventListener('load', () => {
    const asciiElement = document.getElementById('asciiArt');
    asciiElement.textContent = asciiText;
    createParticles();
    createMatrix();
});

// Observer para reiniciar la animación cuando la tarjeta es visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const asciiElement = document.getElementById('asciiArt');
            if (asciiElement && asciiElement.innerHTML === '') {
                typeWriter();
                createParticles();
                if (matrixEnabled) createMatrix();
            }
        }
    });
});

// Observar la tarjeta del proyecto
setTimeout(() => {
    const bretosCard = document.querySelector('.bretos-animation-container');
    if (bretosCard) {
        observer.observe(bretosCard);
    }
}, 100);