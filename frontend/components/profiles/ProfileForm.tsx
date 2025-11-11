'use client';

import { CreateProfileDTO, UpdateProfileDTO } from '@/lib/types/Profile';
import { useState, FormEvent } from 'react';

interface ProfileFormProps {
  initialData?: UpdateProfileDTO & { id?: string };
  onSubmit: (data: CreateProfileDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function ProfileForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = 'Guardar',
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    username: initialData?.username || '',
    email: initialData?.email || '',
    bio: initialData?.bio || '',
  });

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { username?: string; email?: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'El email debe ser válido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nombre de usuario <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john_doe"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Biografía
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          disabled={isLoading}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
          placeholder="Cuéntanos sobre ti..."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {isLoading ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
