## Wspólne komponenty formularzy

W ekranach aplikacji używaj `Input` z `src/components/ui/input.tsx` dla typów `text`,
`email`, `search` i `password` oraz `RadioGroup` z `src/components/ui/radio-group.tsx`
dla wyboru dostawy, płatności, rozmiaru i koloru. Nie duplikuj ich stylów ani logiki
w komponentach ekranów. Szczegóły API i walidacji: `docs/ui/forms.md`; przykłady
stanów: `/design-system`. Jeśli potrzebny jest nowy rodzaj kontrolki, rozszerz
warstwę wspólnych komponentów i uzupełnij dokumentację oraz design system.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
