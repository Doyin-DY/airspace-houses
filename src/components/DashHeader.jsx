import { useEffect, useState } from "react";
import { HiMiniBars2 } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dashNavLinks } from "../data/dashNavLinks";
import { MdOutlineLogout, MdOutlineShoppingCart, MdPersonOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateUser } from "../features/slices/userSlice";

export default function DashHeader() {
  const [navShow, setNavShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cart);
  const userState = useSelector(state => state.user)

  

  const handleLogout = async() => {
    // localStorage.removeItem("airspace__user")
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json()
      if(data.error) toast.error(data.message, {id: "123"})
      else {
        dispatch(updateUser(null))
        localStorage.removeItem("airspace__user")
        toast.success(data.message, {id: "123"})
        navigate(0)
        navigate("/account")
      }
    } catch (error) {
      toast.error(`unable to process your request`, {id: "123"})
    }
  }

  useEffect(() => {
    return () => {
      setNavShow(false);
    };
  }, [location.pathname]);

  return (
    <header className="bg-white relative px-4">
      <div className="container mx-auto relative py-4 flex justify-between gap-4 items-center bg-white">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="h-5 w-5 md:h-8 md:w-8 rounded-full bg-orange-500 flex-shrink-0"></div>
          <h1 className="text-gray-600 font-semibold text-sm md:text-lg">
            AirSpace
          </h1>
        </Link>
        <nav
          className={`flex flex-col md:flex-row md:gap-4 md:justify-center absolute md:static ${navShow ? "left-0" : "left-[100vw]"
            } top-full w-full bg-orange-100 md:bg-transparent z-50`}
        >
          {dashNavLinks.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              className="text-gray-600 text-sm sm:text-base py-2 px-4 hover:bg-orange-500 hover:text-white md:border-b-2 md:border-transparent md:hover:border-orange-500 md:hover:bg-transparent md:hover:text-gray-600">
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3 items-center">
          <Link
            to={"/cart"}
            className="flex p-1.5 border border-gray-50 hover:bg-orange-50 rounded-md cursor-pointer relative"
          >
            <span className="absolute -top-2 -right-1 h-4 w-4 rounded-full text-white bg-orange-500 grid place-items-center text-xs">
              {cartState.length}
            </span>
            <MdOutlineShoppingCart className="text-orange-600 font-bold text-lg" />
          </Link>
          {
            userState ? <button onClick={handleLogout} className="flex p-1.5 border border-gray-50 hover:bg-orange-50 rounded-md cursor-pointer relative"
          >< MdOutlineLogout className="text-orange-600 font-bold text-xl" />
          </button> : <Link
            to={"/account"}
            className="flex p-1.5 border border-gray-50 hover:bg-orange-50 rounded-md cursor-pointer relative"
          >< MdPersonOutline className="text-orange-600 font-bold text-xl" />
          </Link>
          }
          <div
            onClick={() => setNavShow(!navShow)}
            className="flex p-2 border border-gray-200 hover:bg-gray-200 md:hidden rounded-md cursor-pointer"
          >
            <HiMiniBars2 className="text-gray-600 font-bold text-lg" />
          </div>
        </div>
      </div>
    </header>
  );
}
