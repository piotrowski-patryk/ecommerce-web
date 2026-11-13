# Icon

Komponent `src/components/ui/icon.tsx` importuje lokalne pliki `.svg?raw`
jako tekst dzięki regule `type: "text"` w Turbopacku. Nie wymaga SVGR
ani dodatkowego loadera. `dangerouslySetInnerHTML` umieszcza pełny element
`<svg>` w HTML, wewnątrz dekoracyjnego `<span aria-hidden="true">`.
Natywne atrybuty `<span>` przekazujemy przez `...rest`.
Style znajdują się w obiekcie `styles`, podobnie jak w Buttonie.
Klasy łączymy przez `[styles.base, styles.size[size], className].join(" ")`,
bez dodatkowej biblioteki. Rodzic, np. Button, przekazuje rozmiar przez `size`,
a pozostałe style przez `className`.

```tsx
import Icon from "@/components/ui/icon";

<Icon name="menu" />;
<Icon name="shopping-bag" size="md" className="text-red-600" />;
```

Domyślny rozmiar to 24 × 24 px, kolor jest dziedziczony przez `currentColor`,
wypełnienie jest wyłączone, a linie mają grubość 2.

| `size` | Rozmiar |
| --- | --- |
| `xs`, `sm` | 16 px |
| `md`, `lg` | 20 px |
| `xl` — domyślny | 24 px |

Rozmiar wybieramy propem `size`. `className` dodaje klasy, ale nie usuwa
konfliktów z klasami komponentu. Podane wartości w pikselach zakładają bazę 16 px.
Prop `name` jest opcjonalny:
gdy go brakuje lub jest pustym tekstem, `if (!name) return null` powoduje,
że komponent niczego nie renderuje. Dzięki temu można przekazać opcjonalną
nazwę, np. `<Icon name={icon} />`, bez warunku przy każdym użyciu.
Nazwa nieobecna w mapie `icons` powoduje, że komponent niczego nie renderuje.
Przycisk zawierający samą ikonę powinien mieć własną dostępną nazwę,
np. `aria-label`.

Nową ikonę zapisz w `src/assets/icons/`, zaimportuj z dopiskiem `?raw`
i dodaj do mapy `icons` w komponencie. Plik powinien zawierać `xmlns`,
`viewBox` i geometrię SVG; styl ustala komponent. Importy bez `?raw`
zachowują standardową obsługę obrazów Next.js.

Do mapy trafiają wyłącznie lokalne pliki SVG z repozytorium. Komponent nie
przyjmuje dowolnego kodu HTML ani adresów URL do wstrzyknięcia.

Ikona `loader-circle` służy domyślnie jako spinner Buttona. Licencja:
[Lucide](../licenses/lucide.md).
