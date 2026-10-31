export default function Confirmation({ order, onBack }) {
  if (!order) {
    return (
      <main className="confirm">
        <div className="confirm-card">
          <p className="eyebrow">Demo checkout</p>
          <h1>No order to confirm</h1>
          <p>Add items to your cart, then tap Pay now.</p>
          <button className="cart-btn" onClick={onBack}>
            Back to shop
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="confirm">
      <div className="confirm-card">
        <p className="eyebrow">Demo payment</p>
        <h1>Payment confirmed</h1>
        <p>
          This is a demo confirmation only. No payment gateway was used and no
          money was charged.
        </p>
        <p className="order-id">Order #{order.id}</p>

        <ul className="confirm-list">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.title} × {item.qty}
              </span>
              <strong>${(item.qty * item.price).toFixed(2)}</strong>
            </li>
          ))}
        </ul>

        <div className="confirm-total">
          <span>Total qty {order.totalQty}</span>
          <strong>${order.subtotal.toFixed(2)}</strong>
        </div>

        <button className="cart-btn" onClick={onBack}>
          Continue shopping
        </button>
      </div>
    </main>
  );
}
