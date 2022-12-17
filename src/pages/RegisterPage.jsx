import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const RegisterPage = () => {
	const navigate = useNavigate()
	const { showToastHandler } = useStateContext()

	useEffect(() => {
		if (localStorage.getItem("user")) navigate("/")
	}, [navigate])

	return (
		<div className="hero min-h-[80vh] bg-base-200">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Create Your Account</h1>
					<p className="py-6">Track your expenses with ease!</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<Formik
							initialValues={{
								name: "",
								email: "",
								password: "",
							}}
							validate={(values) => {
								const errors = {}
								if (!values.email) errors.email = "Required"

								if (!values.name) errors.name = "Required"

								if (values.password.trim() === "")
									errors.password = "Password cannot be empty"
								return errors
							}}
							onSubmit={async (
								values,
								{ setSubmitting, resetForm }
							) => {
								try {
									await axios.post(
										"/api/v1/users/register",
										values
									)
									await axios.post(
										"/api/v1/settings/add-setting",
										{ userid: values.email }
									)
									setSubmitting(false)
									showToastHandler(
										"Registration successful",
										"success"
									)
									navigate("/login")
								} catch (error) {
									showToastHandler(
										"Registration failed",
										"error"
									)
									console.log(error)
									resetForm()
									setSubmitting(false)
								}
							}}>
							{({ isSubmitting }) => (
								<Form>
									<div className="form-control">
										<label className="label" htmlFor="name">
											Name
										</label>
										<Field
											id="name"
											type="name"
											name="name"
											className="input input-bordered"
										/>
										<ErrorMessage
											name="name"
											className="label text-sm text-red-500"
											component={"div"}
										/>
									</div>
									<div className="form-control">
										<label
											className="label"
											htmlFor="email">
											Email
										</label>
										<Field
											id="email"
											type="email"
											name="email"
											className="input input-bordered"
										/>
										<ErrorMessage
											name="email"
											className="label text-sm text-red-500"
											component={"div"}
										/>
									</div>
									<div className="form-control">
										<label
											className="label"
											htmlFor="password">
											Password
										</label>
										<Field
											id="password"
											type="password"
											name="password"
											className="input input-bordered"
										/>
										<ErrorMessage
											name="password"
											className="label text-sm text-red-500"
											component={"div"}
										/>
									</div>

									<div className="mt-6 mb-2">
										<Link to="/login" className="link">
											Already a user? Click here to login
										</Link>
									</div>

									<div className="form-control">
										{!isSubmitting ? (
											<button
												type="submit"
												className="btn btn-primary">
												Register
											</button>
										) : (
											<div
												className="radial-progress text-primary animate-spin"
												style={{
													"--value": 50,
													"--size": "3rem",
													"--thickness": "8px",
												}}></div>
										)}
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
