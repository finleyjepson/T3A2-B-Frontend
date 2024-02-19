import React from 'react'

export default function Signup() {
    return (
                // Create a sign up box for registrations
                <div className="p-4 mt-10 flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            {/* Form heading */}
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>

                            {/* Form labels and input boxes */}
                            <form className="space-y-4 md:space-y-4" action="#">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>

                                {/* Sign up confirmation button */}
                                <button type="submit" class="w-full text-white bg-indigo-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                                
                                {/* Promptfor users that already have an account */}
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>


    );
  }

  