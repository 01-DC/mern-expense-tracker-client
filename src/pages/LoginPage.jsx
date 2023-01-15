import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useStateContext } from "../contexts/ContextProvider"

const LoginPage = () => {
	const { setLoginUser, setUserSetting, showToastHandler } = useStateContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("user")) navigate("/")
	}, [navigate])

	return (
		<div className="hero min-h-[80vh] bg-base-200">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login</h1>
					<p className="py-6">Track your expenses with ease!</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<Formik
							initialValues={{
								email: "",
								password: "",
							}}
							validate={(values) => {
								const errors = {}
								if (!values.email) errors.email = "Required"

								if (values.password.trim() === "")
									errors.password = "Password cannot be empty"
								return errors
							}}
							onSubmit={async (
								values,
								{ setSubmitting, resetForm }
							) => {
								try {
									const { data } = await axios.post(
										"/api/v1/users/login",
										values
									)
									const { data: setting } = await axios.post(
										"/api/v1/settings/get-setting",
										{ userid: values.email }
									)
									localStorage.setItem(
										"user",
										JSON.stringify({
											...data.user,
										})
									)
									localStorage.setItem(
										"setting",
										JSON.stringify(setting)
									)
									setLoginUser({ ...data.user })
									setUserSetting(setting)
									setSubmitting(false)
									if (setting.budget === 0) {
										showToastHandler(
											"Please set budget & categories",
											"warning"
										)
										navigate("/settings")
									} else {
										showToastHandler(
											"Login successful",
											"success"
										)
										navigate("/")
									}
								} catch (error) {
									showToastHandler("Login failed", "error")
									console.log(error)
									resetForm()
									setSubmitting(false)
								}
							}}>
							{({ isSubmitting }) => (
								<Form>
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
										<label className="label">
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
										<Link to="/register" className="link">
											First time user? Click here to
											register
										</Link>
									</div>

									<div className="form-control">
										{!isSubmitting ? (
											<button
												type="submit"
												className="btn btn-primary">
												Login
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

export default LoginPage
