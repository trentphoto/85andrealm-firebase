import store, { IState, updateFavorites } from "@/lib/redux";
import { Product } from "@/types/types";
import clsx from "clsx";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AddToFavoritesButton({ product }: { product: Product }) {

  // get current list of favorites from redux store
  const favorites = useSelector((state: IState) => state.favorites);

  // check if product is already in favorites
  const active = favorites.filter(favorite => favorite.id === product.id).length > 0;

  // function to update favorites in redux store
  const updateFavorite = () => store.dispatch(updateFavorites(product));

  return (
    <div
      onClick={() => updateFavorite()}
      className={clsx(
        "flex items-center gap-2 px-6 py-3 mb-0 rounded-full cursor-pointer ",
        active ? "bg-pink-600 hover:bg-pink-700 active:bg-pink-600" : "bg-white hover:bg-gray-50 active:bg-gray-100"
    )}>
        <FaHeart className={clsx(
            "text-2xl",
            active ? "text-white" : "text-pink-200 hover:text" 
        )} />
        {
            active ? <span className="text-white">Remove from Favorites</span> : <span className="text-gray-900">Add to Favorites</span>
        }
    </div>
  )
}
