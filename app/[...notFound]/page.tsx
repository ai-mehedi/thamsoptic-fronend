// app/[...notFound]/page.tsx
import { notFound } from 'next/navigation';

export default function CatchAll() {
  notFound(); // triggers app/not-found.tsx page
}
