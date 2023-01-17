import React from "react"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect } from "react"

const SplitTable = ({ setSplitExpense, splitExpense, modalRefSplit }) => {
	const { showToastHandler, setExpenses } = useStateContext()

	const statusToggleHandler = async (sp) => {
		try {
			await axios.post("/api/v1/expenses/toggle-split", {
				splitId: sp._id,
				status: !sp.paid,
			})

			modalRefSplit.current.checked = false

			setExpenses((prev) => {
				return prev.map((exp) =>
					exp._id === splitExpense._id
						? {
								...exp,
								split: exp.split.map((s) =>
									s._id === sp._id
										? {
												...s,
												paid: !s.paid,
										  }
										: s
								),
						  }
						: exp
				)
			})

			showToastHandler("Toggle successful", "success")
		} catch (error) {
			showToastHandler("Toggle failed", "error")
			console.log(error)
		}
	}

	useEffect(() => {
		console.log(splitExpense)
	})

	return (
		<tbody>
			{splitExpense.split.map((sp, i) => (
				<tr key={i}>
					<td>{sp?.name}</td>
					<td>{sp?.email}</td>
					<td>
						{sp?.hasOwnProperty("_id") ? (
							<button
								className="btn btn-sm btn-primary"
								onClick={() => statusToggleHandler(sp)}>
								Mark {sp?.paid ? "Unpaid" : "Paid"}
							</button>
						) : (
							<div />
						)}
					</td>
				</tr>
			))}
		</tbody>
	)
}

export default SplitTable
