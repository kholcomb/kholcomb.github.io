---
layout: blog
title: "Tags"
description: "Browse blog posts by tag"
theme_class: "cayman"
permalink: /tags/
---

<div class="tags-container">
    <div class="tag-cloud">
        {% assign all_tags = site.posts | map: 'tags' | flatten | uniq | sort %}
        {% for tag in all_tags %}
            {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
            <a href="#{{ tag | slugify }}" class="tag-link" data-count="{{ tag_posts.size }}">
                {{ tag }} ({{ tag_posts.size }})
            </a>
        {% endfor %}
    </div>

    <div class="tags-content">
        {% assign all_tags = site.posts | map: 'tags' | flatten | uniq | sort %}
        {% for tag in all_tags %}
            {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
            
            <section class="tag-section" id="{{ tag | slugify }}">
                <h2 class="tag-title">{{ tag }}</h2>
                <div class="tag-posts">
                    {% for post in tag_posts %}
                    <article class="tag-post-item">
                        <h3 class="tag-post-title">
                            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                        </h3>
                        <time class="tag-post-date">{{ post.date | date: "%B %d, %Y" }}</time>
                        <p class="tag-post-excerpt">
                            {% if post.excerpt %}
                                {{ post.excerpt | strip_html | truncatewords: 30 }}
                            {% else %}
                                {{ post.content | strip_html | truncatewords: 30 }}
                            {% endif %}
                        </p>
                    </article>
                    {% endfor %}
                </div>
            </section>
        {% endfor %}
    </div>
</div>

<style>
.tags-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
}

.tag-cloud {
    background: var(--bg-light, #f5f5f5);
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 3rem;
    text-align: center;
}

.tag-link {
    display: inline-block;
    background: var(--primary-color, #155799);
    color: white !important;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    text-decoration: none;
    margin: 0.25rem;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.tag-link:hover {
    background: var(--secondary-color, #159957) !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(21, 87, 153, 0.3);
}

.tag-section {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--bg-light, #e9ecef);
}

.tag-section:last-child {
    border-bottom: none;
}

.tag-title {
    color: var(--primary-color, #155799) !important;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-color, #155799);
}

.tag-posts {
    display: grid;
    gap: 1.5rem;
}

.tag-post-item {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-left: 4px solid var(--primary-color, #155799);
    transition: all 0.3s ease;
}

.tag-post-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.tag-post-title {
    margin-bottom: 0.5rem;
}

.tag-post-title a {
    color: var(--primary-color, #155799) !important;
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 600;
}

.tag-post-title a:hover {
    color: var(--secondary-color, #159957) !important;
    text-decoration: underline;
}

.tag-post-date {
    color: var(--text-secondary, #606c71) !important;
    font-size: 0.9rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
}

.tag-post-excerpt {
    color: var(--text-secondary, #606c71) !important;
    line-height: 1.6;
    margin: 0;
}

/* Cayman theme overrides */
body.cayman .tag-cloud {
    background: #f5f5f5 !important;
}

body.cayman .tag-link {
    background: #155799 !important;
    color: white !important;
}

body.cayman .tag-link:hover {
    background: #159957 !important;
    color: white !important;
}

body.cayman .tag-title {
    color: #155799 !important;
}

body.cayman .tag-post-item {
    background: white !important;
    border-left-color: #155799 !important;
}

body.cayman .tag-post-title a {
    color: #155799 !important;
}

body.cayman .tag-post-title a:hover {
    color: #159957 !important;
}

body.cayman .tag-post-date,
body.cayman .tag-post-excerpt {
    color: #606c71 !important;
}

@media (max-width: 768px) {
    .tags-container {
        padding: 0 1rem;
    }
    
    .tag-cloud {
        padding: 1rem;
    }
    
    .tag-link {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
    
    .tag-title {
        font-size: 1.5rem;
    }
    
    .tag-post-item {
        padding: 1rem;
    }
}
</style>

<script>
// Smooth scrolling for tag cloud links
document.addEventListener('DOMContentLoaded', function() {
    const tagCloudLinks = document.querySelectorAll('.tag-cloud .tag-link');
    
    tagCloudLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering page reload
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Handle initial page load with hash
    if (window.location.hash) {
        const targetElement = document.getElementById(window.location.hash.substring(1));
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});
</script>