import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "@/hooks/useFetchData";
import { Response } from "@/lib/types/response";
import { Note } from "@/lib/types/note";
import { User } from "@/lib/types/user";

export const useUserNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const responseFetch = (await fetchUser()) as Response;
        const user = responseFetch.response as User;
        if (user?.id) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const getNotes = async () => {
      try {
        const { data } = await axios.post("/api/notes/list", { id: userId });
        const responseData = data as Response;
        setNotes(responseData.response as Note[]);
      } catch (error) {
        console.error("Erro ao buscar notas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getNotes();
  }, [userId]);

  return { notes, isLoading, userId, setNotes };
};
