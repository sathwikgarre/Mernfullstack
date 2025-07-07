const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a file to write archive data to
const output = fs.createWriteStream('flavors-of-the-south-project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Archive has been finalized and the output file descriptor has closed.');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
const filesToInclude = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'eslint.config.js',
  'index.html',
  'README.md',
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'src/vite-env.d.ts',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/ReservationForm.tsx',
  'src/components/FeaturedMenu.tsx',
  'src/components/FullMenu.tsx',
  'src/components/About.tsx',
  'src/components/Contact.tsx',
  'src/components/Footer.tsx',
  'src/components/Cart.tsx',
  'src/components/CartIcon.tsx',
  'src/context/CartContext.tsx',
  'src/types/reservation.ts',
  'src/types/cart.ts',
  'public/WhatsApp Image 2025-07-05 at 20.31.22_61eb8ede.jpg'
];

filesToInclude.forEach(file => {
  if (fs.existsSync(file)) {
    archive.file(file, { name: file });
  }
});

// Finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();