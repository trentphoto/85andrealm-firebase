import clsx from "clsx";
import { FaStar } from "react-icons/fa";

export default function Stars({ rating = 5 }: { rating?: 1|2|3|4|5 }) {
  return (
    <>
        <div className="flex items-center gap-2">
            <FaStar className="text-yellow-600" />
            <FaStar className={clsx( rating >= 2 ? 'text-yellow-600' : 'text-gray-400')} />
            <FaStar className={clsx( rating >= 3 ? 'text-yellow-600' : 'text-gray-400')} />
            <FaStar className={clsx( rating >= 4 ? 'text-yellow-600' : 'text-gray-400')} />
            <FaStar className={clsx( rating >= 5 ? 'text-yellow-600' : 'text-gray-400')} />
        </div>
    </>
  )
}
