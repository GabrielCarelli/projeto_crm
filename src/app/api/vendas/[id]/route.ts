import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const venda = await prisma.vendas.findUnique({
      where: { id: Number(params.id) },
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const vendaAtualizada = await prisma.vendas.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(vendaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar venda:", error);
    return NextResponse.json({ error: "Erro ao atualizar venda" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vendas.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Venda deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar venda:", error);
    return NextResponse.json({ error: "Erro ao deletar venda" }, { status: 500 });
  }
}
