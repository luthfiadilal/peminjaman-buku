import { router } from '@inertiajs/react';
import { BookOpen, CalendarDays, MapPin } from 'lucide-react';
import { route } from 'ziggy-js';

const BorrowingCard = ({ borrow, isReturned = false }) => (
    <div
        key={borrow.id}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg transition hover:shadow-xl"
    >
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <BookOpen size={20} className="text-blue-600" />
            {borrow.book.title}
        </h2>

        <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span>Alamat: {borrow.address}</span>
            </p>
            <p className="flex items-center gap-2">
                <CalendarDays size={16} className="text-green-600" />
                <span>Pinjam: {borrow.borrowed_at}</span>
            </p>
            <p className="flex items-center gap-2">
                <CalendarDays size={16} className="text-red-600" />
                <span>Kembali: {borrow.due_at}</span>
            </p>
            {!isReturned && (
                <button
                    onClick={() =>
                        router.post(route('borrow.return', borrow.id))
                    }
                    className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Kembalikan Buku
                </button>
            )}
        </div>
    </div>
);

export default BorrowingCard;
