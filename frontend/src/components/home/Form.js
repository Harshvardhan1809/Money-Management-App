import React, {Fragment} from 'react'

export default function Form() {
    return (  
        <Fragment>
            <div className="flex justify-between space-x-2 border border-gray-1 rounded-[10px] bg-white p-3 bg-gray-900">
                <form action="" className="w-full p-1.5 pt-4">

                    <div className="mb-5">
                        <input type="text" id="amount" className="text-3xl font-thin block w-full p-1.5 bg-gray-900 border border-r-0 border-l-0 border-t-0 border-b-1 border-gray-600 focus:outline-none text-gray-300" placeholder="¥" required />
                    </div>

                    <div className="mb-5">
                        <div className="flex justify-content-between">
                            <div className="flex flex-row p-1 w-1/2">
                                <select id="underline_select" className="block py-2.5 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-200 appearance-none text-white border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200">
                                    <option selected>Category</option>
                                    <option value="US">Food</option>
                                    <option value="CA">Transportation</option>
                                    <option value="FR">Clothes</option>
                                    <option value="DE">Entertainment</option>
                                </select>
                            </div>
                            <div className="flex flex-row p-1 w-1/2">
                                <select id="underline_select" className="block py-2.5 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-200 appearance-none border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200">
                                    <option selected>Type</option>
                                    <option value="US">Food</option>
                                    <option value="CA">Groceries</option>
                                    <option value="FR">Lunch</option>
                                    <option value="DE">Cafteria</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <input type="date" id="date" className="text-md w-full p-1.5 bg-gray-900 border border-r-0 border-l-0 border-t-0 border-b-1 border-gray-600 focus:outline-none text-gray-300" required />
                    </div>

                    <div className="mb-5">
                        <input type="text" id="notes" className="text-md w-full p-1.5 bg-gray-900 border border-r-0 border-l-0 border-t-0 border-b-1 border-gray-600 focus:outline-none text-gray-300" placeholder="Type a memo" />
                    </div>

                    <div className="flex justify-around">
                        <div className="flex flex-row">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                        <div className="flex flex-row">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Clear</button>
                        </div>                      
                    </div>

                </form>
            </div>
        </Fragment>
    )
}
