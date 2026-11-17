import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function cropAssets() {
  const inputImage = 'C:/Users/UXDLab/.gemini/antigravity/brain/81ceeee3-becb-4e3d-82fc-93392e972feb/.user_uploaded/media_1794896957480_87353069.jpg';
  const outDir = './public/assets';

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const meta = await sharp(inputImage).metadata();
  console.log(`Original image size: ${meta.width} x ${meta.height}`);

  const W = meta.width;
  const H = meta.height;

  // Each phone occupies roughly:
  // Column 0: 0 to 0.25 W
  // Column 1: 0.25 to 0.50 W
  // Column 2: 0.50 to 0.75 W
  // Column 3: 0.75 to 1.00 W
  // Row 0: 0 to 0.50 H
  // Row 1: 0.50 to 1.00 H

  // Let's extract:
  // 1. Pets hero image from Screen 1 (Golden Retriever & Cat)
  // Screen 1 bounding box:
  // x: 0 to W*0.25, y: 0 to H*0.5
  // The pets illustration is in the middle of screen 1:
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.015),
      top: Math.round(H * 0.175),
      width: Math.round(W * 0.22),
      height: Math.round(H * 0.19)
    })
    .toFile(path.join(outDir, 'hero_pets.png'));
  console.log('Extracted hero_pets.png');

  // 2. Buddy avatar (dog) from Screen 5 or 2
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.075),
      top: Math.round(H * 0.595),
      width: Math.round(W * 0.10),
      height: Math.round(H * 0.09)
    })
    .toFile(path.join(outDir, 'buddy_avatar.png'));
  console.log('Extracted buddy_avatar.png');

  // 3. Luna avatar (cat) from Screen 2
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.278),
      top: Math.round(H * 0.442),
      width: Math.round(W * 0.05),
      height: Math.round(H * 0.04)
    })
    .toFile(path.join(outDir, 'luna_avatar.png'));
  console.log('Extracted luna_avatar.png');

  // 4. Dr. Sarah Mitchell avatar from Screen 8
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.835),
      top: Math.round(H * 0.60),
      width: Math.round(W * 0.08),
      height: Math.round(H * 0.075)
    })
    .toFile(path.join(outDir, 'doctor_avatar.png'));
  console.log('Extracted doctor_avatar.png');

  // 5. Test strip sample with pads from Screen 3
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.605),
      top: Math.round(H * 0.15),
      width: Math.round(W * 0.04),
      height: Math.round(H * 0.25)
    })
    .toFile(path.join(outDir, 'test_strip_real.png'));
  console.log('Extracted test_strip_real.png');

  // Also extract each full screen screenshot for pixel-perfect screen backdrop/comparison mode!
  // Screen 1: Welcome/Auth
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.008),
      top: Math.round(H * 0.012),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_1_welcome.png'));

  // Screen 2: Dashboard
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.257),
      top: Math.round(H * 0.012),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_2_dashboard.png'));

  // Screen 3: Scanner
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.505),
      top: Math.round(H * 0.012),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_3_scanner.png'));

  // Screen 4: Results
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.754),
      top: Math.round(H * 0.012),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_4_results.png'));

  // Screen 5: Animal Profile
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.008),
      top: Math.round(H * 0.51),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_5_animal.png'));

  // Screen 6: History
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.257),
      top: Math.round(H * 0.51),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_6_history.png'));

  // Screen 7: Report Details
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.505),
      top: Math.round(H * 0.51),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_7_report.png'));

  // Screen 8: Settings
  await sharp(inputImage)
    .extract({
      left: Math.round(W * 0.754),
      top: Math.round(H * 0.51),
      width: Math.round(W * 0.238),
      height: Math.round(H * 0.478)
    })
    .toFile(path.join(outDir, 'screen_8_settings.png'));

  console.log('All 8 exact screen assets extracted successfully!');
}

cropAssets().catch(console.error);

