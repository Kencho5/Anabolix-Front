import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
import "./i18n";
import TopBarProgress from "react-topbar-progress-indicator";
import { PostHogProvider } from "posthog-js/react";

const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
};

TopBarProgress.config({
  barColors: {
    "0": "#0d9488",
    "1.0": "#0d9488",
  },
  shadowBlur: 2,
  barThickness: 3,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PostHogProvider
        apiKey={import.meta.env.VITE_POSTHOG_KEY}
        options={options}
      >
        <App />
      </PostHogProvider>
    </BrowserRouter>
  </StrictMode>,
);
