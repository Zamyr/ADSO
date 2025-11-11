import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center text-white">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            AdSo
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 font-light">
            User Profile Management System
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 mb-8 border border-white/20">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Bienvenido
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Sistema de gestión de perfiles de usuario con interfaz intuitiva y responsive.
            Explora, crea y administra perfiles de manera eficiente.
          </p>

          <Link
            href="/profiles"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              className="h-6 w-6"
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
            Ver Directorio de Usuarios
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-semibold mb-2">Lista de Usuarios</h3>
            <p className="text-blue-100 text-sm">
              Explora todos los perfiles registrados en el sistema
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-3">➕</div>
            <h3 className="text-lg font-semibold mb-2">Crear Perfiles</h3>
            <p className="text-blue-100 text-sm">
              Agrega nuevos usuarios con información completa
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-3">✏️</div>
            <h3 className="text-lg font-semibold mb-2">Editar Datos</h3>
            <p className="text-blue-100 text-sm">
              Actualiza la información de cualquier perfil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
