import Image from "next/image";

export default async function Welcome() {

  return (
    <main className="bg-gray-300 pb-6">
      {/* NAVBAR SECTION */}
      <nav className="text-black flex flex-row w-full items-center px-44 bg-white">
        <div className="w-3/12 flex flex-row items-center justify-start">
          <Image src="/logo.jpg" alt="DOCTOR AI LOGO" width={100} height={10} />
          <h1 className="font-bold text-xl">DOCTOR AI</h1>
        </div>
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
      {/* HERO SECTION */}
      <section className="text-black w-full flex flex-row px-40 py-20 bg-white">
        <div className="w-1/2 flex flex-col justify-start my-auto">
          <h1 className="text-5xl font-extrabold">Tu mano derecha en la gestion medica</h1>
          <p className="mt-4">Registra tus consultas sin esfuerzo, genera reportes y obtenga respuestas seguras con nuestros modelos de IA</p>
          <a href="/auth/signin" className="mt-7 bg-black text-white font-bold rounded-2xl w-48 text-center py-3 hover:bg-gray-400">Registrarse gratis</a>
        </div>
        <div className="w-1/2">
          <Image src="/hero.webp" alt="HERO IMAGE" width={500} height={500} />
        </div>
      </section>
      {/* FOOTER SECTION */}
      <footer className="text-black bg-gray-300 w-full flex flex-row px-20 pt-5">
        <div className="w-1/4 pr-9">
          <h1 className="font-extrabold text-2xl">DOCTOR AI</h1>
          <h2 className="mt-1 mb-4">Ahorre tiempo y esfuerzos en reconocer diferentes tipos de imagenes radeologicas</h2>
          <div className="flex flex-row items-center">
            <Image src="/facebook.png" alt="FACEBOOK LOGO" width={40} height={20} />
            <Image src="/instagram.png" alt="INSTAGRAM LOGO" className="mx-4" width={40} height={20} />
            <Image src="/tiktok.png" alt="TIKTOK LOGO" width={40} height={20} />
            <Image src="/x.png" alt="X LOGO" width={40} height={20} className="ml-4" />
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
      <h1 className="bg-gray-300 text-center mt-10">Todos los derechos reservados a <a href="https://github.com/fernandovmedina" className="hover:underline font-bold">Fernando Vazquez (Full-Stack Developer)</a></h1>
    </main>
  );
}
