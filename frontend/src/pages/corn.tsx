import { FormCorn, HeaderCorn } from "@/components/custom";
import { Progress } from "@/components/ui/progress";
import { useCorn } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { ListBuysCorn } from "../components/custom/corn/ContentCorn/ListBuysCorn/ListBuysCorn";

export function Corn() {
  const { buyCorn, getAll, loading, corns } = useCorn();
  const { toast } = useToast();

  useEffect(() => {
    try {
      getAll(); //? Carga inicial de datos paginados
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error al cargar datos",
        description:
          err?.response?.data?.message ||
          err.message ||
          "Ha ocurrido un error al cargar los datos.",
      });
    }
  }, []);

  const handleBuyCorn = async () => {
    try {
      await buyCorn();
      getAll(); //? Refresca los datos paginados después de comprar
      toast({
        variant: "default",
        title: "🌽 Compra exitosa",
        description: "Maíz comprado exitosamente.",
        color: "#3B82F6",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error al comprar maíz",
        description:
          err?.response?.data?.message ||
          err.message ||
          "Ha ocurrido un error al comprar maíz.",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderCorn />

      {/* Content: Formulario y tabla */}
      <div className="flex flex-1 bg-gray-50">
        <FormCorn handleBuyCorn={handleBuyCorn} corns={corns} />

        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Cargando datos...</h2>
            <Progress value={50} className="w-1/2" />
          </div>
        ) : (
          <ListBuysCorn corns={corns} />
        )}
      </div>
    </div>
  );
}
