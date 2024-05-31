import { AlertCircle } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="rounded-md bg-destructive p-3 text-secondary-foreground">
      <AlertCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};
