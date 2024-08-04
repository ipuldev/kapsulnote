import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: NextRequest) {
    try {
        const { value, perspective_score } = await req.json();

        // Extract IP address
        const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('remote-address') || '';

        const supabase = createClient();
        const notePayload = {
            value: value,
            ip_address: ipAddress,
            perspective_score: perspective_score
        };

        const { data, error } = await supabase.from("note").insert(notePayload);

        if (error) {
            console.error("Error inserting note:", error);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }

        return NextResponse.json({ message: "Note saved successfully", data }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
