import "server-only"

import { db } from "@/db"
import { createItemDTO } from "./types"
import { items } from "@/db/schema"

export async function createItem(item: createItemDTO): Promise<void> {
  await db.insert(items).values(item)
}
