import AnimatedOnScroll from '@/Components/AnimatedOnScroll';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function SectionContact() {
    return (
        <div
            id="contact"
            className="flex h-[600px] w-full flex-col items-center justify-center bg-blue-600 py-20"
        >
            <AnimatedOnScroll direction="up">
                <h2 className="mb-8 text-4xl font-bold text-white">
                    Contact Us
                </h2>
            </AnimatedOnScroll>

            <div className="grid w-5/6 grid-cols-2 gap-8 px-10 md:grid-cols-2">
                {/* Info */}
                <AnimatedOnScroll direction="left">
                    <div className="col-span-1 flex h-full w-full flex-col justify-center gap-6 text-white">
                        <div className="flex items-center gap-4">
                            <Mail className="text-orange-400" />
                            <span>hello@example.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="text-orange-400" />
                            <span>+62 721 3456 7890</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="mt-1 text-orange-400" />
                            <span>Jl. Raya No. 1</span>
                        </div>
                    </div>
                </AnimatedOnScroll>

                {/* Form */}
                <AnimatedOnScroll direction="right" delay={0.2}>
                    <form className="col-span-1 rounded-xl bg-white p-6 shadow-lg">
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Send Message
                        </button>
                    </form>
                </AnimatedOnScroll>
            </div>
        </div>
    );
}
