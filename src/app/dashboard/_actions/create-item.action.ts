"use server"

import { auth } from "@/auth"
import { createItem } from "@/data-access/items/create-item.persistence"
import { z } from "zod"

const itemSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Item name is required",
    })
    .max(50, {
      message: "Item name is too long",
    }),
  quantity: z.number(),
})

type Fields = {
  name: string
  quantity: number
}

type DefaultState = {
  status: "default"
}

type SuccessState = {
  status: "success"
}

type FieldsErrorState = {
  status: "field errors"
  errors: Record<keyof Fields, string>
}

type ErrorState = {
  status: "error"
  error: string
}

export type CreateItemState =
  | DefaultState
  | SuccessState
  | FieldsErrorState
  | ErrorState

export async function createItemAction(
  prevState: CreateItemState,
  formData: FormData
): Promise<CreateItemState> {
  const rawInput = {
    name: formData.get("name") as string,
    quantity: formData.get("quantity") as string,
  }

  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("You need to be authenticated to create an item")
    }

    const input = itemSchema.parse({
      name: rawInput.name,
      quantity: parseInt(rawInput.quantity),
    })

    await createItem({
      userId: session.user.id,
      ...input,
    })

    return {
      status: "success",
    }
  } catch (err) {
    const error = err as Error

    if (err instanceof z.ZodError) {
      const errorMap = err.flatten().fieldErrors

      return {
        status: "field errors",
        errors: {
          name: errorMap["name"]?.[0] ?? "",
          quantity: errorMap["quantity"]?.[0] ?? "",
        },
      }
    } else {
      return {
        status: "error",
        error: error.message,
      }
    }
  }
}
