import { motion } from 'framer-motion';

export default function SectionHero() {
    return (
        <div
            id="home"
            className="flex h-[610px] justify-center bg-blue-600 py-10"
        >
            <div className="grid w-5/6 grid-cols-3 gap-4 px-10 py-5">
                <motion.div
                    className="col-span-2 mr-20 flex flex-col justify-center gap-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl font-bold text-orange-400">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                    </h2>
                    <p className="font-regular text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis asperiores aperiam architecto soluta illum sit
                        sunt consequuntur totam ratione atque eius, expedita
                        similique a reprehenderit quidem sequi molestiae quod
                        dolorum distinctio commodi est in? Blanditiis.
                    </p>
                </motion.div>
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <img
                        src="/storage/notebook.png"
                        alt="Notebook"
                        className="h-full w-auto object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
}
