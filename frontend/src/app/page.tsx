// pages/home.tsx
"use client";

import LoginForm from "./components/loginform/page";
import "./home.css"; // Asegúrate de tener este archivo CSS para los estilos


export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Home</h1>
        <LoginForm />
     

      </div>
    </>
  );
}
