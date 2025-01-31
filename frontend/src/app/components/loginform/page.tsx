
"use client";
import styles from "./loginform.module.css";
import { useState } from "react";
import Link from "next/link";


  export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
      const response = await fetch(process.env.NEXT_PUBLIC_SIGNIN!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if(response.ok) {
        // Guardar la cookie en el navegador y redirigir a /user
        window.location.href = "/user";
      } else {
        alert("Credenciales incorrectas");
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
        Iniciar sesión
      </button>
    </form>
    <div className={styles.registrarse}>

    <p className={styles.parrafo}>¿No tienes usuario?</p>
    <Link href="/components/formregistrer">
      <button
       className={styles.button}
      >
        Registrarse aquí
      </button>
    </Link>
    </div>
    </div>
    </>
  );
}

