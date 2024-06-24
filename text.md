# STEP 1  
<!-- TO INSTALL TAILWIND CSS  and Setup-->
 npm install -D tailwindcss postcss autoprefixer
 npx tailwindcss init

 # tailwind.config.js
  content: ["./src/**/*.{html,js}"],

  # index.css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;