import React, { createContext, useContext, useState } from "react"

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
	const [loginUser, setLoginUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)
	const [userSetting, setUserSetting] = useState(
		JSON.parse(localStorage.getItem("setting"))
	)
	const [expenses, setExpenses] = useState([])

	const setUserSettingHandler = (arg) => {
		localStorage.setItem("setting", JSON.stringify(arg))
		setUserSetting(arg)
	}

	return (
		<StateContext.Provider
			value={{
				loginUser,
				setLoginUser,
				expenses,
				setExpenses,
				userSetting,
				setUserSettingHandler,
				setUserSetting,
			}}>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext)
