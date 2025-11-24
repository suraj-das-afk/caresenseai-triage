import axios from "axios";

export interface RawTriageResponse {
  triage_level?: string;
  advice?: string;
  common_causes?: string[];
}

export interface TriageResponse {
  triageLevel: string;
  advice: string;
  commonCauses: string[];
}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // local Django backend
  timeout: 20000,
});

export async function submitTriage(symptoms: string): Promise<TriageResponse> {
  const response = await api.post<RawTriageResponse>(
    "/api/v1/records/ai_triage/",
    { symptoms }
  );

  const data = response.data || {};

  // Normalize snake_case from backend into camelCase for the app
  return {
    triageLevel: data.triage_level ?? "AI analysis",
    advice: data.advice ?? "",
    commonCauses: Array.isArray(data.common_causes)
      ? data.common_causes
      : [],
  };
}
