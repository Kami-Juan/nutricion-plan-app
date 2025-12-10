import { openDB, DBSchema } from 'idb';

import { Dish, EquivalentType } from '@/types';

export type FavoriteItem = {
  id: string;
  dish: Dish;
  equivalent: Array<EquivalentType>;
};

interface FavoritesDB extends DBSchema {
  'favourite-dish': {
    key: string;
    value: FavoriteItem;
  };
}

const DB_NAME = 'favorites-db';
const STORE_NAME = 'favourite-dish';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB<FavoritesDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
    blocked() {
      console.warn(
        'Una versión anterior está bloqueando la actualización de la base de datos'
      );
    },
    blocking() {
      console.warn('Una nueva versión está intentando actualizarse');
    },
  });
  return db;
};

export async function addFavorite(
  period: string,
  dish: Dish,
  equivalent: Array<EquivalentType>
) {
  try {
    const db = await initDB();
    const favoriteItem: FavoriteItem = {
      id: period,
      dish,
      equivalent,
    };

    await db.put(STORE_NAME, favoriteItem);
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    throw new Error('No se pudo agregar el plato a favoritos');
  }
}

export async function removeFavorite(id: string): Promise<boolean> {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    return true;
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    return false;
  }
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  try {
    const db = await initDB();
    const favorites = await db.getAll(STORE_NAME);

    return favorites;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return [];
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  try {
    const db = await initDB();
    const dish = await db.get(STORE_NAME, id);
    return !!dish;
  } catch (error) {
    console.error('Error al verificar favorito:', error);
    return false;
  }
}

export async function clearFavorites(): Promise<boolean> {
  try {
    const db = await initDB();
    await db.clear(STORE_NAME);
    return true;
  } catch (error) {
    console.error('Error al limpiar favoritos:', error);
    return false;
  }
}
