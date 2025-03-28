import { Button } from '@/components/ui/button'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function Carros() {

  return (
    <main className="min-h-screen w-full bg-zinc-900 text-green-500 px-6 py-12 flex flex-col items-center">
      <section className='w-full max-w-4xl flex justify-between items-center'>
        <h1 className='text-green-500 font-bold text-5xl leading-tight'>Veículos</h1>

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
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Modelo do veículo" className="px-4 py-2 rounded bg-zinc-700" />
                <input type="text" placeholder="Placa" className="px-4 py-2 rounded bg-zinc-700" />
                <Button type="submit">Salvar veículo</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  )
}
