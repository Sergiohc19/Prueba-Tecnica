"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./formregistrer.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });

    if (response.ok) {
      // Redirigir al login si el registro es exitoso
      router.push("/loginform");
    } else {
      // Capturar el error y mostrarlo si la respuesta no es ok
      const errorData = await response.json();
      setError(errorData.message || "Error en el registro");
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp} className={styles.form}>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Registrarse
        </button>
      </form>

      <p>
        ¿Ya tienes una cuenta?
        <Link href="/app">
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
            Pulse aquí para iniciar sesión
          </button>
        </Link>
      </p>
    </>
  );
}
