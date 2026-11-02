import Button from "@/components/ui/button";

export default function AuthHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center px-4">
      <Button
        to="/"
        icon="arrow-left"
        variant="ghost"
        aria-label="Wróć do sklepu"
        className="size-11 justify-center rounded-full"
      />
    </header>
  );
}