import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const AddNew = () => {
	const { loginUser } = useStateContext()
	return (
		<div>
			<label htmlFor="my-modal" className="btn btn-primary">
				add new expense
			</label>

			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<label
						htmlFor="my-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="font-bold text-lg">
						Add details of new expense
					</h3>

					<Formik
						initialValues={{
							amount: 0,
							category: "Select",
							description: "",
						}}
						validate={(values) => {
							const errors = {}
							if (values.amount === 0)
								errors.amount = "Expense cannot be zero"

							if (!values.description)
								errors.description = "Required"

							return errors
						}}
						onSubmit={async (values) => {
							try {
								console.log(loginUser)
								await axios.post("/api/v1/add-expense", {
									userid: loginUser.email,
									...values,
								})
							} catch (error) {
								alert("Save failed")
								console.log(error)
							}
						}}>
						<Form>
							<div className="form-control">
								<label htmlFor="amount" className="label">
									Amount
								</label>
								<Field
									id="amount"
									name="amount"
									className="input input-bordered"
									type="number"
								/>
								<ErrorMessage
									name="amount"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control">
								<label htmlFor="category" className="label">
									Category
								</label>
								<Field
									id="category"
									name="category"
									className="input input-bordered"
									as="select">
									<option value="red">Red</option>
									<option value="green">Green</option>
									<option value="blue">Blue</option>
								</Field>
							</div>

							<div className="form-control">
								<label htmlFor="description" className="label">
									Description
								</label>
								<Field
									id="description"
									name="description"
									className="input input-bordered"
								/>
								<ErrorMessage
									name="description"
									className="label text-sm text-red-500"
									component={"div"}
								/>
							</div>

							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-primary">
									save
								</button>
							</div>
						</Form>
					</Formik>
					{/* <div className="modal-action">
						<label htmlFor="my-modal" className="btn">
							save
						</label>
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default AddNew
