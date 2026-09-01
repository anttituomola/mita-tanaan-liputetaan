# Mitä tänään liputetaan?

**[Avaa palvelu](https://mitatanaanliputetaan.vercel.app/)**

Kun hakutulokset vastasivat kysymykseen ”mitä tänään liputetaan?” lähinnä luettelemalla koko vuoden liputuspäivät, tein pienen palvelun, joka vastaa suoraan juuri tämän päivän kysymykseen.

Palvelu näyttää:

- onko tänään virallinen tai vakiintunut liputuspäivä
- minkä asian kunniaksi liputetaan
- tulevat liputuspäivät
- lyhyen taustan päivän merkityksestä

## Tekniikka

- Next.js
- React
- TypeScript
- Day.js
- Vercel

Liputuspäivien laskenta huomioi sekä kiinteät päivämäärät että vuosittain vaihtuvat päivät.

## Kehitys

```bash
npm install
npm run dev
```

Tarkistukset:

```bash
npm run typecheck
npm run build
```
