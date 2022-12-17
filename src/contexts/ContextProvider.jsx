import React, { createContext, useContext, useState } from "react"

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
	const [expenses, setExpenses] = useState([])
	const [toast, setToast] = useState({
		show: false,
		desc: "",
		type: "success",
	})

	const [loginUser, setLoginUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	)
	const [userSetting, setUserSetting] = useState(
		JSON.parse(localStorage.getItem("setting"))
	)

	const setUserSettingHandler = (arg) => {
		localStorage.setItem("setting", JSON.stringify(arg))
		setUserSetting(arg)
	}

	const showToastHandler = (desc, type) => {
		setToast({ show: true, desc, type })
		setTimeout(() => {
			setToast({ show: false, desc: "", type })
		}, 3500)
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
				toast,
				showToastHandler,
			}}>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext)
