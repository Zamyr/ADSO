'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/lib/services/ProfileService';
import { ProfileForm } from '@/components/profiles/ProfileForm';
import { CreateProfileDTO } from '@/lib/types/Profile';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useRouter } from 'next/navigation';
import { useState, use } from 'react';
import Link from 'next/link';

export default function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const profileService = ProfileService.getInstance();
  const [error, setError] = useState<string | null>(null);

  const { data: profile, isLoading, error: fetchError, refetch } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileService.getProfileById(id),
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateProfileDTO) =>
      profileService.updateProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profile', id] });
      router.push(`/profiles/${id}`);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (data: CreateProfileDTO) => {
    setError(null);
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ErrorMessage
            message={(fetchError as Error).message}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href={`/profiles/${profile.id}`}
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
            Volver al perfil
          </Link>
          <h1 className="text-3xl font-bold text-white">Editar Perfil</h1>
          <p className="mt-2 text-blue-100">
            Actualiza la información del perfil de {profile.username}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-8">
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-lg p-4">
              <p className="text-white font-medium">Error al actualizar el perfil</p>
              <p className="text-red-100 text-sm mt-1">{error}</p>
            </div>
          )}

          <ProfileForm
            initialData={profile}
            onSubmit={handleSubmit}
            isLoading={updateMutation.isPending}
            submitLabel="Guardar Cambios"
          />

          <div className="mt-6 pt-6 border-t border-white/20">
            <Link
              href={`/profiles/${id}`}
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
