
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lid/api";
import Notes from "@/components/Notes/Notes.clinets";
import NoteForm from "@/components/NoteForm/NoteForm";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <NoteForm />
        <Notes />
      </main>
    </HydrationBoundary>
  );
}