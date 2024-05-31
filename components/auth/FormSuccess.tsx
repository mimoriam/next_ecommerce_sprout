import { CheckCircle2 } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="rounded-md bg-teal-400 p-3 text-secondary-foreground">
      <CheckCircle2 className="size-4" />
      <p>{message}</p>
    </div>
  );
};
