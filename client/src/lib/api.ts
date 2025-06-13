import { Provider } from "@shared/schema";
import providersData from "../data/providers.json";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getProviders(): Promise<Provider[]> {
    await delay(800); // Simulate network delay
    return providersData as Provider[];
  },

  async getProvider(id: number): Promise<Provider | null> {
    await delay(500); // Simulate network delay
    const provider = providersData.find(p => p.id === id);
    return provider ? (provider as Provider) : null;
  },

  async searchProviders(query: string, specialization?: string): Promise<Provider[]> {
    await delay(600); // Simulate network delay
    let filtered = providersData as Provider[];

    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchLower) ||
        provider.specialization.toLowerCase().includes(searchLower)
      );
    }

    if (specialization && specialization !== '') {
      const specializationLower = specialization.toLowerCase();
      filtered = filtered.filter(provider =>
        provider.specialization.toLowerCase().includes(specializationLower)
      );
    }

    return filtered;
  }
};
