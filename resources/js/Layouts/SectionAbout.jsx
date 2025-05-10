import AnimatedOnScroll from '@/Components/AnimatedOnScroll';

export default function SectionAbout() {
    return (
        <div
            id="about"
            className="flex h-[600px] w-full flex-col items-center justify-center bg-blue-600 py-10"
        >
            <AnimatedOnScroll direction="up">
                <h2 className="mb-8 text-4xl font-bold text-orange-400">
                    About Us
                </h2>
            </AnimatedOnScroll>

            <div className="grid w-5/6 grid-cols-1 gap-8 px-10 md:grid-cols-2">
                <AnimatedOnScroll direction="left">
                    <p className="text-lg leading-relaxed text-white">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Voluptatum commodi ea ullam, illum adipisci
                        impedit tempora dolor repudiandae quas dolore, nulla et
                        cumque? Quidem dicta, facilis reiciendis illo eligendi
                        amet?
                    </p>
                </AnimatedOnScroll>
                <AnimatedOnScroll direction="right" delay={0.2}>
                    <p className="text-lg leading-relaxed text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aut id quod similique? Excepturi, illo quia et, corporis
                        dolore voluptate molestias dolores ullam sit ducimus
                        mollitia obcaecati eaque eligendi incidunt alias minima
                        voluptas ipsam nesciunt.
                    </p>
                </AnimatedOnScroll>
            </div>
        </div>
    );
}
