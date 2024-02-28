import Maps from "./Maps"

export default function EventInfo({ events, id }) {
    return (
        <div className="flex justify-center py-4">
            <div className='py-4 mx-4 border-2  rounded-xl shadow-lg bg-white animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s max-w-[600px]'>
                <div className="bg-amber-300">
                <h1 className='text-[32px] py-4 animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s mx-8'>{events[id].title}</h1>
                </div>
                <h3 className='text-lg  pt-2 animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s mx-8'>{events[id].anime}</h3>
                <div className="flex">
                    <div className="mx-8 my-8 ">
                    <div className="h-[300px] w-[200px] bg-slate-500 animate-in slide-in-from-left fade-in-25 ease-out duration-1000 my-4">Image</div>
                    <div className="animate-in slide-in-from-left fade-in-25 ease-out duration-1000 my-4">
                        <Maps coords={ events[id].coords }/>
                    </div>
                    </div>
                    <div className="my-8 mr-8 animate-in slide-in-from-top fade-in-25 ease-out duration-1000">
                        <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Interested</button>
                        <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Not for me</button>
                        <ul>
                            <li>
                                <div className='p-4 max-w-[500px] rounded-md border-2 border-gray-300 bg-white'>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>When is it?</h3>
                                        <p>{events[id].date}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>Where is it?</h3>
                                        <p>{events[id].venue}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>What is it?</h3>
                                        <p>{events[id].description}</p>
                                    </div>
                                    <div className='mb-4'>
                                        <h3 className='text-lg font-bold'>Entry price</h3>
                                        <p>{events[id].price}</p>
                                    </div>
                                    <div className="text-md text-gray-500 mt-8">
                                        <p>Organiser:</p>
                                        <p>{events[id].organiser}</p>
                                    </div>
                                    <div className="text-md text-gray-500 mt-8">
                                        {console.log(events[id].coords)}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}
