    "use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (login) {
      router.push(`/`);
    }
  }, [login, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {

      const response = await axios.post("/api/user/auth", { email, password });
      
      if (response.data.user) {
        setLogin(true);
      } else {
        console.error("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="bg-blue-950 h-screen w-screen flex">
      <div className="w-1/3 flex flex-col justify-center items-center">
        <img
          src="https://svgsilh.com/png-512/1365402.png"
          alt="Logo"
          className="h-64 w-64"
        />
      </div>
      <div className="w-2/3 flex flex-col justify-center items-center p-20">
        <form
          onSubmit={handleSubmit}
          className="w-3/4 max-w-[26rem] rounded-xl shadow-2xl shadow-black gap-6 flex flex-col justify-center items-center bg-gradient-to-b from-sky-800 to-blue-950 p-8"
        >
          <div className="w-full">
            <Label className="text-white">E-mail</Label>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              className="bg-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <Label className="text-white">Senha</Label>
            <Input
              name="password"
              placeholder="Senha"
              type="password"
              className="bg-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-white w-28 h-14 text-zinc-800 hover:bg-blue-950 hover:text-white hover:shadow-md hover:shadow-black transition-all duration-200"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
