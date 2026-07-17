import type { Core } from "@strapi/strapi";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env("DATABASE_CLIENT", "postgres");
  const connectionConfig: Record<string, any> = {
    client,
    connection: {},
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  };

  let databaseUrl = env("DATABASE_URL", "");

  if (databaseUrl) {
    databaseUrl = databaseUrl
      .replace("sslmode=require", "sslmode=no-verify")
      .replace("sslmode=prefer", "sslmode=no-verify")
      .replace("sslmode=allow", "sslmode=no-verify");

    if (!databaseUrl.includes("sslmode=")) {
      databaseUrl += databaseUrl.includes("?")
        ? "&sslmode=no-verify"
        : "?sslmode=no-verify";
    }

    connectionConfig.connection = {
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  } else {
    connectionConfig.connection = {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi"),
      ssl: env.bool("DATABASE_SSL", false),
      schema: env("DATABASE_SCHEMA", "public"),
    };
  }

  if (client !== "postgres") {
    throw new Error(`Unsupported DATABASE_CLIENT: ${client}. Use "postgres".`);
  }

  return {
    connection: connectionConfig,
  } as Core.Config.Database;
};

export default config;
