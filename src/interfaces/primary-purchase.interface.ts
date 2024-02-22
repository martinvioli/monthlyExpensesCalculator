export default interface IPrimaryPurchase {
id: number;
date: number;
store: string;
spentPrice: number;
substractAmount: number;
buyer: string;
}

export interface IPrimaryPurchaseProduct {
id: number;
productName: string;
totalNetValue: number;
}
