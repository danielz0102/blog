import type { Route } from './+types/home'

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Home() {
  return <h1>Hello World</h1>
}
