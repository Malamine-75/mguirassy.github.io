document.getElementById('enterButton').addEventListener('click', function() {
    document.getElementById('matrix-animation').style.display = 'block';
    startMatrixAnimation();
    
    setTimeout(function() {
        // Hide the button and animation container after 5 seconds
        document.getElementById('enterButton').style.display = 'none';
        document.getElementById('matrix-animation').style.display = 'none';

        // Show the portfolio content
        document.querySelector('header').style.display = 'block';
        document.querySelectorAll('section.content').forEach(section => {
            section.style.display = 'block';
        });
        document.querySelector('footer').style.display = 'block';
    }, 5000);  // Durée de l'animation en millisecondes
});

function startMatrixAnimation() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

// Réinitialisation de la taille du canvas lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
