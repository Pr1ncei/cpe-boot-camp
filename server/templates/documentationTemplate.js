const generateDocumentationHTML = (port) => {
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
    max-width: 1200px;
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
}

.server-url code {
    background: #f1f5f9;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: inline-block;
    font-family: ui-monospace, "Courier New", monospace;
}

.section {
    margin: 2.5rem 0;
}

.section h2 {
    color: #1e293b;
    border-bottom: 2px solid #1da1f2;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
}

.endpoint-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin: 1.5rem 0;
    overflow: hidden;
}

.endpoint-header {
    background: #fff;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.method {
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    min-width: 70px;
    text-align: center;
}

.get { background-color: #22c55e; }
.post { background-color: #3b82f6; }
.delete { background-color: #ef4444; }

.endpoint-path {
    font-family: ui-monospace, "Courier New", monospace;
    font-size: 1.1rem;
    font-weight: 600;
    color: #0f172a;
}

.auth-badge {
    background: #fef2f2;
    color: #dc2626;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: auto;
}

.endpoint-body {
    padding: 1.5rem;
}

.endpoint-description {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    color: #374151;
}

.code-block {
    background: #1f2937;
    color: #f9fafb;
    padding: 1.5rem;
    border-radius: 6px;
    font-family: ui-monospace, "Courier New", monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    margin: 1rem 0;
    white-space: pre;
    line-height: 1.5;
}

.code-block .comment {
    color: #9ca3af;
}

.code-block .string {
    color: #34d399;
}

.code-block .number {
    color: #fbbf24;
}

.code-block .key {
    color: #60a5fa;
}

h4 {
    color: #374151;
    margin: 1.5rem 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
}

.param-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.9rem;
}

.param-table th,
.param-table td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.param-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
}

.param-name {
    font-family: ui-monospace, "Courier New", monospace;
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.85rem;
}

.required {
    color: #dc2626;
    font-weight: 600;
}

.optional {
    color: #6b7280;
}

.credentials {
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1rem;
    font-size: 0.95rem;
}

.nav-section {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.nav-links a {
    color: #1da1f2;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #e2e8f0;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.nav-links a:hover {
    background: #1da1f2;
    color: #fff;
}

/* Scroll to Top Button */
#scrollToTopBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px; /* Place the button 30px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    background-color: #1da1f2; /* Set a background color */
    color: white; /* Text color */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 15px; /* Some padding */
    border-radius: 10px; /* Rounded corners */
    font-size: 18px; /* Increase font size */
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: background-color 0.3s, transform 0.3s;
}

#scrollToTopBtn:hover {
    background-color: #0e8ace; /* Add a darker background on hover */
    transform: translateY(-2px);
}
</style>
</head>
<body>
    <div class="container">
        <h1>🚀 API Documentation</h1>
        <p class="subtitle">Complete API Reference for Frontend Bootcamp</p>
        
        <div class="server-url">
            <strong>Base URL:</strong> <code>http://localhost:${port}</code>
        </div>

        <div class="nav-section">
            <h3 style="text-align: center; margin-bottom: 1rem;">Quick Navigation</h3>
            <div class="nav-links">
                <a href="#auth">Authentication</a>
                <a href="#users">Users</a>
                <a href="#tweets">Tweets</a>
                <a href="#utility">Utility</a>
                <a href="#examples">Examples</a>
            </div>
        </div>

        <div class="section">
            <h2>📚 API Endpoints Summary</h2>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <thead>
                        <tr style="background: #1da1f2; color: white;">
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">#</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Method</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Endpoint</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Description</th>
                            <th style="padding: 1rem; text-align: center; font-weight: 600;">Auth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">1</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method post" style="font-size: 0.7rem;">POST</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/auth/register</td>
                            <td style="padding: 0.75rem 1rem;">Register new user</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">2</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method post" style="font-size: 0.7rem;">POST</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/auth/login</td>
                            <td style="padding: 0.75rem 1rem;">Login user</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">3</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method get" style="font-size: 0.7rem;">GET</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/users/me</td>
                            <td style="padding: 0.75rem 1rem;">Get current user profile</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">🔒</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">4</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method get" style="font-size: 0.7rem;">GET</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/users/:username</td>
                            <td style="padding: 0.75rem 1rem;">Get user by username</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">5</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method get" style="font-size: 0.7rem;">GET</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/tweets</td>
                            <td style="padding: 0.75rem 1rem;">Get all tweets with pagination</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">6</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method get" style="font-size: 0.7rem;">GET</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/tweets/user/:username</td>
                            <td style="padding: 0.75rem 1rem;">Get tweets from specific user</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">7</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method post" style="font-size: 0.7rem;">POST</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/tweets</td>
                            <td style="padding: 0.75rem 1rem;">Create new tweet</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">🔒</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">8</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method post" style="font-size: 0.7rem;">POST</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/tweets/:id/like</td>
                            <td style="padding: 0.75rem 1rem;">Like a tweet</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">🔒</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">9</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method delete" style="font-size: 0.7rem;">DELETE</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/tweets/:id</td>
                            <td style="padding: 0.75rem 1rem;">Delete tweet</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">🔒</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">10</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method get" style="font-size: 0.7rem;">GET</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/health</td>
                            <td style="padding: 0.75rem 1rem;">Health check & statistics</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem 1rem; color: #6b7280;">11</td>
                            <td style="padding: 0.75rem 1rem;"><span class="method post" style="font-size: 0.7rem;">POST</span></td>
                            <td style="padding: 0.75rem 1rem; font-family: ui-monospace, monospace; color: #1e293b;">/api/reset</td>
                            <td style="padding: 0.75rem 1rem;">Reset to seed data</td>
                            <td style="padding: 0.75rem 1rem; text-align: center;">❌</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 6px; font-size: 0.9rem;">
                <strong>Legend:</strong> 🔒 = Authentication Required | ❌ = No Authentication Required
            </div>
        </div>

        <div class="section" id="auth">
            <h2>🔐 Authentication Endpoints</h2>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/auth/register</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Create a new user account</p>
                    
                    <h4>Request Body:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">username</code></td>
                            <td>string</td>
                            <td><span class="required">Required</span></td>
                            <td>Unique username (min 3 characters)</td>
                        </tr>
                        <tr>
                            <td><code class="param-name">email</code></td>
                            <td>string</td>
                            <td><span class="required">Required</span></td>
                            <td>Valid email address</td>
                        </tr>
                        <tr>
                            <td><code class="param-name">password</code></td>
                            <td>string</td>
                            <td><span class="required">Required</span></td>
                            <td>Password (min 6 characters)</td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl -X POST http://localhost:${port}/api/auth/register \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "username": "new_user",
    "email": "user@example.com",
    "password": "mypassword123"
  }'</span></div>

                    <h4>Success Response (201):</h4>
                    <div class="code-block">{
  <span class="key">"message"</span>: <span class="string">"User created successfully"</span>,
  <span class="key">"user"</span>: {
    <span class="key">"id"</span>: <span class="number">4</span>,
    <span class="key">"username"</span>: <span class="string">"new_user"</span>,
    <span class="key">"email"</span>: <span class="string">"user@example.com"</span>,
    <span class="key">"bio"</span>: <span class="string">""</span>,
    <span class="key">"createdAt"</span>: <span class="string">"2024-07-01T12:00:00.000Z"</span>
  },
  <span class="key">"token"</span>: <span class="string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span>
}</div>

                    <h4>Error Response (400):</h4>
                    <div class="code-block">{
  <span class="key">"error"</span>: <span class="string">"Username already exists"</span>
}</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/auth/login</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Login with existing credentials</p>
                    
                    <h4>Request Body:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">username</code></td>
                            <td>string</td>
                            <td><span class="required">Required</span></td>
                            <td>Username or email address</td>
                        </tr>
                        <tr>
                            <td><code class="param-name">password</code></td>
                            <td>string</td>
                            <td><span class="required">Required</span></td>
                            <td>User password</td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl -X POST http://localhost:${port}/api/auth/login \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "username": "john_doe",
    "password": "password123"
  }'</span></div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"message"</span>: <span class="string">"Login successful"</span>,
  <span class="key">"user"</span>: {
    <span class="key">"id"</span>: <span class="number">1</span>,
    <span class="key">"username"</span>: <span class="string">"john_doe"</span>,
    <span class="key">"email"</span>: <span class="string">"john@example.com"</span>,
    <span class="key">"bio"</span>: <span class="string">"Software developer and coffee enthusiast"</span>,
    <span class="key">"createdAt"</span>: <span class="string">"2024-01-15T00:00:00.000Z"</span>
  },
  <span class="key">"token"</span>: <span class="string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span>
}</div>
                </div>
            </div>
        </div>

        <div class="section" id="users">
            <h2>👤 User Endpoints</h2>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/users/me</span>
                    <span class="auth-badge">🔒 Auth Required</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Get current authenticated user's profile</p>
                    
                    <h4>Headers:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Header</th>
                            <th>Value</th>
                            <th>Required</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">Authorization</code></td>
                            <td>Bearer YOUR_JWT_TOKEN</td>
                            <td><span class="required">Required</span></td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl -H <span class="string">"Authorization: Bearer YOUR_TOKEN"</span> \\
  http://localhost:${port}/api/users/me</div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"id"</span>: <span class="number">1</span>,
  <span class="key">"username"</span>: <span class="string">"john_doe"</span>,
  <span class="key">"email"</span>: <span class="string">"john@example.com"</span>,
  <span class="key">"bio"</span>: <span class="string">"Software developer and coffee enthusiast"</span>,
  <span class="key">"createdAt"</span>: <span class="string">"2024-01-15T00:00:00.000Z"</span>
}</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/users/:username</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Get any user's public profile by username</p>
                    
                    <h4>URL Parameters:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">username</code></td>
                            <td>string</td>
                            <td>The username to look up</td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl http://localhost:${port}/api/users/jane_smith</div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"id"</span>: <span class="number">2</span>,
  <span class="key">"username"</span>: <span class="string">"jane_smith"</span>,
  <span class="key">"email"</span>: <span class="string">"jane@example.com"</span>,
  <span class="key">"bio"</span>: <span class="string">"UX designer who loves to code"</span>,
  <span class="key">"createdAt"</span>: <span class="string">"2024-02-10T00:00:00.000Z"</span>,
  <span class="key">"tweetsCount"</span>: <span class="number">1</span>
}</div>
                </div>
            </div>
        </div>

        <div class="section" id="tweets">
            <h2>🐦 Tweet Endpoints</h2>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/tweets</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Get all tweets with pagination</p>
                    
                    <h4>Query Parameters:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">page</code></td>
                            <td>number</td>
                            <td>1</td>
                            <td>Page number for pagination</td>
                        </tr>
                        <tr>
                            <td><code class="param-name">limit</code></td>
                            <td>number</td>
                            <td>20</td>
                            <td>Number of tweets per page</td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl http://localhost:${port}/api/tweets?page=1&limit=5</div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"tweets"</span>: [
    {
      <span class="key">"id"</span>: <span class="number">4</span>,
      <span class="key">"userId"</span>: <span class="number">1</span>,
      <span class="key">"content"</span>: <span class="string">"Coffee break = debugging break ☕️"</span>,
      <span class="key">"likes"</span>: <span class="number">5</span>,
      <span class="key">"retweets"</span>: <span class="number">1</span>,
      <span class="key">"createdAt"</span>: <span class="string">"2024-07-01T15:20:00.000Z"</span>,
      <span class="key">"user"</span>: {
        <span class="key">"id"</span>: <span class="number">1</span>,
        <span class="key">"username"</span>: <span class="string">"john_doe"</span>,
        <span class="key">"email"</span>: <span class="string">"john@example.com"</span>,
        <span class="key">"bio"</span>: <span class="string">"Software developer and coffee enthusiast"</span>
      }
    }
  ],
  <span class="key">"pagination"</span>: {
    <span class="key">"currentPage"</span>: <span class="number">1</span>,
    <span class="key">"totalPages"</span>: <span class="number">1</span>,
    <span class="key">"totalTweets"</span>: <span class="number">4</span>,
    <span class="key">"hasNext"</span>: <span class="number">false</span>,
    <span class="key">"hasPrev"</span>: <span class="number">false</span>
  }
}</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/tweets/user/:username</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Get all tweets from a specific user</p>
                    
                    <h4>URL Parameters:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">username</code></td>
                            <td>string</td>
                            <td>Username to get tweets from</td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl http://localhost:${port}/api/tweets/user/john_doe</div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">[
  {
    <span class="key">"id"</span>: <span class="number">4</span>,
    <span class="key">"userId"</span>: <span class="number">1</span>,
    <span class="key">"content"</span>: <span class="string">"Coffee break = debugging break ☕️"</span>,
    <span class="key">"likes"</span>: <span class="number">5</span>,
    <span class="key">"retweets"</span>: <span class="number">1</span>,
    <span class="key">"createdAt"</span>: <span class="string">"2024-07-01T15:20:00.000Z"</span>,
    <span class="key">"user"</span>: {
      <span class="key">"id"</span>: <span class="number">1</span>,
      <span class="key">"username"</span>: <span class="string">"john_doe"</span>,
      <span class="key">"bio"</span>: <span class="string">"Software developer and coffee enthusiast"</span>
    }
  }
]</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/tweets</span>
                    <span class="auth-badge">🔒 Auth Required</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Create a new tweet</p>
                    
                    <h4>Headers:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Header</th>
                            <th>Value</th>
                            <th>Required</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">Authorization</code></td>
                            <td>Bearer YOUR_JWT_TOKEN</td>
                            <td><span class="required">Required</span></td>
                        </tr>
                        <tr>
                            <td><code class="param-name">Content-Type</code></td>
                            <td>application/json</td>
                            <td><span class="required">Required</span></td>
                        </tr>
                    </table>

                    <h4>Request Body:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">content</code></td>
                            <td>string</td>
                            <td><span class="required">Required</span></td>
                            <td>Tweet content (max 280 characters)</td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl -X POST http://localhost:${port}/api/tweets \\
  -H <span class="string">"Authorization: Bearer YOUR_TOKEN"</span> \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "content": "Just learned React hooks! 🎉"
  }'</span></div>

                    <h4>Success Response (201):</h4>
                    <div class="code-block">{
  <span class="key">"id"</span>: <span class="number">5</span>,
  <span class="key">"userId"</span>: <span class="number">1</span>,
  <span class="key">"content"</span>: <span class="string">"Just learned React hooks! 🎉"</span>,
  <span class="key">"likes"</span>: <span class="number">0</span>,
  <span class="key">"retweets"</span>: <span class="number">0</span>,
  <span class="key">"createdAt"</span>: <span class="string">"2024-07-01T16:30:00.000Z"</span>,
  <span class="key">"user"</span>: {
    <span class="key">"id"</span>: <span class="number">1</span>,
    <span class="key">"username"</span>: <span class="string">"john_doe"</span>,
    <span class="key">"email"</span>: <span class="string">"john@example.com"</span>,
    <span class="key">"bio"</span>: <span class="string">"Software developer and coffee enthusiast"</span>
  }
}</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/tweets/:id/like</span>
                    <span class="auth-badge">🔒 Auth Required</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Like a tweet (increment like count)</p>
                    
                    <h4>URL Parameters:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">id</code></td>
                            <td>number</td>
                            <td>Tweet ID</td>
                        </tr>
                    </table>

                    <h4>Headers:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Header</th>
                            <th>Value</th>
                            <th>Required</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">Authorization</code></td>
                            <td>Bearer YOUR_JWT_TOKEN</td>
                            <td><span class="required">Required</span></td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl -X POST http://localhost:${port}/api/tweets/1/like \\
  -H <span class="string">"Authorization: Bearer YOUR_TOKEN"</span></div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"message"</span>: <span class="string">"Tweet liked successfully"</span>,
  <span class="key">"tweet"</span>: {
    <span class="key">"id"</span>: <span class="number">1</span>,
    <span class="key">"likes"</span>: <span class="number">16</span>
  }
}</div>

                    <h4>Error Response (404):</h4>
                    <div class="code-block">{
  <span class="key">"error"</span>: <span class="string">"Tweet not found"</span>
}</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method delete">DELETE</span>
                    <span class="endpoint-path">/api/tweets/:id</span>
                    <span class="auth-badge">🔒 Auth Required</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Delete a tweet by ID</p>
                    
                    <h4>URL Parameters:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">id</code></td>
                            <td>number</td>
                            <td>The ID of the tweet to delete</td>
                        </tr>
                    </table>

                    <h4>Headers:</h4>
                    <table class="param-table">
                        <tr>
                            <th>Header</th>
                            <th>Value</th>
                            <th>Required</th>
                        </tr>
                        <tr>
                            <td><code class="param-name">Authorization</code></td>
                            <td>Bearer YOUR_JWT_TOKEN</td>
                            <td><span class="required">Required</span></td>
                        </tr>
                    </table>

                    <h4>Example Request:</h4>
                    <div class="code-block">curl -X DELETE http://localhost:${port}/api/tweets/5 \\
  -H <span class="string">"Authorization: Bearer YOUR_TOKEN"</span></div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"message"</span>: <span class="string">"Tweet deleted successfully"</span>
}</div>

                    <h4>Error Response (403):</h4>
                    <div class="code-block">{
  <span class="key">"error"</span>: <span class="string">"Unauthorized to delete this tweet"</span>
}</div>
                </div>
            </div>
        </div>

        <div class="section" id="utility">
            <h2>🛠️ Utility Endpoints</h2>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/health</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Check API health and get basic statistics</p>
                    
                    <h4>Example Request:</h4>
                    <div class="code-block">curl http://localhost:${port}/api/health</div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"status"</span>: <span class="string">"ok"</span>,
  <span class="key">"uptime"</span>: <span class="number">3600</span>, <span class="comment">
  <span class="key">"usersCount"</span>: <span class="number">3</span>,
  <span class="key">"tweetsCount"</span>: <span class="number">4</span>,
  <span class="key">"timestamp"</span>: <span class="string">"2024-07-01T17:00:00.000Z"</span>
}</div>
                </div>
            </div>

            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/reset</span>
                </div>
                <div class="endpoint-body">
                    <p class="endpoint-description">Reset the database to its initial seed data. <strong>Use with caution!</strong> This will delete all current data and restore default users and tweets.</p>
                    
                    <h4>Example Request:</h4>
                    <div class="code-block">curl -X POST http://localhost:${port}/api/reset</div>

                    <h4>Success Response (200):</h4>
                    <div class="code-block">{
  <span class="key">"message"</span>: <span class="string">"Database reset to seed data successfully."</span>
}</div>
                </div>
            </div>
        </div>

        <div class="section" id="examples">
            <h2>✨ Usage Examples</h2>
            <p class="endpoint-description">Here are some common workflows demonstrated with <code>curl</code>.</p>

            <h3>Register, Login, and Create a Tweet</h3>
            <div class="code-block">
