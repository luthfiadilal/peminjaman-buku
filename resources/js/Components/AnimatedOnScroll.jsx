import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedOnScroll({
    children,
    delay = 0,
    direction = 'up',
}) {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
        if (inView) setHasBeenInView(true);
    }, [inView]);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
            x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.8, delay },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={hasBeenInView ? 'visible' : 'hidden'}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
