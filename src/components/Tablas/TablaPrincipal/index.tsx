import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { CalculadoraContext } from "../../../contexts/calculadora.context";
import { useContext } from "react";

const columns: { key: string; label: string }[] = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "fecha",
    label: "FECHA",
  },
  {
    key: "comercio",
    label: "COMERCIO",
  },
  {
    key: "precioNeto",
    label: "PRECIO NETO",
  },
  {
    key: "importeRestar",
    label: "IMPORTE A RESTAR",
  },
  {
    key: "comprador",
    label: "COMPRADOR",
  },
  {
    key: "cantidadProductos",
    label: "CANTIDAD PRODUCTOS",
  },
];

export default function TablaPrincipal() {
  const { comprasPrimarias } = useContext(CalculadoraContext);

  console.log(comprasPrimarias);

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={[]}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
