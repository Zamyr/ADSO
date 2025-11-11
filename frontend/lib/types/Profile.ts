export interface Profile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  created_at: string;
}

export interface CreateProfileDTO {
  username: string;
  email: string;
  bio?: string;
}

export interface UpdateProfileDTO {
  username?: string;
  email?: string;
  bio?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
