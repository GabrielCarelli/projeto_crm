'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

interface Veiculo {
  id: string;
  modelo: string;
  marca: string;
  placa: string;
  ano: number;
}

export default function Carros() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [formData, setFormData] = useState({
    modelo: '',
    marca: '',
    placa: '',
    ano: '',
  });
  
  
  
// lib/api.ts

  async function fetchVeiculos() {
  const res = await fetch('/api/veiculos', { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar veículos');
  return res.json();
}

 async function criarVeiculo(dados: {
  modelo: string;
  placa: string;
  marca: string;
  ano: number;
}) {
  const res = await fetch('/api/veiculos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error('Erro ao criar veículo');
  return res.json();
}


  const carregarVeiculos = async () => {
    try {
      const dados = await fetchVeiculos();
      setVeiculos(dados);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarVeiculo({
        ...formData,
        ano: Number(formData.ano),
      });
      setFormData({ modelo: '', placa: '', marca: '', ano: '' });
      carregarVeiculos(); // Recarrega a lista
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen w-full bg-zinc-900 text-green-500 px-6 py-12 flex flex-col items-center">
      <section className="w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-green-500 font-bold text-5xl leading-tight">Veículos</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-zinc-100 rounded-2xl">
              Criar novo veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>Registrar novo veículo</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="marca"
                  placeholder="Marca do veículo"
                  value={formData.marca}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-zinc-700"
                />
                <input
                  type="text"
                  name="modelo"
                  placeholder="Modelo do veículo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-zinc-700"
                />
                <input
                  type="text"
                  name="placa"
                  placeholder="Placa"
                  value={formData.placa}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-zinc-700"
                />
                <input
                  type="number"
                  name="ano"
                  placeholder="Ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-zinc-700"
                />
                <Button type="submit">Salvar veículo</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <section className="mt-12 w-full max-w-4xl">
        <ul className="space-y-4">
          {veiculos.map((v) => (
            <li key={v.id} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{v.marca} {v.modelo}</p>
                <p className="text-sm text-zinc-400">Placa: {v.placa} | Ano: {v.ano}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
