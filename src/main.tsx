import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Room from "./Room.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "#components/ui/sonner";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/room/:roomId" element={<Room />} />
            </Routes>
        </BrowserRouter>
        <Toaster />
    </StrictMode>,
);
