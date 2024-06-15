'use client';

import { useCategoryList } from '@/queries';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const { data: categories } = useCategoryList();

  return (
    <div className="mt-12 flex justify-between">
      {/* LEFT */}
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400 outline-none"
          onChange={handleFilter}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400 outline-none"
          onChange={handleFilter}
        />
        <select name="cat" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-filter_gray">
          <option>Category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* RIGHT */}
      <div className="">
        <div className="">
          <select
            name="sort"
            id=""
            className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 "
            onChange={handleFilter}
          >
            <option>Sort By</option>
            <option value="price_ASC">Price (low to high)</option>
            <option value="price_DESC">Price (high to low)</option>
            <option value="updatedAt_DESC">Newest</option>
            <option value="updatedAt_ASC">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
