export default function Shimmer({ count = 8 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, index) => (
        <article className="card shimmer-card" key={index}>
          <div className="shimmer image" />
          <div className="shimmer line wide" />
          <div className="shimmer line" />
          <div className="shimmer line short" />
          <div className="shimmer button" />
        </article>
      ))}
    </div>
  );
}
