import { redisClient } from "../../config";

interface CacheOptions {
  ttlSeconds?: number; // Time-To-Live en segundos
}

const DEFAULT_CACHE_TTL_SECONDS = 3600; // Por defecto 1 hora

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        console.log(`✅ [CACHE] Obtenido de caché con clave: ${key}`);
        return JSON.parse(cachedData) as T;
      }
      return null;
    } catch (error) {
      console.warn(
        `⚠️ [CACHE WARN] Error al obtener de la caché con clave ${key}:`,
        error
      );
      return null; // En caso de error de Redis, actúa como un cache miss
    }
  },

  async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
    // Si no se provee un TTL en las opciones, usa el default.
    const ttl = options?.ttlSeconds || DEFAULT_CACHE_TTL_SECONDS;
    try {
      await redisClient.set(key, JSON.stringify(value), { EX: ttl });
      console.log(
        `💾 [CACHE] Guardado en caché con clave: ${key}, TTL: ${ttl}s`
      );
    } catch (error) {
      console.warn(
        `⚠️ [CACHE WARN] Error al guardar en la caché con clave ${key}:`,
        error
      );
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
      console.log(`🗑️ [CACHE] Eliminado de caché con clave: ${key}`);
    } catch (error) {
      console.warn(
        `⚠️ [CACHE WARN] Error al eliminar de la caché con clave ${key}:`,
        error
      );
    }
  },
};
