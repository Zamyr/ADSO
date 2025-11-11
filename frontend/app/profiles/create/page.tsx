'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/lib/services/ProfileService';
import { ProfileForm } from '@/components/profiles/ProfileForm';
import { CreateProfileDTO } from '@/lib/types/Profile';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const profileService = ProfileService.getInstance();
  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: (data: CreateProfileDTO) => profileService.createProfile(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      router.push(`/profiles/${response.id}`);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (data: CreateProfileDTO) => {
    setError(null);
    createMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/profiles"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a la lista
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Perfil</h1>
          <p className="mt-2 text-gray-600">
            Completa el formulario para crear un nuevo perfil de usuario
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">Error al crear el perfil</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          <ProfileForm
            onSubmit={handleSubmit}
            isLoading={createMutation.isPending}
            submitLabel="Crear Perfil"
          />

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/profiles"
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancelar y volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
