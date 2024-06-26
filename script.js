document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('matrix-canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Define the characters to use in the animation
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    function drawMatrix() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#0f0';
        context.font = `${fontSize}px monospace`;

        drops.forEach((y, index) => {
            const text = characters.charAt(Math.floor(Math.random() * charactersLength));
            const x = index * fontSize;
            context.fillText(text, x, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[index] = 0;
            }

            drops[index]++;
        });
    }

    setInterval(drawMatrix, 33);
});
