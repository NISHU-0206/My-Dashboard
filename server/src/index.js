import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure this path is correct
import "./styles.css"; // Ensure styles are imported

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found. Make sure your HTML file has a div with id='root'.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
