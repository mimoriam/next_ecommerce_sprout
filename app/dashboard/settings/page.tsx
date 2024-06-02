import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsCard from "@/components/dashboard/SettingsCard";

export default async function Settings() {
  const session = await auth();

  if (!session) redirect("/");
  if (session) return <SettingsCard session={session} />;
}
