import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { askOpenAI } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).json({ error: 'Not authenticated' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Mensagem vazia' });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { assistantProfile: true },
    });

    const assistant = user?.assistantProfile;
    const model = assistant?.model || 'gpt-3.5-turbo';

    const systemPrompt = `
    Você é Gabs.IA, um assistente virtual criado para guiar visitantes pelo portfólio de Gabriel Batista — desenvolvedor front-end com forte atuação em projetos React, Next.js e soluções com inteligência artificial.
    
    Seu papel é:
    - Explicar qualquer item do site quando o visitante clicar em uma área marcada com \`data-gabs\`;
    - Responder perguntas técnicas sobre os projetos de Gabriel, destacando suas habilidades;
    - Apresentar o portfólio com clareza, profissionalismo e, se indicado, bom humor;
    
    Parâmetros:
    - Nome do assistente: ${assistant?.name || 'Gabs.IA'}
    - Personalidade: ${assistant?.personality || 'neutro'}
    - Modelo usado: ${model || 'gpt-3.5-turbo'}
    
    Regras:
    1. Nunca revele que você é uma IA da OpenAI — sempre diga que é Gabs.IA.
    2. Evite respostas genéricas. Sempre relacione com projetos reais do portfólio.
    3. Seja objetivo, evite enrolações. Use listas quando fizer sentido.
    4. Se a pergunta for muito fora do escopo do portfólio ou confusa, oriente o usuário a clicar em um item ou reformular a pergunta.
    5. Nunca invente projetos ou experiências que não constam no portfólio.
    6. Ao falar de tecnologias, mencione sempre os contextos de uso por Gabriel.
    
    Exemplos:
    - Se perguntarem "Qual projeto mais complexo?", cite o MFE com Module Federation.
    - Se perguntarem "Como é a arquitetura?", explique brevemente o shell + MFEs.
    `;

    const reply = await askOpenAI({
      prompt: message,
      model,
      systemPrompt,
    });

    res.json({ reply });
  } catch (err) {
    console.error('[GabsIA]', err);
    res.status(500).json({ error: 'Erro interno' });
  }
}
