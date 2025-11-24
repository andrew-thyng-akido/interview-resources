import { serve } from 'bun'
import index from './index.html'

export type Bean = {
  id: number
  name: string
  roast: string
  amountAvailable: number
  price: number
  origin: string
  notes: string
}

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/hello': {
      async GET(req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'GET',
        })
      },
      async PUT(req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'PUT',
        })
      },
    },

    '/api/hello/:name': async req => {
      const name = req.params.name
      return Response.json({
        message: `Hello, ${name}!`,
      })
    },

    '/api/beans': {
      async GET(req) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        return Response.json({
          beans: [
            {
              id: 1,
              name: 'Ethiopian',
              roast: 'Light',
              amountAvailable: 50,
              price: 15.99,
              origin: 'Ethiopia',
              notes: 'Floral, fruity',
            },
            {
              id: 2,
              name: 'Colombian',
              roast: 'Medium',
              amountAvailable: 120,
              price: 12.99,
              origin: 'Colombia',
              notes: 'Nutty, balanced',
            },
            {
              id: 3,
              name: 'French',
              roast: 'Dark',
              amountAvailable: 30,
              price: 13.99,
              origin: 'France',
              notes: 'Bold, smoky',
            },
            {
              id: 4,
              name: 'Italian',
              roast: 'Dark',
              amountAvailable: 75,
              price: 14.99,
              origin: 'Italy',
              notes: 'Rich, intense',
            },
          ],
        })
      },
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
