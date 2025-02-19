/* eslint-disable react-hooks/rules-of-hooks */
import { Card } from "@/components/ui/card";
import { Note } from "@/lib/types/note";
import { useRouter } from "next/navigation";
interface noteProps {
    note: Note
}

const noteCard: React.FC<noteProps> = ({note}) => {
  const route = useRouter();

  const handleClick = () => {
    route.push(`/notes/${note.id}`);
  };
  
  return (
    <Card
      className="w-80 h-60 bg-slate-700 text-white p-4"
      onClick={handleClick}
    >
      <header className="h-1/6 w-full flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">
          {note.title}
        </h1>
        <span
          className={`h-5 w-10 rounded-full ${note.actived
            ? "bg-green-600"
            : "bg-red-600"}`}
        />
      </header>
      <div className="w-full h-5/6 overflow-y-auto">
        <p className="text-base">
          {note.note}
        </p>
      </div>
    </Card>
  );
};

export default noteCard;
