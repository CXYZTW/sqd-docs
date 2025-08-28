import React, { useState, useEffect } from 'react';

export const HomePage = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('curl');
  const [activeVM, setActiveVM] = useState('evm');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        .hero-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
        .demo-section { background: #f5f5f0; border: 1px solid var(--border-primary); border-radius: 12px; padding: 32px; margin-bottom: 40px; }
        .demo-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .demo-title { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .demo-content { display: grid; grid-template-columns: 280px 1fr; gap: 24px; }
        .demo-sidebar { background: white; border: 1px solid var(--border-primary); border-radius: 8px; padding: 16px; }
        .demo-sidebar h3 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 16px 0; }
        .demo-nav { list-style: none; padding: 0; margin: 0; }
        .demo-nav li { padding: 12px 16px; margin: 4px 0; border-radius: 6px; cursor: pointer; font-size: 14px; color: var(--text-secondary); transition: background 0.2s; }
        .demo-nav li:hover { background: var(--background-secondary); }
        .demo-nav li.active { background: var(--background-secondary); color: var(--text-primary); font-weight: 500; }
        .code-demo { background: white; border: 1px solid var(--border-primary); border-radius: 8px; overflow: hidden; }
        .code-tabs { display: flex; background: var(--background-secondary); border-bottom: 1px solid var(--border-primary); }
        .code-tab { padding: 12px 16px; font-size: 14px; color: var(--text-secondary); cursor: pointer; border: none; background: none; transition: all 0.2s; }
        .code-tab.active { color: var(--text-primary); background: white; border-bottom: 2px solid #3b82f6; }
        .code-content { padding: 24px; font-family: 'Monaco', 'Menlo', monospace; font-size: 14px; line-height: 1.6; color: var(--text-primary); background: white; min-height: 300px; }
        .get-started-link { color: #6b7280; text-decoration: underline; font-size: 14px; margin-top: 16px; display: inline-block; }
        .browse-section { margin-bottom: 40px; }
        .browse-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .browse-title { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .view-all-link { color: #6b7280; text-decoration: none; font-size: 14px; font-weight: 500; }
        .models-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .model-card { background: white; border: 1px solid var(--border-primary); border-radius: 12px; overflow: hidden; transition: all 0.2s ease; cursor: pointer; }
        .model-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); }
        .model-pattern { height: 120px; position: relative; overflow: hidden; }
        .sdk-pattern { background: linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; background-color: #e5e7eb; }
        .cloud-pattern { background: linear-gradient(90deg, #3b82f6 0%, #3b82f6 50%, #60a5fa 50%, #60a5fa 100%); background-size: 8px 100%; }
        .network-pattern { background: linear-gradient(45deg, #dc2626 25%, transparent 25%), linear-gradient(-45deg, #dc2626 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #dc2626 75%), linear-gradient(-45deg, transparent 75%, #dc2626 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px; background-color: #ef4444; }
        .model-content { padding: 20px; }
        .model-content h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px 0; }
        .model-content p { font-size: 14px; color: var(--text-secondary); margin: 0; line-height: 1.5; }
        [data-theme="dark"] .demo-section { background: #1f2937; }
        [data-theme="dark"] .demo-sidebar, [data-theme="dark"] .code-demo, [data-theme="dark"] .code-content { background: #111827; }
        [data-theme="dark"] .code-tab.active { background: #111827; }
        [data-theme="dark"] .model-card { background: #1f2937; }
        .networks-section { background: var(--background-secondary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 32px; margin-bottom: 40px; }
        .networks-header { text-align: center; margin-bottom: 32px; }
        .networks-title { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 0 0 12px 0; }
        .networks-subtitle { font-size: 14px; color: var(--text-secondary); margin: 0; max-width: 420px; margin: 0 auto; }
        .vm-filters { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; justify-content: center; }
        .vm-filter { padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-primary); background: var(--background-secondary); color: var(--text-secondary); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .vm-filter.active { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1); color: #3b82f6; box-shadow: 0 8px 25px -8px rgba(59, 130, 246, 0.3); }
        .vm-filter:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
        .networks-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); margin-bottom: 32px; }
        .network-item { background: white; border: 1px solid var(--border-primary); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; transition: all 0.2s ease; cursor: pointer; }
        .network-item:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); }
        .network-icon { width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: white; box-shadow: 0 4px 12px -4px rgba(59, 130, 246, 0.4); }
        .network-info { flex: 1; }
        .network-name { font-weight: 600; font-size: 16px; margin-bottom: 4px; color: var(--text-primary); }
        .network-usage { color: var(--text-secondary); font-size: 14px; }
        .network-status { width: 12px; height: 12px; border-radius: 50%; background: #6b7280; }
        .network-status.active { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
        .view-all-container { text-align: center; }
        .view-all-button { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; color: #3b82f6; font-weight: 600; font-size: 14px; border-radius: 8px; text-decoration: none; transition: all 0.2s ease; }
        .view-all-button:hover { transform: translateY(-1px); box-shadow: 0 8px 25px -8px rgba(59, 130, 246, 0.3); }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 40px; }
        .feature-card { background: var(--background-secondary); border: 1px solid var(--border-primary); border-radius: 12px; padding: 24px; }
        .feature-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 12px 0; }
        .feature-card p { font-size: 14px; color: var(--text-secondary); margin: 0; line-height: 1.5; }
        [data-theme="dark"] .networks-section { background: #1f2937; }
        [data-theme="dark"] .network-item { background: #111827; }
        @media (max-width: 768px) { .models-grid { grid-template-columns: 1fr; } .networks-grid { grid-template-columns: 1fr; } .vm-filters { justify-content: flex-start; } }
      `;
      document.head.appendChild(style);
    }
  }, [isClient]);

  const codeExamples = {
    curl: `curl https://api.sqd.dev/v1/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "SELECT * FROM ethereum_blocks WHERE number > 18000000",
    "network": "ethereum"
  }'`,
    javascript: `import { SqdClient } from '@sqd/sdk';

const client = new SqdClient({
  apiKey: 'YOUR_API_KEY'
});

const blocks = await client.query({
  network: 'ethereum',
  query: 'SELECT * FROM blocks WHERE number > 18000000'
});`,
    python: `import sqd

client = sqd.Client(api_key="YOUR_API_KEY")

blocks = client.query(
  network="ethereum",
  query="SELECT * FROM blocks WHERE number > 18000000"
)`
  };

  return (
    <div className="hero-container">
      <div className="demo-section">
        <div className="demo-header">
          <h2 className="demo-title">Try SQD</h2>
        </div>
        <div className="demo-content">
          <div className="demo-sidebar">
            <h3>Get the Latest News</h3>
            <ul className="demo-nav">
              <li className="active">Domain Search</li>
              <li>Academic Search</li>
              <li>Structured Outputs</li>
            </ul>
            <a href="/sdk/how-to-start" className="get-started-link">Get started</a>
          </div>
          <div className="code-demo">
            <div className="code-tabs">
              <button className={`code-tab ${activeTab === 'curl' ? 'active' : ''}`} onClick={() => setActiveTab('curl')}>curl</button>
              <button className={`code-tab ${activeTab === 'javascript' ? 'active' : ''}`} onClick={() => setActiveTab('javascript')}>javascript</button>
              <button className={`code-tab ${activeTab === 'python' ? 'active' : ''}`} onClick={() => setActiveTab('python')}>python</button>
            </div>
            <div className="code-content">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{codeExamples[activeTab]}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="browse-section">
        <div className="browse-header">
          <h2 className="browse-title">Browse Products</h2>
          <a href="#" className="view-all-link">View all</a>
        </div>
        <div className="models-grid">
          <div className="model-card sdk-card">
            <div className="model-pattern sdk-pattern"></div>
            <div className="model-content">
              <h3>SDK</h3>
              <p>Lightweight, cost-effective development toolkit with comprehensive blockchain data access.</p>
            </div>
          </div>
          <div className="model-card cloud-card">
            <div className="model-pattern cloud-pattern"></div>
            <div className="model-content">
              <h3>Cloud</h3>
              <p>Fast, real-time managed infrastructure designed for production applications with automatic scaling.</p>
            </div>
          </div>
          <div className="model-card network-card">
            <div className="model-pattern network-pattern"></div>
            <div className="model-content">
              <h3>Network</h3>
              <p>Decentralized research network conducting comprehensive blockchain data analysis and indexing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Networks Section */}
      <div className="networks-section">
        <div className="networks-header">
          <h2 className="networks-title">Supported Networks</h2>
          <p className="networks-subtitle">
            Production-ready indexing across 226 blockchain networks
          </p>
        </div>

        {/* VM Filters */}
        <div className="vm-filters">
          <button 
            className={`vm-filter ${activeVM === 'evm' ? 'active' : ''}`}
            onClick={() => setActiveVM('evm')}
          >
            EVM (130)
          </button>
          <button 
            className={`vm-filter ${activeVM === 'substrate' ? 'active' : ''}`}
            onClick={() => setActiveVM('substrate')}
          >
            Substrate (86)
          </button>
          <button 
            className={`vm-filter ${activeVM === 'solana' ? 'active' : ''}`}
            onClick={() => setActiveVM('solana')}
          >
            Solana (5)
          </button>
          <button 
            className={`vm-filter ${activeVM === 'starknet' ? 'active' : ''}`}
            onClick={() => setActiveVM('starknet')}
          >
            Starknet (2)
          </button>
        </div>

        {/* Networks Grid */}
        <div className="networks-grid">
          {activeVM === 'evm' && (
            <>
              <div className="network-item">
                <div className="network-icon">ET</div>
                <div className="network-info">
                  <div className="network-name">Ethereum</div>
                  <div className="network-usage">2.1TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
              <div className="network-item">
                <div className="network-icon">PO</div>
                <div className="network-info">
                  <div className="network-name">Polygon</div>
                  <div className="network-usage">1.8TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
              <div className="network-item">
                <div className="network-icon">AR</div>
                <div className="network-info">
                  <div className="network-name">Arbitrum</div>
                  <div className="network-usage">1.2TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
              <div className="network-item">
                <div className="network-icon">OP</div>
                <div className="network-info">
                  <div className="network-name">Optimism</div>
                  <div className="network-usage">0.9TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
            </>
          )}
          
          {activeVM === 'substrate' && (
            <>
              <div className="network-item">
                <div className="network-icon">PD</div>
                <div className="network-info">
                  <div className="network-name">Polkadot</div>
                  <div className="network-usage">0.5TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
              <div className="network-item">
                <div className="network-icon">KU</div>
                <div className="network-info">
                  <div className="network-name">Kusama</div>
                  <div className="network-usage">0.3TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
            </>
          )}
          
          {activeVM === 'solana' && (
            <>
              <div className="network-item">
                <div className="network-icon">SO</div>
                <div className="network-info">
                  <div className="network-name">Solana</div>
                  <div className="network-usage">0.8TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
            </>
          )}
          
          {activeVM === 'starknet' && (
            <>
              <div className="network-item">
                <div className="network-icon">ST</div>
                <div className="network-info">
                  <div className="network-name">Starknet</div>
                  <div className="network-usage">0.2TB indexed</div>
                </div>
                <div className="network-status active"></div>
              </div>
            </>
          )}
        </div>

        {/* View All Button */}
        <div className="view-all-container">
          <a href="/network/overview" className="view-all-button">
            View all networks →
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <h3>🚀 High Performance</h3>
          <p>
            Process millions of blockchain events with sub-100ms query latency.
            Built for enterprise-scale applications.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔧 Developer Experience</h3>
          <p>
            Hot reloading, TypeScript support, and instant feedback loops.
            Ship faster with confidence.
          </p>
        </div>

        <div className="feature-card">
          <h3>🌐 Multi-Chain Support</h3>
          <p>
            Index data from 200+ blockchain networks including Ethereum,
            Polygon, Arbitrum, and more.
          </p>
        </div>

        <div className="feature-card">
          <h3>🛡️ Enterprise Ready</h3>
          <p>
            99.9% uptime SLA, automatic scaling, monitoring, and alerting.
            Built for mission-critical applications.
          </p>
        </div>
      </div>
    </div>
  );
};
