export function generateCaptcha(length = 4, width = 160, height = 60) {
  // 创建画布
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 生成随机字符
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += chars[Math.floor(Math.random() * chars.length)];
  }

  // 绘制每个字符（带随机偏移和颜色）
  const fontSize = height * 0.6;
  ctx.textBaseline = 'middle';
  for (let i = 0; i < text.length; i++) {
    const x = (i / text.length) * width + 10 + Math.random() * 8;
    const y = height / 2 + (Math.random() - 0.5) * 12;
    const angle = (Math.random() - 0.5) * 0.4;
    const color = `rgb(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 50)})`;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }

  // 干扰线
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 0.6)`;
    ctx.lineWidth = 1 + Math.random() * 1.5;
    ctx.stroke();
  }

  // 噪点
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random() * 0.8})`;
    ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
  }

  // 转换为Base64
  const base64 = canvas.toDataURL('image/png');

  return { text, base64 };
}
