import { Profile, CreateProfileDTO, UpdateProfileDTO } from '../types/Profile';

export class ProfileRepository {
  private static instance: ProfileRepository;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  }

  public static getInstance(): ProfileRepository {
    if (!ProfileRepository.instance) {
      ProfileRepository.instance = new ProfileRepository();
    }
    return ProfileRepository.instance;
  }

  async getAll(): Promise<Profile[]> {
    const response = await fetch(`${this.baseUrl}/profiles`);
    if (!response.ok) {
      throw new Error('Error al obtener perfiles');
    }
    return response.json();
  }

  async getById(id: string): Promise<Profile> {
    const response = await fetch(`${this.baseUrl}/profiles/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el perfil');
    }
    return response.json();
  }

  async create(data: CreateProfileDTO): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al crear el perfil');
    }
    return response.json();
  }

  async update(id: string, data: UpdateProfileDTO): Promise<Profile> {
    const response = await fetch(`${this.baseUrl}/profiles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }
    return response.json();
  }
}
