"use server"

import { deleteItemUseCase } from "@/use-cases/items"
import { revalidatePath } from "next/cache"

type DeleteItemState = {
  message: string
}

export async function deleteItemAction(
  prevState: DeleteItemState,
  formData: FormData
): Promise<DeleteItemState> {
  try {
    const itemId = parseInt(formData.get("itemId") as string)

    await deleteItemUseCase(itemId)

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
