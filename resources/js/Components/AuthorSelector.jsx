import InputError from './InputError';

// components/AuthorSelector.jsx
export default function AuthorSelector({
    authors,
    selectedAuthor,
    setSelectedAuthor,
    data,
    setData,
    error,
}) {
    return (
        <div>
            <label className="mb-1 block font-medium">Author</label>
            <div className="flex gap-2">
                <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm"
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
            <InputError message={error} />
        </div>
    );
}
