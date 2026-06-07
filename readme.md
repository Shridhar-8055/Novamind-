# AI Employees Landing Page

A modern, responsive landing page for an AI employees platform with a fixed transparent navbar (inspired by marblism.com).

## Project Structure

```
project/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles including fixed transparent navbar
├── js/
│   └── script.js       # JavaScript for interactions and animations
└── README.md           # This file
```

## Features

- ✨ Fixed transparent navbar that stays on top while scrolling
- 🎨 Bold yellow and black color scheme
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🖱️ Interactive hover effects
- 📊 Multiple sections: Hero, Business, Team, Features, FAQ, etc.
- 🎯 Clean, professional layout

## How to Run

1. **Copy all files to your VS Code project folder** maintaining the structure:
   - `index.html` in root
   - `style.css` in `css/` folder
   - `script.js` in `js/` folder

2. **Open with Live Server:**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   
   OR
   
3. **Open directly in browser:**
   - Double-click `index.html`

## Navbar Features

The navbar is inspired by marblism.com with:
- Fixed position at the top
- Transparent background with blur effect
- Smooth transitions on scroll
- Hover effects on navigation links
- Yellow underline animation on hover

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript
- Google Fonts (Bebas Neue & Work Sans)

## Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --yellow: #FFD500;
    --black: #000000;
    --white: #FFFFFF;
    --gray: #666666;
}
```

### Navbar Transparency
Adjust in `css/style.css`:
```css
.header {
    background: rgba(0, 0, 0, 0.5); /* Change opacity here */
    backdrop-filter: blur(10px); /* Adjust blur */
}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Free to use and modify.

---

**Note:** All gradients are placeholder backgrounds. Replace them with actual images for production use.