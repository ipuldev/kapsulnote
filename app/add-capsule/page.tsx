import { BackButton } from "@/components/buttons/BackButton";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { NoteRequestBody } from "@/schema/note";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function Index(){
    const onSubmit = async (formData: FormData) => {
        "use server";

        const value = formData.get("value") as string;

        const notePayload: NoteRequestBody = {
            value : value,
        }

        const supabase = createClient();
        const response = await supabase.from("note").insert(notePayload)
        if (response.error) {
            console.log(response.error);
        } else {
            redirect("/");
        }
    };

    return (
        <form className="flex flex-col w-full sm:p-5 justify-center w-full items-center">
            <BackButton href="/"/>
            <textarea name="value" id="value" className="sm:min-h-52 text-sm sm:resize-x rounded-md sm:w-2/6 border border-grey-300 hover:border-blue-400 p-2 focus:ring-4 focus:outline-none focus:ring-blue-100 duration-150" placeholder="Begin your notes here, to be cherished for centuries, awaiting future readers..."></textarea>   
            <SubmitButton
                formAction={onSubmit}
                className="bg-black text-white rounded-md mt-5 px-8 py-2 text-white hover:shadow-lg duration-150"
                pendingText="Transfer"
                >
                Transfer
            </SubmitButton>
        </form>
    )
}