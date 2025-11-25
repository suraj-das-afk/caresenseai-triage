import axios from "axios";

// Base URL: from env in production, localhost in dev
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;
console.log("VITE_API_BASE_URL =", API_BASE_URL);

// Single axios instance used everywhere
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

// ---------- Types ----------

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

// ---------- Triage API ----------

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

// Backwards-compat object for older imports like triageAPI.analyzSymptoms
export const triageAPI = {
  submitTriage,

  // old name you used in TriageInterface:
  analyzSymptoms: submitTriage,

  // safer/spelled version if you ever switch:
  analyzeSymptoms: submitTriage,
};

// ---------- Doctor search ----------

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location?: string;
  rating?: number;
  availability?: string;
}

export async function fetchDoctors(params: {
  search?: string;
  specialty?: string;
  availability?: string;
}): Promise<Doctor[]> {
  const response = await api.get<Doctor[]>("/api/v1/doctors/", {
    params,
  });
  return response.data;
}
