"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { deleteProduct } from "@/server/actions/DeleteProductAction";

type ProductColumn = {
  title: string;
  price: number;
  image: string;
  variants: any;
  id: number;
};

async function deleteProductWrapper(id: number) {
  const { data } = await deleteProduct({ id });
  if (!data) {
    return new Error("No data found");
  }
  if (data.success) {
    toast.success(data.success);
  }
  if (data.error) {
    toast.error(data.error);
  }
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variants",
    header: "Variants",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(price);
      return <div className="text-xs font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      const cellTitle = row.getValue("title") as string;
      return (
        <div className="">
          <Image
            src={cellImage}
            alt={cellTitle}
            width={50}
            height={50}
            className="rounded-md"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer focus:bg-primary/50 dark:focus:bg-primary">
              <Link href={`/dashboard/add-product?id=${product.id}`}>
                Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteProductWrapper(product.id)}
              className="cursor-pointer focus:bg-destructive/50 dark:focus:bg-destructive"
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
