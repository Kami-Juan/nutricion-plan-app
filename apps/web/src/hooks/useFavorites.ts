import { useState, useEffect } from "react";

import {
  addFavorite,
  FavoriteItem,
  getFavorites,
  isFavorite,
  removeFavorite
} from "@/api/favorite";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Array<FavoriteItem>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const dishes = await getFavorites();
      setFavorites(dishes);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (request: FavoriteItem) => {
    try {
      const isFav = await isFavorite(request.id);

      if (isFav) {
        await removeFavorite(request.id);
        setFavorites(favorites.filter((f) => f.id !== request.id));
      } else {
        await addFavorite(request.id, request.dish, request.equivalent);
        setFavorites([...favorites, request]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return { favorites, loading, toggleFavorite };
};
