export default function Footer() {
    return (
        <>
        <footer className="mt-4 flex flex-col justify-between justify-center w-full bg-neutral-200 p-2 z-10">
            <p>Developed by <a href="https://github.com/GenaAaaj/" className="font-bold text-neutral-800 hover:text-neutral-600 transition">GenaDev</a> and Hosted by <a href="https://genahost.vercel.app" className="font-bold text-neutral-800 hover:text-neutral-600 transition">GenaHost</a></p>
            <p>All rights reserved <span className="font-bold text-neutral-800 hover:text-neutral-600 transition cursor-pointer">2024</span>.</p>
        </footer>
        </>
    )
}