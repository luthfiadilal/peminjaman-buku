import Navbar from '@/Layouts/Navbar';
import SectionAbout from '@/Layouts/SectionAbout';
import SectionContact from '@/Layouts/SectionContact';
import SectionHero from '@/Layouts/SectionHero';

export default function Home() {
    return (
        <div>
            <Navbar />
            <SectionHero />
            <SectionAbout />
            <SectionContact />
        </div>
    );
}
