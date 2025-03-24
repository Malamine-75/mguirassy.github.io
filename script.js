document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('matrix-canvas');

    if (!canvas) {
        console.log("Canvas non trouvé sur cette page.");
        return;
    }

    console.log("Canvas trouvé et animation Matrix activée !");
    const context = canvas.getContext('2d');
    let dropSpeed = 1.2;
    let characters = 'アァイィウエエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 18;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(Math.random() * -canvas.height / fontSize);

    function drawMatrix() {
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = `${fontSize}px monospace`;

        drops.forEach((y, index) => {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = index * fontSize;

            const gradient = context.createLinearGradient(x, y * fontSize, x, (y + 1) * fontSize);
            gradient.addColorStop(0, '#0f0');
            gradient.addColorStop(1, '#0a0');
            context.fillStyle = gradient;

            context.fillText(text, x, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[index] = 0;
            }

            drops[index] += dropSpeed;
        });

        requestAnimationFrame(drawMatrix);
    }

    // Animation de démarrage
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 1.5s ease';
    setTimeout(() => {
        canvas.style.opacity = '1';
    }, 100);

    // ✅ Déplacement des événements sur le document (fonctionne sur toutes les pages)
    document.addEventListener('mousemove', (event) => {
        dropSpeed = Math.max(0.3, (event.clientY / window.innerHeight) * 2);
    });

    document.addEventListener('click', () => {
        characters = characters.split('').sort(() => 0.5 - Math.random()).join('');
        console.log("Effet Matrix : changement de caractères déclenché.");
    });

    drawMatrix();
});