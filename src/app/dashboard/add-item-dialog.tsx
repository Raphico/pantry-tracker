import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddItemForm } from "./add-item-form"

export function AddItemDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
          <DialogDescription>Add a new item to your pantry</DialogDescription>
        </DialogHeader>

        <AddItemForm />
      </DialogContent>
    </Dialog>
  )
}
