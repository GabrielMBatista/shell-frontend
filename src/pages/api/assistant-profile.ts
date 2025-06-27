import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { method } = req;

  if (method === 'GET') {
    const profile = await prisma.assistantProfile.findUnique({
      where: { userId: user.id },
    });
    return res.status(200).json(profile);
  }

  if (method === 'POST') {
    const exists = await prisma.assistantProfile.findUnique({ where: { userId: user.id } });
    if (exists) return res.status(409).json({ error: 'Profile already exists' });

    const { name, personality, avatarUrl, avatarBase64, model } = req.body;

    const profile = await prisma.assistantProfile.create({
      data: {
        userId: user.id,
        name,
        personality,
        avatarUrl,
        avatarBase64,
        model,
      },
    });

    return res.status(201).json(profile);
  }

  if (method === 'PUT') {
    const { name, personality, avatarUrl, avatarBase64, model } = req.body;

    const updated = await prisma.assistantProfile.update({
      where: { userId: user.id },
      data: {
        name,
        personality,
        avatarUrl,
        avatarBase64,
        model,
      },
    });

    return res.status(200).json(updated);
  }

  return res.status(405).end();
}
