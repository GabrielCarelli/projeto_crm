import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="container mx-auto flex flex-col items-center">
        <section className="text-center max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Gerencie suas vendas de carros com facilidade e eficiência
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Nosso CRM automotivo é a solução completa para acompanhar clientes, agendar contatos e transformar oportunidades em vendas.
          </p>
          <div className="flex justify-center">
            <Button className="text-lg px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full shadow-lg transition duration-200 flex items-center gap-2">
              Comece agora <MoveRight size={20} />
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
          <Card className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">Funil de Vendas</h2>
              <p className="text-gray-600">
                Visualize claramente cada etapa da negociação e acompanhe seus leads até a conversão.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">Gestão de Clientes</h2>
              <p className="text-gray-600">
                Tenha controle total sobre os dados dos seus clientes e histórico de interações.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">Tarefas e Lembretes</h2>
              <p className="text-gray-600">
                Nunca perca uma oportunidade com agendamentos e alertas integrados.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
