import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');
const dlDir = 'C:/Users/edlit/Downloads';

const folders = [
  'brand',
  'home',
  'home/logos',
  'footer',
  'sobre-nosotros',
  'portafolio',
  'politicas',
  'contacto',
  'shared',
  'archive'
];

for (const f of folders) {
  fs.mkdirSync(path.join(assetsDir, f), { recursive: true });
}

console.log('Directorio y subdirectorios creados correctamente.');

// 1. Copiar y procesar desde Downloads
async function processDownloads() {
  console.log('Procesando nuevos assets desde Descargas...');

  // logo_cedepro.png -> brand/logo_cedepro.png y logo_cedepro.webp
  const dlLogoCedepro = path.join(dlDir, 'logo_cedepro.png');
  if (fs.existsSync(dlLogoCedepro)) {
    const destPng = path.join(assetsDir, 'brand', 'logo_cedepro.png');
    const destWebp = path.join(assetsDir, 'brand', 'logo_cedepro.webp');
    fs.copyFileSync(dlLogoCedepro, destPng);
    await sharp(dlLogoCedepro).webp({ quality: 90 }).toFile(destWebp);
    console.log('✓ brand/logo_cedepro.png y brand/logo_cedepro.webp generados');
  }

  // cinco-años-home.png -> home/cinco-anos-home.png y cinco-anos-home.webp
  const dlCincoAnos = path.join(dlDir, 'cinco-años-home.png');
  if (fs.existsSync(dlCincoAnos)) {
    const destPng = path.join(assetsDir, 'home', 'cinco-anos-home.png');
    const destWebp = path.join(assetsDir, 'home', 'cinco-anos-home.webp');
    fs.copyFileSync(dlCincoAnos, destPng);
    await sharp(dlCincoAnos).webp({ quality: 90 }).toFile(destWebp);
    console.log('✓ home/cinco-anos-home.png y home/cinco-anos-home.webp generados');
  }

  // Logo 5 años B_1.svg -> home/logo-5-anos.svg
  const dlSvg = path.join(dlDir, 'Logo 5 años B_1.svg');
  if (fs.existsSync(dlSvg)) {
    fs.copyFileSync(dlSvg, path.join(assetsDir, 'home', 'logo-5-anos.svg'));
    console.log('✓ home/logo-5-anos.svg copiado');
  }
}

// 2. Mapeo de archivos existentes
const fileDestinations = {
  // Brand
  'ISO.png': 'brand',
  'ISO.webp': 'brand',
  'logo-navbar.png': 'brand',
  'logo-navbar.webp': 'brand',
  'lg-cedeproiso.webp': 'brand',
  'lg-cedeproiso_blanco.webp': 'brand',
  'logo-cedepro-1024x259.webp': 'brand',
  'cropped-favicon-32x32.png': 'brand',
  'cropped-favicon-192x192.png': 'brand',

  // Footer
  'img-footer.png': 'footer',
  'img-footer.webp': 'footer',
  'logo-cedepro-footer.png': 'footer',
  'logo-cedepro-footer.webp': 'footer',

  // Home Backgrounds
  'img-parte-1-home-hero.png': 'home',
  'img-parte-1-home-hero.webp': 'home',
  'img-parte-2-home.png': 'home',
  'img-parte-2-home.webp': 'home',
  'img-parte-3-home.png': 'home',
  'img-parte-3-home.webp': 'home',
  'img-parte-4-home.png': 'home',
  'img-parte-4-home.webp': 'home',
  'img-parte-5-home.png': 'home',
  'img-parte-5-home.webp': 'home',

  // Home Logos e Instituciones
  'logo-1-home-cge.png': 'home/logos',
  'logo-1-home-cge.webp': 'home/logos',
  'logo-2-home-politec.png': 'home/logos',
  'logo-2-home-politec.webp': 'home/logos',
  'logo-3-home-espe.png': 'home/logos',
  'logo-3-home-espe.webp': 'home/logos',
  'logo-4-home-amarawasi.png': 'home/logos',
  'logo-4-home-amarawasi.webp': 'home/logos',
  'logo-5-home-uma.png': 'home/logos',
  'logo-5-home-uma.webp': 'home/logos',
  'logo-6-home-itsqm.png': 'home/logos',
  'logo-6-home-itsqm.webp': 'home/logos',
  'logo-7-home-americancollage.png': 'home/logos',
  'logo-7-home-americancollage.webp': 'home/logos',
  'logo-8-home-feyalegria.png': 'home/logos',
  'logo-8-home-feyalegria.webp': 'home/logos',
  'logo-9-home-cotopaxi.png': 'home/logos',
  'logo-9-home-cotopaxi.webp': 'home/logos',
  'logo-10-home-esquelclic.png': 'home/logos',
  'logo-10-home-esquelclic.webp': 'home/logos',
  'logo-11-home-itca.png': 'home/logos',
  'logo-11-home-itca.webp': 'home/logos',
  'logo-12-home-isti.png': 'home/logos',
  'logo-12-home-isti.webp': 'home/logos',
  'logo-13-home-universitariodeformacion.png': 'home/logos',
  'logo-13-home-universitariodeformacion.webp': 'home/logos',
  'logo-14-home-isty.png': 'home/logos',
  'logo-14-home-isty.webp': 'home/logos',
  'logo-15-home-umet.png': 'home/logos',
  'logo-15-home-umet.webp': 'home/logos',
  'logo-16-home-tecnoecuatoriano.png': 'home/logos',
  'logo-16-home-tecnoecuatoriano.webp': 'home/logos',
  '01-300x99.png': 'home/logos',
  '01-300x99.webp': 'home/logos',
  '02.png': 'home/logos',
  '02.webp': 'home/logos',
  '04-300x120.png': 'home/logos',
  '04-300x120.webp': 'home/logos',

  // Sobre Nosotros
  'descarga-8-scaled.png': 'sobre-nosotros',
  'imagen_2025-06-04_130141663.png': 'sobre-nosotros',
  'descarga.jpeg': 'sobre-nosotros',

  // Portafolio
  'business_administration_institute_iso_plaque2.png': 'portafolio',

  // Politicas
  'banner.png': 'politicas',
  'banner_orig.png': 'politicas',

  // Contacto
  'ft-fachada-cedepro-2025.webp': 'contacto',

  // Shared
  '896669d7-fe7b-438a-8483-c9755de831ed.png': 'shared',
  'e4af6c60-42a8-4e67-9317-8fac384790c9.png': 'shared'
};

