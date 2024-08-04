import { formatDate } from "@/helpers/date";
import { Note } from "@/schema/note";
import { createClient } from "@/utils/supabase/server";
import clsx from "clsx";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();
  const notes = await supabase.from("note").select("*").order("created_at", { ascending: false});

  return (
    <>
      <div className="flex bg-white border w-full fixed z-50 font-sans bg-white flex-row flex w-full border-t-[1px] py-3 border-top-2 bottom-0 justify-between px-5 shadow-2xl sm:bottom-auto sm:w-auto sm:right-5 sm:top-5 sm:px-10 sm:py-3 sm:rounded sm:gap-5">
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
      <div className="columns-1 gap-5 sm:columns-5 p-5 mb-12 sm:mb-0">
        {notes.data?.length &&
          notes.data?.map((note: Note, Index: number) => {
            const perspectiveValue = note.perspective_score;
            const toxicity = (perspectiveValue * 100);
            return (
              <div
                className="flex flex-col items-start mb-5 text-sm text-black bg-white max-w-full border-0 p-2 rounded sm:border-2 sm:max-w-sm min-w-64 h-auto break-inside-avoid-column"
                key={note.created_at + "-" + Index}
              >
                <div className="text-sm text-slate-600">
                  {formatDate(new Date(note.created_at))}
                </div>
                {note.value}
                {toxicity > 40 && <div className="text-red-500 mt-2 text-xm bg-red-50 w-auto py-1 px-2 rounded">Toxicity : {toxicity.toFixed(2)}%</div>}
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
