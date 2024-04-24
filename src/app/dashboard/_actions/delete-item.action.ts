"use server"

import { auth } from "@/auth"
import { deleteItem } from "@/data-access/items/delete-item.persistence"
import { revalidatePath } from "next/cache"

type DeleteItemState = {
  message: string
}

export async function deleteItemAction(
  prevState: DeleteItemState,
  formData: FormData
): Promise<DeleteItemState> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("You are not authenticated to perform this action")
    }

    const itemId = parseInt(formData.get("itemId") as string)

    await deleteItem(itemId)

    revalidatePath("/dashboard")

    return {
      message: "Item Deleted",
    }
  } catch (error) {
    return {
      message: "Item failed to delete",
    }
  }
}
