# 🛒 E-commerce Web

![Next.js](https://img.shields.io/badge/Next.js-16.4.2-007ACC?style=flat&labelColor=000000&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.3.0-007ACC?style=flat&labelColor=000000&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-007ACC?style=flat&labelColor=000000&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-007ACC?style=flat&labelColor=000000&logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-007ACC?style=flat&labelColor=000000&logo=eslint&logoColor=white)

Platforma e-commerce łącząca panel klienta z narzędziami do zarządzania sklepem. Umożliwia zarządzanie ofertą, składanie i realizację zamówień oraz integrację z systemami płatności i usługami dostaw.

Repozytorium zawiera frontend projektu. Backend: [E-commerce API](https://github.com/PiotrO9/ecommerce-api).

## 🛠️ Konfiguracja

### Uruchomienie aplikacji

```bash
# 1. Zainstaluj zależności
npm ci

# 2. Uruchom serwer deweloperski
npm run dev
```

### Uruchomienie w Dockerze

Wymagane są Docker i Docker Compose. Z katalogu repozytorium uruchom:

```bash
docker compose up --build -d
```

Frontend będzie dostępny pod adresem [http://localhost:3030](http://localhost:3030).
Kontener uruchamia produkcyjny build Next.js na porcie 3000, mapowanym przez Compose na port 3030 komputera.
Jeśli port 3030 jest zajęty, ustaw zmienną `FRONTEND_PORT` na inny wolny port przed uruchomieniem Compose.

```bash
docker compose logs -f frontend # podgląd logów
docker compose down             # zatrzymanie kontenera
```

Sam obraz można też zbudować i uruchomić bez Compose:

```bash
docker build -t ecommerce-web .
docker run --rm -p 3030:3000 ecommerce-web
```

Obecny frontend nie korzysta jeszcze z API backendu. Przy dodawaniu integracji trzeba skonfigurować adres API dla środowiska kontenerowego; adres `localhost` wewnątrz kontenera wskazuje sam kontener. Zmienne `NEXT_PUBLIC_*` są zapisywane w kodzie przeglądarki podczas budowania obrazu, więc ich zmiana wymaga ponownego buildu.

### Skrypty

| Polecenie | Opis |
|---|---|
| `npm run dev` | Uruchamia serwer developerski |
| `npm run build` | Tworzy build produkcyjny |
| `npm start` | Uruchamia serwer produkcyjny po wykonaniu buildu |
| `npm run lint` | Sprawdza kod za pomocą ESLint; błędy i ostrzeżenia powodują niepowodzenie |
| `npm run lint:fix` | Automatycznie poprawia problemy obsługiwane przez reguły ESLint |

## Komponenty UI

W nowych ekranach korzystaj ze wspólnych komponentów z `src/components/ui/`. Dla pól tekstowych
(`text`, `email`, `search`, `password`) używaj `Input`, a dla wyboru jednej opcji (dostawa,
płatność, rozmiar, kolor) używaj `RadioGroup`. Nie kopiuj ich wyglądu i zachowania do komponentów
konkretnego ekranu.

API, przykłady użycia i zasady walidacji opisuje [dokumentacja pól formularzy](docs/ui/forms.md).
Wybór rozmiaru, koloru, dostawy i płatności opisuje też [dokumentacja RadioGroup](docs/ui/radio-group.md).
Warianty oraz stany można obejrzeć po uruchomieniu aplikacji na [`/design-system`](http://localhost:3000/design-system).
Gdy ekran wymaga kontrolki, której wspólne komponenty nie obsługują, dodaj ją do warstwy UI
i uzupełnij dokumentację oraz przykłady w design systemie.

## 📜 Licencja

Copyright (c) 2026 [Patryk Piotrowski](https://github.com/piotrowski-patryk) & [Piotr Ostrowski](https://github.com/PiotrO9). All rights reserved.
