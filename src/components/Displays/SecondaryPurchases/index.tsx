import React, { useContext } from 'react'
import { convertToArs, getDiscountPercentage } from '../../../helpers/calcules'
import { PurchasesContext } from '../../../contexts/calculadora.context'
import IPrimaryPurchase from '../../../interfaces/primary-purchase.interface'
import ISecondaryPurchase from '../../../interfaces/secondary-purchase.interface'

export default function SecondaryPurchasesDisplay() {

	const { primaryPurchases, secondaryPurchases } = useContext(PurchasesContext)

	const getSpents = (secondaryPurchases: ISecondaryPurchase[]) => {
		const spentList = { spentMartin: 0, spentNatalia: 0, spentDiego: 0 }
		for (const sp of secondaryPurchases) {
			spentList[`spent${sp.buyer as 'Martin' | 'Natalia' | 'Diego'}`] += sp.spentPrice
		}
		return spentList
	}

	const generatePass = (sp: ISecondaryPurchase[]) => {
		const { spentMartin, spentNatalia, spentDiego } = getSpents(sp)
		const spentByPerson = (spentMartin + spentNatalia + spentDiego) / 3
		const results: { [key: string]: number } = { resultMartin: spentMartin - spentByPerson, resultNatalia: spentNatalia - spentByPerson, resultDiego: spentDiego - spentByPerson }
		const needsArray = Object.keys(results).flatMap(r => results[r] > 0 ? ({ name: r.substring(6), needs: results[r] }) : [])
		const doubtsArray = Object.keys(results).flatMap(r => results[r] < 0 ? needsArray.map(need => ({ from: r.substring(6), to: need.name, amount: need.needs > Math.abs(results[r]) ? Math.abs(results[r]) : need.needs })) : [])
		return doubtsArray.map(d => <p key={`${d.from}-${d.amount}-${d.to}`} style={{ textAlign: 'center' }}>💸 <u>{d.from}</u> le tiene que pasar <b style={{ fontSize: '1.3rem' }}>{convertToArs(d.amount)}</b> a <u>{d.to}</u> 💸</p>)
	}

	return (
		<div style={{ backgroundColor: '#B8CDE6', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '0.6rem' }}>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
				<p><u>Martín</u> gastó:</p>
				<p style={{ fontSize: '1.3rem' }}>{convertToArs(getSpents(secondaryPurchases).spentMartin)}</p>
			</div>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
				<p><u>Natalia</u> gastó:</p>
				<p style={{ fontSize: '1.3rem' }}>{convertToArs(getSpents(secondaryPurchases).spentNatalia)}</p>
			</div>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
				<p><u>Diego</u> gastó:</p>
				<p style={{ fontSize: '1.3rem' }}>{convertToArs(getSpents(secondaryPurchases).spentDiego)}</p>
			</div>
			{generatePass(secondaryPurchases)}
		</div>
	)
}
