// ===== CONFETTI =====
const confettiColors = ['#FFD700', '#FF4500', '#FF69B4', '#00FF7F', '#FF1493', '#FFA500', '#FF6347', '#DA70D6'];

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDuration = (Math.random() * 4 + 4) + 's';
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 8000);
}

setInterval(createConfetti, 200);

// ===== FIREWORKS =====
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.radius = Math.random() * 3 + 1;
        this.gravity = 0.08;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= 0.018;
        this.vx *= 0.98;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

let particles = [];
const fwColors = ['#FFD700', '#FF4500', '#FF69B4', '#FFA500', '#FF1493', '#FFFFFF', '#FFB6C1'];

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const color = fwColors[Math.floor(Math.random() * fwColors.length)];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// Pháo hoa định kỳ
setInterval(launchFirework, 1800);
setTimeout(launchFirework, 500);
setTimeout(launchFirework, 1000);

// ===== TYPEWRITER EFFECT =====
const textElement = document.getElementById('text');
const cursorElement = document.getElementById('cursor');

const fullText = "🎊 Chúc cả nhà 🎊\nMột năm Bính Ngọ\nmạnh khỏe, hạnh phúc 🐴\nVạn sự như ý, triệu sự như mơ\ntrăm sự bất ngờ, hàng giờ hạnh phúc 🎉🎊";
let i = 0;

function typeWriter() {
    if (i < fullText.length) {
        const char = fullText.charAt(i);
        textElement.innerHTML += char === '\n' ? '<br>' : char;
        i++;
        // Tốc độ tự nhiên: dừng lâu hơn ở dấu phẩy/xuống dòng
        const delay = (char === ',' || char === '.') ? 200 : (char === '\n' ? 450 : 60 + Math.random() * 40);
        setTimeout(typeWriter, delay);
    } else {
        // Gõ xong → ẩn cursor, chờ 2 giây rồi hiện nhân vật
        cursorElement.style.display = 'none';
        setTimeout(showCharacter, 1000);
    }
}

function showCharacter() {
    const character = document.getElementById('character');
    character.classList.remove('hidden');
    character.classList.add('show-up');

    // Pháo hoa nổ khi nhân vật xuất hiện
    for (let k = 0; k < 4; k++) {
        setTimeout(launchFirework, k * 250);
    }

    // Hiện bong bóng thoại sau 1.2 giây
    setTimeout(showSpeech, 800);
}

function showSpeech() {
    const speech = document.getElementById('speech');
    speech.classList.remove('hidden');
    speech.classList.add('show-up');

    // Thêm pháo hoa khi speech xuất hiện
    for (let k = 0; k < 3; k++) {
        setTimeout(launchFirework, k * 300);
    }

    // Hiện 4 QR nổi xung quanh, staggered
    setTimeout(showFloatingQRs, 400);
}

function showFloatingQRs() {
    const qrIds = ['fqr1', 'fqr2', 'fqr3', 'fqr4'];
    qrIds.forEach((id, index) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            el.classList.remove('hidden');
            el.classList.add('show-up');
        }, index * 200);
    });
}


// Bắt đầu khi trang load xong
window.onload = function () {
    setTimeout(typeWriter, 600);
};

