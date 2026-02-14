## Portfolio Content Source

This file is the single source of truth for website content.
All visible section content is rendered from the JSON block below.

```json
{
  "boot": [
    "Initializing system...",
    "Loading portfolio.exe...",
    "Connecting to server...",
    "[OK] System ready"
  ],
  "navigation": {
    "prompt": "ls commands",
    "items": [
      { "id": "about", "label": "./about.sh" },
      { "id": "skills", "label": "./skills.sh" },
      { "id": "experience", "label": "./experience.sh" },
      { "id": "projects", "label": "./projects.sh" },
      { "id": "education", "label": "./education.sh" },
      { "id": "contact", "label": "./contact.sh" }
    ],
    "resume": {
      "label": "./download_resume.pdf",
      "href": "assets/Kumar_Jyotirmay_Resume.pdf"
    }
  },
  "sections": {
    "about": {
      "prompt": "./about.sh",
      "status": "Executing about.sh...",
      "titleHeading": "> whoami",
      "name": "Kumar Jyotirmay",
      "title": "Frontend-heavy Fullstack Developer (React / TypeScript)",
      "summaryHeading": "> cat profile.txt",
      "summary": "Frontend-heavy fullstack developer with 2.5+ years of experience building enterprise-grade, secure, and high-performance web applications in fintech and compliance domains. Strong expertise in React and TypeScript, with hands-on experience designing AI-assisted workflows, scalable UI systems, accessibility-first interfaces, and performance-critical data-heavy applications.",
      "dynamicRoles": [
        "shipping polished frontend at scale",
        "building secure fullstack workflows",
        "optimizing UX for performance-critical apps",
        "designing AI-assisted product experiences"
      ]
    },
    "skills": {
      "prompt": "./skills.sh",
      "status": "Executing skills.sh...",
      "title": "> Technical Stack",
      "categories": [
        {
          "file": "frameworks.txt",
          "items": ["React", "Next.js", "TanStack Start", "TypeScript", "JavaScript", "HTML5", "CSS3"]
        },
        {
          "file": "state-management.txt",
          "items": ["Redux", "Zustand", "TanStack Query", "TanStack Table", "TanStack Router", "TanStack Form"]
        },
        {
          "file": "ui-styling.txt",
          "items": ["Tailwind CSS", "Shadcn UI", "Ant Design", "MUI", "SCSS"]
        },
        {
          "file": "performance.txt",
          "items": ["Code Splitting", "Lazy Loading", "SSR", "Virtualization"]
        },
        {
          "file": "testing.txt",
          "items": ["Jest", "React Testing Library", "Vitest", "Playwright"]
        },
        {
          "file": "security.txt",
          "items": ["XSS", "CSRF", "JWT", "OAuth2", "SOC 2", "GDPR"]
        },
        {
          "file": "tools.txt",
          "items": ["AWS", "Git", "Vite", "Webpack", "REST", "GraphQL", "tRPC", "ORPC", "Figma"]
        }
      ]
    },
    "experience": {
      "prompt": "./experience.sh",
      "status": "Executing experience.sh...",
      "title": "> Work Experience",
      "items": [
        {
          "file": "hexaview_senior.log",
          "role": "Application Engineer",
          "company": "Hexaview Technologies",
          "date": "Feb 2024 - Present | Noida, India",
          "achievements": [
            "Owned frontend architecture for large-scale compliance platforms serving enterprise clients with strict security and availability requirements.",
            "Designed and implemented an AI-assisted content review system using TipTap, reducing manual review effort by 40%.",
            "Built a shared design system and reusable component library using React, TypeScript, Tailwind CSS, and shadcn/ui adopted across 5 teams.",
            "Developed high-performance data-heavy UIs using TanStack Table with virtualization to handle 10,000+ records smoothly.",
            "Optimized client-side state and caching using Zustand and TanStack Query, reducing redundant API calls by 50%.",
            "Implemented WCAG 2.1 AA-aligned accessibility and frontend security practices supporting SOC 2 and GDPR compliance.",
            "Helped maintain high unit and component test coverage and mentored junior developers on React performance and state management best practices."
          ]
        },
        {
          "file": "hexaview_junior.log",
          "role": "Associate Application Engineer",
          "company": "Hexaview Technologies",
          "date": "Aug 2023 - Jan 2024 | Noida, India",
          "achievements": [
            "Modernized financial dashboards with server-side pagination and virtualized tables, improving performance by 50%.",
            "Reduced application bundle size by 40% using code splitting, tree shaking, and lazy loading.",
            "Assisted in migrating to a microfrontend architecture with Module Federation, improving deployment speed and independence.",
            "Improved Core Web Vitals by 40% through performance profiling and render-path optimizations."
          ]
        }
      ]
    },
    "projects": {
      "prompt": "./projects.sh",
      "status": "Executing projects.sh...",
      "title": "> Featured Projects",
      "items": [
        {
          "file": "marketing_review.project",
          "name": "Marketing Review Web",
          "subtitle": "AI-Assisted Review & Approval Platform",
          "link": {
            "label": "marketing.archiveintel.com",
            "url": "https://marketing.archiveintel.com"
          },
          "achievements": [
            "Designed and developed a SaaS platform for Archive Intel (Denver-based client) to manage end-to-end marketing content workflows: drafts, submissions, approvals, revisions, and publishing.",
            "Implemented role-based approval workflows with protected routes and permission-aware UI for reviewers, approvers, and administrators.",
            "Developed rich-text editing, inline comments, version history, and side-by-side document comparison using TipTap.",
            "Architected a modular, feature-based React + TypeScript codebase for long-term scalability and maintainability.",
            "Built resilient UX with skeleton loaders, suspense boundaries, and error handling for long review sessions.",
            "Reduced average review turnaround time by 35% and access-related support issues by 50%."
          ]
        },
        {
          "file": "arrowmark_modernization.project",
          "name": "Arrowmark Partners",
          "subtitle": "Internal Finance Platform Modernization (PHP to Django + React)",
          "achievements": [
            "Part of the frontend team that modernized Arrowmark Partners' internal finance platform by migrating from a legacy PHP stack to a modern Django + React architecture.",
            "Developed the web app using React, TypeScript, Easy Peasy, Ant Design, Axios, and SCSS to manage and analyze client financial data in highly customizable tables.",
            "Implemented advanced table workflows including search, filter, sort, and column rearrangement for high-volume financial operations.",
            "Built and tested individual and group-based permission management features to ensure secure, role-aware administrative access.",
            "Collaborated closely with backend engineers for seamless API integration, reliable data sync, and robust behavior across varied user scenarios.",
            "Delivered the project ahead of timeline and received direct client appreciation for quality and execution."
          ],
          "stack": ["React", "TypeScript", "Easy Peasy", "Axios", "Ant Design", "SCSS"]
        }
      ]
    },
    "education": {
      "prompt": "./education.sh",
      "status": "Executing education.sh...",
      "title": "> Education",
      "items": [
        {
          "file": "masters.degree",
          "degree": "Master of Computer Applications",
          "institution": "Guru Gobind Singh Indraprastha University (USICT / GGSIPU)",
          "details": "Software Engineering | GPA: 9.07 / 10.0",
          "date": "2021 - 2023 | Delhi, India"
        },
        {
          "file": "bachelors.degree",
          "degree": "Bachelor of Computer Applications",
          "institution": "Maharaja Surajmal Institute (GGSIPU)",
          "details": "GPA: 9.19 / 10.0",
          "date": "2017 - 2020 | Delhi, India"
        }
      ]
    },
    "contact": {
      "prompt": "./contact.sh",
      "status": "Executing contact.sh...",
      "title": "> Contact Information",
      "resume": {
        "label": "⬇ download_resume.pdf",
        "href": "assets/Kumar_Jyotirmay_Resume.pdf"
      },
      "items": [
        { "icon": "📧", "label": "Email", "value": "jmy2898@gmail.com", "href": "mailto:jmy2898@gmail.com" },
        { "icon": "📱", "label": "Phone", "value": "+91 7903171580", "href": "tel:+917903171580" },
        { "icon": "💼", "label": "LinkedIn", "value": "linkedin.com/in/jmytwenty8", "href": "https://linkedin.com/in/jmytwenty8", "external": true },
        { "icon": "🐙", "label": "GitHub", "value": "github.com/jmytwenty8", "href": "https://github.com/jmytwenty8", "external": true },
        { "icon": "📍", "label": "Location", "value": "Noida, India" }
      ],
      "messagePrompt": "echo \"Let's build something amazing together!\"",
      "message": "Let's build something amazing together! 🚀"
    }
  }
}
```
