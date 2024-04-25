import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AddItemDialog } from "./add-item-dialog"
import { ItemsTable } from "./items-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getItemsUseCase } from "@/use-cases/items"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  const items = await getItemsUseCase()

  const lowItems = items.filter((item) => item.runningLow)
  const outOfStocksItems = items.filter((item) => !item.quantity)

  return (
    <main className="container max-w-6xl py-12 md:py-16">
      <Tabs defaultValue="items">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="low">Running low</TabsTrigger>
            <TabsTrigger value="exhausted">Out of stock</TabsTrigger>
          </TabsList>

          <AddItemDialog />
        </div>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Pantry Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <ItemsTable items={items} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low">
          <Card>
            <CardHeader>
              <CardTitle>Running Low</CardTitle>
            </CardHeader>
            <CardContent>
              <ItemsTable items={lowItems} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exhausted">
          <Card>
            <CardHeader>
              <CardTitle>Out of Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <ItemsTable items={outOfStocksItems} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
