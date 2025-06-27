export async function askOpenAI({
  prompt,
  model = 'gpt-3.5-turbo',
  systemPrompt,
}: {
  prompt: string;
  model: string;
  systemPrompt?: string;
}) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? 'Não consegui entender.';
}
