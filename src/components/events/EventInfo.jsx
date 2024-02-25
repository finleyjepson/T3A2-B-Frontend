import Maps from "../Maps"

export default function EventInfo({ events, id }) {
    return (
        <div className='py-2 mx-4 '>
            <h1 className='text-xl'>{events[id].title}</h1>
            <h3 className='text-md'>{events[id].anime}</h3>
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
                            <h3 className='text-lg font-bold'>What is it?</h3>
                            <p>{events[id].description}</p>
                        </div>
                        <div>
                            <p>Organiser:</p>
                            <p>{events[id].organiser}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <Maps />
        </div>
    )
}
