import type { Core } from '@strapi/strapi';

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env('DATABASE_CLIENT', 'postgres');
  const databaseUrl = env('DATABASE_URL');

  // When DATABASE_URL is set, use only the connection string.
  // Do NOT pass individual host/port/user/password params alongside it —
  // the pg driver merges them, and stale defaults (e.g. password: "strapi")
  // cause SASL authentication failures.
  const connectionConfig = databaseUrl
    ? {
        connectionString: databaseUrl,
        ssl: env.bool('DATABASE_SSL', true) && {
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED',
            false
          ),
        },
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
      }
    : {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED',
            false
          ),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
      };

  const connections = {
    postgres: {
      connection: connectionConfig,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 10),
        idleTimeoutMillis: env.int('DATABASE_POOL_IDLE', 10000),
        acquireTimeoutMillis: env.int('DATABASE_POOL_ACQUIRE', 30000),
        createTimeoutMillis: env.int('DATABASE_POOL_CREATE', 30000),
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
      },
    },
  };

  if (!(client in connections)) {
    throw new Error(`Unsupported DATABASE_CLIENT: ${client}. Use "postgres".`);
  }

  type DatabaseClient = keyof typeof connections;

  return {
    connection: {
      client: client as DatabaseClient,
      ...connections[client as DatabaseClient],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  } as Core.Config.Database;
};

export default config;
