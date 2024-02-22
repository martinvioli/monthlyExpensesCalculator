import { useState } from "react";
import { PurchasesProvider } from "./contexts/calculadora.context";
import PrimaryPurchaseModal from "./components/Modales/PrimaryPurchase";
import PrimaryPurchasesTable from "./components/Tablas/PrimaryPurchasesTable";
import SecondaryPurchasesTable from "./components/Tablas/SecondaryPurchasesTable";
import SecondaryPurchaseModal from "./components/Modales/SecondaryPurchase";
import { Button, Divider } from "@nextui-org/react";
import PrimaryPurchasesDisplay from "./components/Displays/PrimaryPurchases";
import SecondaryPurchasesDisplay from "./components/Displays/SecondaryPurchases";

export default function App() {
	const [isMPOpen, setIsMPOpen] = useState<boolean>(false);
	const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState<boolean>(false);

	return (
		<PurchasesProvider>
			<div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'whitesmoke', gap: '5%', padding: '1.2rem' }}>
				<div style={{ height: '100%', width: '50%', maxWidth: '50%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					<Button color="primary" onPress={() => setIsMPOpen(true)}>Agregar compra común</Button>
					<PrimaryPurchasesTable />
					<PrimaryPurchaseModal
						isOpen={isMPOpen}
						onClose={() => setIsMPOpen(false)}
						onAccept={() => setIsMPOpen(false)}
					/>
					<Divider />
					<Button color="primary" onPress={() => setIsSecondaryModalOpen(true)}>Agregar compra divisible entre 3</Button>
					<SecondaryPurchasesTable />
					<SecondaryPurchaseModal
						isOpen={isSecondaryModalOpen}
						onClose={() => setIsSecondaryModalOpen(false)}
						onAccept={() => setIsSecondaryModalOpen(false)}
					/>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', height: '100%', width: '45%', maxWidth: '45%', backgroundColor: '#E6E5ED', borderRadius: '1rem', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
					<PrimaryPurchasesDisplay />
					<Divider />
					<SecondaryPurchasesDisplay />
				</div>
			</div>
		</PurchasesProvider>
	);
}
