import { useContext } from "react";
import { PurchasesContext } from "../../../contexts/calculadora.context";
import IPrimaryPurchase from "../../../interfaces/primary-purchase.interface";
import ISecondaryPurchase from "../../../interfaces/secondary-purchase.interface";
import { convertToArs } from "../../../helpers/calcules";

export default function PrimaryPurchasesDisplay() {
const { primaryPurchases, secondaryPurchases } = useContext(PurchasesContext);

const getSpents = (
primaryPurchases: IPrimaryPurchase[],
secondaryPurchases: ISecondaryPurchase[]
) => {
const spentList = { spentMartin: 0, spentNatalia: 0 };
for (const pp of primaryPurchases) {
const secondaryPurchasesSubstract = secondaryPurchases
.filter((sp) => sp.primaryPurchaseId === pp.id)
.reduce((accu: number, curr: ISecondaryPurchase) => accu + curr.spentPrice, 0);
spentList[`spent${pp.buyer as "Martin" | "Natalia"}`] +=
pp.spentPrice - pp.substractAmount - secondaryPurchasesSubstract;
}
return spentList;
};

const generatePass = (pp: IPrimaryPurchase[], sp: ISecondaryPurchase[]) => {
const { spentMartin, spentNatalia } = getSpents(pp, sp);
const from = spentMartin > spentNatalia ? "Natalia" : "Martín";
const to = from === "Natalia" ? "Martin" : "Natalia";
const amount = Math.abs(spentMartin - spentNatalia) / 2;
return amount ? (
<p style={{ textAlign: "center" }}>
💸 <u>{from}</u> le tiene que pasar{" "}
<b style={{ fontSize: "1.3rem" }}>{convertToArs(amount)}</b> a <u>{to}</u> 💸
</p>
) : (
<p style={{ textAlign: "center", fontSize: "large" }}>
<b>
AMBOS GASTARON LO MISMO, <u>WOOOAH</u>!! 🎊🙌🏼
</b>
</p>
);
};

return (
<div
style={{
backgroundColor: "#C9DBEF",
padding: "1rem",
display: "flex",
flexDirection: "column",
gap: "1rem",
borderRadius: "0.6rem",
}}
>
<div
style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
>
<p>
<u>Martín</u> gastó:
</p>
<p style={{ fontSize: "1.3rem" }}>
{convertToArs(getSpents(primaryPurchases, secondaryPurchases).spentMartin)}
</p>
</div>
<div
style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
>
<p>
<u>Natalia</u> gastó:
</p>
<p style={{ fontSize: "1.3rem" }}>
{convertToArs(getSpents(primaryPurchases, secondaryPurchases).spentNatalia)}
</p>
</div>
{generatePass(primaryPurchases, secondaryPurchases)}
</div>
);
}
