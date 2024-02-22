import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Tooltip,
} from "@nextui-org/react";
import { PurchasesContext } from "../../../contexts/calculadora.context";
import React, { Key, useContext } from "react";
import { DeleteIcon } from "../PrimaryPurchasesTable/deleteIcon";
import ISecondaryPurchase from "../../../interfaces/secondary-purchase.interface";
import { convertToArs } from "../../../helpers/calcules";

const columns: { key: string; label: string }[] = [
	{
		key: "id",
		label: "#",
	},
	{
		key: "primaryPurchaseId",
		label: "COMPRA ASOCIADA",
	},
	{
		key: "date",
		label: "FECHA",
	},
	{
		key: "description",
		label: "DESCRIPCION",
	},
	{
		key: "spentPrice",
		label: "PRECIO NETO",
	},
	{
		key: "buyer",
		label: "COMPRADOR",
	},
	{
		key: "actions",
		label: "ACCIONES",
	},
];

export default function SecondaryPurchasesTable() {
	const { secondaryPurchases, setSecondaryPurchases } =
		useContext(PurchasesContext);

	const deletePurchase = (id: number) => {
		const filteredArray = secondaryPurchases.filter((sp) => sp.id !== id);
		setSecondaryPurchases(filteredArray);
	};

	const renderCell =
		(item: ISecondaryPurchase, columnKey: Key) => {
			const cellValue = getKeyValue(item, columnKey);

			switch (columnKey) {
				case "actions":
					return (
						<div className="relative flex items-center gap-2">
							<Tooltip color="danger" content="Borrar compra">
								<span
									onClick={() => deletePurchase(item.id)}
									className="text-lg text-danger cursor-pointer active:opacity-50"
								>
									<DeleteIcon />
								</span>
							</Tooltip>
						</div>
					);
				case "spentPrice":
					return convertToArs(cellValue);
				default:
					return cellValue;
			}
		}

	return (
		<Table isStriped aria-label="Example table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody>
				{secondaryPurchases.map(sp => <TableRow key={sp.id}>{columns.map((columnKey) => <TableCell key={sp.id + columnKey.key}>{renderCell(sp, columnKey.key)}</TableCell>)}</TableRow>)}
			</TableBody>
		</Table>
	);
}
