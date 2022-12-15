import React from "react"
import { useStateContext } from "../contexts/ContextProvider"

const SummaryChart = () => {
	const { expenses, userSetting } = useStateContext()

	return <div>SummaryChart</div>
}

export default SummaryChart
