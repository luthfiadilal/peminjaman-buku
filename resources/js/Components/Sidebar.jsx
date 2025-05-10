import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Building,
    FileText,
    Folder,
    PenTool,
    User,
} from 'lucide-react';
import { route } from 'ziggy-js';

const menu = [
    {
        label: 'Main',
        items: [
            {
                name: 'Book',
                icon: <BookOpen size={16} />,
                href: route('dashboard-admin'),
            },
            {
                name: 'Publisher',
                icon: <Building size={16} />,
                href: route('publisher.index'),
            },
            {
                name: 'Category',
                icon: <Folder size={16} />,
                href: route('category.index'),
            },
            {
                name: 'Author',
                icon: <PenTool size={16} />,
                href: route('author.index'),
            },
            {
                name: 'User',
                icon: <User size={16} />,
                href: route('user.index'),
            },
            {
                name: 'Peminjaman Buku',
                icon: <FileText size={16} />,
                href: '/borrowings',
            },
        ],
    },
];

export default function Sidebar() {
    const { url } = usePage();

    return (
        <aside className="flex h-screen w-64 flex-col bg-blue-600 text-gray-200">
            <div className="px-6 py-4 text-lg font-bold tracking-wide">
                <Link href="/dashboard-admin">Peminjaman Buku</Link>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-2">
                {menu.map((group, idx) => (
                    <div key={idx}>
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white">
                            {group.label}
                        </h2>
                        <div className="space-y-1">
                            {group.items.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                                        url.startsWith(item.href)
                                            ? 'bg-gray-500 text-white'
                                            : 'hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
