"use client";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Wystąpił błąd</h1>
      <p>Nie udało się wyświetlić strony. Spróbuj ponownie.</p>
      <button
        className="cursor-pointer rounded border px-4 py-2"
        onClick={() => retry()}
        type="button"
      >
        Spróbuj ponownie
      </button>
    </main>
  );
}
