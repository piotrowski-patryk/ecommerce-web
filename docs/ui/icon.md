# Icon

Komponent `src/components/ui/icon.tsx` importuje lokalne pliki `.svg?raw`
jako tekst dzięki regule `type: "text"` w Turbopacku. Nie wymaga SVGR
ani dodatkowego loadera. `dangerouslySetInnerHTML` umieszcza pełny element
`<svg>` w HTML, wewnątrz dekoracyjnego `<span aria-hidden="true">`.

```tsx
import { Icon } from "@/components/ui/icon";

<Icon name="menu" />;
<Icon name="shopping-bag" className="size-8 text-red-600" />;
```

Domyślny rozmiar to 24 × 24 px, kolor jest dziedziczony przez `currentColor`,
wypełnienie jest wyłączone, a linie mają grubość 2 i zaokrąglone końce oraz
łączenia. Nieznana nazwa nie renderuje ikony. Przycisk zawierający samą ikonę
powinien mieć własną dostępną nazwę, np. `aria-label`.

Nową ikonę zapisz w `src/assets/icons/`, zaimportuj z dopiskiem `?raw`
i dodaj do mapy `icons` w komponencie. Plik powinien zawierać `xmlns`,
`viewBox` i geometrię SVG; styl ustala komponent. Importy bez `?raw`
zachowują standardową obsługę obrazów Next.js.

Do mapy trafiają wyłącznie lokalne pliki SVG z repozytorium. Komponent nie
przyjmuje dowolnego kodu HTML ani adresów URL do wstrzyknięcia.
