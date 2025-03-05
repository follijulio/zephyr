/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const page: React.FC = () => {
  const params = useParams();
  const [note, setNote] = useState<Note>();

  useEffect(
    () => {
      async function fetchData() {
        try {
          const response = await axios.post(`/api/notes/querie/`, {
            userId: params.user,
            idNote: params.id
          });

          setNote(response.data as Note);
        } catch (error) {
          console.error("Error loading note:", error);
        }
      }
      fetchData();
    },
    [params]
  );

  return (
    <div className="h-screen w-screen overflow-auto no-scrollbar">
      <div className="text-white w-full h-full flex justify-center items-center">
        {note
          ? <div className="w-full h-full flex justify-center items-center">
              <CardNote note={note} />
            </div>
          : <div>
              <LoadingSpinner color="white" /> 
            </div>}
      </div>
    </div>
  );
};

export default page;

const CardNote = ({ note }: { note: Note }) => {
  return (
    <div className="h-5/6 w-3/4 bg-gray-800 p-10 rounded-3xl">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-4xl text-white font-bold">
          {note.title}
        </h1>
        <span
          className={`h-10 w-10 rounded-full
            ${note.actived ? "bg-green-500" : "bg-red-500"}`}
        />
      </header>
      <div className="w-full h-full pt-8">
        <p className="text-white text-lg">
          {note.note}
        </p>
      </div>
    </div>
  );
};
