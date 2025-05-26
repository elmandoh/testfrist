const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// إعداد اللاعب
let player = {
    x: 100,
    y: 500,
    width: 40,
    height: 40,
    speed: 5
};

// إعداد العدو
let enemy = {
    x: 700,
    y: 100,
    width: 40,
    height: 40,
    speed: 2
};

// إعداد الموارد
let gold = 0;

// التحكم باللاعب
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        player.x += player.speed;
    } else if (event.key === 'ArrowLeft') {
        player.x -= player.speed;
    } else if (event.key === 'ArrowUp') {
        player.y -= player.speed;
    } else if (event.key === 'ArrowDown') {
        player.y += player.speed;
    }
    // منع الخروج من حدود الشاشة
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
});

// تحريك العدو نحو اللاعب
function moveEnemy() {
    if (enemy.x > player.x) enemy.x -= enemy.speed;
    if (enemy.x < player.x) enemy.x += enemy.speed;
    if (enemy.y > player.y) enemy.y -= enemy.speed;
    if (enemy.y < player.y) enemy.y += enemy.speed;
}

// جمع الموارد
function collectResources() {
    gold += 1; // زيادة الذهب كل ثانية
}

// التحقق من التصادم
function checkCollision() {
    if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    ) {
        alert('تصادم! اللعبة انتهت.');
        gold = 0; // إعادة تعيين الذهب
        enemy.x = 700; // إعادة تعيين العدو
        enemy.y = 100;
    }
}

// حلقة اللعبة
function gameLoop() {
    // مسح الشاشة
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم الخلفية
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // رسم اللاعب
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // رسم العدو
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // عرض الموارد
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`الذهب: ${gold}`, 10, 30);

    // تحديث اللعبة
    moveEnemy();
    checkCollision();
    collectResources();

    // استمرار الحلقة
    requestAnimationFrame(gameLoop);
}

// بدء اللعبة
gameLoop();

// جمع الموارد كل ثانية
setInterval(collectResources, 1000);