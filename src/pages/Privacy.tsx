export const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-black mb-8 tracking-tight">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: May 01, 2026</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to Nasif Tools. We respect your privacy and are committed to protecting it. Our tools are built with a "Privacy First" philosophy.</p>

      <h2>2. Client-Side Processing</h2>
      <p><strong>Crucial Information:</strong> Most of our tools (Image Compressor, PDF Merge, Word Counter, etc.) operate entirely within your web browser. This means:</p>
      <ul>
        <li>Your files are NEVER uploaded to our servers.</li>
        <li>Processing happens locally on your computer/device.</li>
        <li>We do not have access to the content of your files or text.</li>
      </ul>

      <h2>3. Data Collection</h2>
      <p>We do not collect personal information unless you explicitly provide it (e.g., through our contact form). We may use anonymous analytics to improve our website's performance and user experience.</p>

      <h2>4. Cookies</h2>
      <p>We use local storage to save your theme preferences (Dark/Light mode). Third-party services like Google AdSense may use cookies to serve advertisements based on your interests.</p>

      <h2>5. Security</h2>
      <p>Since your files stay on your device, the risk of data interception during upload or storage is eliminated. However, we recommend using a secure and updated browser.</p>
    </div>
  );
};
