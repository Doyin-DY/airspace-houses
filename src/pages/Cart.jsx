import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { estate_frontal, estate_sky } from "../assets/images";
import { changeInCart, removeFromCart } from "../features/slices/cartSlice";
import { MdClose } from "react-icons/md";

export default function Cart() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <main className="flex flex-col relative">
      <div className="bg-main relative min-h-[65vh] h-[70vh] px-4">
        <img
          src={estate_sky}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative py-10 container mx-auto text-white flex flex-col justify-center h-full gap-2">
          <h3 className="text-3xl md:text-4xl font-bold">Cart Management</h3>
          <p className="text-base md:text-lg">
            Manage the products in you cart in one page
          </p>
        </div>
      </div>
      <section className="bg-primary px-4 py-10">
        <div className="container mx-auto flex flex-col divide-y divide-slate-200">
          {cartState.length ? (
            <>
              {cartState.map((cart) => (
                <aside
                  key={cart.id}
                  className="bg-white relative p-4 flex item-center gap-4"
                >
                  <button
                    onClick={() => dispatch(removeFromCart({ id: cart.id }))}
                    className="bg-cursor-pointer bg-orange-600 rounded-full w-5 h-5 grid place-items-center absolute z-10 top-2 right-2 text-white text-sm"
                  >
                    <MdClose />
                  </button>
                  <img
                    src={cart.image[0]}
                    alt={cart.title}
                    className="min-h-10 w-14 object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-main text-xl md:text-2xl font-semibold">
                      {cart.title}
                    </h3>
                    <p className="text-orange text-sm sm:text-base md:text-lg">
                      &#8358;{cart.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-md w-10 h-10 overflow-hidden my-auto">
                    <input
                      type="number"
                      name=""
                      id=""
                      value={cart.qty}
                      onChange={(e) =>
                        dispatch(
                          changeInCart({ id: cart.id, qty: e.target.value })
                        )
                      }
                      className="w-18 ml-1 p-2 outline-none text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </aside>
              ))}
              <div className="flex justify-between items-center gap-4 text-2xl md:text-3xl text-slate-700">
                <h3 className="font-bold">
                  Total: &#8358;
                  {cartState
                    .reduce(
                      (oldTotal, cart) => cart.qty * cart.price + oldTotal,
                      0
                    )
                    .toLocaleString()}
                </h3>
                <button className="bg-orange-600 py-2 px-4 w-28 my-10 text-white cursor-pointer rounded-md text-sm md:text-base">
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <p className="text-base md:text-lg text-center">
              Ain't no items in this cart.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
