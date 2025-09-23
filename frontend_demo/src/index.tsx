import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import DebugApp from "./DebugApp";

console.log('Loading DebugApp to test React rendering...');

const rootElement = document.getElementById("root");
console.log('Root element:', rootElement);

if (rootElement) {
  console.log('Creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  console.log('Rendering DebugApp...');
  root.render(<DebugApp />);
  console.log('DebugApp rendered successfully!');
} else {
  console.error("Root element not found");
  document.body.innerHTML = `
    <div style="background: red; color: white; padding: 20px; font-size: 20px;">
      ERROR: Root element with id="root" not found in HTML!
    </div>
  `;
}
