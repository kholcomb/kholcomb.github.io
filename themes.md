---
layout: default
title: "Theme Gallery - Kyle Holcomb Portfolio"
description: "Explore different visual styles of Kyle Holcomb's portfolio"
permalink: /themes/
---

<section class="theme-gallery">
    <div class="container">
        <h1>Portfolio Theme Gallery</h1>
        <p class="intro">Experience my portfolio in different visual styles. Click any theme below to see the full site in that design.</p>
        
        <div class="theme-grid">
            <div class="theme-card">
                <h3>Original Custom</h3>
                <p>Tech-friendly design with glitch effects and custom animations</p>
                <div class="theme-preview">
                    <div class="preview-colors">
                        <span style="background: #00ff88;"></span>
                        <span style="background: #0088ff;"></span>
                        <span style="background: #ff0088;"></span>
                        <span style="background: #0a0a0a;"></span>
                    </div>
                </div>
                <a href="{{ '/original/' | relative_url }}" class="theme-btn">View Original</a>
            </div>
            
            <div class="theme-card">
                <h3>Minimal</h3>
                <p>Clean, minimal design focusing on content and readability</p>
                <div class="theme-preview">
                    <div class="preview-colors">
                        <span style="background: #ffffff;"></span>
                        <span style="background: #f5f5f5;"></span>
                        <span style="background: #333333;"></span>
                        <span style="background: #0366d6;"></span>
                    </div>
                </div>
                <a href="{{ '/minimal/' | relative_url }}" class="theme-btn">View Minimal</a>
            </div>
            
            <div class="theme-card">
                <h3>Cayman</h3>
                <p>Modern, professional design with gradient headers</p>
                <div class="theme-preview">
                    <div class="preview-colors">
                        <span style="background: #155799;"></span>
                        <span style="background: #159957;"></span>
                        <span style="background: #ffffff;"></span>
                        <span style="background: #f5f5f5;"></span>
                    </div>
                </div>
                <a href="{{ '/cayman/' | relative_url }}" class="theme-btn">View Cayman</a>
            </div>
            
            <div class="theme-card">
                <h3>Architect</h3>
                <p>Clean, geometric design with structured layout</p>
                <div class="theme-preview">
                    <div class="preview-colors">
                        <span style="background: #222222;"></span>
                        <span style="background: #4183c4;"></span>
                        <span style="background: #ffffff;"></span>
                        <span style="background: #f5f5f5;"></span>
                    </div>
                </div>
                <a href="{{ '/architect/' | relative_url }}" class="theme-btn">View Architect</a>
            </div>
        </div>
        
        <div class="back-to-main">
            <a href="{{ '/' | relative_url }}" class="btn btn-primary">← Back to Main Portfolio</a>
        </div>
    </div>
</section>

<style>
.theme-gallery {
    padding: 4rem 0;
    min-height: 100vh;
}

.theme-gallery h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 3rem;
}

.intro {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 3rem;
    color: #666;
}

.theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.theme-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.theme-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.theme-card h3 {
    margin-bottom: 1rem;
    color: #333;
}

.theme-card p {
    margin-bottom: 1.5rem;
    color: #666;
    line-height: 1.6;
}

.theme-preview {
    margin-bottom: 1.5rem;
}

.preview-colors {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.preview-colors span {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.theme-btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: #0366d6;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.3s ease;
}

.theme-btn:hover {
    background: #0256cc;
}

.back-to-main {
    text-align: center;
    margin-top: 3rem;
}

.btn {
    display: inline-block;
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #0366d6;
    color: white;
}

.btn-primary:hover {
    background: #0256cc;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .theme-grid {
        grid-template-columns: 1fr;
    }
    
    .theme-gallery h1 {
        font-size: 2rem;
    }
}
</style>