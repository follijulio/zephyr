"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/lib/types/user";

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get("/api/user/me");
        setUser(data.user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setError("Não foi possível carregar o usuário.");
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Page;
