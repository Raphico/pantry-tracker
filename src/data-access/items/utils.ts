import { Item } from "@/db/schema"
import { ItemDTO } from "./types"

export function toDTOMapper(item: Item): ItemDTO {
  return {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    runningLow: item.runningLow,
  }
}
