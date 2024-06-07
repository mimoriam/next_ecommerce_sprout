import { db } from "@/server";
import { DataTable } from "@/app/dashboard/products/DataTable";
import { columns } from "@/app/dashboard/products/Columns";

export default async function Products() {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  if (!products) throw new Error("No products found");

  const dataTable = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      variants: [],
      image: "",
    };
  });
  if (!dataTable) throw new Error("No data found");

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}
