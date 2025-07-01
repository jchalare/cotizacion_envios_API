import { createClient, RedisClientType } from "redis";
import { envs } from "./envs";

export const redisClient: RedisClientType = createClient({
  url: envs.redisUrl,
});

// Manejo de eventos de conexión para una mayor visibilidad y depuración
redisClient.on("error", (err) => {
  console.error("🔴 [REDIS ERROR] Error de conexión con Redis:", err);
});

redisClient.on("connect", () => {
  console.log("🟢 [REDIS] Cliente de Redis intentando conectar...");
});

redisClient.on("ready", () => {
  console.log("✅ [REDIS] Conexión con Redis establecida y lista para usar.");
});

redisClient.on("end", () => {
  console.warn("🟡 [REDIS] Conexión con Redis terminada.");
});

redisClient.on("reconnecting", () => {
  console.log("🔄 [REDIS] Reconectando a Redis...");
});

export const connectRedis = async () => {
  if (!redisClient.isReady) {
    // Verifica si el cliente no está conectado o listo
    try {
      await redisClient.connect();
    } catch (error) {
      console.error("❌ [REDIS] Falló la conexión inicial a Redis:", error);

      throw error;
    }
  } else {
    console.log("✅ [REDIS] El cliente de Redis ya está conectado.");
  }
};

// Función para desconectar el cliente de Redis
export const disconnectRedis = async () => {
  if (redisClient.isReady) {
    try {
      await redisClient.quit();
      console.log("🔌 [REDIS] Cliente de Redis desconectado.");
    } catch (error) {
      console.error(
        "❌ [REDIS] Error al desconectar el cliente de Redis:",
        error
      );
    }
  }
};
