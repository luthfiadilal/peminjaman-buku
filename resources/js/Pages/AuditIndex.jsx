import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AuditIndex({ audits }) {
    return (
        <AuthenticatedLayout>
            <Head title="Audit Log" />

            <div className="mx-auto max-w-7xl space-y-6 p-6">
                <h2 className="mb-4 text-2xl font-bold">History</h2>

                <div className="overflow-x-auto rounded-lg bg-white shadow">
                    <table className="min-w-full table-auto border border-gray-200 text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b px-4 py-2">Tanggal</th>
                                <th className="border-b px-4 py-2">User</th>
                                <th className="border-b px-4 py-2">Aksi</th>
                                <th className="border-b px-4 py-2">Tabel</th>
                                <th className="border-b px-4 py-2">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {audits.data.map((audit) => (
                                <tr key={audit.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {new Date(
                                            audit.created_at,
                                        ).toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {audit.user?.name || 'System'}
                                    </td>
                                    <td className="px-4 py-2 capitalize">
                                        {audit.event}
                                    </td>
                                    <td className="px-4 py-2">
                                        {audit.auditable_type
                                            ?.split('\\')
                                            .pop()}
                                    </td>
                                    <td className="px-4 py-2">
                                        {audit.note || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pt-4">
                    {/* Pagination Manual */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                            Halaman {audits.current_page} dari{' '}
                            {audits.last_page}
                        </span>
                        <div className="space-x-2">
                            {audits.prev_page_url && (
                                <a
                                    href={audits.prev_page_url}
                                    className="text-blue-600 hover:underline"
                                >
                                    &laquo; Sebelumnya
                                </a>
                            )}
                            {audits.next_page_url && (
                                <a
                                    href={audits.next_page_url}
                                    className="text-blue-600 hover:underline"
                                >
                                    Selanjutnya &raquo;
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
