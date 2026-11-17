import sharp from 'sharp';
import fs from 'fs';

// Helper to make a realistic veterinary strip on a tabletop surface
async function generateStrip(fileName, pads, title) {
  const width = 640;
  const height = 960;

  // Generate SVG with realistic wooden lab desk and vertical test strip
  const padElements = pads.map((p, idx) => {
    const yPos = 240 + idx * 60;
    return `
      <!-- Pad ${idx + 1}: ${p.label} -->
      <rect x="295" y="${yPos}" width="50" height="42" rx="4" fill="${p.color}" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
      <text x="365" y="${yPos + 27}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#334155">${p.label}</text>
    `;
  }).join('');

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Lab Table Background -->
    <defs>
      <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f1f5f9" />
        <stop offset="100%" stop-color="#e2e8f0" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.18" />
      </filter>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#deskGrad)" />

    <!-- Title Badge -->
    <rect x="40" y="40" width="560" height="70" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <text x="320" y="82" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#0284c7" text-anchor="middle">KACEY DIAGNOSTICS: ${title}</text>

    <!-- Test Strip Stick (White Medical PVC) -->
    <g filter="url(#shadow)">
      <rect x="288" y="160" width="64" height="700" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    </g>

    <!-- Top indicator mark -->
    <rect x="305" y="180" width="30" height="6" rx="3" fill="#cbd5e1" />

    ${padElements}

    <!-- Lower Handle Text -->
    <text x="320" y="810" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#94a3b8" text-anchor="middle">KACEY</text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 95 })
    .toFile(`public/assets/${fileName}`);
  console.log(`Generated: public/assets/${fileName}`);
}

// 1. Normal Urinalysis Strip (Veti-Stx 9)
const normalPads = [
  { label: 'Leukocytes (Neg)', color: '#fef08a' },
  { label: 'Nitrite (Neg)', color: '#ffffff' },
  { label: 'Urobilinogen (0.2)', color: '#fed7aa' },
  { label: 'Protein (Neg)', color: '#facc15' },
  { label: 'pH (6.5 Normal)', color: '#38bdf8' },
  { label: 'Blood (Neg)', color: '#fbbf24' },
  { label: 'Specific Gravity (1.025)', color: '#84cc16' },
  { label: 'Ketones (Neg)', color: '#fed7aa' },
];

// 2. Abnormal High-Protein & Blood Strip
const abnormalPads = [
  { label: 'Leukocytes (Pos +++)', color: '#7e22ce' },
  { label: 'Nitrite (Pos)', color: '#fb7185' },
  { label: 'Urobilinogen (Elevated)', color: '#f43f5e' },
  { label: 'Protein (100+ mg/dL High)', color: '#15803d' },
  { label: 'pH (5.0 Acidic)', color: '#ea580c' },
  { label: 'Blood (Hemolyzed High)', color: '#1c1917' },
  { label: 'Specific Gravity (1.010)', color: '#fef08a' },
  { label: 'Glucose (High)', color: '#78350f' },
];

// 3. EG-3 Antifreeze Toxicology Strip (Ethylene Glycol)
const antifreezePads = [
  { label: 'Ethylene Glycol (>50 mg/dL Danger)', color: '#991b1b' },
  { label: 'Metabolic Acidosis (Acidic)', color: '#ef4444' },
  { label: 'Calcium Oxalate Reaction', color: '#c084fc' },
  { label: 'Reference Control Pad', color: '#38bdf8' },
];

async function run() {
  await generateStrip('strip_sample_normal.jpg', normalPads, 'VETI-STX 9 (NORMAL)');
  await generateStrip('strip_sample_abnormal.jpg', abnormalPads, 'URINALYSIS (ABNORMAL ALERT)');
  await generateStrip('strip_sample_antifreeze.jpg', antifreezePads, 'EG-3 ANTIFREEZE SCREEN');
}

run();
