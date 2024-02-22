import IPrimaryPurchase from "../interfaces/primary-purchase.interface";
import ISecondaryPurchase from "../interfaces/secondary-purchase.interface";

export const getDiscountPercentage = (pp: IPrimaryPurchase) =>
(pp.substractAmount * 100) / pp.spentPrice;
export const getSecondaryPurchaseFinalPrice = (
spentPrice: ISecondaryPurchase["spentPrice"],
discountPercentage: number
) => spentPrice - spentPrice * (discountPercentage / 100);
export const convertToArs = (value: number) =>
value.toLocaleString("es-ar", {
style: "currency",
currency: "ARS",
minimumFractionDigits: 2,
});
