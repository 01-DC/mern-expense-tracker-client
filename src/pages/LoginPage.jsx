import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik } from "formik"
import axios from "axios"

const LoginPage = () => {
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
				<div className="card flex-shrink-0 w-2/3 max-w-sm shadow-2xl bg-base-100">
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
							onSubmit={async (values, { setSubmitting }) => {
								try {
									const { data } = await axios.post(
										"/api/v1/users/login",
										values
									)
									localStorage.setItem(
										"user",
										JSON.stringify({
											...data.user,
											password: "",
										})
									)
									setSubmitting(false)
									navigate("/")
								} catch (error) {
									alert("Login failed")
									console.log(error)
									setSubmitting(false)
								}
							}}>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								/* and other goodies */
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="form-control">
										<label className="label">
											<span className="label-text">
												Email
											</span>
										</label>
										<input
											type="email"
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											className="input input-bordered"
										/>
										<label className="label">
											<span className="label-text-alt text-red-500">
												{errors.email &&
													touched.email &&
													errors.email}
											</span>
										</label>
									</div>
									<div className="form-control">
										<label className="label">
											<span className="label-text">
												Password
											</span>
										</label>
										<input
											type="password"
											name="password"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											className="input input-bordered"
										/>
										<label className="label">
											<span className="label-text-alt text-red-500">
												{errors.password &&
													touched.password &&
													errors.password}
											</span>
										</label>
									</div>

									<Link to="/register" className="link">
										Click here to register
									</Link>

									<div className="form-control mt-6">
										{!isSubmitting ? (
											<button
												type="submit"
												className="btn btn-primary">
												Login
											</button>
										) : (
											<div
												className="radial-progress animate-spin"
												style={{ "--value": 50 }}></div>
										)}
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
