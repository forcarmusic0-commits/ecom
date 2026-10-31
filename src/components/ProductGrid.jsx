import ProductCard from "./ProductCard.jsx";
import Shimmer from "./Shimmer.jsx";

export default function ProductGrid({ products, loading }) {
  if (loading) return <Shimmer />;

  if (!products.length) {
    return <p className="empty">No products match these filters.</p>;
  }

  return (
    <div className="grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
