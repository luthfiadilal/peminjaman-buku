import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function BorrowingBook({ book }) {
    const { data, setData, post, processing, errors } = useForm({
        book_id: book.id,
        address: '',
        borrowed_at: '',
        due_at: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('borrow.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Form Peminjaman
                </h2>
            }
        >
            <Head title="Pinjam Buku" />

            <div className="mx-auto mt-6 max-w-xl">
                <h3 className="mb-4 text-lg font-medium text-gray-700">
                    Buku: {book.title}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">
                                {errors.address}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tanggal Pinjam
                        </label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            value={data.borrowed_at}
                            onChange={(e) =>
                                setData('borrowed_at', e.target.value)
                            }
                        />
                        {errors.borrowed_at && (
                            <p className="text-sm text-red-500">
                                {errors.borrowed_at}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tanggal Pengembalian
                        </label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            value={data.due_at}
                            onChange={(e) => setData('due_at', e.target.value)}
                        />
                        {errors.due_at && (
                            <p className="text-sm text-red-500">
                                {errors.due_at}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        disabled={processing}
                    >
                        Pinjam Sekarang
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
