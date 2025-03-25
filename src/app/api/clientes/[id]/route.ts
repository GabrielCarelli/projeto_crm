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

export async function PUT(
    req:Request, 
    {params}: {params:{id:string}}
) {
   const data = await req.json();
   const clienteAtualizado  = await prisma.cliente.update({
    where:{id: Number(params.id)},
    data,
   }) 
   return NextResponse.json(clienteAtualizado);
}

export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
  ) {
    
    await prisma.cliente.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
  }