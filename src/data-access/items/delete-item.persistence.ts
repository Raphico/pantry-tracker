import "server-only"

import { db } from "@/db"
import { items } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteItem(itemId: number) {
  await db.delete(items).where(eq(items.id, itemId))
}
