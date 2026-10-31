import { useCart } from "../context/CartContext.jsx";

export default function Header({ search, onSearch, onHome, showSearch }) {
  const { totalQty, setIsOpen } = useCart();

  return (
    <header className="header">
      <button type="button" className="brand" onClick={onHome}>
        <span className="logo">N</span>
        <div>
          <strong>Nova Shop</strong>
          <p>React storefront</p>
        </div>
      </button>

      {showSearch ? (
        <label className="search">
          <span className="sr-only">Search products</span>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products, brands, categories..."
          />
          {search ? (
            <button
              type="button"
              className="search-clear"
              onClick={() => onSearch("")}
            >
              Clear
            </button>
          ) : null}
        </label>
      ) : (
        <div />
      )}

      <button className="cart-btn" onClick={() => setIsOpen(true)}>
        Cart
        <span className="badge">{totalQty}</span>
      </button>
    </header>
  );
}
