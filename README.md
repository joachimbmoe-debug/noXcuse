# noXcuse — nettside

[![Netlify Status](https://api.netlify.com/api/v1/badges/6dcf3b7f-57d5-4cc4-b02a-3e8bd7e32f3c/deploy-status)](https://app.netlify.com/projects/noxcuse-349/deploys)

Astro 5 + Tailwind 4-gjenoppbygging av noXcuse (No Xcuse AS) sin nettside — norsk
salgsselskap for fabrikkbygde småhus og hytter produsert av Husvik 3D SIA i Riga.

Produksjonsbygget feiler **med vilje** til alle fakta i [`MANGLER.md`](./MANGLER.md)
er bekreftet — se `src/lib/bekreft.ts`. Det er ikke en byggfeil å rette.

Full byggehistorikk og status i `.foreman/ledger.md` i kundemappa (`Kunder/noXcuse/`
ett nivå opp).

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
