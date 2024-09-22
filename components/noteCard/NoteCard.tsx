"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { formatDate } from "@/helpers/date";
import { Note } from "@/schema/note";
import { Share } from "../icons/Share";
import clsx from "clsx";

interface NoteCardProps {
  note: Note;
  index: number;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (noteRef.current) {
      observer.observe(noteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const saveAsImage = () => {
    if (noteRef.current) {
      // Temporarily show the watermark before saving the image
      setShowWatermark(true);

      setTimeout(() => {
        toPng(noteRef.current as HTMLDivElement)
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `kapsulnote-${index}.png`;
            link.href = dataUrl;
            link.click();
          })
          .catch((error) => {
            console.error("Error saving the image:", error);
          })
          .finally(() => {
            // Hide the watermark again after the image is saved
            setShowWatermark(false);
          });
      }, 0); // Slight delay to allow the watermark to show
    }
  };

  const perspectiveValue = note.perspective_score;
  const toxicity = perspectiveValue * 100;

  return (
    <div
      ref={noteRef}
      className={clsx(showWatermark && "pb-7", "note-item relative flex flex-col items-start mb-5 text-sm text-black bg-white max-w-full border-0 p-2 rounded sm:border-2 sm:max-w-sm min-w-64 h-auto break-inside-avoid-column")}
    >
      {isVisible && (
        <>
          <div className="text-sm text-slate-600 flex justify-between items-start w-full mb-2">
            <p>{formatDate(new Date(note.created_at))}</p>
            <button onClick={saveAsImage}>
              <Share />
            </button>
          </div>
          {note.value}
          {toxicity > 40 && (
            <div className="text-red-500 mt-2 text-xm bg-red-50 w-auto py-1 px-2 rounded">
              {toxicity.toFixed(2)}% likely to be toxic
            </div>
          )}

          {/* Watermark only visible when saving the image */}
          {showWatermark && (
            <div className="mt-3 text-gray-400 text-xs italic absolute bottom-2 right-2">
              kapsulnote.com
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NoteCard;
