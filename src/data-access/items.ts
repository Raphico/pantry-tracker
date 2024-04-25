import "server-only"

import { db } from "@/db"
import { type Item, items } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function createItem(item: Omit<Item, "id">): Promise<void> {
  await db.insert(items).values(item)
}

export async function deleteItem(itemId: number) {
  await db.delete(items).where(eq(items.id, itemId))
}

export async function getItem(itemId: number) {
  return await db.query.items.findFirst({
    where: eq(items.id, itemId),
  })
}

export async function getItems(userId: string) {
  return await db.query.items.findMany({
    where: eq(items.userId, userId),
  })
}

export async function updateItem(itemId: number, item: Partial<Item>) {
  await db.update(items).set(item).where(eq(items.id, itemId))
}
