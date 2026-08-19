import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Books from "./Pages/Books.jsx";
import Favorites from "./Pages/Favorites.jsx";
import Home from "./Pages/Home.jsx";

import Navbar from "./Components/Navbar.jsx";

import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
