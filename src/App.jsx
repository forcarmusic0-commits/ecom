import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Filters from "./components/Filters.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Confirmation from "./components/Confirmation.jsx";
import { useCart } from "./context/CartContext.jsx";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=100";
const CATEGORIES_URL = "https://dummyjson.com/products/categories";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [page, setPage] = useState("shop");
  const { payNow, lastOrder } = useCart();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const [productRes, categoryRes] = await Promise.all([
          fetch(PRODUCTS_URL),
          fetch(CATEGORIES_URL),
        ]);

        if (!productRes.ok || !categoryRes.ok) {
          throw new Error("Could not load products");
        }

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        if (!cancelled) {
          setProducts(productData.products || []);
          setCategories(categoryData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "discount") {
      list = [...list].sort((a, b) => b.discountPercentage - a.discountPercentage);
    }

    return list;
  }, [products, search, category, sort, maxPrice]);

  const handlePayNow = () => {
    if (payNow()) setPage("confirm");
  };

  return (
    <div className="app">
      <Header
        search={search}
        onSearch={setSearch}
        showSearch={page === "shop"}
        onHome={() => setPage("shop")}
      />
      {page === "confirm" ? (
        <>
          <Confirmation order={lastOrder} onBack={() => setPage("shop")} />
          <CartDrawer onPayNow={handlePayNow} />
        </>
      ) : (
        <>
      <main className="layout">
        <Filters
          categories={categories}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
        />
        <section className="catalog">
          <div className="catalog-head">
            <div>
              <p className="eyebrow">DummyJSON catalog</p>
              <h1>Shop products</h1>
            </div>
            <p className="count">
              {loading ? "Loading…" : `${filtered.length} items`}
            </p>
          </div>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <ProductGrid products={filtered} loading={loading} />
          )}
        </section>
      </main>
          <CartDrawer onPayNow={handlePayNow} />
        </>
      )}
    </div>
  );
}
