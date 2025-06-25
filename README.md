# cz-zip-utils

Utility library for validating Czech postal codes (ZIP / PSČ) and looking up cities by ZIP.

[![CI](https://github.com/jibobek/cz-zip-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/jibobek/cz-zip-utils/actions)

---

## 📦 Installation

```bash
npm install cz-zip-utils
````

or

```bash
yarn add cz-zip-utils
```

---

## ✨ Usage

```ts
import { validateZip, getCityByZip, getZipByCity } from 'cz-zip-utils';

validateZip('11000'); // true
validateZip(' 12000 '); // false

getCityByZip('11000'); // "Praha 1"
getCityByZip('99999'); // null

getZipByCity('Brno'); // ["60200", ...]
getZipByCity('Brno', { limit: 1 }); // ["60200"]
```

---

## 📚 API

### `validateZip(zip: string): boolean`

Returns `true` if the given ZIP code is valid (5 digits, no spaces).

---

### `getCityByZip(zip: string): string | null`

Returns the city name for the given ZIP code, or `null` if not found.

---

### `getZipByCity(city: string, options?: { limit?: number }): string[]`

Returns an array of ZIP codes matching the given city name (case-insensitive, partial matches allowed).
You can optionally limit the number of results via the `limit` option.

---

## 🔄 Updating Data

The dataset is automatically downloaded from [ČÚZK](https://services.cuzk.cz/sestavy/cis/UI_ADRESNI_POSTA.zip).

To update the data, run:

```bash
npm run download
```

This will regenerate the `data/index.ts` file.

---

## 🛠️ Scripts

| Script             | Description                           |
| ------------------ | ------------------------------------- |
| `npm run build`    | Compile TypeScript to `dist/`         |
| `npm run test`     | Run tests using Vitest                |
| `npm run format`   | Format code with Prettier             |
| `npm run download` | Download and generate latest data     |

---

## 🧪 Continuous Integration

This project uses GitHub Actions workflow `.github/workflows/ci.yml` to run lint and tests on pull requests and pushes to `main`.

---

## 📄 License

[MIT](./LICENSE)
Author: Jindrich Bobek
