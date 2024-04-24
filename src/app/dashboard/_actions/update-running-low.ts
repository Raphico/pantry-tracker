"use server"

import { auth } from "@/auth"
import { getItem } from "@/data-access/items/get-item.persistence"
import { updateItem } from "@/data-access/items/update-item.persistence"
import { revalidatePath } from "next/cache"

type UpdateRunningLowState = {
  message: string
}

export async function updateRunningLowAction(
  prevState: UpdateRunningLowState,
  formData: FormData
): Promise<UpdateRunningLowState> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("You are not authenticated to perform this action")
    }

    const itemId = parseInt(formData.get("itemId") as string)

    const item = await getItem(itemId)

    await updateItem({
      ...item,
      runningLow: !item.runningLow,
    })

    revalidatePath("/dashboard")

    return {
      message: "Item updated",
    }
  } catch (err) {
    return {
      message: "Unable to update item",
    }
  }
}
