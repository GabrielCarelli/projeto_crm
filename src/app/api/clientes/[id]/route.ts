import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    _req: Request,
    {params}: {params:{id: string}}
){
    const cliente = await prisma.cliente.findUnique({
        where: {id: Number(params.id)},
    });

    if(!cliente) return NextResponse.json({error: 'Cliente não encontrado'}, {status: 404});
    return NextResponse.json(cliente);
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, vendedorId, ...updateData } = data;

    if (vendedorId !== undefined) {
      updateData.vendedorId = Number(vendedorId);
    }

    const clienteAtualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.cliente.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    return NextResponse.json({ error: 'Erro ao deletar cliente' }, { status: 500 });
  }
}