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
Accordion,
AccordionItem,
Spacer,
Chip,
} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import IPrimaryPurchase, {
IPrimaryPurchaseProduct,
} from "../../../interfaces/primary-purchase.interface";
import { PurchasesContext } from "../../../contexts/calculadora.context";
import ISecondaryPurchase from "../../../interfaces/secondary-purchase.interface";
import {
getDiscountPercentage,
getSecondaryPurchaseFinalPrice,
} from "../../../helpers/calcules";

type Formify<T> = {
[k in keyof T]: string;
};

const initialForm = {
date: "",
store: "",
spentPrice: "",
substractAmount: "",
buyer: "",
productQuantity: "1",
};
const initialProductForm = { productName: "", totalNetValue: "" };

export default function PrimaryPurchaseModal({
isOpen,
onAccept,
onClose,
}: Readonly<{
isOpen: boolean;
onAccept: () => void;
onClose: () => void;
}>) {
const {
primaryPurchases,
setPrimaryPurchases,
secondaryPurchases,
setSecondaryPurchases,
} = useContext(PurchasesContext);

const [purchaseForm, setPurchaseForm] =
useState<Formify<Omit<IPrimaryPurchase, "id">>>(initialForm);

const savePurchase = () => {
const id = (primaryPurchases[primaryPurchases.length - 1]?.id ?? 0) + 1;
const parsedForm: IPrimaryPurchase = {
id,
date: Number(purchaseForm.date),
store: purchaseForm.store,
spentPrice: Number(purchaseForm.spentPrice),
substractAmount: Number(purchaseForm.substractAmount),
buyer: purchaseForm.buyer,
};
setPrimaryPurchases([...primaryPurchases, parsedForm]);
setSecondaryPurchases([
...secondaryPurchases,
...productsDivisible.map(
(pd) =>
({
id: pd.id,
primaryPurchaseId: id,
date: parsedForm.date,
description: pd.productName,
spentPrice: getSecondaryPurchaseFinalPrice(
pd.totalNetValue,
getDiscountPercentage(parsedForm)
),
buyer: parsedForm.buyer,
} as ISecondaryPurchase)
),
]);
};

const onFormChange = (
form: "purchase" | "product",
evTarget: EventTarget & (HTMLInputElement | HTMLSelectElement)
) => {
form === "purchase"
? setPurchaseForm({ ...purchaseForm, [evTarget.name]: evTarget.value })
: setProductDivisibleForm({
  ...productDivisibleForm,
  [evTarget.name]: evTarget.value,
  });
};

const resetForms = (keepCreating: boolean = false) => {
setPurchaseForm({ ...initialForm, buyer: purchaseForm.buyer });
setProductDivisibleForm(initialProductForm);
setProductsDivisible([]);
setKeepCreating(keepCreating);
};

const [keepCreating, setKeepCreating] = useState<boolean>(false);

useEffect(() => {
resetForms();
}, [isOpen]);

const firstInputRef = useRef<HTMLInputElement>(null);
const firstInputProductRef = useRef<HTMLInputElement>(null);

const [productDivisibleForm, setProductDivisibleForm] =
useState<Formify<Omit<IPrimaryPurchaseProduct, "id">>>(initialProductForm);

const [productsDivisible, setProductsDivisible] = useState<
IPrimaryPurchaseProduct[]
>([]);

const saveProductDivisilbe = () => {
const id = (productsDivisible[productsDivisible.length - 1]?.id ?? 0) + 1;
const parsedForm: IPrimaryPurchaseProduct = {
id,
productName: productDivisibleForm.productName,
totalNetValue: Number(productDivisibleForm.totalNetValue),
};
setProductsDivisible([...productsDivisible, parsedForm]);
setProductDivisibleForm(initialProductForm);
firstInputProductRef?.current?.focus();
};

const removeProductDivisible = (id: number) => {
const filteredArray = productsDivisible.filter((pd) => pd.id !== id);
setProductsDivisible(filteredArray);
};

return (
<Modal
isOpen={isOpen}
placement="top-center"
onClose={() => {
onClose();
}}
>
<ModalContent>
{() => (
<>
<ModalHeader className="flex flex-col gap-1">Crear compra común</ModalHeader>
<ModalBody>
<Input
ref={firstInputRef}
min={0}
max={31}
onChange={(ev) => onFormChange("purchase", ev.target)}
name="date"
value={purchaseForm.date}
type="number"
autoFocus
label="Dia"
placeholder="DD"
variant="bordered"
/>
<Input
isRequired
name="store"
value={purchaseForm.store}
label="Comercio"
placeholder="Ej: Vea"
type="text"
variant="bordered"
onChange={(ev) => onFormChange("purchase", ev.target)}
/>
<Input
startContent={
<div className="pointer-events-none flex items-center">
<span className="text-default-400 text-small">$</span>
</div>
}
isRequired
min={0}
name="spentPrice"
value={purchaseForm.spentPrice}
onChange={(ev) => onFormChange("purchase", ev.target)}
type="number"
label="Gasto total neto"
placeholder="Importe de la compra con desc. de comercio incl."
variant="bordered"
/>
<Input
startContent={
<div className="pointer-events-none flex items-center">
<span className="text-default-400 text-small">$</span>
</div>
}
min={0}
name="substractAmount"
value={purchaseForm.substractAmount}
onChange={(ev) => onFormChange("purchase", ev.target)}
type="number"
label="Importe total a restar"
placeholder="Total de desc. y/o reintgr. de tarjt."
variant="bordered"
/>
<Select
isRequired
onChange={(ev) => onFormChange("purchase", ev.target)}
name="buyer"
value={purchaseForm.buyer}
label="Comprador"
placeholder="Seleccionar comprador..."
>
<SelectItem key={"Martin"} value={"Martin"}>
Martín
</SelectItem>
<SelectItem key={"Natalia"} value={"Natalia"}>
Natalia
</SelectItem>
</Select>
<Accordion>
<AccordionItem
subtitle={
<div className="flex gap-1 flex-wrap">
{productsDivisible.map((item) => (
<Chip onClose={() => removeProductDivisible(item.id)} key={item.id} size="sm">
{item.productName} - {item.totalNetValue}
</Chip>
))}
</div>
}
key="1"
aria-label="Accordion 1"
title="Cargar productos disivibles entre 3"
>
<Input
isRequired
onChange={(ev) => onFormChange("product", ev.target)}
value={productDivisibleForm.productName}
ref={firstInputProductRef}
name="productName"
type="text"
label="Nombre y cantidad del producto"
placeholder="Ej: Jabon liquido Dove Floral x2"
variant="bordered"
/>
<Spacer />
<Input
startContent={
<div className="pointer-events-none flex items-center">
<span className="text-default-400 text-small">$</span>
</div>
}
isRequired
onChange={(ev) => onFormChange("product", ev.target)}
value={productDivisibleForm.totalNetValue}
name="totalNetValue"
min={0}
type="number"
label="Importe total neto"
placeholder="Imp. total por la cant. con desc. de comercio incl."
variant="bordered"
/>
<Spacer />
<Button
style={{ maxWidth: "100%", width: "100%", maxHeight: "1.8rem" }}
isDisabled={
!productDivisibleForm.productName || !productDivisibleForm.totalNetValue
}
color="primary"
onPress={() => saveProductDivisilbe()}
>
Cargar*
</Button>
<small
style={{
display: "block",
lineHeight: "12px",
paddingTop: "7px",
textAlign: "center",
}}
>
*El importe de los chips es el original, mientras que en la tabla se mostrará el
importe con descuento de la compra aplicado.
</small>
</AccordionItem>
</Accordion>
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
<Button
isDisabled={
!purchaseForm.buyer || !purchaseForm.store || !purchaseForm.spentPrice
}
color="primary"
onPress={() => {
savePurchase();
if (keepCreating) {
resetForms(keepCreating);
firstInputRef.current?.focus();
} else {
onAccept();
}
}}
>
Crear
</Button>
</ModalFooter>
</>
)}
</ModalContent>
</Modal>
);
}
