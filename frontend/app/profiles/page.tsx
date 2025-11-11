'use client';

import { useQuery } from '@tanstack/react-query';
import { ProfileService } from '@/lib/services/ProfileService';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { LoadingCard } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import Link from 'next/link';

export default function ProfilesPage() {
  const profileService = ProfileService.getInstance();

  const { data: profiles, isLoading, error, refetch } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => profileService.getAllProfiles(),
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Directorio de Usuarios
              </h1>
              <p className="mt-2 text-blue-100">
                Explora y gestiona perfiles de usuario
              </p>
            </div>
            <Link
              href="/profiles/create"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-lg"
            >
              + Crear Perfil
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <ErrorMessage
            message={(error as Error).message}
            onRetry={() => refetch()}
          />
        )}

        {profiles && profiles.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <svg
              className="mx-auto h-12 w-12 text-blue-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">
              No hay perfiles aún
            </h3>
            <p className="mt-2 text-blue-100">
              Comienza creando tu primer perfil
            </p>
            <Link
              href="/profiles/create"
              className="mt-4 inline-block px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-lg"
            >
              Crear primer perfil
            </Link>
          </div>
        )}

        {profiles && profiles.length > 0 && (
          <>
            <div className="mb-4 text-sm text-blue-100">
              Mostrando {profiles.length} perfil{profiles.length !== 1 ? 'es' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
