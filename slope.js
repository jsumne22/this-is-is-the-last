// Slope-Intercept Practice JS
// y = mx + b

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentPoint = null;
let currentSlope = null;
let currentIntercept = null;

function newProblem() {
  // Pick a random slope and intercept
  currentSlope = randomInt(-5, 5);
  while (currentSlope === 0) currentSlope = randomInt(-5, 5); // avoid 0 slope
  currentIntercept = randomInt(-10, 10);
  // Pick a random x value
  const x = randomInt(-5, 5);
  const y = currentSlope * x + currentIntercept;
  currentPoint = { x, y };
  document.getElementById('problem').textContent =
    `Given the point (${x}, ${y}), what is the equation of the line in y = mx + b form?`;
  document.getElementById('result').textContent = '';
  document.getElementById('newProblem').style.display = 'none';
  document.getElementById('answerForm').reset();
  drawPlot();
}

function drawPlot() {
  const canvas = document.getElementById('plot');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw axes
  ctx.strokeStyle = '#888';
  ctx.beginPath();
  ctx.moveTo(0, 150); ctx.lineTo(300, 150); // x-axis
  ctx.moveTo(150, 0); ctx.lineTo(150, 300); // y-axis
  ctx.stroke();
  // Draw point
  const px = 150 + currentPoint.x * 20;
  const py = 150 - currentPoint.y * 20;
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(px, py, 5, 0, 2 * Math.PI);
  ctx.fill();
}

document.getElementById('answerForm').onsubmit = function(e) {
  e.preventDefault();
  const m = parseFloat(document.getElementById('slope').value);
  const b = parseFloat(document.getElementById('intercept').value);
  if (Math.abs(m - currentSlope) < 1e-6 && Math.abs(b - currentIntercept) < 1e-6) {
    document.getElementById('result').innerHTML =
      `✅ Correct!<br><br>` +
      `Mathematics: The point (${currentPoint.x}, ${currentPoint.y}) lies on the line y = mx + b. ` +
      `So, ${currentPoint.y} = m * ${currentPoint.x} + b. ` +
      `With m = ${currentSlope}, b = ${currentIntercept}, we get ${currentPoint.y} = ${currentSlope} * ${currentPoint.x} + ${currentIntercept}.`;
    document.getElementById('newProblem').style.display = '';
  } else {
    document.getElementById('result').textContent = '❌ Try again!';
  }
};

document.getElementById('newProblem').onclick = newProblem;

// Start first problem
newProblem();
