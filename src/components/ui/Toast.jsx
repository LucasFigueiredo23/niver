export function Toast({ toast }) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <p key={toast.id} className="toast">
          {toast.message}
        </p>
      )}
    </div>
  )
}
