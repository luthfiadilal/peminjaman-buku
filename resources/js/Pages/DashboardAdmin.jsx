import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function DashboardAdmin({ books, filters = {}, pagination }) {
    const [search, setSearch] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || '');
    const [sortDir, setSortDir] = useState(filters.sort_dir || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('dashboard-admin'), {
            search,
            sort_by: sortBy,
            sort_dir: sortDir,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700">
                    Semua Buku
                </h3>

                <form
                    onSubmit={handleSearch}
                    className="mb-4 mt-4 flex space-x-2"
                >
                    <input
                        type="text"
                        placeholder="Cari judul buku..."
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
                        <option value="title">Judul</option>
                        <option value="publication_year">Tahun</option>
                        <option value="stock">Stok</option>
                    </select>

                    <select
                        value={sortDir}
                        onChange={(e) => setSortDir(e.target.value)}
                        className="rounded-md border px-4 py-2"
                    >
                        <option value="">Arah</option>
                        <option value="asc">Naik (A-Z / 0-9)</option>
                        <option value="desc">Turun (Z-A / 9-0)</option>
                    </select>

                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white"
                    >
                        Cari
                    </button>
                </form>

                {/* Tabel */}
                <div className="flex w-full justify-end">
                    <button className="rounded-md bg-blue-600 px-5 py-2 text-white">
                        <Link href={route('book.create')}>Tambah Buku</Link>
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full table-fixed">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Judul
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Penulis
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Kategori
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Tahun
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Stok
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Tersedia
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Tindakan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {books.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        Tidak ada buku ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {book.title}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {book.authors
                                                .map((author) => author.name)
                                                .join(', ')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {book.category.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {book.publication_year}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {book.stock}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {book.is_available ? 'Ya' : 'Tidak'}
                                        </td>
                                        <td className="flex space-x-2 whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white">
                                                Detail
                                            </button>
                                            <button className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                    <div className="mt-4 flex space-x-2">
                        {[...Array(pagination.last_page).keys()].map((i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    router.get(route('dashboard-admin'), {
                                        ...filters,
                                        search,
                                        sort_by: sortBy,
                                        sort_dir: sortDir,
                                        page: i + 1,
                                    })
                                }
                                className={`rounded px-3 py-1 ${
                                    i + 1 === pagination.current_page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
