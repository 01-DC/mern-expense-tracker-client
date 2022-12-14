import React from "react"
import { Formik } from "formik"

const LoginPage = () => {
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
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2))
									setSubmitting(false)
								}, 400)
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

									<div className="form-control mt-6">
										<button
											type="submit"
											disabled={isSubmitting}
											className="btn btn-primary">
											Login
										</button>
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
