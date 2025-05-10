// pages/CreateBook.js

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../Components/Modal'; // Reusing the Modal component
import BookForm from '../Layouts/BookForm'; // Import the new form component

export default function CreateBook({ authors, categories, publishers }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        publisher_id: '',
        category_id: '',
        author_id: [],
        publication_year: '',
        isbn: '',
        stock: 0,
        is_available: true,
        extra_data: {},
        pdf_file: null,
    });

    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data.stock);
        post(route('book.store'), {
            onSuccess: () => {
                reset();
                setShowModal(true); // Show modal after success
            },
        });
    };

    const closeModal = () => {
        setShowModal(false); // Close modal
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Book
                </h2>
            }
        >
            <div className="mx-auto mt-10 max-w-3xl rounded bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">
                    Add New Book
                </h1>

                {/* Using the BookForm component */}
                <BookForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    authors={authors}
                    categories={categories}
                    publishers={publishers}
                    processing={processing}
                    handleSubmit={handleSubmit}
                />

                {/* Modal Component */}
                <Modal show={showModal} onClose={closeModal}>
                    <div className="p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Success!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            The book has been added successfully.
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
