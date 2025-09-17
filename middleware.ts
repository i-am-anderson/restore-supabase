/* Criamos um Middleware aqui, pois ele executa antes mesmo de qualquer rota ser renderizada.
Como componentes do lado do SERVIDOR, apenas conseguem ler Cookies e não conseguem escrever Cookies
usamos o Middleware aqui para permitir essa funcionalidade nos componentes SERVIDORES!
Será usado para fazer a atualização do TOKEN de acesso do usuário e atualizar a sessão */

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
  } catch (error) {
    console.error("middleware: ", error);
  }

  return res;
}
