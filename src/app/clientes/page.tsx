"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  veiculo?: string;
  vendedorId: number;
  etapa?: string;
}

interface Vendedor {
  id: number;
  name: string;
}

interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
}

const initialFormState = {
  nome: '',
  email: '',
  telefone: '',
  veiculo: '',
  vendedorId: '', 
  etapa: 'NOVO',
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const regexTelefone = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;

  useEffect(() => {
    fetchClientes();
    fetchVendedores();
    fetchVeiculos();
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

  async function fetchVendedores() {
    try {
      const res = await fetch('/api/vendedores');
      if (!res.ok) throw new Error(`Erro ao buscar vendedores: ${res.status}`);
      const data = await res.json();
      setVendedores(data);
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error);
    }
  }

  async function fetchVeiculos() {
    try {
      const res = await fetch('/api/veiculos');
      if (!res.ok) throw new Error(`Erro ao buscar veículos: ${res.status}`);
      const data = await res.json();
      setVeiculos(data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!regexTelefone.test(form.telefone)) {
      alert('Por favor, insira um número de celular válido no formato (XX) 9XXXX-XXXX.');
      return;
    }

    const payload = {
      ...form,
      vendedorId: Number(form.vendedorId),
    };

    const url = '/api/clientes';
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editandoId ? { id: editandoId, ...payload } : payload),
      });
      if (res.ok) {
        setForm(initialFormState);
        setEditandoId(null);
        fetchClientes();
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  }

  const handleEdit = (cliente: Cliente) => {
    setForm({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      veiculo: cliente.veiculo || '',
      vendedorId: String(cliente.vendedorId),
      etapa: cliente.etapa || 'NOVO',
    });
    setEditandoId(cliente.id);
  };

  async function handleDelete(id: number) {
    try {
      await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
      fetchClientes();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Clientes</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
              >
                Registrar novo cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold mb-4">
                  Registrar novo cliente
                </DialogTitle>
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
                  placeholder="Telefone (XX) 9XXXX-XXXX"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full"
                />
                <select
                  name="veiculo"
                  value={form.veiculo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um veículo</option>
                  {veiculos.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.marca} {v.modelo}
                    </option>
                  ))}
                </select>
                <select
                  name="vendedorId"
                  value={form.vendedorId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um vendedor</option>
                  {vendedores.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
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
                <TableHead>Vendedor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map(cliente => (
                <TableRow key={cliente.id} className="hover:bg-gray-100">
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell>{cliente.veiculo || '-'}</TableCell>
                  <TableCell>
                    {vendedores.find(v => v.id === cliente.vendedorId)?.name || '-'}
                  </TableCell>
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
