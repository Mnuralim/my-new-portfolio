import { getSession } from "@/actions/session";
import { ChangeEmailForm } from "./change-email-form";
import { ChangePasswordForm } from "./change-password-form";

export async function ProfileContent() {
  const session = await getSession();

  return (
    <div className="max-w-md flex flex-col gap-6">
      <ChangeEmailForm currentEmail={session?.email ?? ""} />
      <ChangePasswordForm />
    </div>
  );
}
