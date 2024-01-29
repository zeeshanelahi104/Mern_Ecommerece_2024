import { useState } from "react";
import ProductCard from "../components/product-card";

const Search = () => {
  const [serach, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};
  const IsPrevPage = page > 1;
  const IsNextPage = page < 5;
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            className="filter-range"
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="">Sample1</option>
            <option value="">Sample2</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={serach}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="serach-product-list">
          <ProductCard
            productId="gfhyutfdfyt"
            name="Camera"
            price={45454}
            photo="data:image/jpeg;base64,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"
            stock={545}
            handler={addToCartHandler}
          />
        </div>
        <article>
          <button
            disabled={!IsPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            {page} of {5}
          </span>
          <button
            disabled={!IsNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
