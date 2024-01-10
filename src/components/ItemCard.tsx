import Image from "next/image"
import Stars from "./Stars"
import { Product } from "@/types/types"
import Link from "next/link";

export default function ItemCard({ product }: { product: Product }) {

    if (!product) return <></>;

    return (
        <Link href={`/product/${product.id}`} className="relative overflow-hidden flex flex-col items-stretch">
            <Image src={product.image_url.length ? product.image_url : "/svg/blank.svg" } alt={product.name} width={1000} height={1000} className='' />
            <div className="p-4 flex flex-col items-center justify-start text-center gap-2">
                <h3 className="h4">{ product.name }</h3>
                <Stars rating={5} />
                <div className="font-bold">${ product.price }</div>
            </div>
        </Link>
    )
}
