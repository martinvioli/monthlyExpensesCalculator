import { createContext, useMemo, useState } from "react";
import IPrimaryPurchase from "../interfaces/primary-purchase.interface";
import ISecondaryPurchase from "../interfaces/secondary-purchase.interface";

export interface IPurchasesContext {
	primaryPurchases: IPrimaryPurchase[];
	setPrimaryPurchases: React.Dispatch<React.SetStateAction<IPrimaryPurchase[]>>;
	secondaryPurchases: ISecondaryPurchase[];
	setSecondaryPurchases: React.Dispatch<
		React.SetStateAction<ISecondaryPurchase[]>
	>;
}

export const PurchasesContext = createContext({} as IPurchasesContext);

export function PurchasesProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [primaryPurchases, setPrimaryPurchases] = useState<IPrimaryPurchase[]>(
		[]
	);
	const [secondaryPurchases, setSecondaryPurchases] = useState<
		ISecondaryPurchase[]
	>([]);

	const providerValue = useMemo(
		() => ({
			primaryPurchases,
			setPrimaryPurchases,
			secondaryPurchases,
			setSecondaryPurchases,
		}),
		[primaryPurchases, secondaryPurchases]
	);

	return (
		<PurchasesContext.Provider value={providerValue}>
			{children}
		</PurchasesContext.Provider>
	);
}
