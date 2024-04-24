import "server-only"

import { db } from "@/db"
import { ItemDTO } from "./types"
import { items } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function updateItem(item: ItemDTO) {
  await db.update(items).set(item).where(eq(items.id, item.id))
}
