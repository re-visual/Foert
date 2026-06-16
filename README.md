# Foert — website

Een eenvoudige one-page website voor **Foert**, opruimdienst in regio Gent.

> "Foert — weg met je brol"

## Wat staat er in deze map?

| Bestand        | Wat het is                                                            |
| -------------- | -------------------------------------------------------------------- |
| `index.html`   | De **inhoud** van de site: alle teksten en secties.                  |
| `styles.css`   | De **opmaak**: kleuren, lettertypes en de mobiele weergave.          |
| `script.js`    | Een beetje **interactie**: het menu op gsm en het contactformulier.  |
| `live-refresh.js` | **Hulpje tijdens het bouwen**: ververst de live site vanzelf. Mag weg voor de definitieve versie. |
| `README.md`    | Dit bestand — de uitleg.                                             |

## De site bekijken

Dubbelklik op `index.html`. De website opent dan in je browser (Chrome, Edge, Safari…).
Je hebt hiervoor geen internet of installatie nodig.

> Tip: wil je zien hoe het er op een gsm uitziet? Maak het browservenster gewoon smaller.

## Tekst aanpassen

Alle teksten staan in `index.html`. Open het bestand met een teksteditor
(bv. Kladblok, of gratis **Visual Studio Code**), zoek de tekst die je wil wijzigen,
typ je nieuwe tekst, en sla op. Ververs daarna de pagina in je browser.

Veelgevraagde wijzigingen:

- **Telefoonnummer**: zoek op `0470 00 00 00` (komt enkele keren voor) en op `+32470000000`.
  Vervang beide door je echte nummer. Het stuk na `tel:` mag geen spaties bevatten.
- **E-mailadres**: zoek op `hallo@foert.be` en vervang door je echte e-mail.
- **Kleuren**: bovenaan `styles.css` staat een blok `:root` met de kleuren.
  Bv. `--brand: #ff5a1f;` is het oranje accent. Pas de kleurcode aan om de look te wijzigen.

## Foto's toevoegen (voor/na)

1. Zet je foto's in deze map (bv. `voor1.jpg` en `na1.jpg`).
2. In `index.html`, zoek het stuk `<!-- VOOR / NA FOTO'S -->`.
3. Vervang een placeholder-vakje zoals dit:

   ```html
   <div class="ba-img placeholder">
     <span class="ba-tag">Voor</span>
     Foto hier
   </div>
   ```

   door:

   ```html
   <div class="ba-img">
     <span class="ba-tag">Voor</span>
     <img src="voor1.jpg" alt="Zolder voor het opruimen" />
   </div>
   ```

## Het contactformulier laten werken

Nu toont het formulier enkel een bedankberichtje (er wordt nog niets verstuurd).
Om aanvragen écht in je mailbox te krijgen, koppel je het aan een gratis dienst,
bijvoorbeeld **Formspree** (https://formspree.io):

1. Maak een gratis account aan en kopieer je formulier-adres
   (iets als `https://formspree.io/f/abcdwxyz`).
2. In `index.html`, zoek `id="contactForm"` en vervang `action="#"` door jouw adres:

   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/abcdwxyz" method="post">
   ```

Vanaf dan komen ingevulde formulieren rechtstreeks in je e-mail terecht.

## De site online zetten

Je kan de site gratis online plaatsen, bijvoorbeeld met:

- **Netlify Drop** (https://app.netlify.com/drop) — sleep deze map erop, klaar.
- **GitHub Pages** — als deze code op GitHub staat.

Vraag gerust om hulp bij deze stap.

## De site live laten meebewegen terwijl je prompt

De site staat op GitHub. Zet **GitHub Pages** aan zodat elke wijziging vanzelf live gaat:

1. Ga naar **github.com/re-visual/Foert → Settings → Pages**.
2. Bij **Source**: kies **"Deploy from a branch"**.
3. Kies branch **`claude/zen-wozniak-r97nz9`**, map **`/ (root)`**, en **Save**.
4. Na ~1 minuut staat je site live op: **https://re-visual.github.io/Foert/**

Vanaf dan: jij prompt → de wijziging wordt gepusht → na ~30–60s werkt de live site
zichzelf bij. Dankzij `live-refresh.js` herlaadt de pagina automatisch zodra er iets
verandert (je hoeft dus niet zelf te verversen).

> **Let op:** gratis GitHub Pages werkt enkel als de repo **openbaar (public)** is.
> **Klaar met bouwen?** Verwijder dan in `index.html` de regel
> `<script src="live-refresh.js"></script>` zodat de publieke site niet blijft herladen.
