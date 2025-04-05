import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, telefone } = await request.json();

    if (!name || !email || !telefone) {
      return NextResponse.json({ error: "Dados obrigatórios faltando." }, { status: 400 });
    }

    const novoVendedor = await prisma.vendedor.create({
      data: { name, email, telefone },
    });

    return NextResponse.json(novoVendedor, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar vendedor:", error);
    return NextResponse.json({ error: "Erro interno ao criar vendedor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const vendedores = await prisma.vendedor.findMany();
    return NextResponse.json(vendedores);
  } catch (error) {
    console.error("Erro ao buscar vendedores:", error);
    return NextResponse.json({ error: "Erro ao buscar vendedores" }, { status: 500 });
  }
}
