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
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-200 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between flex-1">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-1">
              {profile.username}
            </h3>
            <p className="text-sm text-blue-100 mb-3">{profile.email}</p>
            {profile.bio && (
              <p className="text-blue-50 line-clamp-2 mb-3">{profile.bio}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
          <span className="text-xs text-blue-200">
            Creado: {formattedDate}
          </span>
          <span className="text-sm text-white font-medium hover:text-blue-100">
            Ver perfil →
          </span>
        </div>
      </div>
    </Link>
  );
}
