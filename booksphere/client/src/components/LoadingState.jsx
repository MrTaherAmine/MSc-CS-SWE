export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="route-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <strong>{label}</strong>
    </div>
  );
}
