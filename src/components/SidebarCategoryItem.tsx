import { Category } from "@/types/types";

export default function SidebarCategoryItem({ category, isActive = false, onItemClick }: { category: Category, isActive: boolean, onItemClick: (arg0: number) => void }) {
    
    const handleCheck = () => {
        onItemClick(category.id)
    }

    return (
        <div key={category.id} className="md:px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-100 flex items-center gap-2" onClick={handleCheck}>

            {
                isActive ? (
                    <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#16a34a" className="shrink-0">
                        {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                ) : (
                    <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="shrink-0">
                        {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                )
            }

            <span className="text-sm">{category.name}</span>

        </div>
    )
}
