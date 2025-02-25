import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const page: React.FC = () => {
  //render
  return (
    <div className="bg-blue-950 h-screen w-screen  ">
      <div className="flex h-full w-full">
        <div className="w-1/3 flex flex-col justify-center items-center">
          <h1 className="text-2xl text-white font-bold">
            <img src="https://svgsilh.com/png-512/1365402.png" alt="" className="h-64 w-64" />
          </h1>
        </div>
        <div className="w-2/3 flex flex-col justify-center items-center p-20 ">
          {/* FORM  */}
          <form
            action=""
            className="w-3/4 h-5/6 max-w-[26rem] max-h-[28rem] rounded-xl shadow-2xl shadow-black gap-6 flex flex-col justify-center items-center bg-gradient-to-b bg-blue-950 from-sky-800"
          >
            <div className="w-3/4">
              <Label className="text-white">E-mail</Label>
              <Input placeholder="Email" type="email" className="bg-white" />
            </div>
            <div className="w-3/4">
              <Label className="text-white">Senha</Label>
              <Input placeholder="Senha" type="password" className="bg-white" />
            </div>
            <Button
              type="submit"
              className="bg-white w-28 h-14  text-zinc-800 hover:bg-blue-950 hover:text-white hover:shadow-md hover:shadow-black transition-all duration-200 "
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
