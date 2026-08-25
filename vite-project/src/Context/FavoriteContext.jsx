import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

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