export default interface ISecondaryPurchase {
id: number;
primaryPurchaseId: number | null;
date: number;
description: string;
spentPrice: number;
buyer: string;
}
