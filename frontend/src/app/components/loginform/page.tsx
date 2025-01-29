"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Usamos useRouter para redirigir
import styles from "./loginform.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Usamos el hook router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SIGNIN as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Aseguramos que las cookies se incluyan en la solicitud
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      // Si el login es exitoso, redirigimos al dashboard
      router.push("/user"); // O la ruta que desees para el usuario autenticado

    } catch (error: any) {
      // Captura cualquier error
      setError(error.message || "Error en el login");
    }
  };

  return (
    <>
    <div className={styles.containerlogin}>
    <form onSubmit={handleLogin} className={styles.form}>
      <div>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleButton}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton}>
        Iniciar sesión
      </button>
    </form>
    <div className={styles.registrarse}>

    <p className={styles.parrafo}>¿No tienes usuario?</p>
    <Link href="/components/formregistrer">
      <button
        style={{
          padding: "10px",
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
    </div>
    </div>
    </>
  );
}
