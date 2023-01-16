import React from 'react'

const SplitTable = ({ split }) => {
	return (
		<tbody>
			{split.map((sp, i) => (
				<tr key={i}>
					<td>{sp.name}</td>
					<td>{sp.email}</td>
					<td>{sp.paid ? "Paid" : "Unpaid"}</td>
				</tr>
			))}
		</tbody>
	)
}

export default SplitTable