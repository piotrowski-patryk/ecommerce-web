"use client";

import { useState } from "react";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";
import { Button } from "@/components/ui/buttons";
import { Modal } from "@/components/ui/modal";

type Example = "info" | "confirm" | "destructive" | "long";

const examples: { id: Example; name: string; details: string; trigger: string }[] = [
  { id: "info", name: "Informacja", details: "Tytuł, opis i jedna akcja", trigger: "Otwórz informację" },
  { id: "confirm", name: "Potwierdzenie", details: "Dwie akcje i anulowanie", trigger: "Otwórz potwierdzenie" },
  { id: "destructive", name: "Akcja destrukcyjna", details: "Ostrzeżenie i przycisk destrukcyjny", trigger: "Otwórz ostrzeżenie" },
  { id: "long", name: "Długa treść", details: "Przewijanie na wąskim ekranie", trigger: "Otwórz długą treść" },
];

export function ModalShowcase() {
  const [active, setActive] = useState<Example | null>(null);
  const [message, setMessage] = useState("");

  function close() { setActive(null); }
  function finish(text: string) { setMessage(text); close(); }

  return (
    <>
      <div className="border-t border-default pt-14">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">Design system / 07</p>
        <h2 className="text-4xl font-semibold text-strong sm:text-5xl">Modal</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Jedno miejsce na ważną informację lub potwierdzenie. Otwórz przykład, przejdź po nim klawiszem Tab i zamknij klawiszem Escape.
        </p>
      </div>

      <DesignSystemSection id="modal-heading" title="Warianty i zachowanie">
        <div className="overflow-hidden rounded-2xl border border-default">
          {examples.map((example) => (
            <DesignSystemSpecimen key={example.id} name={example.name} details={example.details}>
              <Button variant={example.id === "destructive" ? "destructive" : "outline"} onClick={() => { setMessage(""); setActive(example.id); }}>
                {example.trigger}
              </Button>
            </DesignSystemSpecimen>
          ))}
        </div>
        <p className="mt-4 min-h-6 text-sm text-muted" role="status">{message}</p>
      </DesignSystemSection>

      <Modal
        open={active === "info"}
        onClose={close}
        title="Zmiana została zapisana"
        description="Twoje ustawienia konta są już aktualne."
        actions={<Button onClick={close}>Rozumiem</Button>}
      >
        <p>Możesz wrócić do zakupów lub później ponownie zmienić ustawienia w profilu.</p>
      </Modal>

      <Modal
        open={active === "confirm"}
        onClose={close}
        title="Zapisać adres dostawy?"
        description="Nowy adres będzie używany przy kolejnych zamówieniach."
        actions={<><Button variant="outline" onClick={close}>Anuluj</Button><Button onClick={() => finish("Adres dostawy został zapisany.")}>Potwierdź</Button></>}
      >
        <p>Adres: ul. Słoneczna 12/4, 00-001 Warszawa.</p>
      </Modal>

      <Modal
        open={active === "destructive"}
        onClose={close}
        title="Usunąć zapisany adres?"
        description="Tej czynności nie można cofnąć."
        actions={<><Button variant="outline" onClick={close}>Anuluj</Button><Button variant="destructive" onClick={() => finish("Przykładowy adres został usunięty.")}>Usuń adres</Button></>}
      >
        <p>Sprawdź, czy nie używasz tego adresu przy trwającym zamówieniu.</p>
      </Modal>

      <Modal
        open={active === "long"}
        onClose={close}
        title="Szczegóły dostawy i zwrotów"
        description="Przykład długiej treści i przewijania w oknie."
        actions={<Button onClick={close}>Zamknij</Button>}
      >
        <div className="space-y-5">
          {Array.from({ length: 8 }, (_, index) => (
            <section key={index}>
              <h3 className="font-semibold text-strong">Etap {index + 1}</h3>
              <p className="mt-1 text-sm text-muted">Po złożeniu zamówienia otrzymasz wiadomość z potwierdzeniem i dalszymi informacjami o przesyłce. Numer śledzenia znajdziesz również w szczegółach zamówienia.</p>
            </section>
          ))}
        </div>
      </Modal>
    </>
  );
}
