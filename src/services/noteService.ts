import axios from "axios";
import type { Note, NewNote } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("VITE_NOTEHUB_TOKEN is missing. Check your .env file.");
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  totalNotes: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params,
  });

  return response.data;
};

export const createNote = async (
  note: NewNote
): Promise<Note> => {
  const response = await api.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (
  id: string
): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};