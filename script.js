document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('matrix-canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const dropSpeed = 0.7; 
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const spacing = fontSize * 4;
    const drops = Array.from({ length: columns }, (_, index) => Math.random() * -spacing);

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

    drawMatrix();
});
