import "server-only"

import { ItemDTO } from "./types"
import { db } from "@/db"
import { toDTOMapper } from "./utils"

export async function getItems(): Promise<ItemDTO[]> {
  const items = await db.query.items.findMany()
  return items.map(toDTOMapper)
}
