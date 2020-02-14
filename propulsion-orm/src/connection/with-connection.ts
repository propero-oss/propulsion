import { Connection, ConnectionOptions } from "@/connection/connection";
import { getConnection } from "@/connection/get-connection";

export async function withConnection(options: ConnectionOptions, cb: (connection: Connection) => void) {
  const connection = await getConnection(options);
  try {
    await cb(connection);
  } finally {
    await connection.close();
  }
}
