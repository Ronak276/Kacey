const sharp = require('sharp');
const svg = `<svg width="70" height="280" xmlns="http://www.w3.org/2000/svg">
  <rect width="70" height="280" fill="#f8fafc" rx="6" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="12" y="24" width="46" height="26" fill="#7e22ce" rx="3"/>
  <rect x="12" y="62" width="46" height="26" fill="#f43f5e" rx="3"/>
  <rect x="12" y="100" width="46" height="26" fill="#15803d" rx="3"/>
  <rect x="12" y="138" width="46" height="26" fill="#ea580c" rx="3"/>
  <rect x="12" y="176" width="46" height="26" fill="#1e3a1e" rx="3"/>
  <rect x="12" y="214" width="46" height="26" fill="#eab308" rx="3"/>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile('public/assets/sample_abnormal_strip.png')
  .then(() => console.log('Successfully generated sample strip for testing!'));

