import { Connection, ConnectionOptions } from "@/connection/connection";

export async function getConnection(options: ConnectionOptions): Promise<Connection> {
  const { driver, module } = options;
  const { Connection } = typeof module === "object" ? module : await (import(module || `@propero/propulsion-orm-${driver as any}`) as any);
  const connection = new Connection(options);
  await connection.open();
  return connection;
}
