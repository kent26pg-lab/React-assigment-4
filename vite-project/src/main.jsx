import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { FavoriteProvider } from "./Context/FavoriteContext.jsx";

import Books from "./Pages/Books.jsx";
import Favorites from "./Pages/Favorites.jsx";
import Home from "./Pages/Home.jsx";
import BookDetails from "./Pages/BookDetails.jsx";
import CategoryBooks from "./Pages/CategoryBooks.jsx";
import App from "./App.jsx";

import "./index.css";

const basename = "/React-assigment-4";

// GitHub Pages 404 redirect
const redirect = sessionStorage.redirect;

if (redirect) {
  delete sessionStorage.redirect;

  const redirectUrl = new URL(redirect);

  window.history.replaceState(
    null,
    "",
    redirectUrl.pathname +
      redirectUrl.search +
      redirectUrl.hash
  );
}

const router = createBrowserRouter(
  [
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
  ],
  {
    basename,
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoriteProvider>
      <RouterProvider router={router} />
    </FavoriteProvider>
  </StrictMode>
);