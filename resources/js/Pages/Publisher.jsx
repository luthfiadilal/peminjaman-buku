import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';

export default function Publisher({ publishers }) {
    const handleDelete = (uuid) => {
        if (confirm('Yakin ingin menghapus publisher ini?')) {
            router.delete(`/publishers/${uuid}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Publisher
                </h2>
            }
        >
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Daftar Publisher</h1>
                <div className="flex w-full justify-end">
                    <button className="rounded-md bg-blue-600 px-5 py-2 text-white">
                        <Link href={route('publisher.create')}>
                            Tambah Publisher
                        </Link>
                    </button>
                </div>
                <table className="w-4/5 overflow-hidden rounded bg-white shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2">Nama</th>
                            <th className="flex justify-center px-4 py-2">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.map((publisher) => (
                            <tr key={publisher.uuid} className="border-t">
                                <td className="px-4 py-2">{publisher.name}</td>
                                <td className="flex justify-center space-x-2 px-4 py-2">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    'publisher.edit',
                                                    publisher.id,
                                                ),
                                            )
                                        }
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {publishers.length === 0 && (
                            <tr>
                                <td className="px-4 py-2" colSpan={2}>
                                    Tidak ada publisher.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
