(function () {
  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors = ['#6a9c3f', '#4fd1c5', '#f2c14e', '#77777d'];
  var blocks = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(randomY) {
    var size = 8 + Math.random() * 14;
    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + size,
      size: size,
      speed: 0.12 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 0.22,
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.004,
      alpha: 0.12 + Math.random() * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function build() {
    var count = window.innerWidth < 700 ? 14 : 28;
    blocks = [];
    for (var i = 0; i < count; i++) blocks.push(spawn(true));
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);
      ctx.globalAlpha = b.alpha;
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size);
      ctx.globalAlpha = b.alpha * 0.55;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size);
      ctx.restore();
    }
  }

  function step() {
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      b.y -= b.speed;
      b.x += b.drift;
      b.angle += b.spin;
      if (b.y < -b.size * 2) blocks[i] = spawn(false);
      if (b.x < -60) b.x = window.innerWidth + 40;
      if (b.x > window.innerWidth + 60) b.x = -40;
    }
    draw();
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', function () {
    resize();
    build();
    if (reduced) draw();
  });

  resize();
  build();

  if (reduced) {
    draw();
  } else {
    requestAnimationFrame(step);
  }
})();
