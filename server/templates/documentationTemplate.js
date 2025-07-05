const fs = require("fs");
const path = require("path");

const generateDocumentationHTML = (port) => {
	try {
		const htmlPath = path.join(__dirname, "documentation.html");

		if (fs.existsSync(htmlPath)) {
			let html = fs.readFileSync(htmlPath, "utf8");

			html = html.replace(/localhost:3140/g, `localhost:${port}`);

			return html;
		} else {
			return generateFallbackHTML(port);
		}
	} catch (error) {
		console.error("Error reading documentation HTML file:", error);
		return generateFallbackHTML(port);
	}
};

const generateFallbackHTML = (port) => {
	return `<!DOCTYPE html>
<html>
<head>
    <title>API Documentation</title>
    <style>
        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            margin: 2rem;
            background-color: #f9fbfc;
            color: #2c3e50;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h1 {
            color: #1da1f2;
            text-align: center;
            margin-bottom: 0.5rem;
        }
        .subtitle {
            text-align: center;
            color: #555;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        .server-url {
            text-align: center;
            font-size: 1.1rem;
            margin: 1.5rem 0;
            padding: 1rem;
            background: #f1f5f9;
            border-radius: 8px;
        }
        .endpoints-list {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
        }
        .endpoint {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            margin: 0.5rem 0;
            background: white;
            border-radius: 4px;
            border-left: 4px solid #1da1f2;
        }
        .method {
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            color: #fff;
            text-transform: uppercase;
            font-size: 0.75rem;
            min-width: 60px;
            text-align: center;
        }
        .get { background-color: #22c55e; }
        .post { background-color: #3b82f6; }
        .delete { background-color: #ef4444; }
        .path {
            font-family: ui-monospace, "Courier New", monospace;
            font-weight: 600;
            color: #0f172a;
            flex: 1;
            margin: 0 1rem;
        }
        .auth {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            background: #fef2f2;
            color: #dc2626;
        }
        .demo-section {
            background: #e0f2fe;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
        }
        .demo-section h3 {
            margin-top: 0;
            color: #1e293b;
        }
        .demo-credentials {
            font-family: ui-monospace, "Courier New", monospace;
            background: white;
            padding: 1rem;
            border-radius: 4px;
            border-left: 4px solid #1da1f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 API Documentation</h1>
        <p class="subtitle">Stack Puno pero Frontend Muna Bootcamp</p>
        
        <div class="server-url">
            <strong>Base URL:</strong> <code>http://localhost:${port}</code>
        </div>

        <div class="endpoints-list">
            <h2>📚 Available API Endpoints</h2>
            
            <!-- Authentication -->
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/auth/register</span>
                <span>Register new user</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/auth/login</span>
                <span>Login user</span>
            </div>

            <!-- Users -->
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/users/me</span>
                <span class="auth">🔒 Auth</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/users/search</span>
                <span>Search users</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/users/:username</span>
                <span>Get user profile</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/users/:username/activity</span>
                <span class="auth">🔒 Auth</span>
            </div>

            <!-- Tweets -->
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/tweets</span>
                <span>Get all tweets</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/tweets/feed</span>
                <span class="auth">🔒 Auth</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/tweets/:id</span>
                <span>Get single tweet</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/tweets/user/:username</span>
                <span>Get user tweets</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/tweets/:id/stats</span>
                <span>Get tweet stats</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/tweets</span>
                <span class="auth">🔒 Auth</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/tweets/:id/like</span>
                <span class="auth">🔒 Auth</span>
            </div>
            <div class="endpoint">
                <span class="method delete">DELETE</span>
                <span class="path">/api/tweets/:id/like</span>
                <span class="auth">🔒 Auth</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/tweets/:id/toggle-like</span>
                <span class="auth">🔒 Auth</span>
            </div>
            <div class="endpoint">
                <span class="method delete">DELETE</span>
                <span class="path">/api/tweets/:id</span>
                <span class="auth">🔒 Auth</span>
            </div>

            <!-- Utility -->
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/api/health</span>
                <span>Health check</span>
            </div>
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="path">/api/reset</span>
                <span>Reset database</span>
            </div>
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="path">/</span>
                <span>This documentation</span>
            </div>
        </div>

        <div class="demo-section">
            <h3>🧪 Quick Test</h3>
            <p><strong>Demo Credentials:</strong></p>
            <div class="demo-credentials">
                Username: john_doe<br>
                Password: password123
            </div>
            
            <h4>Test Commands:</h4>
            <div class="demo-credentials">
# Health check<br>
curl http://localhost:${port}/api/health<br><br>

# Login<br>
curl -X POST http://localhost:${port}/api/auth/login \\<br>
&nbsp;&nbsp;-H "Content-Type: application/json" \\<br>
&nbsp;&nbsp;-d '{"username":"john_doe","password":"password123"}'<br><br>

# Get tweets<br>
curl http://localhost:${port}/api/tweets
            </div>
        </div>

        <div style="text-align: center; margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
            <p><strong>📝 Note:</strong> For complete documentation with examples, place <code>documentation.html</code> in the same directory as this template.</p>
            <p><strong>Total Endpoints:</strong> 19 routes across 4 categories</p>
        </div>
    </div>
</body>
</html>`;
};

module.exports = { generateDocumentationHTML };
