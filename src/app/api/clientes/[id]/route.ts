import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.pathname.split("/").pop(); // extrai o ID da URL

    const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) },
    });

    if (!cliente) {
        return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json(cliente);
}

export async function PUT(request: NextRequest) {
    const id = request.nextUrl.pathname.split("/").pop();
    const data = await request.json();

    const clienteAtualizado = await prisma.cliente.update({
        where: { id: Number(id) },
        data,
    });

    return NextResponse.json(clienteAtualizado);
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.pathname.split("/").pop();

    await prisma.cliente.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
}
