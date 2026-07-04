# Carico & Scarico

App web statica (HTML + CSS + JavaScript puro, nessun framework) per la
gestione di carico/scarico del magazzino di un locale, con invio manuale
dell'ordine al responsabile del magazzino centrale tramite `mailto:` +
PDF da allegare.

## Stack

- **HTML/CSS/JS vanilla** — nessuna build, nessun Next.js, nessun bundler
- **Supabase** — database Postgres + autenticazione (utente/password), chiamato direttamente dal browser
- **jsPDF** (via CDN) — genera il PDF dell'ordine e della bolla nel browser
- **GitHub Pages** — hosting statico gratuito, direttamente dal repository
- **`mailto:`** — apre il tuo client di posta con destinatario/oggetto/corpo già compilati

## Limite importante di `mailto:`

I link `mailto:` **non possono allegare file automaticamente**: è una
limitazione di sicurezza dei browser, non è aggirabile. Il flusso quindi è:

1. Premi "Invia ordine" (o "Scarica bolla" in Inviati) → il PDF si scarica sul dispositivo.
2. Si apre in automatico la tua mail con destinatario, oggetto e riepilogo testuale già compilati.
3. Allega tu il PDF appena scaricato (di solito è nella cartella Download) e premi invia.

Non c'è invio automatico in background: hai scelto di tenere sempre il
controllo manuale sull'invio, quindi non è previsto nessun cron/automazione
per la domenica sera.

## 1. Supabase

1. Crea un progetto su [supabase.com](https://supabase.com).
2. **SQL Editor** → incolla ed esegui tutto il contenuto di `supabase/schema.sql`.
3. **Authentication > Users** → crea due utenti (email + password):
   - il tuo account (gestore del locale)
   - l'account del responsabile del magazzino centrale
4. **Project Settings > API** → copia `Project URL` e `anon public key`.

## 2. Configurazione

Apri `js/config.js` e compila:

```js
export const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
export const SUPABASE_ANON_KEY = "eyJ...";
export const RESPONSABILE_EMAIL_DEFAULT = "responsabile@magazzinocentrale.it";
```

La `ANON_KEY` non è un segreto (è pensata per essere pubblica): la
protezione dei dati è affidata alle policy RLS già incluse nello schema
SQL, che permettono l'accesso solo agli utenti autenticati.

## 3. Provalo in locale

Basta un server statico qualsiasi, ad esempio:

```bash
npx serve .
# oppure, con Python:
python3 -m http.server 8000
```

Apri l'indirizzo mostrato — verrai reindirizzato al login se non hai una
sessione attiva.

## 4. Pubblica su GitHub Pages

1. Crea un repository su GitHub e carica tutti i file di questa cartella (compreso `js/config.js` già compilato).
2. Nel repository: **Settings > Pages** → Source: `Deploy from a branch` → Branch: `main`, cartella `/ (root)`.
3. Dopo qualche minuto il sito sarà online su `https://tuo-utente.github.io/nome-repo/`.
4. Apri il link, che ti porterà su `login.html`: accedi con le credenziali create in Supabase.

Ogni volta che modifichi i file e fai push su `main`, GitHub Pages
aggiorna automaticamente il sito.

> Nota: se il repository è pubblico, chiunque può vedere il codice
> (compresa la ANON KEY, che va bene) ma **non può leggere o scrivere
> dati** senza fare login con uno dei due account autorizzati, grazie
> alle policy RLS.

## 5. Come funziona il flusso

1. **Catalogo** — registri i prodotti (nome, tipologia, formato, giacenza minima). Qui non si tocca mai la quantità.
2. **Magazzino** — vedi la giacenza reale attuale, raggruppata per categoria (Vodka, Rum, Gin, Tequila, Champagne, Bibite, Birre, Altro).
3. **Ordini** —
   - **Step 1 (Compila)**: crei un ordine, il sistema genera automaticamente una riga per ogni prodotto con la giacenza reale attuale. Inserisci lo "Scarico" e il sistema calcola in automatico "Ordine" = Giacenza reale − Scarico.
   - **Step 2 (Invia)**: vedi il riepilogo e premi "Invia ordine": scarica il PDF e apre la mail pronta per l'invio (allega tu il PDF).
4. **Inviati** — il responsabile del magazzino centrale (col suo login) inserisce il "Carico" realmente spedito per ogni prodotto e preme "Conferma carico": la giacenza del locale si aggiorna sommando il carico, e scarica in automatico la **bolla PDF** riepilogativa (riscaricabile in ogni momento col bottone dedicato).

## Nota sulla formula "Ordine"

Attualmente `Ordine = Giacenza reale − Scarico`. Se invece preferisci che
"Ordine" corrisponda esattamente allo scarico registrato (schema "vuoto
per pieno"), è una modifica di poche righe in `js/ordini... (funzione
updateScarico dentro ordini.html)`. Fammi sapere se vuoi che la imposti così.
