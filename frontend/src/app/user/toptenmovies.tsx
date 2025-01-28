"use client";

import React, { useEffect, useState, useRef } from "react";

interface Card {
  id: number;
  title: string;
  poster_path: string;
}

interface CardProps {
  infoTitle: string;
  apiTMDBkey: string;
}

const API_AUTH = process.env.NEXT_PUBLIC_TMDB_AUTH;

if (!API_AUTH) {
  throw new Error("API key not defined");
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_AUTH || "",
  },
};

export default function MediaTopTen({ infoTitle, apiTMDBkey }: CardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(apiTMDBkey, options)
      .then((res) => res.json())
      .then((data) => {
        const dataTen = data.results.slice(0, 10);
        setCards(dataTen);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [apiTMDBkey]);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = direction === "left" ? -400 : 400;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bw-Movies">
      <h1 className="bw-scrollTitle">{infoTitle}</h1>
      <div className="bw-card-container" ref={scrollRef}>
        {cards.map((card, index) => (
          <div className="bw-card" key={card.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
              alt={card.title}
              className="bw-card-image"
            />
            <p className="bw-card-title">{index + 1}. {card.title}</p>
          </div>
        ))}
      </div>
      <div className="bw-castsection-scroll">
        <button
          onClick={() => scroll("left")}
          className="bw-castsection-arrow bw-castsection-arrow-left"
        >
          {"<"}
        </button>
        <button
          onClick={() => scroll("right")}
          className="bw-castsection-arrow bw-castsection-arrow-right"
        >
          {">"}
        </button>
      </div>
      <style jsx>{`
        .bw-Movies {
          margin: 20px;
        }

        .bw-scrollTitle {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .bw-card-container {
          display: flex;
          overflow-x: auto;
          gap: 20px;
          scroll-snap-type: x mandatory;
        }

        .bw-card {
          flex-shrink: 0;
          width: 200px;
          text-align: center;
        }

        .bw-card-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .bw-card-title {
          font-size: 1rem;
          margin-top: 10px;
          color: #333;
        }

        .bw-castsection-scroll {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .bw-castsection-arrow {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 2rem;
          padding: 10px;
          cursor: pointer;
        }

        .bw-castsection-arrow-left {
          border-radius: 5px 0 0 5px;
        }

        .bw-castsection-arrow-right {
          border-radius: 0 5px 5px 0;
        }

        .bw-castsection-arrow:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
}
