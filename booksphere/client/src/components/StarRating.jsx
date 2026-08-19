const VALUES = [1, 2, 3, 4, 5];

export default function StarRating({ value, onChange, disabled = false }) {
  return (
    <fieldset className="star-rating" disabled={disabled}>
      <legend>Your rating</legend>
      <div className="star-options">
        {VALUES.map(star => (
          <label key={star}>
            <input
              type="radio"
              name="book-rating"
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
            />
            <span
              className={star <= value ? 'selected' : ''}
              aria-hidden="true"
            >
              ★
            </span>
            <span className="sr-only">{star} out of 5 stars</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
