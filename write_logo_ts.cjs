const fs = require('fs');

const b64 = fs.readFileSync('public/assets/kacey_paw_white.png').toString('base64');
const content = `export const KACEY_PAW_LOGO_WHITE = 'data:image/png;base64,${b64}';\n`;
fs.writeFileSync('src/data/logoBase64.ts', content);
console.log('src/data/logoBase64.ts generated!');
