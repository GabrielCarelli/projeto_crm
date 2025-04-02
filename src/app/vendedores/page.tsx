"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Vendedor {
  id: number;
  name: string;
  email: string;
  telefone: string;
}

const initialFormState = {
  name: '',
  email: '',
  telefone: '',
};

export default function Vendedor() {
  const [form, setForm] = useState(initialFormState);
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);

  useEffect(() => {
    fetchVendedores();
  }, []);

  async function fetchVendedores() {
    try {
      const res = await fetch('/api/vendedores');
      if (!res.ok) throw new Error(`Erro ao buscar vendedores: ${res.status}`);
      const data = await res.json();
      setVendedores(data);
    } catch (error) {
      console.error('Erro ao buscar vendedores: ', error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/vendedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(initialFormState);
        alert('Vendedor criado com sucesso!');
        fetchVendedores();
      } else {
        alert('Erro ao criar vendedor');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Vendedores</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
              >
                Criar novo vendedor
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold mb-4">
                  Registrar novo vendedor
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Nome"
                  name="name"
                  value={form.name}
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
                <Button type="submit" className="w-full">
                  Cadastrar Vendedor
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>
        <section>
          <Table className="bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedores.map((vendedor) => (
                <TableRow key={vendedor.id} className="hover:bg-gray-100">
                  <TableCell>{vendedor.id}</TableCell>
                  <TableCell>{vendedor.name}</TableCell>
                  <TableCell>{vendedor.email}</TableCell>
                  <TableCell>{vendedor.telefone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  );
}
