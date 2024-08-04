import { google } from 'googleapis';

const API_KEY = process.env.GOOGLE_PERSPECTIVE_API_KEY!;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

export async function analyzeComment(value: string) {
  try {
    // Discover the API
    const client = await google.discoverAPI(DISCOVERY_URL) as any;

    // Define the request parameters
    const analyzeRequest = {
      comment: {
        text: value,
      },
      requestedAttributes: {
        TOXICITY: {},
      },
    };

    // Analyze the comment
    const response = await client.comments.analyze({
      key: API_KEY,
      resource: analyzeRequest,
    });

    // Log the response
    console.log(JSON.stringify(response.data, null, 2));

  } catch (err) {
    console.error('Error analyzing comment:', err);
  }
}