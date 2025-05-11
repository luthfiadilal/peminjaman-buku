import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function User({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sortBy || '');
    const [sortDir, setSortDir] = useState(filters.sortDir || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('user.index'),
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
            router.delete(route('user.delete', uuid));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User
                </h2>
            }
        >
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Daftar User</h1>

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
                            <th className="px-4 py-2">Email</th>
                            <th className="flex justify-center px-4 py-2">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id || user.uuid} className="border-t">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="flex justify-center space-x-2 px-4 py-2">
                                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                        <a
                                            href={route('user.show', {
                                                user: user.id,
                                            })}
                                        >
                                            Detail
                                        </a>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td className="px-4 py-2" colSpan={2}>
                                    Tidak ada User.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
