import React, { useState } from 'react'

export default function Login() {
    // Utilise useState hook to initialise state that will store the form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    // Synchronise the form data state with user input changes 
    function handleChange(e) { 
        const { name, value } = e.target;
        // Get the target field (name) and update the value in setFormData
        setFormData(previousState => ({
            ...previousState,
            [name]: value
        }))
    }

    // Handle the form submission (Send POST request with form submission)
    async function handleSubmit(e) {
        e.preventDefault() // Prevent browser from reloading page
        // Send response to POST /auth/login as JSON
        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            // Basic error handling logged to console. Unsuccessful response:
            if (!response.ok) {
                throw new Error('Failed to login')
            }
            // Successful login response:
            const data = await response.json();
            console.log('Successfully logged in', data);
        // Catch response:
        } catch (error) {
        console.error('Problem logging in:', error.message);
        }
    }

    return (
                // Create a sign up box for registrations
                <div className="p-4 mt-10 flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            {/* Form heading */}
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>

                            {/* Form labels and input boxes. Calls handleSubmit() on submission */}
                            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>

                                {/* Login confirmation button */}
                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                                
                                {/* Promptfor users that don't have an account */}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline">Sign up here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>


    );
  }

  