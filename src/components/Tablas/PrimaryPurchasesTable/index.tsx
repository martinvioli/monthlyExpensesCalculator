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
import { DeleteIcon } from "./deleteIcon";
import IPrimaryPurchase from "../../../interfaces/primary-purchase.interface";
import { convertToArs } from "../../../helpers/calcules";

const columns: { key: string; label: string }[] = [
	{
		key: "id",
		label: "#",
	},
	{
		key: "date",
		label: "FECHA",
	},
	{
		key: "store",
		label: "COMERCIO",
	},
	{
		key: "spentPrice",
		label: "PRECIO NETO",
	},
	{
		key: "substractAmount",
		label: "IMPORTE A RESTAR",
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

export default function PrimaryPurchasesTable() {
	const {
		primaryPurchases,
		setPrimaryPurchases,
		secondaryPurchases,
		setSecondaryPurchases,
	} = useContext(PurchasesContext);

	const deletePurchase = (id: number) => {
		const filteredArraySP = secondaryPurchases.filter(
			(sp) => sp.primaryPurchaseId !== id
		);
		setSecondaryPurchases(filteredArraySP);
		const filteredArrayPP = primaryPurchases.filter((pp) => pp.id !== id);
		setPrimaryPurchases(filteredArrayPP);
	};

	const renderCell =
		(item: IPrimaryPurchase, columnKey: Key) => {
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
				case "substractAmount":
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
				{primaryPurchases.map(pp => <TableRow key={pp.id}>{columns.map((columnKey) => <TableCell key={pp.id + columnKey.key}>{renderCell(pp, columnKey.key)}</TableCell>)}</TableRow>)}
			</TableBody>
		</Table>
	);
}
