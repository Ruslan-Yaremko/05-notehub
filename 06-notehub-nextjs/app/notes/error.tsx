"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotesError({ reset }: ErrorProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Could not load notes.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}