import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

function getSavedFavorites() {
  const savedFavorites = localStorage.getItem("favorites");

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch (error) {
    console.error("Kunne ikke lese favoritter fra localStorage:", error);
    return [];
  }
}

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(getSavedFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(book) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === book.id
      );

      if (alreadyFavorite) {
        return currentFavorites;
      }

      return [...currentFavorites, book];
    });
  }

  function removeFavorite(bookId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((book) => book.id !== bookId)
    );
  }

  function isFavorite(bookId) {
    return favorites.some((book) => book.id === bookId);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}