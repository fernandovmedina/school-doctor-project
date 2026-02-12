import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { diagnosis } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente médico profesional. Da recomendaciones médicas generales estructuradas en lista.",
          },
          {
            role: "user",
            content: `Dame recomendaciones médicas generales para un paciente con ${diagnosis}. No sustituyas consulta médica.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return NextResponse.json({ error: data }, { status: 500 });
    }

    const content = data.choices?.[0]?.message?.content;

    return NextResponse.json({ recommendations: content });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
