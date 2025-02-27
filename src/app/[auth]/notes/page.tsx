"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Switch } from "@/components/ui/switch";
import { MdCancel, MdNoteAdd } from "react-icons/md";
import { Note } from "@/lib/types/note";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";
import NoteCard from "@/ui/cards/NoteCard";
import { useParams } from "next/navigation";

interface CreateNoteFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

interface CreateNoteModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}
const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <form onSubmit={onSubmit} className="grid grid-rows-4 gap-4 font-normal">
      <input
        type="text"
        name="title"
        placeholder="Título"
        id="title"
        className="h-8 rounded-sm p-1 bg-slate-200 focus:bg-slate-300"
        disabled={isSubmitting}
      />
      <textarea
        name="note"
        placeholder="Nota"
        id="note"
        className="min-h-8 max-h-20 rounded-sm p-1 bg-slate-200 focus:bg-slate-300"
        disabled={isSubmitting}
      />
      <div className="flex items-center space-x-2">
        <Switch name="enable" id="enable" disabled={isSubmitting} />
        <label htmlFor="enable">Ativo</label>
      </div>
      <div className="grid grid-cols-2 gap-4 font-semibold text-xl">
        <AlertDialogCancel className="bg-red-300 hover:bg-red-500 border-none">
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar"}
        </AlertDialogAction>
      </div>
    </form>
  );
};

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex bg-slate-900 w-48 h-16 gap-3 rounded-3xl justify-center items-center text-white font-semibold text-xl">
          adicionar nota
      <MdNoteAdd size={30} color="white"/>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[20rem] max-h-[25rem] bg-slate-500 border-none">
        {isSubmitting ?
          <div className="h-full w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
          :        
          <>
            <div>
              <AlertDialogTitle className="flex justify-between items-center">
                <p>Crie sua nova nota! 😁</p>
                <AlertDialogCancel className="w-10 h-10 bg-transparent border-none hover:bg-red-300">
                  <MdCancel />
                </AlertDialogCancel>
              </AlertDialogTitle>
            </div>
            <CreateNoteForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
          </>
        }
        </AlertDialogContent>
    </AlertDialog>
  );
};


const Page: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //! getting u[s]er id
  const params = useParams();
  const id = params.user;


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.post("/api/notes/list", {id: id});
        setNotes(data);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
      setIsLoading(false);
    };
    fetchNotes();
  }, [id]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newNote = {
      title: formData.get("title") as string,
      note: formData.get("note") as string,
      actived: formData.get("enable") === "on",
      userId: id,
    } as Note;
  
    setIsSubmitting(true);
    
    try {
      const { data } = await axios.post("/api/notes/create", newNote);
      setNotes((prevNotes) => [...prevNotes, data]);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsSubmitting(false);
    }
    
    const timer = setTimeout(() => {
      refresh()
    }, 300);

    return () => clearTimeout(timer);

  };

  
  function refresh() {
    window.location.reload();
  }

  //render
  return (
    <div className="h-full w-full overflow-auto no-scrollbar">
      <nav className="h-28 flex justify-between items-center p-6 border-b-2">
        <Link href={'/'}>
        <h1 className="text-4xl text-white font-bold">
          Zephyr
        </h1>
        </Link>
      <CreateNoteModal onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </nav>
      <div className="h-full w-full flex justify-center p-10">
        { isLoading ? 
        <div className="h-full w-full flex justify-center items-center">  
        <LoadingSpinner color="white" /> 
        </div>
        :
          <div className="w-4/5 grid grid-cols-4 gap-4 justify-between">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <NoteCard  note={note} key={index}/> 
          ))
        ) : (
          <div>
            <h1 className="text-white text-2xl font-bold">Nenhuma nota encontrada</h1>
          </div>
        )}
        </div>
      }
      </div>
    </div>
  );
};

export default Page;