async function organizeAssets() {
  await processDownloads();

  // Generar favicon 180x180 para Apple Touch Icon si no existe
  const favicon192 = path.join(assetsDir, 'cropped-favicon-192x192.png');
  const favicon180 = path.join(assetsDir, 'brand', 'cropped-favicon-180x180.png');
  if (fs.existsSync(favicon192)) {
    await sharp(favicon192).resize(180, 180).toFile(favicon180);
    console.log('✓ brand/cropped-favicon-180x180.png generado');
  }

  // Mover archivos conocidos
  for (const [file, folder] of Object.entries(fileDestinations)) {
    const src = path.join(assetsDir, file);
    if (fs.existsSync(src)) {
      const dest = path.join(assetsDir, folder, file);
      fs.copyFileSync(src, dest);
      fs.unlinkSync(src);
      console.log(`Movido: ${file} -> ${folder}/${file}`);
    }
  }

  // Convertir a WebP las imágenes que aún no tengan versión WebP
  const toConvert = [
    { dir: 'sobre-nosotros', src: 'descarga-8-scaled.png', out: 'descarga-8-scaled.webp' },
    { dir: 'sobre-nosotros', src: 'imagen_2025-06-04_130141663.png', out: 'imagen_2025-06-04_130141663.webp' },
    { dir: 'sobre-nosotros', src: 'descarga.jpeg', out: 'descarga.webp' },
    { dir: 'portafolio', src: 'business_administration_institute_iso_plaque2.png', out: 'business_administration_institute_iso_plaque2.webp' },
    { dir: 'politicas', src: 'banner.png', out: 'banner.webp' },
    { dir: 'shared', src: '896669d7-fe7b-438a-8483-c9755de831ed.png', out: '896669d7-fe7b-438a-8483-c9755de831ed.webp' },
    { dir: 'shared', src: 'e4af6c60-42a8-4e67-9317-8fac384790c9.png', out: 'e4af6c60-42a8-4e67-9317-8fac384790c9.webp' },
  ];

  for (const item of toConvert) {
    const srcPath = path.join(assetsDir, item.dir, item.src);
    const outPath = path.join(assetsDir, item.dir, item.out);
    if (fs.existsSync(srcPath) && !fs.existsSync(outPath)) {
      await sharp(srcPath).webp({ quality: 85 }).toFile(outPath);
      console.log(`✓ WebP generado: ${item.dir}/${item.out}`);
    }
  }

  // Mover cualquier archivo restante en public/assets (no directorios) a archive/
  const remaining = fs.readdirSync(assetsDir);
  for (const item of remaining) {
    const p = path.join(assetsDir, item);
    if (fs.statSync(p).isFile()) {
      const dest = path.join(assetsDir, 'archive', item);
      fs.copyFileSync(p, dest);
      fs.unlinkSync(p);
      console.log(`Archivado: ${item} -> archive/${item}`);
    }
  }

  console.log('\n--- Organización de assets completada con éxito! ---');
}

organizeAssets().catch(err => {
  console.error('Error organizando assets:', err);
  process.exit(1);
});
