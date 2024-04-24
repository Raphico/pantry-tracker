import "server-only"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { items } from "@/db/schema"
import { toDTOMapper } from "./utils"
import { ItemDTO } from "./types"

export async function getItem(itemId: number): Promise<ItemDTO> {
  const item = await db.query.items.findFirst({
    where: eq(items.id, itemId),
  })

  if (!item) {
    throw new Error("Item not found")
  }

  return toDTOMapper(item)
}
