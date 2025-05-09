import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const vendas = await prisma.vendas.findMany({
      include: {
        cliente: true,
        veiculo: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(vendas);
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return NextResponse.json({ error: "Erro ao buscar vendas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const novaVenda = await prisma.vendas.create({
      data: {
        clienteId: Number(data.clienteId),
        veiculoId: Number(data.veiculoId),
        status: data.status || "NOVO",
        valor: data.valor,
      },
    });

    return NextResponse.json(novaVenda, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    return NextResponse.json({ error: "Erro ao criar venda" }, { status: 500 });
  }
}
