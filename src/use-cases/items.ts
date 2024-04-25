import "server-only"

import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "@/data-access/items"
import { auth } from "@/auth"

export async function getItemsUseCase() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthenticated")
  }

  const userId = session.user.id

  return getItems(userId)
}

export async function getItemUseCase(itemId: number) {
  return await checkIfUserHasAccessToItem(itemId)
}

export async function createItemUseCase({
  name,
  quantity,
}: {
  name: string
  quantity: number
}) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthenticated")
  }

  const userId = session?.user?.id

  await createItem({
    userId,
    name,
    quantity,
    runningLow: false,
  })
}

export async function deleteItemUseCase(itemId: number) {
  const item = await checkIfUserHasAccessToItem(itemId)

  await deleteItem(item.id)
}

export async function updateItemRunningLowUseCase(itemId: number) {
  const item = await checkIfUserHasAccessToItem(itemId)

  await updateItem(item.id, {
    runningLow: !item.runningLow,
  })
}

export async function checkIfUserHasAccessToItem(itemId: number) {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Unauthenticated")
  }

  const item = await getItem(itemId)

  if (!item) {
    throw new Error("Item not found")
  }

  if (item.userId != session.user.id) {
    throw new Error("Unauthorized")
  }

  return item
}
