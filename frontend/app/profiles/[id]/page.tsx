'use client';

import { useQuery } from '@tanstack/react-query';
import { ProfileService } from '@/lib/services/ProfileService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import Link from 'next/link';
import { use } from 'react';

export default function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const profileService = ProfileService.getInstance();

  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileService.getProfileById(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorMessage
            message={(error as Error).message}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const formattedDate = new Date(profile.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-1">{profile.username}</h1>
                <p className="text-blue-100">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Biografía
                </h2>
                {profile.bio ? (
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    Este usuario no ha agregado una biografía
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Información
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID de Usuario</p>
                    <p className="font-mono text-gray-900">{profile.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de Creación</p>
                    <p className="text-gray-900">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 flex gap-3">
            <Link
              href={`/profiles/${profile.id}/edit`}
              className="flex-1 text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Editar Perfil
            </Link>
            <Link
              href="/profiles"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
