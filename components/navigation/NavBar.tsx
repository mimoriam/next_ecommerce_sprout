import { auth } from "@/auth";
import Link from "next/link";
import { UserButton } from "@/components/navigation/UserButton";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between">
          <Link href={"/"}>Logo</Link>
          <li>
            {!session ? (
              <button>
                <Link aria-label="sign-in" href={"/auth/login"}>
                  login
                </Link>
              </button>
            ) : (
              <UserButton expires={session?.expires} user={session?.user} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
