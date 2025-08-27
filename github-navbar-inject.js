// GitHub navbar injection with star count
(function() {
  'use strict';
  
  let githubData = null;
  let injected = false;
  
  // Fetch GitHub data
  async function fetchGithubData() {
    try {
      const response = await fetch('https://api.github.com/repos/subsquid/squid-sdk');
      const data = await response.json();
      githubData = {
        stars: data.stargazers_count,
        url: data.html_url
      };
      injectGithubComponent();
    } catch (err) {
      console.error('Error loading GitHub data:', err);
    }
  }
  
  // Inject GitHub component
  function injectGithubComponent() {
    if (!githubData || injected) return;
    
    // Wait for navbar to be available
    const checkNavbar = () => {
      const navbar = document.querySelector('nav') || 
                     document.querySelector('header') ||
                     document.querySelector('[role="navigation"]');
      
      if (!navbar) {
        setTimeout(checkNavbar, 100);
        return;
      }
      
      // Create GitHub link element
      const githubLink = document.createElement('a');
      githubLink.href = githubData.url;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
      githubLink.id = 'github-navbar-link';
      githubLink.innerHTML = `
        <div style="
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--background, #ffffff);
          border: 1px solid var(--border, #e5e7eb);
          border-radius: 6px;
          text-decoration: none;
          color: var(--foreground, #374151);
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-left: 8px;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        ">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span>SQD</span>
          <span style="
            background: #3b82f6;
            color: white;
            padding: 1px 4px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
          ">⭐ ${githubData.stars.toLocaleString()}</span>
        </div>
      `;
      
      // Add hover effect
      githubLink.addEventListener('mouseenter', () => {
        const div = githubLink.querySelector('div');
        div.style.transform = 'translateY(-1px)';
        div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      });
      
      githubLink.addEventListener('mouseleave', () => {
        const div = githubLink.querySelector('div');
        div.style.transform = 'translateY(0)';
        div.style.boxShadow = 'none';
      });
      
      // Insert into navbar
      navbar.appendChild(githubLink);
      injected = true;
    };
    
    checkNavbar();
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchGithubData);
  } else {
    fetchGithubData();
  }
  
  // Retry periodically in case navbar loads later
  setTimeout(fetchGithubData, 1000);
  setTimeout(fetchGithubData, 3000);
})();
