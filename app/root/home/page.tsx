"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import * as tmImage from "@teachablemachine/image";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [model, setModel] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = "/models/model.json";
      const metadataURL = "/models/metadata.json";

      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setResult(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !model) return;

    setAnalyzing(true);

    try {
      const img = new window.Image();
      img.src = preview as string;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const predictions = await model.predict(img);

      const sorted = predictions.sort(
        (a: any, b: any) => b.probability - a.probability,
      );

      const topPrediction = sorted[0];

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diagnosis: topPrediction.className,
        }),
      });

      const data = await response.json();

      setResult({
        diagnosis: topPrediction.className,
        confidence: (topPrediction.probability * 100).toFixed(2),
        details: `Clasificación automática del modelo Teachable Machine`,
        recommendations: data.recommendations
          .split("\n")
          .filter((line: string) => line.trim() !== ""),
      });
    } catch (error) {
      console.error(error);
    }

    setAnalyzing(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.replace("/auth/welcome");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="DOCTOR AI LOGO"
                width={80}
                height={40}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Diagnóstico IA
                </h1>
                <p className="text-sm text-gray-600">
                  Sistema de análisis de rayos X
                </p>
              </div>
            </div>
            <button
              onClick={() => handleLogout()}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm hover:cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cargar Imagen de Rayos X
            </h2>

            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition cursor-pointer"
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    PNG, JPG o WEBP hasta 10MB
                  </p>
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                    Seleccionar archivo
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto bg-gray-50"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {analyzing ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analizando...
                      </>
                    ) : (
                      "Analizar Imagen"
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cambiar
                  </button>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">
                    Recomendaciones
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • Asegúrate de que la imagen sea clara y bien iluminada
                    </li>
                    <li>• Formatos aceptados: PNG, JPG, WEBP</li>
                    <li>
                      • El análisis es una herramienta de apoyo, no sustituye el
                      criterio médico
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resultados del Análisis
            </h2>

            {!result && !analyzing && (
              <div className="border border-gray-200 rounded-lg p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Los resultados del análisis aparecerán aquí una vez que se
                  complete el procesamiento
                </p>
              </div>
            )}

            {analyzing && (
              <div className="border border-gray-200 rounded-lg p-12 text-center">
                <svg
                  className="animate-spin h-12 w-12 mx-auto mb-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-900 font-medium">
                  Procesando imagen...
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  El modelo de IA está analizando la imagen
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Diagnosis Card */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Diagnóstico
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {result.diagnosis}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Confianza</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {result.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Detalles del Análisis
                  </h3>
                  <p className="text-gray-700">{result.details}</p>
                </div>

                {/* Recommendations */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Recomendaciones
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map(
                      (rec: string, index: number) => (
                        <li key={index} className="flex gap-2 text-gray-700">
                          <svg
                            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {rec}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                    Descargar Reporte
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                    Guardar en Historial
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
