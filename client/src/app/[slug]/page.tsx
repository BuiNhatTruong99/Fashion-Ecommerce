import AddProduct from '@/components/AddProduct';
import ProductImages from '@/components/ProductImages';
import ProductOptions from '@/components/ProductOptions';

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat impedit aliquid ducimus nostrum libero,
          quisquam quibusdam adipisci natus temporibus voluptatibus ex exercitationem laborum iure deserunt ea culpa cum
          molestias suscipit.
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="font-medium text-2xl">$99</div>
        <div className="h-[2px] bg-gray-100" />
        <ProductOptions />
        <AddProduct />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex quis repellendus dolorem sunt! Nesciunt
            cumque aliquid minima a rerum, nostrum, adipisci dolor dolorem, est impedit obcaecati illo aliquam quasi.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex quis repellendus dolorem sunt! Nesciunt
            cumque aliquid minima a rerum, nostrum, adipisci dolor dolorem, est impedit obcaecati illo aliquam quasi.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex quis repellendus dolorem sunt! Nesciunt
            cumque aliquid minima a rerum, nostrum, adipisci dolor dolorem, est impedit obcaecati illo aliquam quasi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
