"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function CreatePostButton() {
  const { pending } = useFormStatus();

  return (
    // Disable the button when form is processing/creating entries
    <Button disabled={pending} variant="outline" type="submit">
      Submit
    </Button>
  );
}
