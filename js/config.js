// Compila questi valori dopo aver creato il progetto Supabase
// (Project Settings > API) e sei pronto a fare il deploy su GitHub Pages.
// La ANON KEY non è un segreto: è pensata per essere pubblica ed è protetta
// dalle policy RLS definite in supabase/schema.sql (solo utenti autenticati).

export const SUPABASE_URL = "https://noqchjbvfokwwantdbww.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcWNoamJ2Zm9rd3dhbnRkYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTcxODUsImV4cCI6MjA5ODY3MzE4NX0.xMCqFlmmLPx7fxOTIty1mKZgpXlGLRcYPMHwOIRuLvE";

// Email del responsabile del magazzino centrale: destinatario predefinito
// del bottone "Invia ordine" (mailto).
export const RESPONSABILE_EMAIL_DEFAULT = "gnocchinic@gmail.com";
