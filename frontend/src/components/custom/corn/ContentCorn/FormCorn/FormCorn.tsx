import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IFormCornProps } from "./FormCorn.types";
import { RATE_LIMIT_PER_MINUTE } from "@/constants";
import Cookies from "js-cookie";

const formSchema = z.object({
  clientId: z
    .string()
    .min(1, { message: "El ID del cliente es obligatorio." })
    .max(50, {
      message: "El ID del cliente no puede exceder los 50 caracteres.",
    }),
});

export function FormCorn(props: IFormCornProps) {
  const { handleBuyCorn, corns } = props;
  const [cooldown, setCooldown] = useState(0); //? Estado para el contador

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: Cookies.get("clientId") || "",
    },
  });

  const clientId = Cookies.get("clientId") || "";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (cooldown > 0) return; //? Si el contador está activo, no permitir compras
    await handleBuyCorn(values.clientId);
    form.reset();
    setCooldown(RATE_LIMIT_PER_MINUTE); //? Inicia el contador en 60 segundos después de la compra
  };

  //? Maneja el contador
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); //? Limpia el intervalo al desmontar el componente
    }
  }, [cooldown]);

  return (
    <div className="w-1/3 p-6 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Formulario de Compra</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID del Cliente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa el ID del cliente"
                    {...field}
                    readOnly={!!clientId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-3 text-lg"
            disabled={cooldown > 0} //? Deshabilitar el botón si el contador está activo
          >
            {cooldown > 0 ? `Espera ${cooldown} segundos` : "Comprar Maíz 🌽"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <p className="text-lg font-medium">
          Cantidad de maíz comprado: {corns?.length || 0}
        </p>
      </div>
    </div>
  );
}
