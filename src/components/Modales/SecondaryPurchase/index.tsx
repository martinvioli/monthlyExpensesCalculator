import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Checkbox,
	Input,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import { PurchasesContext } from "../../../contexts/calculadora.context";
import ISecondaryPurchase from "../../../interfaces/secondary-purchase.interface";

type Formify<T> = {
	[k in keyof (T)]: string
}

const initialForm = { primaryPurchaseId: '', date: '', description: '', spentPrice: '', buyer: '', }

export default function SecondaryPurchaseModal({
	isOpen,
	onAccept,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onAccept: () => void;
	onClose: () => void;
}>) {

	const { secondaryPurchases, setSecondaryPurchases, primaryPurchases } = useContext(PurchasesContext);

	const [purchaseForm, setPurchaseForm] = useState<Formify<Omit<ISecondaryPurchase, "id">>>(initialForm)

	const savePurchase = () => {
		const id = (secondaryPurchases[secondaryPurchases.length - 1]?.id ?? 0) + 1
		const parsedForm: ISecondaryPurchase = { id, primaryPurchaseId: purchaseForm.primaryPurchaseId ? Number(purchaseForm.primaryPurchaseId) : null, date: Number(purchaseForm.date), description: purchaseForm.description, spentPrice: Number(purchaseForm.spentPrice), buyer: purchaseForm.buyer }
		setSecondaryPurchases([...secondaryPurchases, parsedForm])
	}

	const onFormChange = (evTarget: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
		setPurchaseForm({ ...purchaseForm, [evTarget.name]: evTarget.value })
	}

	const resetForms = () => {
		setPurchaseForm({ ...initialForm, buyer: purchaseForm.buyer })
		setKeepCreating(false)
	}

	const [keepCreating, setKeepCreating] = useState<boolean>(false)

	useEffect(() => {
		resetForms()
	}, [isOpen])

	const firstInputRef = useRef<HTMLInputElement>(null);

	const isPrimaryPurchaseIdValid = (primaryPurchaseId: string) => {
		return primaryPurchaseId === '' ? true : Boolean(primaryPurchases.find(pp => pp.id === Number(primaryPurchaseId)))
	}

	return (
		<Modal isOpen={isOpen} placement="top-center" onClose={() => { onClose() }}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">Crear compra divisible entre 3</ModalHeader>
						<ModalBody>
							<Input ref={firstInputRef} min={0} max={31} onChange={(ev) => onFormChange(ev.target)} name="date" value={purchaseForm.date} type="number" autoFocus label="Dia" placeholder="DD" variant="bordered" />
							<Input

								isRequired
								name="description"
								value={purchaseForm.description}
								label="Descripción"
								placeholder="Ej: docena de empanadas y coca"
								type="text"
								variant="bordered"
								onChange={(ev) => onFormChange(ev.target)}
							/>
							<Input
								startContent={
									<div className="pointer-events-none flex items-center">
										<span className="text-default-400 text-small">$</span>
									</div>
								} isRequired min={0} name="spentPrice" value={purchaseForm.spentPrice} onChange={(ev) => onFormChange(ev.target)} type="number" label="Precio total neto" placeholder="Importe de la compra con desc. de comercio incl." variant="bordered" />
							<Select isRequired
								onChange={(ev) => onFormChange(ev.target)}
								name="buyer"
								value={purchaseForm.buyer}
								label="Comprador"
								placeholder="Seleccionar comprador..."
							>
								<SelectItem key={'Martin'} value={'Martin'}>
									Martín
								</SelectItem>
								<SelectItem key={'Natalia'} value={'Natalia'}>
									Natalia
								</SelectItem>
								<SelectItem key={'Diego'} value={'Diego'}>
									Diego
								</SelectItem>
							</Select>
							<Input ref={firstInputRef} min={1} onChange={(ev) => onFormChange(ev.target)} isInvalid={!isPrimaryPurchaseIdValid(purchaseForm.primaryPurchaseId)} name="primaryPurchaseId" value={purchaseForm.primaryPurchaseId} type="number" label="Compra asociada" placeholder="Id de la compra asociada" variant="bordered" />
						</ModalBody>
						<ModalFooter>
							<Checkbox
								classNames={{
									label: "text-small",
								}}
								checked={keepCreating}
								onChange={(ev) => setKeepCreating(ev.target.checked)}
							>
								Seguir creando
							</Checkbox>
							<Button isDisabled={!purchaseForm.buyer || !purchaseForm.description || !purchaseForm.spentPrice || !isPrimaryPurchaseIdValid(purchaseForm.primaryPurchaseId)} color="primary" onPress={() => {
								savePurchase(); if (keepCreating) {
									resetForms()
									firstInputRef.current?.focus()
								} else {
									onAccept()
								}
							}}>
								Crear
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
