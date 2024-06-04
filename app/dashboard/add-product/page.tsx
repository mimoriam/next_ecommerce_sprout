import { auth } from "@/auth";
import CreateEditProduct from "@/components/dashboard/add-product/AddProductForm";

export default async function AddProduct() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return <CreateEditProduct />;
}
