"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lid/api";
import styles from "./NoteDetails.module.css";

interface NoteDetailsProps {
  id: string;
}

export default function NoteDetails({ id }: NoteDetailsProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;

  if (isError || !note) {
    return <p>Could not load this note.</p>;
  }

  return (
    <main className={styles.container}>
      <Link href="/notes" className={styles.backLink}>
        ← Back to notes
      </Link>

      <article className={styles.card}>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
        <p>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </article>
    </main>
  );
}