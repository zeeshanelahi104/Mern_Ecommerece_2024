import { FaPlus } from "react-icons/fa";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};
const server = "gedvuejhjk";
const ProductCard = ({
  productId,
  name,
  price,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img
        // src={`${server}/${photo}`}
        src={photo}
        alt={name}
      />
      <p>{name}</p>
      <span>Rs {price}</span>
      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
