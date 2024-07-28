import { Note } from "@/schema/note";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();
  const notes = await supabase.from("note").select("*");

  return (
    <>
      <Link href="/add" className="top-2 left-2 bg-black text-white py-3 px-5 rounded shadow-sm border-2 border-black hover:shadow-lg duration-300 fixed top-0">Add Capsule</Link>
      <main className="min-h-screen flex flex-col items-center justify-center w-full">
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          {notes.data?.length && notes.data?.map((note: Note, Index: number) => {
            return (
              <div className="text-sm bg-white row-span-3 max-w-full border-0 p-2 rounded sm:border-2 sm:max-w-sm" key={note.created_at + "-" + Index}>
                {note.value}
              </div>
            )
          })}

          { !notes?.data?.length && 
              <div className="text-sm">
                Worlds in peace and all notes still kept in our hearts. Let's put them in.
              </div>
          }
        </div>
      </main>
    </>
  );
}
