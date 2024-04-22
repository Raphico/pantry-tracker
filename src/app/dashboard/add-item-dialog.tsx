"use client"

import * as React from "react"
import { useFormState } from "react-dom"

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
import { createItemAction } from "./_actions/create-item.action"
import { toast } from "sonner"

export function AddItemDialog() {
  const [open, setOpen] = React.useState(false)

  const [formState, formAction] = useFormState(createItemAction, {
    status: "default",
  })

  const formRef = React.useRef<HTMLFormElement>(null)

  React.useEffect(() => {
    if (formState.status === "success") {
      toast.success("Item added to pantry!")
      formRef.current?.reset()
      setOpen(false)
    }

    if (formState.status === "error") {
      toast.error(formState.error)
    }
  }, [formState])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
          <DialogDescription>Add a new item to your pantry</DialogDescription>
        </DialogHeader>

        <AddItemForm
          formState={formState}
          formRef={formRef}
          formAction={formAction}
        />
      </DialogContent>
    </Dialog>
  )
}
