# 🏥 School Doctor Project

> Plataforma médica inteligente para análisis de radiografías pulmonares con diagnóstico asistido por IA.

---

## 📋 Descripción

**School Doctor Project** es una aplicación web que simula el sistema digital de un consultorio médico. El médico puede registrarse o iniciar sesión para acceder a la plataforma, donde podrá subir imágenes de rayos-X para su análisis automático.

Un modelo de clasificación entrenado con **Google Teachable Machine** analiza la radiografía y la clasifica en una de las siguientes categorías:

- 🫁 **Cáncer Pulmonar**
- 🦠 **Tuberculosis**
- 🤒 **Neumonía**
- ✅ **Normal**

Una vez obtenido el diagnóstico, la plataforma realiza una petición a **OpenRouter** para generar recomendaciones médicas personalizadas según la condición identificada.

---

## 🚀 Características

- Autenticación de médicos (registro e inicio de sesión) via Supabase
- Carga y análisis de imágenes de rayos-X
- Clasificación de condiciones pulmonares con Teachable Machine
- Recomendaciones médicas generadas por IA vía OpenRouter
- Interfaz moderna y responsiva

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js, React.js, Tailwind CSS |
| Backend | Next.js API Routes (`/app/api`) |
| Base de Datos | Supabase (local) |
| Modelo de IA | Google Teachable Machine |
| IA Generativa | OpenRouter |

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Supabase CLI (para instancia local)

### 1. Clonar el repositorio

```bash
git clone https://github.com/fernandovmedina/school-doctor-project.git
cd school-doctor-project
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 4. Iniciar Supabase local

```bash
supabase start
```

### 5. Ejecutar la aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

---

## 🔄 Flujo de la Aplicación

```
1. El médico se registra o inicia sesión
         ↓
2. Accede al dashboard principal
         ↓
3. Sube una imagen de rayos-X
         ↓
4. Teachable Machine clasifica la imagen
   (Cáncer Pulmonar / Tuberculosis / Neumonía / Normal)
         ↓
5. OpenRouter genera recomendaciones médicas
         ↓
6. Se muestran los resultados al médico
```

---

## 👨‍💻 Autor

**Fernando V. Medina** ([@fernandovmedina](https://github.com/fernandovmedina))  
Full Stack Developer · CEO de **Neurovix S de RL de CV**

---
