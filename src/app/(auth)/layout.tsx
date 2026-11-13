import AuthHeader from "./_components/auth-header";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AuthHeader />

      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}