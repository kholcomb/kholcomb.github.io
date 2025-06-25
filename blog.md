---
layout: blog
title: "Security Blog"
description: "Insights on cloud security, Kubernetes, and building secure systems"
theme_class: "cayman"
permalink: /blog/
---

<div class="blog-posts">
    {% if site.posts.size > 0 %}
        {% for post in paginator.posts %}
        <article class="blog-post-item">
            <header>
                <h2 class="blog-post-title">
                    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h2>
                {% include post-meta.html %}
            </header>
            
            <div class="blog-post-excerpt">
                {% if post.excerpt %}
                    {{ post.excerpt | strip_html | truncatewords: 50 }}
                {% else %}
                    {{ post.content | strip_html | truncatewords: 50 }}
                {% endif %}
            </div>
            
            <a href="{{ post.url | relative_url }}" class="blog-post-readmore">
                Read more →
            </a>
        </article>
        {% endfor %}

        <!-- Pagination -->
        {% if paginator.total_pages > 1 %}
        <nav class="pagination">
            {% if paginator.previous_page %}
                {% if paginator.previous_page == 1 %}
                <a href="{{ '/blog/' | relative_url }}">&laquo; Prev</a>
                {% else %}
                <a href="{{ '/blog/page' | append: paginator.previous_page | append: '/' | relative_url }}">&laquo; Prev</a>
                {% endif %}
            {% endif %}

            {% for page in (1..paginator.total_pages) %}
                {% if page == paginator.page %}
                <span class="current">{{ page }}</span>
                {% elsif page == 1 %}
                <a href="{{ '/blog/' | relative_url }}">{{ page }}</a>
                {% else %}
                <a href="{{ '/blog/page' | append: page | append: '/' | relative_url }}">{{ page }}</a>
                {% endif %}
            {% endfor %}

            {% if paginator.next_page %}
            <a href="{{ '/blog/page' | append: paginator.next_page | append: '/' | relative_url }}">Next &raquo;</a>
            {% endif %}
        </nav>
        {% endif %}
    {% else %}
        <div class="no-posts-message">
            <h2>Coming Soon!</h2>
            <p>The blog is being set up. Check back soon for security insights, technical deep-dives, and thoughts on building secure systems.</p>
            <div class="planned-topics">
                <h3>Planned Topics:</h3>
                <ul>
                    <li>Kubernetes Security Best Practices</li>
                    <li>Building Security Tools with Go</li>
                    <li>Cloud Security Architecture Patterns</li>
                    <li>DevSecOps Implementation Strategies</li>
                    <li>PowerShell for Security Automation</li>
                </ul>
            </div>
        </div>
    {% endif %}
</div>

<style>
.no-posts-message {
    text-align: center;
    padding: 4rem 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.no-posts-message h2 {
    font-size: 2.5rem;
    color: var(--primary-color, #155799);
    margin-bottom: 1rem;
}

.no-posts-message p {
    font-size: 1.2rem;
    color: var(--text-secondary, #666);
    line-height: 1.6;
    margin-bottom: 2rem;
}

.planned-topics {
    background: var(--bg-light, #f8f9fa);
    padding: 2rem;
    border-radius: 8px;
    text-align: left;
}

.planned-topics h3 {
    color: var(--primary-color, #155799);
    margin-bottom: 1rem;
    text-align: center;
}

.planned-topics ul {
    list-style: none;
    max-width: 400px;
    margin: 0 auto;
}

.planned-topics li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--bg-medium, #e2e8f0);
    position: relative;
    padding-left: 1.5rem;
}

.planned-topics li:before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--primary-color, #155799);
    font-weight: bold;
}

.planned-topics li:last-child {
    border-bottom: none;
}
</style>