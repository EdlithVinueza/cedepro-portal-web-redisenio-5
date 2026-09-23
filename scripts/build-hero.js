import sharp from 'sharp';

async function createHero() {
  const origPath = 'C:/Users/edlit/Downloads/elementos a migrar/home/img-parte-1-home-hero.png';
  
  // In the original 1902x1068 image:
  // x=120..620: wide empty daylight office room & window (500px of pure fade space!)
  // x=640..780: standing man (leaning forward)
  // x=860..1020: smiling woman
  // x=1120..1320: young man in glasses
  // x=1350..1460: vibrant blue corporate wall
  // x=1460..1540: slim mountain campus window sliver
  const CROP_START_X = 120;
  const CROP_END_X = 1540;
  const CROP_W = CROP_END_X - CROP_START_X; // 1420 px
  const CANVAS_H = 1068;
  const CANVAS_W = 2400;
  
  // Position cropped region on right:
  // Canvas: x=0..980 (0%..40.8%) is pure solid navy #07192F
  // Canvas: x=980..1480 (40.8%..61.6%) is a 500px mathematically smooth cosine fade
  // Canvas: x=1480..2400 (61.6%..100%) is 100% opaque photo
  const CROP_LEFT = CANVAS_W - CROP_W; // 980 px
  const FADE_WIDTH = 500; // 500 pixels of silky smooth transition

  const cropped = await sharp(origPath)
    .extract({ left: CROP_START_X, top: 0, width: CROP_W, height: CANVAS_H })
    .toBuffer();

  // Create a 1-channel raw grayscale mask with a perfect mathematical cosine S-curve
  // At x=0: val is strictly 0 (derivative=0, guarantees ZERO start seam)
  // At x=FADE_WIDTH: val is strictly 255 (derivative=0, guarantees ZERO end seam)
  const maskBuffer = Buffer.alloc(CROP_W * CANVAS_H);
  for (let y = 0; y < CANVAS_H; y++) {
    const rowOffset = y * CROP_W;
    for (let x = 0; x < CROP_W; x++) {
      if (x === 0) {
        maskBuffer[rowOffset + x] = 0;
      } else if (x >= FADE_WIDTH) {
        maskBuffer[rowOffset + x] = 255;
      } else {
        const t = x / FADE_WIDTH;
        // Cosine ease: 0.5 * (1 - cos(pi * t))
        const ease = 0.5 * (1 - Math.cos(Math.PI * t));
        maskBuffer[rowOffset + x] = Math.round(ease * 255);
      }
    }
  }

  const maskPng = await sharp(maskBuffer, {
    raw: {
      width: CROP_W,
      height: CANVAS_H,
      channels: 1
    }
  }).png().toBuffer();

  // Extract RGB from cropped image and join mask as alpha
  const croppedRgb = await sharp(cropped)
    .removeAlpha()
    .toBuffer();

  const maskedCropped = await sharp(croppedRgb)
    .joinChannel(maskPng)
    .png()
    .toBuffer();

  // Base canvas in deep navy #07192F (r: 7, g: 25, b: 47)
  const baseNavy = await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 7, g: 25, b: 47, alpha: 1 }
    }
  }).png().toBuffer();

  // Composite masked cropped onto base canvas
  await sharp(baseNavy)
    .composite([
      { input: maskedCropped, left: CROP_LEFT, top: 0 }
    ])
    .webp({ quality: 94 })
    .toFile('public/assets/home/img-parte-1-home-hero.webp');

  console.log('Successfully generated hero image with 500px ultra-smooth cosine gradient (ZERO seams): 2400x1068');
}

createHero().catch((err) => {
  console.error('Error generating hero:', err);
  process.exit(1);
});
