import React from "react";
import { estate_frontal } from "../assets/images";
import { houseData } from "../data/houseData";
import ProductCard from "../components/ProductCard";

export default function Listing() {
  return (
    <main className="flex flex-col relative">
      <div className="bg-main relative min-h-[65vh] h-[70vh] px-4">
        <img
          src={estate_frontal}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative py-10 container mx-auto text-white flex flex-col justify-center h-full gap-2">
          <h3 className="text-3xl md:text-4xl font-bold">Our Listing</h3>
          <p className="text-base md:text-lg md:max-w-lg">
            Explore the listing on airspace which are intended to reflect the
            people, minds, emotions and spaces around them and within them{" "}
          </p>
        </div>
      </div>
      <section className="bg-primary py-20 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7 md:gap-10">
          {houseData.map((house) => (
            <ProductCard key={house.id} {...house} full={true} />
          ))}
        </div>
      </section>
    </main>
  );
}
