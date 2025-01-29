"use client";

import apiTMDB from "@/apiTMDB";
import React, { useEffect, useState, useRef } from "react";

interface Card {
  id: number;
  name: string;
  title: string,
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
        console.log(data.topTenMovie)
        console.log(data.topTenSerie)
        console.log(data.seriesAiringToday)
        const dataTen = data.results.slice(0, 10);
        console.log(data)
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
              alt={card.name}
              className="bw-card-image"
            />
           <p className="bw-card-title">{index + 1}. {card.name || card.title}</p>

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
          padding-block: 1%;
        }

        .bw-scrollTitle {
          font-size: 50px;
          margin-bottom: 20px;
          font-weight: bolder;
          transition: .3s linear;
          color: transparent;
          -webkit-text-stroke: 2px #1C99AD;
          background-image: linear-gradient(to left,  #1C99AD,rgb(0, 221, 250), black,  #1C99AD);
          -webkit-background-clip: text;
          animation: move 30s linear infinite;
        }


        @keyframes move {
           100% {
                  background-position: 2000px 0;
                }
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
          font-weight: bold;
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
