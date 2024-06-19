'use client';

import { useCategoryList } from '@/queries';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

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

  const debouncedHandleFilter = debounce((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleFilter(e);
  }, 500);

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
          onChange={debouncedHandleFilter}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400 outline-none"
          onChange={debouncedHandleFilter}
        />
        <select
          name="cat"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-filter_gray"
          onChange={debouncedHandleFilter}
        >
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
            onChange={debouncedHandleFilter}
          >
            <option>Sort By</option>
            <option value="newPrice_ASC">Price (low to high)</option>
            <option value="newPrice_DESC">Price (high to low)</option>
            <option value="updatedAt_DESC">Newest</option>
            <option value="updatedAt_ASC">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
