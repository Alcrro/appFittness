import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore: allow side-effect CSS import when no type declarations are present
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
