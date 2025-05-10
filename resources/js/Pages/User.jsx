import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function User({ users }) {
    const handleDelete = (uuid) => {
        if (confirm('Yakin ingin menghapus category ini?')) {
            router.delete(`/user/${uuid}`);
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
