import { useState } from "react"
import { useNavigate } from "react-router-dom" // Used for navigation after login without page reload

export default function Signup({ setIsLoggedIn }) {
    const navigate = useNavigate()

    // Utilise useState hook to initialise state that will store the form data
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    // State variable for whether form is submitted (for password check)
    const [formSubmitted, setFormSubmitted] = useState(false)

    // Synchronise the form data state with user input changes
    function handleChange(e) {
        const { name, value } = e.target
        // Get the target field (name) and update the value in setFormData
        setFormData((previousState) => ({
            ...previousState,
            [name]: value,
        }))
    }

    // Handle the form submission (Send POST request with form submission)
    async function handleSubmit(e) {
        e.preventDefault() // Prevent browser from reloading page

        // Check if passwords match before sending response
        if (formData.password !== formData.confirmPassword) {
            setFormSubmitted(true)
            return // Prevent form submission if passwords don't match
        }

        // Send response to POST /auth/register/ as JSON
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            })
            // Basic error handling logged to console. Unsuccessful response:
            if (!response.ok) {
                throw new Error("Signup / Login failed after registration")
            }

            // Successful response; Login upon signup and retrieve tokens
            const data = await response.json()
            const accessToken = data.accessToken
            const refreshToken = data.refreshToken
            // Store tokens and username securely
            sessionStorage.setItem("accessToken", accessToken)
            sessionStorage.setItem("refreshToken", refreshToken)

            // Update isLoggedIn and username state after successful signup
            setIsLoggedIn(true)
            console.log("User successfully registered", data)

            // Redirect user back to home after successful sign up:
            navigate("/")

            // Catch response:
        } catch (error) {
            console.error("Problem registering the user", error.message)
        }
    }

    return (
        // Create a sign up box for registrations
        <div className='p-4 mt-10 flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    {/* Form heading */}
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>Create an account</h1>

                    {/* Form labels and input boxes. Calls handleSubmit() on submission */}
                    <form className='space-y-4 md:space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                placeholder=''
                                required=''
                            />
                        </div>
                        <div>
                            <label htmlFor='text' className='block mb-2 text-sm font-medium text-gray-900'>
                                Username
                            </label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={formData.username}
                                onChange={handleChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                placeholder=''
                                required=''
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                                Password
                            </label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                required=''
                            />
                        </div>
                        <div>
                            <label htmlFor='confirm-password' className='block mb-2 text-sm font-medium text-gray-900'>
                                Confirm password
                            </label>
                            <input
                                type='password'
                                name='confirmPassword'
                                id='confirm-password'
                                onChange={handleChange}
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                                required=''
                            />
                            {/* Password matching validation */}
                            {formSubmitted && formData.password !== formData.confirmPassword && <p className='text-red-500 text-sm mt-1'>Passwords do not match</p>}
                        </div>

                        {/* Sign up confirmation button */}
                        <button
                            type='submit'
                            className='w-full text-white bg-indigo-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                            Sign up
                        </button>

                        {/* Promptfor users that already have an account */}
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                            Already have an account?{" "}
                            <a href='/login' className='font-medium text-primary-600 hover:underline'>
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
