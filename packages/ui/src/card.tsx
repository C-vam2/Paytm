import { type JSX } from "react";

export function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 rounded-md bg-white">
      <h1 className="text-xl border-b pb-2 text-[#6a51a6]  font-semibold">
        {title}
      </h1>
      {children}
    </div>
  );
}
