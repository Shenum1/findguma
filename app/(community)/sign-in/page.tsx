import { AuthForm } from "@/components/community/AuthForm";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <AuthForm mode="sign-in" />
    </div>
  );
}
