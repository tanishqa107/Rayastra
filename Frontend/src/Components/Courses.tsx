import { CardHoverEffectDemo } from "./cardHover";

const Courses = () => {
  return (
    <section
      id="who-are-we"
      className="w-full py-20 bg-gradient-to-b from-yellow-50 via-rose-50 to-sky-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        <h1 className="text-zinc-900 dark:text-white text-4xl md:text-6xl font-bold mb-12">
          Courses We Offer
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
         From counting stars to crafting stories, our courses cover every corner of the learning universe!
Explore subjects designed to spark curiosity, creativity, and confidence in every young explorer.

        </p>
        <CardHoverEffectDemo />
      </div>
    </section>
  );
};

export default Courses;
