import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const discounted = product.price * (1 - product.discountPercentage / 100);

  return (
    <article className="card" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="thumb">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <span className="sale">-{Math.round(product.discountPercentage)}%</span>
      </div>
      <div className="card-body">
        <p className="category">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="rating">★ {product.rating.toFixed(2)}</p>
        <div className="prices">
          <strong>${product.price.toFixed(2)}</strong>
          <span>${discounted.toFixed(2)} after discount</span>
        </div>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </article>
  );
}
