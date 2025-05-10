import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function BookListBorrowing({ books = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Book
                </h2>
            }
        >
            <Head title="Book" />

            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700">All Books</h3>

                <div className="mt-4 overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full table-fixed">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Title
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Author
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Category
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Year
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Stock
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Available
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {books.map((book) => (
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
                                        {book.is_available ? 'Yes' : 'No'}
                                    </td>
                                    <td className="flex space-x-2 whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        <button
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        'borrow.form',
                                                        book.id,
                                                    ),
                                                )
                                            }
                                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white"
                                        >
                                            Pinjam
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
