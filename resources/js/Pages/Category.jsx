import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Category({ categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sortBy || '');
    const [sortDir, setSortDir] = useState(filters.sortDir || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('category.index'),
            {
                search,
                sortBy,
                sortDir,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (uuid) => {
        if (confirm('Yakin ingin menghapus category ini?')) {
            router.delete(route('category.delete', uuid));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Category
                </h2>
            }
        >
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Daftar Category</h1>
                <div className="flex w-full justify-end">
                    <button className="rounded-md bg-blue-600 px-5 py-2 text-white">
                        <Link href={route('category.create')}>
                            Tambah Category
                        </Link>
                    </button>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="mb-4 mt-4 flex space-x-2"
                >
                    <input
                        type="text"
                        placeholder="Cari nama publisher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3 rounded-md border px-4 py-2"
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-md border px-4 py-2"
                    >
                        <option value="">Urutkan Berdasarkan</option>
                        <option value="name">Nama</option>
                        <option value="created_at">Tanggal dibuat</option>
                    </select>

                    <select
                        value={sortDir}
                        onChange={(e) => setSortDir(e.target.value)}
                        className="rounded-md border px-4 py-2"
                    >
                        <option value="">Arah</option>
                        <option value="asc">Naik (A-Z)</option>
                        <option value="desc">Turun (Z-A)</option>
                    </select>

                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white"
                    >
                        Cari
                    </button>
                </form>

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
                        {categories.map((category) => (
                            <tr key={category.uuid} className="border-t">
                                <td className="px-4 py-2">{category.name}</td>
                                <td className="flex justify-center space-x-2 px-4 py-2">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    'category.edit',
                                                    category.id,
                                                ),
                                            )
                                        }
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td className="px-4 py-2" colSpan={2}>
                                    Tidak ada Category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
