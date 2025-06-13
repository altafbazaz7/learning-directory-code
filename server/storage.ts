import { users, providers, type User, type InsertUser, type Provider, type InsertProvider } from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProviders(): Promise<Provider[]>;
  getProvider(id: number): Promise<Provider | undefined>;
  searchProviders(query?: string, specialization?: string): Promise<Provider[]>;
  createProvider(provider: InsertProvider): Promise<Provider>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private providers: Map<number, Provider>;
  private currentUserId: number;
  private currentProviderId: number;

  constructor() {
    this.users = new Map();
    this.providers = new Map();
    this.currentUserId = 1;
    this.currentProviderId = 1;
    
    // Initialize with sample providers
    this.initializeProviders();
  }

  private async initializeProviders() {
    const sampleProviders: InsertProvider[] = [
      {
        name: "Sarah Thompson",
        specialization: "Dyslexia Support Specialist",
        location: "Dubai Marina",
        rating: "4.8",
        shortDescription: "Experienced learning specialist with 8+ years helping children overcome reading difficulties through personalized approaches.",
        longDescription: "Sarah is a dedicated learning specialist with over 8 years of experience helping children overcome reading difficulties. She holds a Master's degree in Special Education and is certified in the Orton-Gillingham approach to dyslexia intervention. Sarah believes in creating a supportive, encouraging environment where children can build confidence while developing essential reading skills.\n\nHer approach combines evidence-based methods with creative teaching strategies, tailored to each child's unique learning style. Sarah has successfully helped over 200 children improve their reading abilities and develop a love for learning.",
        contactEmail: "sarah.thompson@habotconnect.ae",
        phoneNumber: "+971 50 123 4567",
        available: true,
        reviewCount: 32
      },
      {
        name: "Dr. Michael Chen",
        specialization: "ADHD Coaching & Behavioral Support",
        location: "JLT - Jumeirah Lake Towers",
        rating: "5.0",
        shortDescription: "Licensed psychologist specializing in ADHD management and executive function skills for children and teens.",
        longDescription: "Dr. Michael Chen is a licensed psychologist with extensive experience in ADHD coaching and behavioral support. He specializes in helping children and teenagers develop executive function skills, emotional regulation, and coping strategies. Dr. Chen uses evidence-based approaches including cognitive behavioral therapy and mindfulness techniques to support his clients in achieving their academic and personal goals.",
        contactEmail: "michael.chen@habotconnect.ae",
        phoneNumber: "+971 50 234 5678",
        available: true,
        reviewCount: 48
      },
      {
        name: "Lisa Rodriguez",
        specialization: "Speech & Language Therapy",
        location: "Business Bay",
        rating: "4.9",
        shortDescription: "Certified speech-language pathologist with expertise in articulation, language development, and communication disorders.",
        longDescription: "Lisa Rodriguez is a certified speech-language pathologist with over 6 years of experience working with children of all ages. She specializes in articulation disorders, language development delays, and communication difficulties. Lisa uses play-based therapy techniques and innovative technology to make sessions engaging and effective for her young clients.",
        contactEmail: "lisa.rodriguez@habotconnect.ae",
        phoneNumber: "+971 50 345 6789",
        available: false,
        reviewCount: 28
      },
      {
        name: "Ahmed Al-Mansouri",
        specialization: "Autism Support Specialist",
        location: "Al Barsha",
        rating: "4.7",
        shortDescription: "Board-certified behavioral analyst specializing in ABA therapy and social skills development for children on the autism spectrum.",
        longDescription: "Ahmed Al-Mansouri is a board-certified behavioral analyst with specialized training in Applied Behavior Analysis (ABA) therapy. He has dedicated his career to supporting children on the autism spectrum and their families. Ahmed's approach focuses on developing communication skills, social interaction, and independence through evidence-based interventions tailored to each child's unique needs.",
        contactEmail: "ahmed.almansouri@habotconnect.ae",
        phoneNumber: "+971 50 456 7890",
        available: true,
        reviewCount: 15
      },
      {
        name: "Rachel Johnson",
        specialization: "Learning Disabilities Coach",
        location: "Downtown Dubai",
        rating: "4.9",
        shortDescription: "Educational consultant with expertise in learning differences, study skills, and academic accommodation strategies.",
        longDescription: "Rachel Johnson is an educational consultant with over 10 years of experience supporting students with various learning differences. She specializes in developing personalized learning strategies, study skills training, and advocating for appropriate academic accommodations. Rachel works closely with students, families, and schools to create comprehensive support plans that promote academic success and confidence.",
        contactEmail: "rachel.johnson@habotconnect.ae",
        phoneNumber: "+971 50 567 8901",
        available: true,
        reviewCount: 41
      },
      {
        name: "Dr. Elena Popov",
        specialization: "Educational Psychologist",
        location: "DIFC",
        rating: "5.0",
        shortDescription: "Licensed educational psychologist providing comprehensive assessments and intervention strategies for learning challenges.",
        longDescription: "Dr. Elena Popov is a licensed educational psychologist with expertise in psychological assessments and intervention planning for children with learning challenges. She conducts comprehensive evaluations to identify learning differences and develops evidence-based intervention strategies. Dr. Popov works collaboratively with families and educational teams to ensure children receive the support they need to succeed academically and emotionally.",
        contactEmail: "elena.popov@habotconnect.ae",
        phoneNumber: "+971 50 678 9012",
        available: false,
        reviewCount: 23
      }
    ];

    for (const provider of sampleProviders) {
      await this.createProvider(provider);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Provider methods
  async getProviders(): Promise<Provider[]> {
    return Array.from(this.providers.values());
  }

  async getProvider(id: number): Promise<Provider | undefined> {
    return this.providers.get(id);
  }

  async searchProviders(query?: string, specialization?: string): Promise<Provider[]> {
    let providers = Array.from(this.providers.values());

    if (query) {
      const searchLower = query.toLowerCase();
      providers = providers.filter(provider => 
        provider.name.toLowerCase().includes(searchLower) ||
        provider.specialization.toLowerCase().includes(searchLower)
      );
    }

    if (specialization && specialization !== '') {
      const specializationLower = specialization.toLowerCase();
      providers = providers.filter(provider =>
        provider.specialization.toLowerCase().includes(specializationLower)
      );
    }

    return providers;
  }

  async createProvider(insertProvider: InsertProvider): Promise<Provider> {
    const id = this.currentProviderId++;
    const provider: Provider = { ...insertProvider, id };
    this.providers.set(id, provider);
    return provider;
  }
}

export const storage = new MemStorage();
