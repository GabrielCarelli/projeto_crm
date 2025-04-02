"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Veiculo {
  id: string;
  modelo: string;
  marca: string;
  placa: string;
  ano: number;
}

const initialFormState = {
  marca: '',
  modelo: '',
  placa: '',
  ano: '',
};

async function fetchVeiculos() {
  const res = await fetch('/api/veiculos', { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar veículos');
  return res.json();
}

async function criarVeiculo(dados: { marca: string; modelo: string; placa: string; ano: number }) {
  const res = await fetch('/api/veiculos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao criar veículo');
  return res.json();
}

export default function Carros() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  const loadVeiculos = async () => {
    try {
      const data = await fetchVeiculos();
      setVeiculos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVeiculos();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await criarVeiculo({
        ...formData,
        ano: Number(formData.ano),
      });
      setFormData(initialFormState);
      loadVeiculos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Veículos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg">
                Criar novo veículo
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold mb-4">Registrar novo veículo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="marca"
                  placeholder="Marca do veículo"
                  value={formData.marca}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-gray-200 w-full"
                />
                <input
                  type="text"
                  name="modelo"
                  placeholder="Modelo do veículo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-gray-200 w-full"
                />
                <input
                  type="text"
                  name="placa"
                  placeholder="Placa"
                  value={formData.placa}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-gray-200 w-full"
                />
                <input
                  type="number"
                  name="ano"
                  placeholder="Ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-gray-200 w-full"
                />
                <Button type="submit" className="w-full">
                  Salvar veículo
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>
        <section>
          <ul className="space-y-4">
            {veiculos.map((v) => (
              <li key={v.id} className="bg-white shadow-md p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    {v.marca} {v.modelo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Placa: {v.placa} | Ano: {v.ano}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
