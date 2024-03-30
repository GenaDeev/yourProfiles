import { Link } from 'react-router-dom';
export default function notFound(props) {
    const { id } = props;
    return (
        <>
            <div id="404" className="text-white w-full h-full flex flex-col items-center justify-center bg-red-400">
            <h1>404</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16" viewBox="0 0 512 512"><path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="currentColor" d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"/></svg>
            <h1 className="text-2xl font-bold">This page does not exist</h1>
            <p>There is no person with id <span className='font-semibold'>"{id}"</span></p>
            <Link to="/">
            <button className='bg-white text-red-400 rounded-md px-4 py-1 mt-4 active:scale-110 transition active:shadow-red-500 active:shadow-md'>Go back</button>
            </Link>
            </div>
        </>
    )
}