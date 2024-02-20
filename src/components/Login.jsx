import React from 'react'

export default function Login() {
    return (
                // Create a sign up box for registrations
                <div className="p-4 mt-10 flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            {/* Form heading */}
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>

                            {/* Form labels and input boxes */}
                            <form className="space-y-4 md:space-y-4" action="#">
                                <div>
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>

                                {/* Login confirmation button */}
                                <button type="submit" class="w-full text-white bg-indigo-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                                
                                {/* Promptfor users that don't have an account */}
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet? <a href="/signup" class="font-medium text-primary-600 hover:underline">Sign up here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>


    );
  }

  