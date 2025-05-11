import AuthorSelector from '@/Components/AuthorSelector';
import FormGroup from '@/Components/FormGroup';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EditBook({ book, authors, categories, publishers }) {
    const { data, setData, put, processing, errors } = useForm({
        title: book.title || '',
        isbn: book.isbn || '',
        publication_year: book.publication_year || '',
        stock: book.stock || 0,
        is_available: book.is_available ?? false,
        category_id: book.category_id || '',
        publisher_id: book.publisher_id || '',
        author_id: book.authors?.map((a) => a.id) || [], // ← diisi dari book.authors
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => {
            if (Array.isArray(val)) {
                val.forEach((v) => formData.append(`${key}[]`, v));
            } else {
                formData.append(key, val);
            }
        });
        if (pdfFile) formData.append('pdf_file', pdfFile);

        put(route('book.update', book.id), formData, {
            onSuccess: () => {
                console.log('success');
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="mx-auto max-w-3xl rounded-2xl bg-white px-6 py-10 shadow">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Edit Book
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormGroup label="Title" error={errors.title}>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup label="ISBN" error={errors.isbn}>
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            value={data.isbn}
                            onChange={(e) => setData('isbn', e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Publication Year"
                        error={errors.publication_year}
                    >
                        <input
                            type="number"
                            className="w-full rounded border p-2"
                            value={data.publication_year}
                            onChange={(e) =>
                                setData('publication_year', e.target.value)
                            }
                        />
                    </FormGroup>

                    <FormGroup label="Stock" error={errors.stock}>
                        <input
                            type="number"
                            className="w-full rounded border p-2"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup label="Availability">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={data.is_available}
                                onChange={(e) =>
                                    setData('is_available', e.target.checked)
                                }
                            />
                            Available
                        </label>
                    </FormGroup>

                    <FormGroup label="Category" error={errors.category_id}>
                        <select
                            className="w-full rounded border p-2"
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', e.target.value)
                            }
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    <FormGroup label="Publisher" error={errors.publisher_id}>
                        <select
                            className="w-full rounded border p-2"
                            value={data.publisher_id}
                            onChange={(e) =>
                                setData('publisher_id', e.target.value)
                            }
                        >
                            <option value="">-- Select Publisher --</option>
                            {publishers.map((pub) => (
                                <option key={pub.id} value={pub.id}>
                                    {pub.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    <AuthorSelector
                        authors={authors}
                        selectedAuthor={selectedAuthor}
                        setSelectedAuthor={setSelectedAuthor}
                        data={data}
                        setData={setData}
                        error={errors.author_id}
                    />

                    <FormGroup label="PDF File">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setPdfFile(e.target.files[0])}
                        />
                        {book.pdf_file && (
                            <p className="mt-1 text-sm text-gray-500">
                                Existing File:{' '}
                                <a
                                    className="text-blue-600 underline"
                                    href={`/storage/${book.pdf_file}`}
                                >
                                    View PDF
                                </a>
                            </p>
                        )}
                    </FormGroup>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                        >
                            {processing ? 'Saving...' : 'Update Book'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
