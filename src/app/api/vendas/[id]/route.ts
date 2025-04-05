import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    const venda = await prisma.vendas.findUnique({
      where: { id: Number(id) },
      include: { cliente: true, veiculo: true },
    });

    if (!venda) {
      return NextResponse.json({ error: "Venda não encontrada" }, { status: 404 });
    }

    return NextResponse.json(venda);
  } catch (error) {
    console.error("Erro ao buscar venda:", error);
    return NextResponse.json({ error: "Erro ao buscar venda" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    const data = await request.json();
    const vendaAtualizada = await prisma.vendas.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(vendaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar venda:", error);
    return NextResponse.json({ error: "Erro ao atualizar venda" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    await prisma.vendas.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Venda deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar venda:", error);
    return NextResponse.json({ error: "Erro ao deletar venda" }, { status: 500 });
  }
}
