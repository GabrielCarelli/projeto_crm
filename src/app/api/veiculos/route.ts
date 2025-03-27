import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const novoVeiculo = await prisma.veiculo.create({
      data: {
        marca: data.marca,
        modelo: data.modelo,
        ano: Number(data.ano),
        placa: data.placa,
      },
    });

    return NextResponse.json(novoVeiculo, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    return NextResponse.json({ error: 'Erro ao criar veículo' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const veiculos = await prisma.veiculo.findMany({
      orderBy: { marca: 'asc' },
    });
    return NextResponse.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    return NextResponse.json({ error: 'Erro ao buscar veículos' }, { status: 500 });
  }
}
