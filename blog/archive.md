---
layout: blog
title: "Blog Archive"
description: "All blog posts organized by date"
permalink: /blog/archive/
---

<div class="archive-container">
    {% if site.posts.size > 0 %}
        {% assign posts_by_year = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
        
        {% for year in posts_by_year %}
        <div class="archive-year" id="{{ year.name }}">
            <h2>{{ year.name }}</h2>
            
            {% assign posts_by_month = year.items | group_by_exp: 'post', 'post.date | date: "%B"' %}
            {% for month in posts_by_month %}
            <div class="archive-month">
                <h3>{{ month.name }}</h3>
                <ul class="archive-posts">
                    {% for post in month.items %}
                    <li>
                        <time datetime="{{ post.date | date_to_xmlschema }}">
                            {{ post.date | date: "%d" }}
                        </time>
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                        {% if post.categories %}
                        <div class="post-categories">
                            {% for category in post.categories %}
                            <span class="category">{{ category }}</span>
                            {% endfor %}
                        </div>
                        {% endif %}
                    </li>
                    {% endfor %}
                </ul>
            </div>
            {% endfor %}
        </div>
        {% endfor %}
    {% else %}
        <div class="no-archive">
            <h2>No Posts Yet</h2>
            <p>The archive will be populated as blog posts are published.</p>
            <a href="{{ '/blog/' | relative_url }}" class="btn btn-primary">← Back to Blog</a>
        </div>
    {% endif %}
</div>

<style>
.archive-container {
    max-width: 800px;
    margin: 0 auto;
}

.archive-year {
    margin-bottom: 3rem;
}

.archive-year h2 {
    font-size: 2rem;
    color: var(--primary-color, #0366d6);
    border-bottom: 3px solid var(--primary-color, #0366d6);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
}

.archive-month {
    margin-bottom: 2rem;
}

.archive-month h3 {
    font-size: 1.4rem;
    color: var(--text-primary, #333);
    margin-bottom: 1rem;
}

.archive-posts {
    list-style: none;
}

.archive-posts li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--bg-light, #e2e8f0);
}

.archive-posts li:last-child {
    border-bottom: none;
}

.archive-posts time {
    background: var(--bg-light, #f6f8fa);
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-weight: 600;
    color: var(--text-secondary, #666);
    font-size: 0.9rem;
    min-width: 3rem;
    text-align: center;
}

.archive-posts a {
    color: var(--text-primary, #333);
    text-decoration: none;
    font-weight: 500;
    flex: 1;
}

.archive-posts a:hover {
    color: var(--primary-color, #0366d6);
}

.archive-posts .post-categories {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.archive-posts .category {
    background: var(--primary-color, #0366d6);
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.7rem;
}

.no-archive {
    text-align: center;
    padding: 4rem 2rem;
}

.no-archive h2 {
    color: var(--primary-color, #0366d6);
    margin-bottom: 1rem;
}

.no-archive p {
    color: var(--text-secondary, #666);
    margin-bottom: 2rem;
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

@media (max-width: 768px) {
    .archive-posts li {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .archive-posts time {
        align-self: flex-start;
    }
}
</style>