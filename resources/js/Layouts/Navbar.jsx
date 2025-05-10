import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <div className="fixed top-0 z-50 flex w-full justify-between bg-blue-600/30 px-5 py-5 shadow backdrop-blur-lg sm:items-center">
            <a href="/">
                <h2 className="text-lg font-bold text-white">Pinjam Buku</h2>
            </a>

            <ul className="flex gap-4">
                <li className="animation rounded px-2 py-1 text-white duration-300 ease-in hover:bg-white hover:font-bold hover:text-blue-500">
                    <a href="#home">Home</a>
                </li>
                <li className="animation rounded px-2 py-1 text-white duration-300 ease-in hover:bg-white hover:font-bold hover:text-blue-500">
                    <a href="#about">About</a>
                </li>
                <li className="animation rounded px-2 py-1 text-white duration-300 ease-in hover:bg-white hover:font-bold hover:text-blue-500">
                    <a href="#contact">Contact</a>
                </li>
            </ul>
            <Link
                href={route('login')}
                className="text-md cursor-pointer text-white duration-300 ease-in hover:font-bold hover:text-orange-300"
            >
                Login
            </Link>
        </div>
    );
}
