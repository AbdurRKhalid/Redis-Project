'use server'

import { client } from "@/lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, blurb} = Object.fromEntries(formData)

  // Creating a Random ID.
  const id = Math.floor(Math.random() * 100000);

  await client.connect();

  // Adding the title to a sorted set to determine that we are adding books by unique title.
  const unique = await client.zAdd('book', {
    value: title,
    score: id
  }, {NX: true});

  // Checking if the book has a unique title or not.
  if(!unique) {
    return {error: 'The Book with Same Title Already Exists!'};
  }

  // Saving new Hash in Redis.
  await client.hSet(`book:${id}`, {
    title,
    rating,
    author,
    blurb
  });

  redirect('/');

}