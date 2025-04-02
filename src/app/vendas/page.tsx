"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Venda {
  id: number;
  clienteId: number;
  cliente: {
    id: number;
    nome: string;
  };
  status: string;
  veiculoId: number;
  veiculo: {
    id: number;
    marca: string;
    modelo: string;
  };
  valor: string;
}

interface Cliente {
  id: number;
  nome: string;
}

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
}

const initialFormState = {
  clienteId: "",
  veiculoId: "",
  valor: "",
};

export default function Vendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    fetchVendas();
    fetchClientes();
    fetchVeiculos();
  }, []);

  async function fetchVendas() {
    try {
      const res = await fetch("/api/vendas");
      if (!res.ok) throw new Error(`Erro ao buscar vendas: ${res.status}`);
      const data = await res.json();
      setVendas(data);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
    }
  }

  async function fetchClientes() {
    try {
      const res = await fetch("/api/clientes");
      if (!res.ok) throw new Error(`Erro ao buscar clientes: ${res.status}`);
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  async function fetchVeiculos() {
    try {
      const res = await fetch("/api/veiculos");
      if (!res.ok) throw new Error(`Erro ao buscar veículos: ${res.status}`);
      const data = await res.json();
      setVeiculos(data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validação simples para campos obrigatórios
    if (!form.clienteId || !form.veiculoId || !form.valor) {
      alert("Preencha todos os campos");
      return;
    }

    const payload = {
      ...form,
      clienteId: Number(form.clienteId),
      veiculoId: Number(form.veiculoId),
    };

    try {
      let res;
      if (editandoId) {
        res = await fetch(`/api/vendas/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/vendas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setForm(initialFormState);
        setEditandoId(null);
        fetchVendas();
      } else {
        alert("Erro ao salvar venda");
      }
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
    }
  }

  const handleEdit = (venda: Venda) => {
    setForm({
      clienteId: String(venda.clienteId),
      veiculoId: String(venda.veiculoId),
      valor: venda.valor,
    });
    setEditandoId(venda.id);
  };

  async function handleDelete(id: number) {
    try {
      await fetch(`/api/vendas/${id}`, { method: "DELETE" });
      fetchVendas();
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Vendas</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
              >
                Registrar nova venda
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold mb-4">
                  {editandoId ? "Atualizar Venda" : "Registrar nova venda"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  name="clienteId"
                  value={form.clienteId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
                <select
                  name="veiculoId"
                  value={form.veiculoId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um veículo</option>
                  {veiculos.map((veiculo) => (
                    <option key={veiculo.id} value={veiculo.id}>
                      {veiculo.marca} {veiculo.modelo}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Valor"
                  name="valor"
                  value={form.valor}
                  onChange={handleChange}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  {editandoId ? "Atualizar Venda" : "Registrar Venda"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>
        <section>
          <Table className="bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendas.map((venda) => (
                <TableRow key={venda.id} className="hover:bg-gray-100">
                  <TableCell>{venda.cliente?.nome || "-"}</TableCell>
                  <TableCell>
                    {venda.veiculo
                      ? `${venda.veiculo.marca} ${venda.veiculo.modelo}`
                      : "-"}
                  </TableCell>
                  <TableCell>{venda.valor} R$</TableCell>
                  <TableCell>{venda.status}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(venda)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(venda.id)}
                    >
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
