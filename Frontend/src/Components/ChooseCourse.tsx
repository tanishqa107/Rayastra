"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import axios from "axios";

type CardType = {
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  contentSummary: string;
};


export function ExpandableCardDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [userClass, setUserClass] = useState<number | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [active, setActive] = useState<CardType | boolean | null>(null);
  const id = useId();

  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  // Step 1: Get user class
  useEffect(() => {
    const fetchUserClass = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/getUserInfo", {
          params: { email },
        });
        setUserClass(res.data.class);
        console.log(res.data.class);
        console.log(email)
      } catch (err) {
        console.error("Error fetching user info", err);
        setUserClass(null);
      }
    };

    if (email) fetchUserClass();
  }, [email]);

  // Step 2: Fetch content based on class
  useEffect(() => {
    const fetchCards = async () => {
      if (!userClass) return;

      try {
        const response = await fetch(`/data/class${userClass}.json`);
        const json = await response.json();
        setCards(json);
      } catch (error) {
        console.error("Failed to load course content:", error);
      }
    };

    fetchCards();
  }, [userClass]);

  // Step 3: Close on Escape
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-black">Hey Kiddo</h1>
          <h1 className="text-4xl font-bold text-black">Explore our Courses for you</h1>
        </div>

       

        {/* Modal */}
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 flex items-center justify-center rounded-full h-8 w-8 shadow-md bg-white"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full  bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <img
                    src={active.src}
                    alt={active.title}
                    className="w-full h-64 object-cover object-center"
                  />
                </motion.div>

                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-2xl font-bold text-gray-800"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-gray-600"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-6 py-3 rounded-full font-bold bg-blue-500 text-white hover:bg-blue-600 transition-colors text-center"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  <motion.div
  layout
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="text-gray-700 pb-6 space-y-2"
>
  {active.contentSummary.split('\n').map((line, idx) => {
  const isHeading = /^[A-Z][\w\s]+:/.test(line);
  const isBullet = /^[-•]\s/.test(line);

  if (isHeading) {
    const [heading, ...rest] = line.split(':');
    return (
      <div key={idx} className="mt-4">
        <p className="font-semibold text-lg text-black">{heading.trim()}:</p>
        {rest.join(':').trim() && (
          <p className="text-gray-700 mt-1">{rest.join(':').trim()}</p>
        )}
      </div>
    );
  }

  if (isBullet) {
    return (
      <li key={idx} className="text-gray-700 list-disc list-inside">
        {line.replace(/^[-•]\s*/, '')}
      </li>
    );
  }

  return (
    <p key={idx} className="text-gray-700">
      {line}
    </p>
  );
})}

</motion.div>

                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* Cards */}
        <div className="space-y-6">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="bg-white h-80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex flex-col md:flex-row">
                <motion.div
                  layoutId={`image-${card.title}-${id}`}
                  className="md:w-1/3"
                >
                  <img
                    src={card.src}
                    alt={card.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </motion.div>

                <div className="p-6 md:w-2/3">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="text-xl font-bold text-gray-800 mb-2"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-gray-600 mb-4"
                  >
                    {card.description}
                  </motion.p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-gray-800"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};
