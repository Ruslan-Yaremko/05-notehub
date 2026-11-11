import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes, createNote } from "../../services/noteService";
import type { NewNote } from "../../types/note";

import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import css from "./App.module.css";

export default function App() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    500
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: searchQuery || undefined,
      }),
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const handleSearch = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const handlePageChange = ({
    selected,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selected + 1);
  };

  const handleCreateNote = (values: NewNote) => {
    createMutation.mutate(values);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={inputValue}
          onSearch={handleSearch}
        />

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </header>

      {isLoading && <p>Loading notes...</p>}

      {isError && (
        <p>Something went wrong. Please try again.</p>
      )}

      {!isLoading && !isError && notes.length === 0 && (
        <p>No notes found.</p>
      )}

      {notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSubmit={handleCreateNote}
          />
        </Modal>
      )}
    </div>
  );
}