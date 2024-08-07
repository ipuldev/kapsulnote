"use client";

import { useEffect, useState } from "react";
import { BackButton } from "@/components/buttons/BackButton";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { noteSchema, PerspectiveAPIResponse } from "./schema";
import clsx from "clsx";

export default function AddCapsule() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, seLoadingText] = useState("Transferring");
  const [isRequired, setIsRequired] = useState(false);
  const [value, setValue] = useState("");
  const [toxicity, setToxicity] = useState(0);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    seLoadingText("Transferring")

    const formData = new FormData(e.target);
    const value = formData.get("value") as string;

    const { error } = noteSchema.validate({ value });
    if (error) {
      setIsLoading(false);
      setIsRequired(true);
      return;
    }

    try {
      // Send request to save the note including IP address
      await fetch("/save-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, perspective_score: toxicity }),
      });

      // Optionally redirect or show a success message
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((value && value.length > 3) || isLoading) {
      setIsLoading(true);
      seLoadingText("Analyzing")
      const checkToxicity = setTimeout(async () => {
        const response = await fetch("/perspective", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        });
        const result: PerspectiveAPIResponse = await response.json();
        setToxicity(result.attributeScores?.["TOXICITY"]?.summaryScore?.value ?? 0);
        setIsLoading(false);
      }, 2000);
  
  
      return () => {
        clearTimeout(checkToxicity)
      }
    }
  }, [value])

  return (
    <form
      className="flex flex-col w-full sm:p-5 w-full items-start sm:justify-center sm:items-center p-2 sm:p-0"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-5 w-full items-start sm:w-11/12 lg:w-2/6">
        {(toxicity * 100) > 40 && (
          <div className="text-red-500 text-xm w-auto rounded-full order-1 bg-white py-1 px-3 rounded sm:order-first">
            {(toxicity * 100).toFixed(2)}% likely to be toxic
          </div>
        )}
        <textarea
          name="value"
          id="value"
          onChange={(event) => setValue(event.target.value)}
          className={clsx(
            isRequired ? "border-red-500" : "border-grey-300",
            "duration-150 text-black w-full text-sm min-h-72 rounded-md border hover:border-blue-400 p-2 focus:ring-4 focus:outline-none focus:ring-blue-100 duration-150 sm:min-h-52 sm:resize-x"
          )}
          placeholder="Begin your notes here, to be cherished for centuries, awaiting future readers..."
        />
        <div className="flex justify-between w-full order-first sm:order-last">
          <BackButton href="/" />
          <SubmitButton
            className={`bg-black text-white rounded-md px-8 py-2 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg duration-150"
            }`}
            disabled={isLoading}
            pendingText="Transfering"
          >
            {isLoading ? (
              <div className="flex gap-2">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                {loadingText}
              </div>
            ) : (
              "Transfer"
            )}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
