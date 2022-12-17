import React from "react"
import { useStateContext } from "../contexts/ContextProvider"

const Toast = () => {
	const { toast } = useStateContext()

	return toast.show ? (
		<div className="toast toast-top toast-end z-[1500]">
			<div
				className={`alert alert-${toast.type} shadow-lg text-white font-bold`}>
				<div>
					{toast.type === "success" && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					)}
					{toast.type === "error" && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					)}
					<span>{toast.desc}</span>
				</div>
			</div>
		</div>
	) : (
		<div />
	)
}

export default Toast
