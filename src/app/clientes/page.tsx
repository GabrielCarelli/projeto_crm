"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  veiculo?: string;
  vendedorId: number;
  etapa?: string;
}

const initialFormState = {
  nome: '',
  email: '',
  telefone: '',
  veiculo: '',
  vendedorId: 0,
  etapa: 'NOVO',
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    try {
      const res = await fetch('/api/clientes');
      if (!res.ok) throw new Error(`Erro ao buscar clientes: ${res.status}`);
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = '/api/clientes';
    const method = editandoId ? 'PUT' : 'POST';
    const payload = editandoId ? { id: editandoId, ...form } : form;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm(initialFormState);
      setEditandoId(null);
      fetchClientes();
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
    fetchClientes();
  }

  function handleEdit(cliente: Cliente) {
    setForm({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      veiculo: cliente.veiculo || '',
      vendedorId: cliente.vendedorId,
      etapa: cliente.etapa || 'NOVO',
    });
    setEditandoId(cliente.id);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'vendedorId' ? Number(value) : value,
    });
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 sm:mb-0">Clientes</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg">
                Criar novo cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold mb-4">Registrar novo cliente</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full"
                />
                <Input
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full"
                />
                <Input
                  placeholder="Telefone"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full"
                />
                <Input
                  placeholder="Veículo"
                  name="veiculo"
                  value={form.veiculo}
                  onChange={handleChange}
                  className="w-full"
                />
                <Input
                  placeholder="Vendedor ID"
                  name="vendedorId"
                  type="number"
                  value={form.vendedorId}
                  onChange={handleChange}
                  className="w-full"
                />
                <Input
                  placeholder="Etapa"
                  name="etapa"
                  value={form.etapa}
                  onChange={handleChange}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  {editandoId ? 'Atualizar Cliente' : 'Registrar Cliente'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>
        <section>
          <Table className="bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id} className="hover:bg-gray-100">
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell>{cliente.veiculo || '-'}</TableCell>
                  <TableCell>{cliente.etapa}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(cliente)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(cliente.id)}>
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  );
}
