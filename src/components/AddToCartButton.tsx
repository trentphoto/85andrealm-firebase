import store, { addToCart, toggle } from "@/lib/redux";
import { Product } from "@/types/types";
import clsx from "clsx";
import { FaCartPlus } from "react-icons/fa";

export default function AddToCartButton({ product, quantity }: { product: Product, quantity: number } ) {
  
  const handleAddToCart = () => {
    store.dispatch(addToCart({
      ...product,
      quantity: quantity
    }));

    // smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // open cart
    store.dispatch(toggle());
  }

  return (
    <>
        <div 
            onClick={handleAddToCart}
            tabIndex={0}
            className={clsx(
                "shrink-0 cursor-pointer inline-flex items-center justify-center px-12 py-3",
                "text-lg font-bold tracking-wider",
                "bg-green-600 text-white hover:bg-green-700 active:bg-green-600"
            )}
        >
            <FaCartPlus className="text-xl mr-2" />

            <span>Add to Cart</span>
            
        </div>
    </>
  )
}
