import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/types/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { emailRegister } from "@/server/actions/EmailRegisterAction";

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [error, setError] = useState("");

  const { execute, status } = useAction(emailRegister, {
    onSuccess(data) {},
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values);
  };

  return <div></div>;
};
