---
layout: blog
title: "Categories"
description: "Blog posts organized by category"
theme_class: "cayman"
permalink: /blog/categories/
---

<div class="categories-container">
    {% assign categories = site.categories | sort %}
    {% if categories.size > 0 %}
        <div class="categories-list">
            {% for category in categories %}
            <div class="category-section" id="{{ category[0] | slugify }}">
                <h2>{{ category[0] }}</h2>
                <p class="category-count">{{ category[1].size }} post{% if category[1].size != 1 %}s{% endif %}</p>
                
                <div class="category-posts">
                    {% for post in category[1] %}
                    <article class="category-post-item">
                        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                        <time datetime="{{ post.date | date_to_xmlschema }}">
                            {{ post.date | date: "%B %d, %Y" }}
                        </time>
                        {% if post.excerpt %}
                        <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                        {% endif %}
                        {% if post.tags %}
                        <div class="post-tags">
                            {% for tag in post.tags %}
                            <span class="tag">{{ tag }}</span>
                            {% endfor %}
                        </div>
                        {% endif %}
                    </article>
                    {% endfor %}
                </div>
            </div>
            {% endfor %}
        </div>
    {% else %}
        <div class="no-categories">
            <h2>No Categories Yet</h2>
            <p>Categories will appear here as blog posts are published and organized.</p>
            <div class="planned-categories">
                <h3>Planned Categories:</h3>
                <ul>
                    <li><strong>Cloud Security</strong> - AWS, Azure, GCP security best practices</li>
                    <li><strong>Kubernetes</strong> - Container orchestration and security</li>
                    <li><strong>DevSecOps</strong> - Security in CI/CD pipelines</li>
                    <li><strong>Security Tools</strong> - Building and using security tools</li>
                    <li><strong>Architecture</strong> - Secure system design patterns</li>
                    <li><strong>Automation</strong> - PowerShell and Go for security</li>
                </ul>
            </div>
            <a href="{{ '/blog/' | relative_url }}" class="btn btn-primary">← Back to Blog</a>
        </div>
    {% endif %}
</div>

<style>
.categories-container {
    max-width: 800px;
    margin: 0 auto;
}

.category-section {
    margin-bottom: 4rem;
    padding-bottom: 3rem;
    border-bottom: 2px solid var(--bg-light, #e2e8f0);
}

.category-section:last-child {
    border-bottom: none;
}

.category-section h2 {
    font-size: 2rem;
    color: var(--primary-color, #0366d6);
    margin-bottom: 0.5rem;
}

.category-count {
    color: var(--text-secondary, #666);
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.category-posts {
    display: grid;
    gap: 2rem;
}

.category-post-item {
    padding: 1.5rem;
    background: var(--bg-light, #f8f9fa);
    border-radius: 8px;
    border-left: 4px solid var(--primary-color, #0366d6);
}

.category-post-item h3 {
    margin-bottom: 0.5rem;
}

.category-post-item h3 a {
    color: var(--text-primary, #333);
    text-decoration: none;
    font-size: 1.3rem;
}

.category-post-item h3 a:hover {
    color: var(--primary-color, #0366d6);
}

.category-post-item time {
    color: var(--text-secondary, #666);
    font-size: 0.9rem;
    display: block;
    margin-bottom: 1rem;
}

.post-excerpt {
    color: var(--text-secondary, #666);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    background: var(--bg-medium, #e2e8f0);
    color: var(--text-primary, #333);
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.8rem;
}

.no-categories {
    text-align: center;
    padding: 4rem 2rem;
}

.no-categories h2 {
    color: var(--primary-color, #0366d6);
    margin-bottom: 1rem;
}

.no-categories p {
    color: var(--text-secondary, #666);
    margin-bottom: 2rem;
}

.planned-categories {
    background: var(--bg-light, #f8f9fa);
    padding: 2rem;
    border-radius: 8px;
    text-align: left;
    max-width: 600px;
    margin: 0 auto 2rem auto;
}

.planned-categories h3 {
    color: var(--primary-color, #0366d6);
    margin-bottom: 1rem;
    text-align: center;
}

.planned-categories ul {
    list-style: none;
}

.planned-categories li {
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--bg-medium, #e2e8f0);
}

.planned-categories li:last-child {
    border-bottom: none;
}

.planned-categories strong {
    color: var(--primary-color, #0366d6);
}

.btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
}

.btn-primary {
    background: var(--primary-color, #0366d6);
    color: white;
}

.btn-primary:hover {
    background: var(--secondary-color, #0256cc);
}

/* Cayman theme overrides */
body.cayman .category-section h2 {
    color: #155799 !important;
}

body.cayman .category-count {
    color: #606c71 !important;
}

body.cayman .category-post-item {
    background: #f8f9fa !important;
    border-left-color: #155799 !important;
}

body.cayman .category-post-item h3 a {
    color: #333333 !important;
}

body.cayman .category-post-item h3 a:hover {
    color: #155799 !important;
}

body.cayman .category-post-item time,
body.cayman .post-excerpt {
    color: #606c71 !important;
}

body.cayman .tag {
    background: #e9ecef !important;
    color: #333333 !important;
}

body.cayman .no-categories h2 {
    color: #155799 !important;
}

body.cayman .no-categories p {
    color: #606c71 !important;
}

body.cayman .planned-categories {
    background: #f8f9fa !important;
}

body.cayman .planned-categories h3 {
    color: #155799 !important;
}

body.cayman .planned-categories strong {
    color: #155799 !important;
}

body.cayman .btn-primary {
    background: #155799 !important;
}

body.cayman .btn-primary:hover {
    background: #159957 !important;
}

@media (max-width: 768px) {
    .category-post-item {
        padding: 1rem;
    }
}
</style>