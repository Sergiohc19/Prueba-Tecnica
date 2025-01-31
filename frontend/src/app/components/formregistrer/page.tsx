"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./formregistrer.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
 
      // Registro del usuario
      const response = await fetch(process.env.NEXT_PUBLIC_SIGNUP!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ email, name, password }),
      });
      console.log("API URL:", process.env.NEXT_PUBLIC_SIGNUP);


      if (response.ok) {
          // Guardar la cookie en el navegador y redirigir a /user
      window.location.href = "/";
    } else {
      alert("No se ha registrado correctamente");
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
              // type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button
              type="button"
              // onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleButton}
            >
              {/* {showPassword ? "Ocultar" : "Mostrar"} */}
            </button>
          </div>
        </div>

        {/* {error && <p className={styles.error}>{error}</p>} */}

        <button type="submit" className={styles.submitButton}>
          Registrarse 
        </button>
      </form>
      <div className={styles.link}>
        <p>¿Ya tienes usuario?</p>
        <Link href="../">
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
            Iniciar sesión
          </button>
        </Link>
      </div>
    </>
  );
}
