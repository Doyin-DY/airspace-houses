import React from "react";
import { TbMapPinPin } from "react-icons/tb";
import { Link } from "react-router-dom";
import { GiBed } from "react-icons/gi";
import { MdOutlineBathtub, MdOutlineShoppingCart } from "react-icons/md";
import { PiToilet } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/slices/cartSlice";

export default function ProductCard({
  id,
  image,
  title,
  price,
  address,
  bathroom,
  bedroom,
  restroom,
  full,
}) {
  const dispatch = useDispatch();
  const handleAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ id, image, title, price }));
  };
  return (
    <Link
      to={`/listing/${id}`}
      className="rounded-md overflow-hidden min-h-44 md:min-h-56 hover:-translate-y-1 hover:shad bg-white group"
    >
      <div className="h-32 w-full overflow-hidden relative">
        <div className="bg-slate-700 py-1 px-4 w-32 rounded-2xl text-xs sm:text-white text-center  group-hover:bg-orange-500 absolute z-10 top-4 left-3">
          &#8358; {price.toLocaleString()}
        </div>

        <button
          onClick={handleAddCart}
          className="bg-slate-700 py-1 px-4 w-max rounded-2xl text-xs sm:text-white text-center  hover:bg-orange-500 absolute z-10 top-4 right-3"
        >
          <MdOutlineShoppingCart />
        </button>

        <img
          src={image[0]}
          alt={title}
          className="w-full h-full rounded-md object-cover object-center"
        />
      </div>
      <div className="flex flex-col justify-between px-4 pb-4 pt-2">
        <h5 className="text-slate-700 text-base sm:text-lg text-justify leading-tight font-semibold">
          {title}
        </h5>
        <p className="flex item-center font-medium text-xs sm:text-sm opacity-70 text-slate-600">
          <TbMapPinPin className="mr-1 text-inherit " /> {address}
        </p>
      </div>
      {full ? (
        <div className="flex items-center rounded-md justify-between p-2 md:p-4 text-slate-700 group-hover:text-white bg-white group-hover:bg-orange-500 ">
          <div className="flex items-center gap-[.15rem] md:gap-1 text-[.55rem] xl:text-xs">
            <GiBed />
            <p className="opacity-70">
              {bedroom} bedroom{bedroom > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-[.15rem] md:gap-1 text-[.55rem] xl:text-xs">
            <MdOutlineBathtub />
            <p className="opacity-70">
              {bathroom} bathroom{bathroom > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-[.15rem] md:gap-1 text-[.55rem] xl:text-xs">
            <PiToilet />
            <p className="opacity-70">
              {restroom} restroom{restroom > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      ) : ("")
      }
    </Link>
  );
}
