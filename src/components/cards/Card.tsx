import React from "react";

interface CardProps {
  item: any;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="relative">
      <div className="rounded overflow-hidden">
        <img
          src={item?.images?.jpg?.large_image_url}
          alt="Anime Thumbnail"
          className="w-full object-contain hover:scale-125 transition-all ease duration-300"
        />
      </div>
      <div className="w-full p-2 absolute left-0 bottom-0 bg-gradient-to-b from-transparent to-black">
        <p className="text-primary-dark max-md:text-sm">
          {item?.title_japanese}
        </p>
        <h3 className="md:text-lg font-semibold text-primary-dark hover:underline">
          <a href={item?.url} target="_blank">
            {item?.title}
          </a>
        </h3>
        <p className="text-primary-dark flex justify-between">
          <small>{item?.episodes} Episode</small>
          <small className="text-yellow-400">{item?.score} 🌟</small>
        </p>
      </div>
    </div>
  );
};

export default Card;
