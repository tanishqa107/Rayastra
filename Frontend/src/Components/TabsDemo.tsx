"use client";

import { Tabs } from "../ui/tabs";

const TabContent = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <div className="w-full h-full overflow-hidden relative rounded-2xl">
    <img
      src={imageUrl}
      alt={title}
      className="absolute  w-full h-full object-cover rounded-2xl"
    />
    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-start p-10 text-white text-xl md:text-4xl font-bold">
      <p>{title}</p>
    </div>
  </div>
);

export function TabsDemo() {
  const tabs = [
    {
      title: "Traditional",
      value: "Traditional",
      content: (
        <TabContent
          title="Traditional Values"
          imageUrl="https://images.pexels.com/photos/8422248/pexels-photo-8422248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      ),
    },
    {
      title: "Creative",
      value: "Creative",
      content: (
        <TabContent
          title="Creative Thinking"
          imageUrl="https://images.pexels.com/photos/8471912/pexels-photo-8471912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      ),
    },
    {
      title: "Knowledge",
      value: "Knowledge",
      content: (
        <TabContent
          title="Sprinkling Knowledge"
          imageUrl="https://images.pexels.com/photos/4144531/pexels-photo-4144531.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        />
      ),
    },
    {
      title: "Intelligence",
      value: "Intelligence",
      content: (
        <TabContent
          title="Intelligence"
          imageUrl="https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      ),
    },
    {
      title: "Fun",
      value: "Fun",
      content: (
        <TabContent
          title="Just for Fun"
          imageUrl="https://images.pexels.com/photos/8535198/pexels-photo-8535198.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        />
      ),
    },
    {
      title: "Information",
      value: "Information",
      content: (
        <TabContent
          title="Information Zone"
          imageUrl="https://images.pexels.com/photos/5427998/pexels-photo-5427998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      ),
    },
    {
      title: "Curosity",
      value: "Curosity",
      content: (
        <TabContent
          title="Feed Your Curosity"
          imageUrl="https://images.pexels.com/photos/8471984/pexels-photo-8471984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      ),
    },
    {
      title: "Adventure",
      value: "Adventure",
      content: (
        <TabContent
          title="Adventure Awaits"
          imageUrl="https://images.pexels.com/photos/8612897/pexels-photo-8612897.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        />
      ),
    },
    {
      title: "Understanding",
      value: "Understanding",
      content: (
        <TabContent
          title="Gain Deeper Understanding"
          imageUrl="https://images.pexels.com/photos/4143795/pexels-photo-4143795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[30rem] [perspective:500px] relative flex flex-col max-w-5xl mx-auto w-full items-center">
      <Tabs tabs={tabs} />
    </div>
  );
}
