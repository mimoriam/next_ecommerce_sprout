import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default function Login() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        {" "}
        <Button variant="outline" type="submit">
          Signin with GitHub
        </Button>
      </form>
    </>
  );
}
