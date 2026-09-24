const fs = require('fs');
const files = [
  'src/pages/index.astro',
  'src/pages/nosotros.astro',
  'src/pages/cinco-cedepro.astro',
  'src/components/Footer.astro',
  'src/components/Header.astro',
  'src/components/ContactForm.astro',
  'src/components/GradientOverlay.astro'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove redundant font classes to ensure global Kohinoor Latin applies cleanly
    content = content.replace(/\bfont-(sans|serif|heading|cursive|signature|mono)\b/g, '');
    
    // Clean up multiple spaces that might result from removal
    content = content.replace(/ +class=/g, ' class=');
    content = content.replace(/class=" +/g, 'class="');
    content = content.replace(/ +"/g, '"');
    content = content.replace(/  +/g, ' ');

    // Correct 'uppercase italic' headers which shouldn't be italic according to the design
    content = content.replace(/uppercase italic/g, 'uppercase');
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  } else {
    console.log('Not found: ' + file);
  }
});
