import { Profile } from '@/lib/types/Profile';
import Link from 'next/link';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const formattedDate = new Date(profile.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/profiles/${profile.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {profile.username}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{profile.email}</p>
            {profile.bio && (
              <p className="text-gray-700 line-clamp-2 mb-3">{profile.bio}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Creado: {formattedDate}
          </span>
          <span className="text-sm text-blue-600 font-medium hover:text-blue-700">
            Ver perfil →
          </span>
        </div>
      </div>
    </Link>
  );
}
