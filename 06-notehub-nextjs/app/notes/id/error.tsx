"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteError({ reset }: ErrorProps) {
  return (
    <div>
      <h2>Could not load this note.</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}