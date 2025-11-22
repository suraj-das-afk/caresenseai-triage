import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export interface TriageRequest {
  symptoms: string;
}

export interface TriageResponse {
  triage_level: 'Low' | 'Moderate' | 'Critical';
  ai_summary: string;
  recommendations: string[];
}

export const triageAPI = {
  async analyzSymptoms(symptoms: string): Promise<TriageResponse> {
    try {
      const response = await axios.post<TriageResponse>(
        `${API_BASE_URL}/records/ai_triage/`,
        { symptoms },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          throw new Error('Server Offline — Please start your Django backend.');
        }
        if (error.response) {
          throw new Error(`Server Error: ${error.response.status}`);
        }
        if (error.request) {
          throw new Error('No response from server. Please check your connection.');
        }
      }
      throw new Error('An unexpected error occurred. Please try again.');
    }
  },
};
