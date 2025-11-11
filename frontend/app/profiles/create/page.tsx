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
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/profiles"
            className="text-white hover:text-blue-100 flex items-center gap-2 mb-4"
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
          <h1 className="text-3xl font-bold text-white">Crear Nuevo Perfil</h1>
          <p className="mt-2 text-blue-100">
            Completa el formulario para crear un nuevo perfil de usuario
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-8">
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-lg p-4">
              <p className="text-white font-medium">Error al crear el perfil</p>
              <p className="text-red-100 text-sm mt-1">{error}</p>
            </div>
          )}

          <ProfileForm
            onSubmit={handleSubmit}
            isLoading={createMutation.isPending}
            submitLabel="Crear Perfil"
          />

          <div className="mt-6 pt-6 border-t border-white/20">
            <Link
              href="/profiles"
              className="text-blue-100 hover:text-white text-sm"
            >
              Cancelar y volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
