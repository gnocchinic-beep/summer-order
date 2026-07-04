import { supabase } from "./supabaseClient.js";

// Da chiamare all'inizio di ogni pagina protetta.
// Se non c'è una sessione attiva, reindirizza al login.
export async function requireAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  return session;
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}
