import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ItemRutina from "./ItemRutina";
import logoApp from "../assets/logo_trainup1.png";

function FragmentHistorial() {
  const [rutinas, setRutinas] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchRutinas = async () => {
      if (!user || !user.token) {
        console.error("User or user token is missing");
        return;
      }
      const response = await fetch("/api/rutinas/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json();
        setRutinas(data);
      }
    };

    fetchRutinas();
  }, [user]);

  return (
    <div
      className="container-fluid"
      style={{
        maxWidth: "400px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center border-bottom p-3 border-bottom">
        <h5>Historial de rutinas</h5>
        <img
          src={logoApp}
          alt="Logo"
          style={{ width: "100px", height: "50px" }}
        />
      </div>
      <div className="overflow-auto flex-grow-1 mb-20">
        {rutinas.length > 0 ? (
          rutinas.map((rutina) => (
            <ItemRutina key={rutina._id} rutina={rutina} />
          ))
        ) : (
          <p>No hay rutinas disponibles</p>
        )}
      </div>
    </div>
  );
}

export default FragmentHistorial;
