'use server'

import { client } from "@/lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, blurb} = Object.fromEntries(formData)

  // Creating a Random ID.
  const id = Math.floor(Math.random() * 100000);

  await client.connect();

  // Saving new Hash in Redis.
  await client.hSet(`book:${id}`, {
    title,
    rating,
    author,
    blurb
  })

  redirect('/');

}