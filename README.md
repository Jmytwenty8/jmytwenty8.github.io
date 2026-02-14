# 🖥️ Terminal Portfolio - Kumar Jyotirmay

A hacker-themed portfolio website with terminal aesthetics and typewriter effects.

## 🚀 Features

- **Terminal UI**: Classic hacker/terminal aesthetic with green-on-black color scheme
- **Typewriter Effect**: Smooth typing animations for text content
- **CRT Screen Effects**: Authentic retro monitor effects including scanlines and flickering
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Navigation**: Easy section switching with command-style buttons
- **Keyboard Shortcuts**: Quick navigation using Alt/Option + number keys (1-6)
- **Easter Eggs**: Hidden Matrix rain effect (try the Konami code!)
- **GitHub Pages Ready**: Fully static site ready for deployment

## 🎯 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. No build process required - pure HTML, CSS, and JavaScript!

### Deploy to GitHub Pages

1. **Create a new GitHub repository** named `<your-username>.github.io`
   - Replace `<your-username>` with your actual GitHub username
   - Example: `jmytwenty8.github.io`

2. **Initialize git and push the code:**

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: Terminal portfolio website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"

4. **Access your portfolio:**
   - Your site will be live at: `https://<your-username>.github.io`
   - Usually takes 1-2 minutes for the first deployment

## ⌨️ Keyboard Shortcuts

- `Alt + 1` - About section
- `Alt + 2` - Skills section
- `Alt + 3` - Experience section
- `Alt + 4` - Projects section
- `Alt + 5` - Education section
- `Alt + 6` - Contact section
- `Ctrl/Cmd + K` - Scroll to top
- `↑ ↑ ↓ ↓ ← → ← → B A` - Secret Matrix mode 🎮

## 🎨 Customization

### Single Content Source (`content.md`)

All visible portfolio section content now comes from `content.md` (JSON inside markdown).
Update that file to change:
- Boot lines
- Navigation command labels
- About, Skills, Experience, Projects, Education, Contact data
- Resume button labels/paths

> Note: Since content is loaded with `fetch`, use a local server (or GitHub Pages) instead of opening with `file://`.

### Change Colors

Edit `styles.css` and modify the CSS variables in the `:root` selector:

```css
:root {
    --bg-black: #0a0e14;          /* Main background */
    --terminal-green: #00ff41;    /* Primary green color */
    --terminal-blue: #00d9ff;     /* Accent blue */
    --terminal-yellow: #ffff00;   /* Highlight yellow */
    --terminal-red: #ff0040;      /* Error/warning red */
}
```

### Update Content

Edit `index.html` to update your personal information:
- Contact details
- Work experience
- Projects
- Education
- Skills

### Modify Typewriter Speed

In `script.js`, adjust the typing speed:

```javascript
const typeInterval = setInterval(() => {
    // Change this value (in milliseconds)
    // Lower = faster, Higher = slower
}, 30);
```

## 📁 File Structure

```
portfolio/
├── assets/
│   └── Kumar_Jyotirmay_Resume.pdf   # your resume (you add this file)
├── index.html      # Main HTML structure
├── styles.css      # Terminal styling and animations
├── script.js       # Typewriter effects and interactions
└── README.md       # Documentation (this file)
```

## 📄 Add Resume Download

1. Create a folder `assets/` in the project root (same level as `index.html`)
2. Copy your resume PDF into it and name it exactly:
   - `assets/Kumar_Jyotirmay_Resume.pdf`

The site includes a **Download Resume** button that will download this file on GitHub Pages.

## 🔧 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ IE11 (limited support)

## 📱 Mobile Support

The portfolio is fully responsive and optimized for:
- 📱 Mobile phones (portrait & landscape)
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop monitors
- 📺 Large screens

## 🎭 Effects & Animations

1. **CRT Monitor Effect**: Scanline animation and subtle flickering
2. **Typewriter Effect**: Characters appear one by one
3. **Glitch Effect**: Title glitches on hover
4. **Matrix Rain**: Secret easter egg (Konami code)
5. **Smooth Transitions**: Hover effects on buttons and links

## 🐛 Troubleshooting

### Port Already in Use (if using a local server)
```bash
# Kill the process using the port
lsof -ti:8000 | xargs kill -9
```

### GitHub Pages not updating
- Wait 2-3 minutes after pushing
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions for build status

### Effects not working
- Ensure JavaScript is enabled in your browser
- Check browser console for errors (F12)
- Try a different browser

## 📝 License

Feel free to use this template for your own portfolio! No attribution required, but appreciated 😊

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:
1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## 📧 Contact

**Kumar Jyotirmay**
- 📧 Email: jmy2898@gmail.com
- 💼 LinkedIn: [linkedin.com/in/jmytwenty8](https://linkedin.com/in/jmytwenty8)
- 🐙 GitHub: [github.com/jmytwenty8](https://github.com/jmytwenty8)

---

Made with 💚 and lots of ☕

> "In the world of 1s and 0s, we create infinite possibilities."
