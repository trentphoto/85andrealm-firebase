import store, { IState, removeFromCart, setCartItemQuantity } from "@/lib/redux";
import { toggle } from "@/lib/redux";
import { useSelector } from "react-redux";
import { Product } from "@/types/types";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import QuantitySelector from "./QuantitySelector";

export default function Cart() {

    function toggleCart() {
        store.dispatch(toggle())
    }

    const cartCount: number = useSelector((state: IState) => state.cart.length)

    const cartItems: Product[] = useSelector((state: IState) => state.cart)

    const handleQuantityChange = (newQuantity: number, item: Product) => {
        store.dispatch(setCartItemQuantity({
            ...item,
            quantity: newQuantity
        }))
    }

    const handleDelete = (item: Product) => {
        store.dispatch(removeFromCart(item))
    }

    return (
        <>
            <div className="z-50 absolute inset-0 overflow-hidden w-screen h-screen bg-transparent">
                <div className="absolute z-20 inset-0 w-full h-full overflow-hidden" onClick={toggleCart}></div>
                <div className="container relative z-50">

                    {/* cart div */}
                    <div className="absolute top-24 right-1 sm:right-4 w-96 max-w-full bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] flex flex-col">
                        {/* top row */}
                        <div className="flex justify-between items-center p-4 border-b border-b-gray-200">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Cart ({cartCount})</h2>
                                {
                                    cartCount ? '' : (
                                        <>
                                            <p className="text-sm text-gray-400 leading-relaxed">Looks like your cart is empty.</p>
                                            <p className="text-sm text-gray-400 leading-relaxed">Start by filling it with some items!</p>
                                        </>
                                    )
                                    
                                }
                            </div>
                            <div></div>
                        </div>
                        {/* cart items */}

                        {
                            cartItems.map(item => (
                                <div className="w-full flex items-center gap-4 p-4 border-b border-b-gray-200" key={item.id}>
                                    <Image 
                                        src={item.image_url}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                    />
                                    <div className="flex flex-col items-start justify-start">
                                        <p className="font-bold text-gray-900">{item.name}</p>
                                        <p className="text-xs leading-3 mb-3 text-gray-600">${item.price}</p>
                                        <QuantitySelector quantity={item.quantity!} item={item} updateQuantity={handleQuantityChange} variant="small" />
                                    </div>
                                    {/* trash button */}
                                    <div
                                        onClick={() => handleDelete(item)} 
                                        className="ml-auto flex justify-end p-3 bg-transparent hover:bg-red-50 transition-colors cursor-pointer rounded-lg"
                                    >
                                        <FaTrashAlt className="text-red-600 text-sm" />
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>




            {/* <div
                className={clsx("z-50 absolute top-24 right-5 w-full h-auto max-w-sm bg-white shadow-xl p-4 pt-4 sm:p-6 lg:p-8")}
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
            >
                
                <button
                    onClick={() => store.dispatch(toggle())}
                    className="relative ml-auto -mr-4 block text-gray-600 transition hover:scale-110"
                >
                    <span className="sr-only">Close cart</span>

                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>

                <div className="mt-6 space-y-6">
                    <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                        <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                        <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                            </div>

                            <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                            </div>
                        </dl>
                        </div>
                    </li>

                    <li className="flex items-center gap-4">
                        <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                        <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                            </div>

                            <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                            </div>
                        </dl>
                        </div>
                    </li>

                    <li className="flex items-center gap-4">
                        <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                        <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                            </div>

                            <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                            </div>
                        </dl>
                        </div>
                    </li>
                    </ul>

                    <div className="space-y-4 text-center">
                    <a
                        href="#"
                        className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                    >
                        View my cart (2)
                    </a>

                    <a
                        href="#"
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                        Checkout
                    </a>

                    <a
                        href="#"
                        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                    >
                        Continue shopping
                    </a>
                    </div>
                </div>
            </div> */}
        </>
    )
}
