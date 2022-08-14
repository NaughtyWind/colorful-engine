const canvas = document.getElementById('box');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');


function random(max, min) {
  return (max + 1- min) * Math.random() + min;
}

let circles = [];

function generateCircle() {
  circles = [];
  const circleNum = 120;
  for (let i = 0; i < circleNum; i++) {
    ctx.beginPath();
    const x = Math.random() * document.body.clientWidth;
    const y = Math.random() * document.body.clientHeight;
    const radius = random(5, 30);

    circles.push({ x, y, radius, speedX: random(0.5, 2), speedY: random(0.5, 2) });
  }
}

// console.log(circles);

let handle = null;
function animation() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    ctx.beginPath();

    if (circle.y + circle.speedY > canvas.height || circle.y + circle.speedY < 0) {
      circle.speedY = -circle.speedY;
    }
    if (circle.x + circle.speedX > canvas.width || circle.x + circle.speedX < 0) {
      circle.speedX = -circle.speedX;
    }

    circle.x += circle.speedX;
    circle.y += circle.speedY;

    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#29e';
    ctx.stroke();
    ctx.closePath();
  }

  handle = requestAnimationFrame(animation);
}

generateCircle();
animation();

window.addEventListener('resize', () => {
  cancelAnimationFrame(handle);
  canvas.width = window.innerWidth;
  
  canvas.height = window.innerHeight;
  generateCircle();
  animation();
});