import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        vendedor: true,
        vendas: { include: { veiculo: true } },
        ligacoes: true,
      },
      orderBy: { criadoEm: 'desc' },
    });
    return NextResponse.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const novoCliente = await prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        veiculo: data.veiculo,
        vendedorId: Number(data.vendedorId),
        etapa: data.etapa || 'NOVO',
        vendas: data.vendas ? { create: data.vendas } : undefined,
        ligacoes: data.ligacoes ? { create: data.ligacoes } : undefined,
      },
    });
    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 });
  }
}

