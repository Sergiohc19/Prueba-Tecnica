import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware para verificar si la cookie de autenticación existe
export function middleware(req: NextRequest) {
    const cookie = req.cookies.get("auth");

    // Si no existe la cookie de autenticación, redirigir al login
    if (!cookie) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Aquí podrías agregar lógica para verificar la validez de la cookie
        // Si es un JWT, por ejemplo, puedes verificar la firma y la expiración
        // O simplemente, si solo verificas que exista la cookie:
        const parsedCookie = JSON.parse(cookie.value);
        
        if (!parsedCookie || !parsedCookie.email) {
            // Si la cookie no es válida, redirigir al login
            return NextResponse.redirect(new URL("/login", req.url));
        }

    } catch (error) {
        console.error("Error al verificar la cookie", error);
        // En caso de error, redirigir al login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // Permitir el acceso a la ruta
}

export const config = {
    matcher: ["/user"], // Solo proteger la ruta /user
};
