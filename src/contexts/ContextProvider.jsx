import React, { createContext, useContext, useState } from "react"

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
	const [loginUser, setLoginUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)
	const [expenses, setExpenses] = useState([])

	return (
		<StateContext.Provider
			value={{ loginUser, setLoginUser, expenses, setExpenses }}>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext)