<span class="comment">
curl -X POST http://localhost:${port}/api/auth/register \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword"
  }'</span>

<span class="comment">

<span class="comment">
curl -X POST http://localhost:${port}/api/auth/login \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "username": "testuser",
    "password": "testpassword"
  }'</span>

<span class="comment">
<span class="comment">

<span class="comment">
curl -H <span class="string">"Authorization: Bearer YOUR_TOKEN_HERE"</span> \\
  http://localhost:${port}/api/users/me

<span class="comment">
curl -X POST http://localhost:${port}/api/tweets \\
  -H <span class="string">"Authorization: Bearer YOUR_TOKEN_HERE"</span> \\
  -H <span class="string">"Content-Type: application/json"</span> \\
  -d <span class="string">'{
    "content": "Hello from my first API tweet! #backend #api"
  }'</span>

<span class="comment">
</div>

            <h3>Retrieve and Interact with Tweets</h3>
            <div class="code-block">
<span class="comment">
curl http://localhost:${port}/api/tweets?page=1&limit=3

<span class="comment">
curl http://localhost:${port}/api/tweets/user/john_doe

<span class="comment">
curl -X POST http://localhost:${port}/api/tweets/TWEET_ID/like \\
  -H <span class="string">"Authorization: Bearer YOUR_TOKEN_HERE"</span>

<span class="comment">
curl -X DELETE http://localhost:${port}/api/tweets/TWEET_ID \\
  -H <span class="string">"Authorization: Bearer YOUR_TOKEN_HERE"</span>
</div>
        </div>
    </div>

    <button onclick="scrollToTop()" id="scrollToTopBtn" title="Go to top">⬆️</button>

    <script>
        
        let mybutton = document.getElementById("scrollToTopBtn");

        
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }

        
        function scrollToTop() {
            document.body.scrollTop = 0; 
            document.documentElement.scrollTop = 0; 
        }
    </script>
</body>
</html>`;
};

module.exports = { generateDocumentationHTML };
