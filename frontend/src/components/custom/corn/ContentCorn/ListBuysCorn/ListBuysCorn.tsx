import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IListBuysCornProps } from "./ListBuysCorn.types";
import { map, size, sortBy } from "lodash";

export function ListBuysCorn(props: IListBuysCornProps) {
  const { corns } = props;
  return (
    <div className="w-2/3 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Registros
      </h2>
      <div className="rounded-md border max-h-96 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-center bg-gray-200 font-semibold">
                Cliente
              </TableHead>
              <TableHead className="text-center bg-gray-200 font-semibold">
                Fecha
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {size(corns) > 0 ? (
              map(sortBy(corns, "timestamp").reverse(), (corn, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center font-medium">
                    {corn.clientId}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.DateTimeFormat("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(corn.timestamp))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No hay registros disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
