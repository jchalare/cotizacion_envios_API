import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  dbUser: string;
  dbHost: string;
  dbDatabase: string;
  dbPassword: string;
  dbPort: number;
  appPort: number;
  jwtSecret: string;
}

// Validaciones básicas para asegurar que las variables están definidas
const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    console.error(`Error: Environment variable ${name} is not set.`);
    process.exit(1);
  }
  return value;
};

export const envs: EnvConfig = {
  dbUser: getEnvVar("POSTGRES_USER"),
  dbHost: getEnvVar("DB_HOST"),
  dbDatabase: getEnvVar("POSTGRES_DB"),
  dbPassword: getEnvVar("POSTGRES_PASSWORD"),
  dbPort: parseInt(getEnvVar("POSTGRES_PORT") || "5432", 10), // Asegura que sea un número
  appPort: parseInt(getEnvVar("API_PORT") || "3000", 10),
  jwtSecret: getEnvVar("JWT_SECRET"),
};
