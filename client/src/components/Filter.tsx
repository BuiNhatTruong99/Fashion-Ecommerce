'use client';

const Filter = () => {
  return (
    <div className="mt-12 flex justify-between">
      {/* LEFT */}
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400 outline-none"
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400 outline-none"
        />
        <select name="size" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-filter_gray">
          <option>Size</option>
          <option value="">Size</option>
        </select>
        <select name="color" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-filter_gray">
          <option>Color</option>
          <option value="">Color</option>
        </select>
        <select name="category" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-filter_gray">
          <option>Category</option>
          <option value="">Category</option>
        </select>
        <select name="" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-filter_gray">
          <option>All Filters</option>
        </select>
      </div>
      {/* RIGHT */}
      <div className="">
        <div className="">
          <select name="" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 ">
            <option>Sort By</option>
            <option value="">Price (low to hight)</option>
            <option value="">Price (hight to low)</option>
            <option value="">Newest</option>
            <option value="">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
