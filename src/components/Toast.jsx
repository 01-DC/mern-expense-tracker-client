import React from "react"
import { useStateContext } from "../contexts/ContextProvider"

const Toast = () => {
	const { toast } = useStateContext()

	return toast.show ? (
		<div className="toast toast-top toast-end">
			<div className="alert alert-success text-white font-bold">
				<div>
					<span>{toast.desc}</span>
				</div>
			</div>
		</div>
	) : (
		<div />
	)
}

export default Toast
