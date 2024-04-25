"use server"

import { updateItemRunningLowUseCase } from "@/use-cases/items"
import { revalidatePath } from "next/cache"

type UpdateRunningLowState = {
  message: string
}

export async function updateRunningLowAction(
  prevState: UpdateRunningLowState,
  formData: FormData
): Promise<UpdateRunningLowState> {
  try {
    const itemId = parseInt(formData.get("itemId") as string)

    await updateItemRunningLowUseCase(itemId)

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
