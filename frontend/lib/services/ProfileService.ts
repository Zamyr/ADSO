import { Profile, CreateProfileDTO, UpdateProfileDTO } from '../types/Profile';
import { ProfileRepository } from '../repositories/ProfileRepository';

export class ProfileService {
  private static instance: ProfileService;
  private repository: ProfileRepository;

  private constructor() {
    this.repository = ProfileRepository.getInstance();
  }

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  async getAllProfiles(): Promise<Profile[]> {
    return this.repository.getAll();
  }

  async getProfileById(id: string): Promise<Profile> {
    return this.repository.getById(id);
  }

  async createProfile(data: CreateProfileDTO): Promise<{ id: string }> {
    return this.repository.create(data);
  }

  async updateProfile(id: string, data: UpdateProfileDTO): Promise<Profile> {
    return this.repository.update(id, data);
  }
}
