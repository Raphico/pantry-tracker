"use client"

import * as React from "react"
import { useFormState } from "react-dom"

import { ItemDTO } from "@/data-access/items/types"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EllipsisIcon, MinusIcon, PlusIcon } from "lucide-react"
import { deleteItemAction } from "./_actions/delete-item.action"
import { toast } from "sonner"
import { updateRunningLowAction } from "./_actions/update-running-low"

interface ItemTableProps {
  items: ItemDTO[]
}

export function ItemsTable({ items }: ItemTableProps) {
  const [deleteItemState, deleteItemFormAction] = useFormState(
    deleteItemAction,
    {
      message: "",
    }
  )

  const [updateRunningLowState, updateRunningLowFormAction] = useFormState(
    updateRunningLowAction,
    {
      message: "",
    }
  )

  React.useEffect(() => {
    if (deleteItemState.message) toast.message(deleteItemState.message)
  }, [deleteItemState])

  React.useEffect(() => {
    if (updateRunningLowState.message)
      toast.message(updateRunningLowState.message)
  }, [updateRunningLowState])

  const columns: ColumnDef<ItemDTO>[] = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <button
                className="disabled:text-gray-600"
                disabled={row.original.quantity === 0}
              >
                <MinusIcon className="size-4" />
              </button>
              {row.original.quantity}
              <button>
                <PlusIcon className="size-4" />
              </button>
            </div>
          )
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const item = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <EllipsisIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={updateRunningLowFormAction}>
                    <input value={item.id} type="hidden" name="itemId" />
                    <button className="flex w-full items-start">
                      {item.runningLow ? "Unmark as Low" : "Mark as low"}
                    </button>
                  </form>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <form action={deleteItemFormAction}>
                    <input value={item.id} type="hidden" name="itemId" />
                    <button className="flex w-full items-start text-destructive/90">
                      Delete
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [deleteItemFormAction, updateRunningLowFormAction]
  )

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Inventory is empty
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
