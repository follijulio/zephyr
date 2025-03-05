"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User } from "@/lib/types/user";
import { Response } from "@/lib/types/response";
import { useRouter } from "next/navigation";
import { createUser } from "@/hooks/useCreateUser";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    const newUser = new User(name, email, password);

    try {
      const response = (await createUser({ newUser })) as Response;
      console.log("Resposta na página:", response);

      if (response.situation) {
        router.push("/login");
      } else {
        alert("Houve um problema ao registrar o usuário.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="bg-blue-950 h-screen w-screen">
      <div className="flex h-full w-full">
        <div className="w-1/3 flex flex-col justify-center items-center">
          <h1 className="text-2xl text-white font-bold">
            <img
              src="https://svgsilh.com/png-512/1365402.png"
              alt="Logo"
              className="h-64 w-64"
            />
          </h1>
        </div>
        <div className="w-2/3 flex flex-col justify-center items-center p-20">
          <form
            onSubmit={handleSubmit}
            className="w-3/4 h-5/6 max-w-[26rem] max-h-[28rem] rounded-xl shadow-2xl shadow-black gap-6 flex flex-col justify-center items-center bg-gradient-to-b bg-blue-950 from-sky-800"
          >
            <div className="w-3/4">
              <Label className="text-white">Nome completo</Label>
              <Input
                name="nome"
                placeholder="Nome Completo"
                type="text"
                className="bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Label className="text-white">E-mail</Label>
              <Input
                name="email"
                placeholder="Email"
                type="email"
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-3/4">
              <Label className="text-white">Senha</Label>
              <Input
                name="password"
                placeholder="Senha"
                type="password"
                className="bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-3/4">
              <Label className="text-white">Confirmar senha</Label>
              <Input
                name="confirm"
                placeholder="Confirmar senha"
                type="password"
                className="bg-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
    </div>
  );
};

export default Page;
