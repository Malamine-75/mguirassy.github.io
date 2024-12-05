document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('matrix-canvas');

    if (!canvas) {
        console.log("Canvas non trouvé sur cette page.");
        return; // Si le canvas n'est pas trouvé, on quitte la fonction.
    }

    console.log("Canvas trouvé et script chargé !");
    const context = canvas.getContext('2d');
    let dropSpeed = 0.7;
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Ajuste la taille du canvas en fonction de la fenêtre
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log("Canvas redimensionné à : " + window.innerWidth + "x" + window.innerHeight);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const spacing = fontSize * 4;
    const drops = Array.from({ length: columns }, () => Math.random() * -spacing);

    // Fonction d'animation Matrix
    function drawMatrix() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#0f0';
        context.font = `${fontSize}px monospace`;

        drops.forEach((y, index) => {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = index * fontSize;

            context.fillText(text, x, y * fontSize);

            if (y * fontSize > canvas.height) {
                drops[index] = Math.random() * -spacing;
            }

            drops[index] += dropSpeed;
        });

        requestAnimationFrame(drawMatrix);
    }

    // Changer la vitesse de la chute avec mousemove
    canvas.addEventListener('mousemove', (event) => {
        dropSpeed = Math.max(0.1, (event.clientY / canvas.height) * 2);
    });

    // Modifier les caractères sur clic
    canvas.addEventListener('click', () => {
        console.log("Canvas cliqué, changement des caractères.");
        characters = '漢字カタカナひらがな'; // Exemple de caractères japonais
    });

    // Démarrer l'animation
    drawMatrix();
});
