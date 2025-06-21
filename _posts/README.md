# Blog Posts Directory

This directory contains blog posts for the security blog. Posts are written in Markdown and follow Jekyll conventions.

## Adding a New Post

1. Create a new file with the naming convention: `YYYY-MM-DD-title-slug.md`
   - Example: `2024-01-15-kubernetes-security-best-practices.md`

2. Add the front matter at the top of the file:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15 10:00:00 -0800
categories: [Cloud Security, Kubernetes]
tags: [kubernetes, security, devops, containers]
author: "Kyle Holcomb"
excerpt: "A brief description of what this post covers..."
read_time: 8
---
```

3. Write your content in Markdown below the front matter.

## Front Matter Options

- **title**: The post title (required)
- **date**: Publication date and time (required)
- **categories**: Array of categories (e.g., [Cloud Security, DevSecOps])
- **tags**: Array of tags (e.g., [aws, golang, security])
- **author**: Author name (defaults to "Kyle Holcomb")
- **excerpt**: Brief description for post listings
- **read_time**: Estimated reading time in minutes
- **layout**: Should always be "post"

## Example Categories

- Cloud Security
- Kubernetes
- DevSecOps  
- Security Tools
- Architecture
- Automation

## Example Tags

- aws, azure, gcp
- kubernetes, docker, containers
- golang, powershell, python
- security, compliance, monitoring
- ci-cd, automation, infrastructure

## Content Guidelines

- Use clear, descriptive headings
- Include code examples with proper syntax highlighting
- Add relevant tags and categories
- Keep posts focused on security topics
- Include practical examples and use cases

## Publishing

Once you add a post file to this directory and push to GitHub, it will automatically appear on the blog at `/blog/`.