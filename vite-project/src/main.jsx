import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Books from "./Pages/Books.jsx";
import Favorites from "./Pages/Favorites.jsx";
import Home from "./Pages/Home.jsx";
import BookDetails from "./Pages/BookDetails.jsx";
import CategoryBooks from "./Pages/CategoryBooks.jsx";
import App from "./App.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "categories/:category",
        element: <CategoryBooks />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);