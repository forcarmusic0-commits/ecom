import { useCart } from "../context/CartContext.jsx";

export default function CartDrawer({ onPayNow }) {
  const {
    items,
    isOpen,
    setIsOpen,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalQty,
    subtotal,
  } = useCart();

  return (
    <>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="ghost" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)} each</p>
                  <div className="qty">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>
                <div className="line">
                  <strong>${(item.qty * item.price).toFixed(2)}</strong>
                  <button className="link" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="cart-footer">
          <p>
            Total qty: <strong>{totalQty}</strong>
          </p>
          <p>
            Total (qty × price): <strong>${subtotal.toFixed(2)}</strong>
          </p>
          <button className="ghost" onClick={clearCart} disabled={!items.length}>
            Clear cart
          </button>
          <button className="cart-btn pay-now" onClick={onPayNow} disabled={!items.length}>
            Pay now
          </button>
        </footer>
      </aside>
    </>
  );
}
