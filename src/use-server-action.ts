import { useState } from "react"

import { serializeError } from "./serialize-error"

export function useServerAction<T extends (...args: any) => any>(action: T) {
  const [data, setData] = useState<Awaited<ReturnType<T>>>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)

  async function execute(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    setData(undefined)
    setError(undefined)
    setLoading(true)

    try {
      const response = await action(...args)
      setData(response)
      return data
    } catch (err) {
      setError(serializeError(err as Error))
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, error, execute, loading }
}
