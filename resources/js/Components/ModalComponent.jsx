export default function ModalComponent({ show, onClose, title, message }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
