"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { fetchUser } from "@/lib/fetchdata/fetchData";


const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  
  useEffect(() => {
    const data = fetchUser() as unknown as User;
    setUser(data)
  }, []);

  return (
    <div>
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
