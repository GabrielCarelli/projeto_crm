"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
interface Vendedor{
  id: number;
  name: string;
  email: string;
  telefone: string;
}
export default function Vendedor() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    telefone: '',
  });
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);

  useEffect(() =>{
    fetchVendedores();
  }, []);

  async function fetchVendedores(){
    try{
      const res = await fetch('/api/vendedores');
      if(!res.ok) throw new Error(`Erro ao buscar vendedores: ${res.status}`);
      const data = await res.json();
      setVendedores(data);
    } catch(error){
      console.error('erro ao buscar vendedores: ', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/vendedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: '', email: '', telefone: '' });
      alert('Vendedor criado com sucesso!');
    } else {
      alert('Erro ao criar vendedor');
    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100 px-6 py-12 flex flex-col items-center">
      <section className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-6">Criar Vendedor</h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
          <Button type="submit">Cadastrar Vendedor</Button>
        </form>
      </section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendedores.map((vendedor) => (
            <TableRow key={vendedor.id}>
              <TableCell>{vendedor.id}</TableCell>
              <TableCell>{vendedor.name}</TableCell>
              <TableCell>{vendedor.email}</TableCell>
              <TableCell>{vendedor.telefone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}