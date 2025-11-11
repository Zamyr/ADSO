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
    const data = await response.json();
    return data.profiles || data;
  }

  async getById(id: string): Promise<Profile> {
    const response = await fetch(`${this.baseUrl}/profile/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el perfil');
    }
    const data = await response.json();
    return data.profile || data;
  }

  async create(data: CreateProfileDTO): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al crear el perfil');
    }
    const result = await response.json();
    return { id: result.profile.id };
  }

  async update(id: string, data: UpdateProfileDTO): Promise<Profile> {
    const response = await fetch(`${this.baseUrl}/profile/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }
    const result = await response.json();
    return result.profile || result;
  }
}
