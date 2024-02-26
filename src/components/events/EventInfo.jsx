import Maps from "../Maps"

export default function EventInfo({ events, id }) {
    console.log(events)
    return (
        <div className='py-2 mx-4'>
            <h1 className='text-[24px] animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s'>{events[id].title}</h1>
            <h3 className='text-lg  animate-in slide-in-from-top fade-in-25 ease-out duration-1.25s'>{events[id].anime}</h3>
            <div className="flex">
                <div>
                <div className="h-[300px] w-[200px] bg-slate-500 mx-8 my-8 animate-in slide-in-from-left fade-in-25 ease-out duration-1000"></div>
                <div className="h-[200px] w-[200px] bg-blue-400 mx-8 my-8 animate-in slide-in-from-left fade-in-25 ease-out duration-1000">Maps</div>
                </div>
                <div className="my-8 animate-in slide-in-from-top fade-in-25 ease-out duration-1000">
                    <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Interested</button>
                    <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 m-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Not for me</button>
                    <ul>
                        <li>
                            <div className='p-4 max-w-[500px] rounded-md border-2 border-gray-300'>
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
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <Maps />
        </div>
    )
}
