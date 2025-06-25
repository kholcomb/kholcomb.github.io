/**
 * Dynamic Blog Post Loader
 * Loads blog posts dynamically within the same page
 */
class BlogLoader {
    constructor() {
        this.currentPost = null;
        this.isLoading = false;
        this.posts = new Map();
        
        this.initializeElements();
        this.bindEvents();
        this.loadPostsIndex();
    }
    
    initializeElements() {
        this.blogContainer = document.querySelector('.blog-main');
        this.blogPosts = document.querySelector('.blog-posts');
        this.dynamicContent = document.querySelector('.dynamic-content');
        
        // Create dynamic content area if it doesn't exist
        if (!this.dynamicContent) {
            this.dynamicContent = document.createElement('div');
            this.dynamicContent.className = 'dynamic-content';
            this.dynamicContent.style.display = 'none';
            this.blogContainer.appendChild(this.dynamicContent);
        }
        
        // Create back button
        this.createBackButton();
        
        // Create loading indicator
        this.createLoadingIndicator();
    }
    
    createBackButton() {
        this.backButton = document.createElement('button');
        this.backButton.className = 'blog-back-button';
        this.backButton.innerHTML = '← Back to Blog';
        this.backButton.style.display = 'none';
        this.backButton.addEventListener('click', () => this.showBlogList());
        
        this.blogContainer.insertBefore(this.backButton, this.blogContainer.firstChild);
    }
    
    createLoadingIndicator() {
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'blog-loading';
        this.loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading post...</p>
        `;
        this.loadingIndicator.style.display = 'none';
        this.blogContainer.appendChild(this.loadingIndicator);
    }
    
    bindEvents() {
        // Handle blog post clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.blog-post-readmore') || 
                e.target.matches('.blog-post-title a')) {
                e.preventDefault();
                this.loadPost(e.target.href || e.target.closest('a').href);
            }
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.postUrl) {
                this.loadPost(e.state.postUrl, false);
            } else {
                this.showBlogList(false);
            }
        });
    }
    
    async loadPostsIndex() {
        try {
            // Try to load from JSON API first
            const response = await fetch('/blog/posts.json');
            if (response.ok) {
                const data = await response.json();
                data.posts.forEach(post => {
                    this.posts.set(post.url, post);
                });
            }
        } catch (error) {
            console.log('JSON API not available, extracting from page');
        }
        
        // Fallback: extract post data from the current page
        this.extractPostsFromPage();
    }
    
    extractPostsFromPage() {
        const postElements = document.querySelectorAll('.blog-post-item');
        postElements.forEach(element => {
            const titleLink = element.querySelector('.blog-post-title a');
            const excerpt = element.querySelector('.blog-post-excerpt');
            const meta = element.querySelector('.post-meta');
            
            if (titleLink) {
                const url = titleLink.href;
                const title = titleLink.textContent.trim();
                const excerptText = excerpt ? excerpt.textContent.trim() : '';
                const metaText = meta ? meta.textContent.trim() : '';
                
                this.posts.set(url, {
                    title,
                    excerpt: excerptText,
                    meta: metaText,
                    url
                });
            }
        });
    }
    
    async loadPost(postUrl, updateHistory = true) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            let postContent;
            
            // Check if we have the post data cached from JSON
            if (this.posts.has(postUrl)) {
                const postData = this.posts.get(postUrl);
                postContent = {
                    title: postData.title,
                    meta: this.formatPostMeta(postData),
                    content: this.formatPostContent(postData.content),
                    tags: this.formatPostTags(postData.tags)
                };
            } else {
                // Fallback: fetch the full HTML page
                const response = await fetch(postUrl);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const html = await response.text();
                postContent = this.extractPostContent(html);
            }
            
            this.displayPost(postContent);
            
            // Update URL and history
            if (updateHistory) {
                history.pushState({ postUrl }, postContent.title, postUrl);
            }
            
            // Update page title
            document.title = `${postContent.title} - Security Blog`;
            
        } catch (error) {
            console.error('Failed to load post:', error);
            this.showError('Failed to load blog post. Please try again.');
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    extractPostContent(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract post content
        const article = doc.querySelector('.blog-post') || doc.querySelector('article');
        const title = doc.querySelector('.post-title, h1')?.textContent?.trim() || 'Untitled';
        const meta = doc.querySelector('.post-meta')?.outerHTML || '';
        const content = article ? article.innerHTML : 'Content not found';
        const tags = doc.querySelector('.post-tags')?.outerHTML || '';
        
        return {
            title,
            meta,
            content,
            tags
        };
    }
    
    formatPostMeta(postData) {
        const date = new Date(postData.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="post-meta">
                <time datetime="${postData.date}">${date}</time>
                ${postData.categories && postData.categories.length > 0 ? 
                    `<span class="post-categories">in ${postData.categories.join(', ')}</span>` : ''
                }
            </div>
        `;
    }
    
