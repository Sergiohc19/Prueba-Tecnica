// pages/home.tsx
"use client";
import Link from "next/link";
import LoginForm from "./loginform/page";
import apiTMDB from "@/apiTMDB";
import MediaTopTen from "./user/toptenmovies"  // Ruta relativa desde page.tsx a Carousel.tsx
import "./home.css"; // Asegúrate de tener este archivo CSS para los estilos

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      
      
          {/* Aquí se debe mostrar el formulario de inicio de sesión por defecto. */}
      
        <LoginForm />
      
      <p>
        <strong>
          A su vez, tienes que poder acceder al formulario de registro.
        </strong>
      </p>
      
      {/* Botón dentro del enlace Link para redirigir al registro */}
      <p>
        <Link href="/formregistrer">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Registrarse aquí
          </button>
        </Link>
      </p>

      <p>
        <strong>
          Si el login es exitoso, la web te redirige a /user.
        </strong>
      </p>

      {/* Aquí podrías incluir el formulario de Login si lo deseas */}
      {/* <LoginForm /> */}
      <MediaTopTen infoTitle="Peliculas mejor valoradas" apiTMDBkey={apiTMDB.topTenMovie}/>
      <MediaTopTen infoTitle="Peliculas mejor valoradas" apiTMDBkey={apiTMDB.topTenSerie}/>
      <MediaTopTen infoTitle="Peliculas mejor valoradas" apiTMDBkey={apiTMDB.seriesAiringToday}/>

    </>
  );
}
