import { formatDate } from "@/helpers/date";
import { Note } from "@/schema/note";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();
  const notes = await supabase.from("note").select("*");

  const list4 = (notes.count ?? 0) / 4;
  const list3 = (notes.count ?? 0) / 3;

  return (
    <>
      <div className="right-5 top-5 bg-white border shadow-2xl flex px-10 py-3 w-auto rounded gap-5 fixed">
        <Link
          href="/add-capsule"
          className="bg-black text-white py-3 px-5 rounded shadow-sm border-2 border-black hover:bg-slate-900 duration-300"
        >
          Add Capsule
        </Link>
        <Link
          href="https://momentous-stew-0b7.notion.site/Kapsul-Note-cf4471e10ecb4a64b55888ad9f6506c7?pvs=4"
          className="bg-white text-black py-3 px-5 rounded shadow-sm border-2 border-black hover:bg-gray-200 duration-300"
        >
          About us
        </Link>
      </div>
      <div className="columns-1 gap-5 sm:columns-5 p-5">
        {notes.data?.length &&
          notes.data?.map((note: Note, Index: number) => {
            return (
              <div
                className="mb-5 text-sm text-black bg-white max-w-full border-0 p-2 rounded sm:border-2 sm:max-w-sm min-w-64 h-auto break-inside-avoid-column"
                key={note.created_at + "-" + Index}
              >
                <div className="text-sm text-slate-600">
                  {formatDate(new Date(note.created_at))}
                </div>
                {note.value}
              </div>
            );
          })}

        {!notes?.data?.length && (
          <div className="text-sm">
            Worlds in peace and all notes still kept in our hearts. Let's put
            them in.
          </div>
        )}
      </div>
    </>
  );
}
