import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../Components/Modal'; // Assuming the modal is in the Components folder

export default function CreatePublisher() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('publisher.store'), {
            onSuccess: () => {
                reset();
                setShowModal(true); // Show the modal on success
            },
        });
    };

    const closeModal = () => {
        setShowModal(false); // Close modal when the button is clicked
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Publisher
                </h2>
            }
        >
            <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">
                    Add Publisher
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Publisher Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                    >
                        {processing ? 'Submitting...' : 'Add Publisher'}
                    </button>
                </form>

                {/* Modal component */}
                <Modal show={showModal} onClose={closeModal} maxWidth="sm">
                    <div className="p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Publisher Added Successfully!
                        </h2>
                        <p className="mt-4 text-gray-600">
                            The publisher has been successfully added to the
                            system.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={closeModal}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
