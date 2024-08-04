import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_PERSPECTIVE_API_KEY!;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

export async function POST(req: NextRequest) {
    try {
        const { value } = await req.json();

        const client = await google.discoverAPI(DISCOVERY_URL) as any;

        const analyzeRequest = {
          comment: {
            text: value,
          },
          requestedAttributes: {
            TOXICITY: {},
          },
        };
    
        const response = await client.comments.analyze({
          key: API_KEY,
          resource: analyzeRequest,
        });

        return NextResponse.json(response.data, {status: 200});
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
