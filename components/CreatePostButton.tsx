"use client";
import { useFormStatus } from "react-dom";

export default function CreatePostButton() {
  const { pending } = useFormStatus();

  return (
    // Disable the button when form is processing/creating entries
    <button disabled={pending} type="submit">
      Submit
    </button>
  );
}
