export default function ErrorFallback({error, resetErrorBoundary}: {error: any, resetErrorBoundary: any}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
