// pages/home.tsx
"use client";

import LoginForm from "./components/loginform/page";
import apiTMDB from "@/apiTMDB";
import MediaTopTen from "./components/carousel/page"  // Ruta relativa desde page.tsx a Carousel.tsx
import "./home.css"; // Asegúrate de tener este archivo CSS para los estilos


export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Home</h1>
        <LoginForm />
        <p>
          <strong>
            Si el login es exitoso, la web te redirige a /user.
          </strong>
        </p>

        {/* Aquí podrías incluir el formulario de Login si lo deseas */}
        {/* <LoginForm /> */}
        <MediaTopTen infoTitle="Peliculas mejor valoradas" apiTMDBkey={apiTMDB.topTenMovie} />
        <MediaTopTen infoTitle="Series mejor valoradas" apiTMDBkey={apiTMDB.topTenSerie} />
        <MediaTopTen infoTitle="Series de hoy" apiTMDBkey={apiTMDB.seriesAiringToday} />
      </div>
    </>
  );
}
