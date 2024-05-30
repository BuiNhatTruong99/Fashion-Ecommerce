const ProductOptions = () => {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium ">Choose a color</h4>
      <ul className="flex items-center gap-3">
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
          <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-purple-500">
          <div className="absolute w-10 h-[2px] bg-black rotate-45 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </li>
      </ul>
      <h4 className="font-medium ">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer">Small</li>
        <li className="ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm cursor-pointer">
          Medium
        </li>
        <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          Large
        </li>
      </ul>
    </div>
  );
};

export default ProductOptions;
