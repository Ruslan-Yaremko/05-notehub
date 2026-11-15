"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lid/api";
import styles from "./NoteForm.module.css";

export default function NoteForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Todo");

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setContent("");
      setTag("Todo");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) return;

    mutation.mutate({
      title: title.trim(),
      content: content.trim(),
      tag,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create a note</h2>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Note title"
        required
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Note content"
        required
        rows={4}
      />

      <select value={tag} onChange={(event) => setTag(event.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create note"}
      </button>

      {mutation.isError && <p>Could not create the note. Try again.</p>}
    </form>
  );
}