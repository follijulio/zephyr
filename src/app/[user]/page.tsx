"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/lib/types/user";

const page: React.FC = () => {
  const params = useParams();
  const id = params.user;
  const [user, setUser] = useState<User>();

  useEffect(
    () => {
      async function fetchUser() {
        try {
          const { data } = await axios.post("/api/user/querie", {id: id});
          const newUser = new User(
            data.name,
            data.email,
            data.password,
            data.id
          );
          setUser(newUser);
        } catch (error) {
          console.error("Erro ao carregar o usu[á]rio:", error);
        }
      }
      fetchUser();
    },
    [id]
  );

  return (
    <div>
      <div>
        {user &&
          <div>
            <h1>
              {user.name}
            </h1>
            <p>
              {user.email}
            </p>
          </div>}
      </div>
    </div>
  );
};
export default page;
