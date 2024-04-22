import { useFormStatus } from "react-dom"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { CreateItemState } from "./_actions/create-item.action"

interface AddItemFormProps {
  formState: CreateItemState
  formAction: (payload: FormData) => void
  formRef: React.RefObject<HTMLFormElement>
}

export function AddItemForm({
  formState,
  formAction,
  formRef,
}: AddItemFormProps) {
  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" />
        {formState.status === "field errors" && (
          <Error message={formState.errors.name} />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" name="quantity" type="number" defaultValue={1} />
        {formState.status === "field errors" && (
          <Error message={formState.errors.quantity} />
        )}
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
      Add Item
    </Button>
  )
}

function Error({ message }: { message: string }) {
  return (
    <p
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="additions"
      className="text-sm font-medium text-destructive"
    >
      {message}
    </p>
  )
}
