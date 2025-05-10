// components/BookForm.js
import { useEffect, useState } from 'react';

import InputError from '../Components/InputError';
import InputLabel from '../Components/InputLabel'; // Pastikan untuk import InputLabel
import SelectInput from '../Components/SelectInput'; // Pastikan untuk import SelectInput
import TextInput from '../Components/TextInput'; // Pastikan untuk import TextInput

export default function BookForm({
    data,
    setData,
    errors,
    authors,
    categories,
    publishers,
    processing,
    handleSubmit,
}) {
    const [extraDataText, setExtraDataText] = useState(
        JSON.stringify(data.extra_data ?? {}),
    );

    const [selectedAuthor, setSelectedAuthor] = useState('');

    useEffect(() => {
        setExtraDataText(JSON.stringify(data.extra_data ?? {}));
    }, [data.extra_data]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
                <InputLabel className="mb-2" htmlFor="title">
                    Book Title
                </InputLabel>
                <TextInput
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} />
            </div>

            {/* Publisher */}
            <div>
                <InputLabel className="mb-2" htmlFor="publisher_id">
                    Publisher
                </InputLabel>
                <SelectInput
                    id="publisher_id"
                    name="publisher_id"
                    value={data.publisher_id}
                    valueset="Select Publisher"
                    onChange={(e) => setData('publisher_id', e.target.value)}
                    options={publishers}
                />
                <InputError message={errors.publisher_id} />
            </div>

            {/* Category */}
            <div>
                <InputLabel className="mb-2" htmlFor="category_id">
                    Category
                </InputLabel>
                <SelectInput
                    id="category_id"
                    name="category_id"
                    value={data.category_id}
                    valueset="Select Category"
                    onChange={(e) => setData('category_id', e.target.value)}
                    options={categories}
                />
                <InputError message={errors.category_id} />
            </div>

            {/* Author */}
            <div>
                <InputLabel className="mb-2" htmlFor="author_id">
                    Author
                </InputLabel>

                {/* Dropdown Select */}
                <div className="flex gap-2">
                    <select
                        id="author_id"
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Pilih Author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => {
                            if (
                                selectedAuthor &&
                                !data.author_id.includes(selectedAuthor)
                            ) {
                                setData('author_id', [
                                    ...data.author_id,
                                    selectedAuthor,
                                ]);
                            }
                            setSelectedAuthor('');
                        }}
                        className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    >
                        Tambah
                    </button>
                </div>

                {/* Daftar Author yang Ditambahkan */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {data.author_id.map((id) => {
                        const author = authors.find((a) => a.id == id);
                        return (
                            <div
                                key={id}
                                className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm"
                            >
                                <span>{author?.name || 'Unknown'}</span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData(
                                            'author_id',
                                            data.author_id.filter(
                                                (aid) => aid !== id,
                                            ),
                                        )
                                    }
                                    className="ml-1 text-red-600 hover:text-red-800"
                                >
                                    &times;
                                </button>
                            </div>
                        );
                    })}
                </div>

                <InputError message={errors.author_id} />
            </div>

            {/* ISBN */}
            <div>
                <InputLabel className="mb-2" htmlFor="isbn">
                    ISBN
                </InputLabel>
                <TextInput
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={data.isbn}
                    onChange={(e) => setData('isbn', e.target.value)}
                />
                <InputError message={errors.isbn} />
            </div>

            {/* Publication Year */}
            <div>
                <InputLabel className="mb-2" htmlFor="publication_year">
                    Publication Year
                </InputLabel>
                <TextInput
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    type="text"
                    id="publication_year"
                    name="publication_year"
                    value={data.publication_year}
                    onChange={(e) =>
                        setData('publication_year', e.target.value)
                    }
                />
                <InputError message={errors.publication_year} />
            </div>

            {/* Stock */}
            <div>
                <InputLabel className="mb-2" htmlFor="stock">
                    Stock
                </InputLabel>
                <TextInput
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    type="number"
                    id="stock"
                    name="stock"
                    value={data.stock}
                    onChange={(e) => setData('stock', e.target.value)}
                />
                <InputError message={errors.stock} />
            </div>

            {/* Extra Data */}
            <div>
                <InputLabel className="mb-2" htmlFor="extra_data">
                    Extra Data (JSON)
                </InputLabel>
                <textarea
                    id="extra_data"
                    name="extra_data"
                    value={extraDataText}
                    onChange={(e) => {
                        const value = e.target.value;
                        setExtraDataText(value);

                        try {
                            const parsed = JSON.parse(value);
                            setData('extra_data', parsed);
                        } catch (err) {
                            // Tidak melakukan apa-apa saat JSON tidak valid
                        }
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-mono shadow-sm"
                    rows="4"
                />

                <InputError message={errors.extra_data} />
            </div>

            {/* PDF File */}
            <div>
                <InputLabel htmlFor="pdf_file">Upload PDF</InputLabel>
                <input
                    type="file"
                    id="pdf_file"
                    name="pdf_file"
                    onChange={(e) => setData('pdf_file', e.target.files[0])}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
                />
                <InputError message={errors.pdf_file} />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
                {processing ? 'Submitting...' : 'Add Book'}
            </button>
        </form>
    );
}
