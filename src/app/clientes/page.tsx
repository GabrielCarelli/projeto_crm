/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    veiculo?: string;
    nota?: string;
  }

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    veiculo: "",
    nota: "",
  });
const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    try {
      const res = await fetch("/api/clientes");
      if (!res.ok) {
        throw new Error(`Erro ao buscar clientes: ${res.status}`);
      }
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nome: "", email: "", telefone: "", veiculo: "", nota: "" });
      fetchClientes();
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/clientes/${id}`, {
      method: "DELETE",
    });
    fetchClientes();
  }

  function preencherFormulario(cliente: Cliente) {
    setForm({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      veiculo: cliente.veiculo || "",
      nota: cliente.nota || "",
    });
    setEditandoId(cliente.id);
  }
  return (
    <main className="min-h-screen w-full bg-zinc-900 text-green-500 px-6 py-12 flex flex-col items-center">
        <section className='text-center text-5xl max-w-3xl'>
            <h1 className='text-green-500 font-bold mb-6 leading-tight'>
                Clientes
            </h1>
        </section>
        <form onSubmit={handleSubmit} className="grid gap-4 mb-12 max-w-xl">
        <Input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
        />
        <Input
          placeholder="Veículo"
          value={form.veiculo}
          onChange={(e) => setForm({ ...form, veiculo: e.target.value })}
        />
        <Input
          placeholder="Nota"
          value={form.nota}
          onChange={(e) => setForm({ ...form, nota: e.target.value })}
        />
        <Button type="submit">Registrar Cliente</Button>
      </form>
      <section className="w-full">
      <Table className="bg-zinc-800 border border-zinc-700 rounded-lg">
        <TableHeader>
            <TableRow>
            <TableHead className="text-zinc-100">Nome</TableHead>
            <TableHead className="text-zinc-100">Email</TableHead>
            <TableHead className="text-zinc-100">Telefone</TableHead>
            <TableHead className="text-zinc-100">Veículo</TableHead>
            <TableHead className="text-zinc-100">Nota</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {clientes.map((cliente) => (
            <TableRow key={cliente.id} className="hover:bg-zinc-700/30">
                <TableCell className="text-zinc-300">{cliente.nome}</TableCell>
                <TableCell className="text-zinc-300">{cliente.email}</TableCell>
                <TableCell className="text-zinc-300">{cliente.telefone}</TableCell>
                <TableCell className="text-zinc-300">{cliente.veiculo || "-"}</TableCell>
                <TableCell className="text-zinc-300">{cliente.nota || "-"}</TableCell>
                 <TableCell className="text-zinc-300 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => preencherFormulario(cliente)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(cliente.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
      </section>
    </main>
  )
}
