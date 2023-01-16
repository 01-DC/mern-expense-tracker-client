import React from "react"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"
import { Formik, Form, Field, ErrorMessage } from "formik"

const SettingsPage = () => {
	const { loginUser, userSetting, setUserSettingHandler, showToastHandler } =
		useStateContext()

	const deleteHandler = async (cat) => {
		if (userSetting.categories.length === 1) {
			showToastHandler("Cannot delete last value", "error")
			return
		}

		try {
			const newSetting = {
				...userSetting,
				categories: userSetting.categories.filter((c, i) => c !== cat),
			}
			await axios.post("/api/v1/settings/update-setting", {
				userid: userSetting.userid,
				payload: {
					userid: newSetting.userid,
					budget: newSetting.budget,
					categories: newSetting.categories,
				},
			})
			setUserSettingHandler(newSetting)
			showToastHandler("Category deleted", "success")
		} catch (error) {
			showToastHandler("Deleting category failed", "error")
			console.log(error)
		}
	}

	return (
		<div className="p-8">
			<div className="flex">
				<div className="card-body items-center">
					<h1 className="card-title text-2xl text-secondary">
						Your Details
					</h1>
					<h2 className="text-lg font-bold">
						Name: {loginUser.name}
					</h2>
					<h4 className="text-md font-bold">
						Email: {loginUser.email}
					</h4>
				</div>
				<div className="card-body items-center">
					<h2 className="card-title text-2xl text-primary">
						Your Budget
					</h2>
					<p className="stat-value my-4">${userSetting.budget}</p>
					<div className="form-control">
						<label className="input-group">
							<Formik
								initialValues={{
									budget: 0,
								}}
								validate={(values) => {
									const errors = {}
									if (values.budget === 0)
										errors.budget = "Cannot be 0"
									return errors
								}}
								onSubmit={async (values, actions) => {
									try {
										const newSetting = {
											...userSetting,
											budget: values.budget,
										}
										await axios.post(
											"/api/v1/settings/update-setting",
											{
												userid: userSetting.userid,
												payload: {
													...newSetting,
												},
											}
										)
										setUserSettingHandler(newSetting)
										actions.resetForm()
										showToastHandler(
											"Budget updated",
											"success"
										)
									} catch (error) {
										showToastHandler(
											"Updating budget failed",
											"error"
										)
										console.log(error)
									}
								}}>
								<Form>
									<Field
										id="budget"
										name="budget"
										type="number"
										className="input input-bordered"
									/>
									<button
										type="submit"
										className="btn btn-primary">
										Update Budget
									</button>
									<ErrorMessage
										name="budget"
										className="label-text text-sm text-red-500"
										component={"div"}
									/>
								</Form>
							</Formik>
						</label>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<h2 className="font-bold text-2xl text-center my-4 text-secondary">
					Your Categories
				</h2>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th></th>
							<th>Category</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{userSetting?.categories.map((cat, i) => (
							<tr key={i}>
								<th>{i + 1}</th>
								<td>{cat}</td>
								<td>
									<button
										className="btn btn-sm btn-error m-1"
										onClick={() => deleteHandler(cat)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="card-body items-center">
					<Formik
						initialValues={{
							category: "",
						}}
						validate={(values) => {
							const errors = {}
							if (!values.category)
								errors.category = "Cannot add empty category"

							return errors
						}}
						onSubmit={async (values, actions) => {
							try {
								const newSetting = {
									...userSetting,
									categories: [
										...userSetting.categories,
										values.category,
									],
								}
								await axios.post(
									"/api/v1/settings/update-setting",
									{
										userid: userSetting.userid,
										payload: {
											...newSetting,
										},
									}
								)
								setUserSettingHandler(newSetting)
								actions.resetForm()
								showToastHandler("Category added", "success")
							} catch (error) {
								showToastHandler(
									"Adding category failed",
									"error"
								)
								console.log(error)
							}
						}}>
						<Form>
							<div className="form-control">
								<Field
									id="category"
									name="category"
									className="input input-bordered"
								/>
								<ErrorMessage
									name="category"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-secondary">
									add category
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default SettingsPage
