// resources/js/Pages/Borrowings.jsx
import BorrowingCard from '@/Components/BorrowingCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Borrowings({ active, returned }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Peminjaman Saya
                </h2>
            }
        >
            <Head title="Peminjaman Saya" />
            <div className="mx-auto max-w-6xl space-y-12 p-6">
                <div>
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Masih Dipinjam
                    </h1>
                    {active.length === 0 ? (
                        <p className="rounded-xl bg-white py-10 text-center text-gray-500 shadow">
                            Tidak ada buku yang sedang dipinjam.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {active.map((b) => (
                                <BorrowingCard key={b.id} borrow={b} />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Sudah Dikembalikan
                    </h1>
                    {returned.length === 0 ? (
                        <p className="rounded-xl bg-white py-10 text-center text-gray-500 shadow">
                            Belum ada buku yang dikembalikan.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {returned.map((b) => (
                                <BorrowingCard
                                    key={b.id}
                                    borrow={b}
                                    isReturned={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
