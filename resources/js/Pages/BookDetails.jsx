import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function BookDetails({ book }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Book Details
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
                    <div className="mb-6">
                        <Link
                            href="/dashboard-admin"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    <h1 className="mb-2 text-3xl font-bold text-gray-800">
                        {book.title}
                    </h1>
                    <p className="mb-6 text-sm text-gray-600">
                        ISBN: {book.isbn}
                    </p>

                    <div className="grid grid-cols-1 gap-6 text-base text-gray-700 sm:grid-cols-2">
                        <div>
                            <p>
                                <span className="font-semibold">Authors:</span>{' '}
                                {book.authors
                                    .map((author) => author.name)
                                    .join(', ')}
                            </p>
                            <p>
                                <span className="font-semibold">Category:</span>{' '}
                                {book.category?.name || '-'}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Publisher:
                                </span>{' '}
                                {book.publisher?.name || '-'}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">
                                    Publication Year:
                                </span>{' '}
                                {book.publication_year}
                            </p>
                            <p>
                                <span className="font-semibold">Stock:</span>{' '}
                                {book.stock}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Available:
                                </span>
                                <span
                                    className={`ml-2 rounded-full px-2 py-1 text-sm text-white ${book.is_available ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {book.is_available ? 'Yes' : 'No'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {book.pdf_file && (
                        <div className="mt-8 flex gap-4">
                            <a
                                href={`/storage/${book.pdf_file}`}
                                target="_blank"
                                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
                                rel="noopener noreferrer"
                            >
                                View PDF
                            </a>

                            <Link
                                href={`/book/${book.id}/edit`}
                                className="inline-block rounded-lg bg-yellow-500 px-4 py-2 text-white shadow transition hover:bg-yellow-600"
                            >
                                Edit Book
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
