import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-zinc-900 text-green-500 px-6 py-12 flex flex-col items-center">
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Gerencie suas vendas de carros com facilidade e eficiência
        </h1>
        <p className="text-green-300 text-lg mb-8">
          Nosso CRM automotivo é a solução completa para acompanhar clientes, agendar contatos e transformar oportunidades em vendas.
        </p>
        <div className="flex justify-center">
          <Button className="text-lg px-8 py-4 bg-green-800 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 flex gap-2 items-center" >
            Comece agora <MoveRight size={20} />
          </Button>
        </div>
        
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">Funil de Vendas</h2>
            <p className="text-zinc-400">
              Visualize claramente cada etapa da negociação e acompanhe seus leads até a conversão.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">Gestão de Clientes</h2>
            <p className="text-zinc-400">
              Tenha controle total sobre os dados dos seus clientes e histórico de interações.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">Tarefas e Lembretes</h2>
            <p className="text-zinc-400">
              Nunca perca uma oportunidade com agendamentos e alertas integrados.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
