import { Storage } from "@/app/services/storage/storage";

export class FavoritesManager {
  static STORAGE_KEY = "favorites";

  static async getFavorites(): Promise<string[]> {
    const favs = await new Storage().get<string[]>(
      FavoritesManager.STORAGE_KEY
    );
    return Array.isArray(favs) ? favs : [];
  }

  static async addFavorite(id: string): Promise<string[]> {
    const favs = await FavoritesManager.getFavorites();
    if (!favs.includes(id)) favs.push(id);
    await new Storage().save(FavoritesManager.STORAGE_KEY, favs);
    return favs;
  }

  static async removeFavorite(id: string): Promise<string[]> {
    let favs = await FavoritesManager.getFavorites();
    favs = favs.filter((f) => f !== id);
    await new Storage().save(FavoritesManager.STORAGE_KEY, favs);
    return favs;
  }

  static async isFavorite(id: string): Promise<boolean> {
    const favs = await FavoritesManager.getFavorites();
    return favs.includes(id);
  }
}
