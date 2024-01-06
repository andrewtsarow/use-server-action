# use-server-action

`use-server-action` is a React hook that simplifies the usage of [Next.js' Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), providing an easy-to-use interface for handling loading states, data, errors, and execution.

## Installation

```bash
npm install use-server-action
```

or

```bash
yarn add use-server-action
```

## Usage

```typescript
// actions.ts

"use server"

export async function createPost(title: string) {
  // Your Server Action logic goes here.

  const prisma = new PrismaClient()
  const post = await prisma.post.create({ data: { title } })

  return post
}
```

```typescript
import { useServerAction } from "use-server-action"

import * as actions from "./actions"

export function MyComponent() {
  const { data, error, execute: createPost, loading } = useServerAction(actions.createPost)

  function handleButtonClick() {
    // Trigger the execution of the Server Action.
    createPost("The best post title!")
  }

  return (
    <div>
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? "Loading..." : "Create Post"}
      </button>
      {data && <p>Data: {JSON.stringify(data)}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
```

## API

### `useServerAction(action: () => Promise<any>)`

The hook takes a Server Action function as its argument and returns an object with the following properties:

- **`data`**: The data returned by the Server Action.
- **`error`**: Any error that occurred during the execution of the Server Action.
- **`execute`**: A function to trigger the execution of the Server Action.
- **`loading`**: A boolean indicating whether the Server Action is currently loading.

## Contributing

If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
