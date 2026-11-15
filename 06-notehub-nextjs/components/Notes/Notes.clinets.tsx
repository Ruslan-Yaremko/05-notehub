"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "@/lid/api";
import type { Note } from "@/types/note";
import styles from "./Notes.module.css";

export default function Notes() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <p className={styles.message}>Loading notes...</p>;
  if (isError) return <p className={styles.message}>Something went wrong.</p>;

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <h1>My notes</h1>

        <input
          className={styles.search}
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
        />
      </div>

      {notes.length === 0 ? (
        <p className={styles.message}>No notes found.</p>
      ) : (
        <ul className={styles.list}>
          {notes.map((note) => (
            <li key={note.id} className={styles.card}>
              <Link href={`/notes/${note.id}`} className={styles.noteLink}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <span>{note.tag}</span>
              </Link>

              <button
                className={styles.deleteButton}
                onClick={() => deleteMutation.mutate(note.id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() =>
            setPage((current) => Math.min(totalPages, current + 1))
          }
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}