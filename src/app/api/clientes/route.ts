import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(){
    const clientes = await prisma.client.findMany({
        orderBy: {criadoEm: 'desc'},
    });

    return NextResponse.json(clientes);
}

export async function POST(req: Request){
    const data = await req.json();
    const novoCliente = await prisma.cliente.create({
        data:{
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            veiculo: data.veiculo || '',
            nota: data.nota || '',
        },
    });

    return NextResponse.json(novoCliente, {status: 201});
}