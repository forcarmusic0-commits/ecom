function categoryLabel(item) {
  if (typeof item === "string") return item;
  return item.name || item.slug || "Category";
}

function categoryValue(item) {
  if (typeof item === "string") return item;
  return item.slug || item.name;
}

export default function Filters({
  categories,
  category,
  onCategory,
  sort,
  onSort,
  maxPrice,
  onMaxPrice,
}) {
  return (
    <aside className="filters">
      <h2>Filters</h2>

      <label>
        Category
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => {
            const value = categoryValue(item);
            return (
              <option key={value} value={value}>
                {categoryLabel(item)}
              </option>
            );
          })}
        </select>
      </label>

      <label>
        Sort by
        <select value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="discount">Biggest discount</option>
        </select>
      </label>

      <label>
        Max price ${maxPrice}
        <input
          type="range"
          min="5"
          max="2500"
          step="5"
          value={maxPrice}
          onChange={(e) => onMaxPrice(Number(e.target.value))}
        />
      </label>

      <button className="ghost" onClick={() => {
        onCategory("all");
        onSort("featured");
        onMaxPrice(2500);
      }}>
        Reset filters
      </button>
    </aside>
  );
}
