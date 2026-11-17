const sharp = require('sharp');

async function createLogos() {
  const svgWhite = `
  <svg width="240" height="240" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" fill="#ffffff" />
    <circle cx="27" cy="34" r="9.5" fill="#ffffff" />
    <circle cx="43" cy="21" r="9.5" fill="#ffffff" />
    <circle cx="57" cy="21" r="9.5" fill="#ffffff" />
    <circle cx="73" cy="34" r="9.5" fill="#ffffff" />
  </svg>`;

  await sharp(Buffer.from(svgWhite))
    .png()
    .toFile('public/assets/kacey_paw_white.png');

  const svgBlue = `
  <svg width="240" height="240" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" fill="#0070d2" />
    <circle cx="27" cy="34" r="9.5" fill="#0070d2" />
    <circle cx="43" cy="21" r="9.5" fill="#0070d2" />
    <circle cx="57" cy="21" r="9.5" fill="#0070d2" />
    <circle cx="73" cy="34" r="9.5" fill="#0070d2" />
  </svg>`;

  await sharp(Buffer.from(svgBlue))
    .png()
    .toFile('public/assets/kacey_paw_blue.png');

  console.log('Logos generated successfully!');
}

createLogos();
