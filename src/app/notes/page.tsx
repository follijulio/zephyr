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
import { MdCancel } from "react-icons/md";
import { Note } from "@/lib/types/note";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
        className="min-h-8 max-h-16 rounded-sm p-1 bg-slate-200 focus:bg-slate-300"
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
        <button>Nova nota</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[20rem] max-h-[90%] bg-slate-500 border-none">
        <div>
          <AlertDialogTitle className="flex justify-between items-center">
            <p>Crie sua nova nota! 😁</p>
            <AlertDialogCancel>
              <MdCancel size={30} />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </div>
        <CreateNoteForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </AlertDialogContent>
    </AlertDialog>
  );
};


const Page: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("api/list");
        setNotes(data);
      } catch (error) {
        console.error("Erro ao carregar as notas:", error);
      }
    };
    fetchNotes();
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newNote: Note = {
      title: formData.get("title")?.toString() || "",
      note: formData.get("note")?.toString() || "",
      actived: formData.get("enable") === "on",
    };

    setIsSubmitting(true);
    try {
      const { data } = await axios.post("api/create", newNote);
      setNotes((prevNotes) => [...prevNotes, data]);
    } catch (error) {
      console.error("Erro ao criar nota:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //render
  return (
    <div>
      {/* Exibe as notas carregadas */}
      <div>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index}>
              <h3>{note.title}</h3>
              <p>{note.note}</p>
            </div>
          ))
        ) : (
          <LoadingSpinner className="text-white" />
        )}
      </div>
      <CreateNoteModal onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default Page;
