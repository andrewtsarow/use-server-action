import { useState } from "react"

import { serializeError } from "./serialize-error"

export function useServerAction<T extends (...args: any) => Promise<any>>(action: T) {
  const [data, setData] = useState<Awaited<ReturnType<T>> | null | undefined>(null)
  const [error, setError] = useState<Error | null | undefined>(null)
  const [loading, setLoading] = useState(false)

  async function execute(...args: Parameters<T>) {
    setData(null)
    setError(null)
    setLoading(true)

    try {
      const response = await action(...args)
      setData(response)
    } catch (err) {
      setError(serializeError(err as Error))
    } finally {
      setLoading(false)
    }
  }

  return { data, error, execute, loading }
}
