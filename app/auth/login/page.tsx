import Image from "next/image";

export default async function Login() {
  return (
    <main className="bg-white flex flex-col items-center justify-center">
      {/* NAVBAR SECTION */}
      <nav className="text-black flex flex-row w-full items-center px-44">
        <a href="/" className="w-3/12 flex flex-row items-center justify-start">
          <Image src="/logo.jpg" alt="DOCTOR AI LOGO" width={100} height={10} />
          <h1 className="font-bold text-xl">DOCTOR AI</h1>
        </a>
        <div className="w-4/12 flex justify-end">
          <ul className="flex flex-row items-center">
            <li>
              <a href="#" className="hover:underline">
                Quienes somos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center mx-10 hover:underline"
              >
                Servicios{" "}
                <Image
                  src="/black_dropdown.png"
                  alt="BLACK DROPDOWN"
                  width={20}
                  height={10}
                />
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Recursos
              </a>
            </li>
          </ul>
        </div>
        <div className="w-5/12 flex justify-end">
          <ul className="flex flex-row items-center">
            <li>
              <a
                href="/auth/login"
                className="mr-5 border-2 border-black px-5 py-2 rounded-2xl hover:bg-black hover:text-white"
              >
                Iniciar Sesion
              </a>
            </li>
            <li>
              <a
                href="/auth/signin"
                className="bg-black text-white px-5 py-2 rounded-xl border-2 border-black hover:bg-gray-300 hover:text-black hover:border-white"
              >
                Registrarme
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="w-full max-w-md mt-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inicio de Sesion
          </h1>
          <p className="text-gray-600">
            Sistema de Diagnóstico con Deep Learning
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="doctor@hospital.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar Sesion
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6 mb-10">
          ¿No tienes una cuenta aun?{" "}
          <a
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Registrarme
          </a>
        </p>
      </div>
      {/* FOOTER SECTION */}
      <footer className="text-black bg-gray-300 w-full flex flex-row px-20 pt-10 pb-15">
        <div className="w-1/4 pr-9">
          <h1 className="font-extrabold text-2xl">DOCTOR AI</h1>
          <h2 className="mt-1 mb-4">
            Ahorre tiempo y esfuerzos en reconocer diferentes tipos de imagenes
            radeologicas
          </h2>
          <div className="flex flex-row items-center">
            <Image
              src="/facebook.png"
              alt="FACEBOOK LOGO"
              width={40}
              height={20}
            />
            <Image
              src="/instagram.png"
              alt="INSTAGRAM LOGO"
              className="mx-4"
              width={40}
              height={20}
            />
            <Image src="/tiktok.png" alt="TIKTOK LOGO" width={40} height={20} />
            <Image
              src="/x.png"
              alt="X LOGO"
              width={40}
              height={20}
              className="ml-4"
            />
          </div>
        </div>
        <div className="w-1/4 flex flex-col">
          <h1 className="font-extrabold text-xl mb-2">Empresa</h1>
          <a href="">Politica de privacidad</a>
          <a href="">Terminos y Condiciones</a>
        </div>
        <div className="w-1/4 flex flex-col">
          <h1 className="font-extrabold text-xl mb-2">Casos de uso</h1>
          <a href="">Para Medicos</a>
          <a href="">Para Psiquiatras</a>
          <a href="">Para Psicoterapeutas</a>
          <a href="">Para Nutricionistas y Dietistas</a>
        </div>
        <div className="w-1/4 flex flex-col">
          <h1 className="font-extrabold text-xl mb-2">Soporte</h1>
          <a href="">Preguntas frecuentes</a>
          <a href="">Contactenos</a>
          <a href="">Programe una demostracion</a>
        </div>
      </footer>
    </main>
  );
}