    formatPostContent(content) {
        // Remove any Jekyll-specific markup that might cause issues
        return content.replace(/\{\%.*?\%\}/g, '').replace(/\{\{.*?\}\}/g, '');
    }
    
    formatPostTags(tags) {
        if (!tags || tags.length === 0) return '';
        
        const tagElements = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        return `
            <div class="post-tags">
                <h4>Tags:</h4>
                ${tagElements}
            </div>
        `;
    }
    
    displayPost(postContent) {
        this.dynamicContent.innerHTML = `
            <article class="blog-post dynamic-post">
                <header class="post-header">
                    <h1 class="post-title">${postContent.title}</h1>
                    ${postContent.meta}
                </header>
                <div class="post-content">
                    ${postContent.content}
                </div>
                ${postContent.tags}
            </article>
        `;
        
        this.showDynamicContent();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Highlight code blocks if needed
        this.highlightCode();
    }
    
    showDynamicContent() {
        this.blogPosts.style.display = 'none';
        this.dynamicContent.style.display = 'block';
        this.backButton.style.display = 'inline-block';
    }
    
    showBlogList(updateHistory = true) {
        this.blogPosts.style.display = 'block';
        this.dynamicContent.style.display = 'none';
        this.backButton.style.display = 'none';
        
        if (updateHistory) {
            history.pushState(null, 'Security Blog', '/blog/');
        }
        
        document.title = 'Security Blog';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    showLoading() {
        this.loadingIndicator.style.display = 'block';
        this.blogPosts.style.opacity = '0.5';
    }
    
    hideLoading() {
        this.loadingIndicator.style.display = 'none';
        this.blogPosts.style.opacity = '1';
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'blog-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>Error Loading Post</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        this.blogContainer.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    highlightCode() {
        // Basic syntax highlighting for code blocks
        const codeBlocks = this.dynamicContent.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // Add language detection and highlighting here if needed
            block.classList.add('highlighted');
        });
    }
    
    // Public API methods
    loadPostBySlug(slug) {
        const postUrl = `/blog/${slug}/`;
        this.loadPost(postUrl);
    }
    
    preloadPost(postUrl) {
        if (!this.posts.has(postUrl)) {
            fetch(postUrl).then(response => response.text()).then(html => {
                const content = this.extractPostContent(html);
                this.posts.set(postUrl, content);
            }).catch(console.error);
        }
    }
}

// CSS for dynamic blog functionality
const blogLoaderStyles = `
<style>
.blog-back-button {
    background: var(--primary-color, #155799);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: background-color 0.3s ease;
}

.blog-back-button:hover {
    background: var(--secondary-color, #159957);
}

.blog-loading {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary, #666);
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--bg-light, #e9ecef);
    border-left: 4px solid var(--primary-color, #155799);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.dynamic-post {
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.blog-error {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    max-width: 400px;
    text-align: center;
}

.blog-error::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
}

.blog-error button {
    background: var(--primary-color, #155799);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}

/* Cayman theme overrides */
body.cayman .blog-back-button {
    background: var(--primary-color) !important;
}

body.cayman .blog-back-button:hover {
    background: var(--secondary-color) !important;
}

body.cayman .loading-spinner {
    border-left-color: var(--primary-color) !important;
}

body.cayman .blog-error button {
    background: var(--primary-color) !important;
}

/* Responsive design */
@media (max-width: 768px) {
    .dynamic-post {
        padding: 0 1rem;
    }
    
    .blog-back-button {
        width: 100%;
        margin-bottom: 1rem;
    }
}
</style>
`;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add styles to head
    document.head.insertAdjacentHTML('beforeend', blogLoaderStyles);
    
    // Initialize blog loader only on blog pages
    if (document.querySelector('.blog-container')) {
        window.blogLoader = new BlogLoader();
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogLoader;
}