// SI EL LOGIN ES EXITOSO EL BACKEND DEVUELVE UNA COOKIE CON LOS DATOS DE USUARIO Y SE PODRÁ ACCEDER A ESTA RUTA
// QUE CORRESPONDE A LOCALHOST:3000/USER
// LOS CARRUSELES TIENEN QUE SER AGREGADES CON PROGRAMACIÓN DECLARATIVA, ES DECIR PASAR DOS ARGUMENTOS:
//        1_EL NOMBRE DEL CARROUSEL DE CARA AL USUARIO. Ejem: Top Ten Netflix, Top Ten Estrenos Cine.
//        2_LA DIRECCIÓN DE LA API. ESTÁN EN  apiTMDB.ts 

"use client";
import "./user.css";
import Carrousel from "./toptenmovies";

const userName: string = "userName";
const userEmail: string = "userEmail";

export default function UserPage() {
  return (
    <>
      {/* Recuperar datos de usuario del backend*/}
      <h1>USER PAGE</h1>
      <strong>{userName}</strong>
      <strong>{userEmail}</strong>
      
      {/* Aquí mostrar los tres carruseles con las 10 primeras peliculas de la API de TMDB*/}
      

      {/* <MediaTopTen titulo="Titulo" apiKey={apiTMDB.topTenMovie}/> */}
      <Carrousel />
      
      

    </>
  );
}
