# Kyle Holcomb - Personal Website

Personal portfolio website showcasing my work in cybersecurity, cloud architecture, and open-source projects.

## Features

- Modern, tech-friendly design with animations
- Responsive layout for all devices
- Custom cursor effects
- Glitch text animations
- Particle background effects
- Smooth scrolling navigation
- GitHub Actions automated deployment

## Tech Stack

- HTML5
- CSS3 with CSS Variables
- Vanilla JavaScript
- GitHub Pages
- GitHub Actions

## Local Development

To run the site locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## Structure

```
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Interactive features
├── _config.yml         # GitHub Pages config
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment
└── README.md          # This file
```

## Live Site

Visit the live site at: [https://kholcomb.github.io](https://kholcomb.github.io)