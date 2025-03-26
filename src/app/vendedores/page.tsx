"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

export default function Vendedor() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    telefone: '',
  });

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
    </main>
  );
}