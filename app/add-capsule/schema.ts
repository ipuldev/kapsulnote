import Joi from "joi";

export const noteSchema = Joi.object({
  value: Joi.string().required(),
});

interface Score {
  value: number;
  type: string;
}

interface SpanScore {
  begin: number;
  end: number;
  score: Score;
}

interface AttributeScore {
  spanScores: SpanScore[];
  summaryScore: Score;
}

export interface PerspectiveAPIResponse {
  attributeScores: {
    [key: string]: AttributeScore;
  };
  languages: string[];
  detectedLanguages: string[];
}
