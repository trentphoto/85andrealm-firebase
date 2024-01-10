import { Product } from "@/types/types";
import clsx from "clsx";

export default function QuantitySelector({ 
    item, 
    quantity, 
    updateQuantity,
    variant = "default"
}: { 
    item: Product, 
    quantity: number, 
    updateQuantity: Function,
    variant?: "default" | "small"
}) {
    
    const handleQuantityIncrease = () => {
        if (quantity < item.stock) {
            updateQuantity(quantity + 1, item);
        }
    }
    
    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            updateQuantity(quantity - 1, item);
        }
    }

  return (
    <div className={clsx(
        "border border-gray-400 flex items-center bg-white",
        variant === "default" ? "py-4" : "py-2 h-8"
    )}>
        
        {/* decrease button */}
        <button className={clsx(
                'text-2xl font-bold',
                variant === "default" ? "px-8 text-gray-700" : "px-2 text-gray-500 text-xl"
            )} onClick={() => handleQuantityDecrease()}>-</button>
        
        {/* divider */}
        <div className="block h-full w-px bg-gray-300" />
        
        {/* quantity label */}
        <span className={clsx(
            "text-lg font-bold text-gray-700",
            variant === "default" ? "px-8 py-2" : "px-2 py-1"
        )}>{quantity}</span>
        
        {/* divider */}
        <div className="block h-full w-px bg-gray-300" />
        
        {/* increase button */}
        <button className={clsx(
                'text-2xl font-bold',
                variant === "default" ? "px-8 text-gray-700" : "px-2 text-gray-500 text-xl"
            )} onClick={() => handleQuantityIncrease()}>+</button>
    </div>
  )
}
