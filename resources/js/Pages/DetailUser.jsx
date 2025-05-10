import ModalComponent from '@/Components/ModalComponent';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function DetailUser({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('user.update', user.id), {
            onSuccess: () => {
                setShowModal(true);
                setData('password', ''); // reset password
            },
        });
    };

    return (
        <div className="mx-auto max-w-xl p-4">
            <h1 className="mb-4 text-xl font-bold">Detail User</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Nama</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.name && (
                        <div className="text-sm text-red-500">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.email && (
                        <div className="text-sm text-red-500">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block font-medium">
                        Password (opsional)
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.password && (
                        <div className="text-sm text-red-500">
                            {errors.password}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    {processing ? 'Updating...' : 'Update'}
                </button>
            </form>

            <ModalComponent
                show={showModal}
                onClose={() => router.get(route('user.index'))}
                title="Berhasil"
                message="Data user berhasil diperbarui."
            />
        </div>
    );
}
