
export async function handleExceptions(error: unknown) {

  if (error instanceof Response) {
    throw error
  }

  return  new Response('Internal Server Error', {status : 500})
}
