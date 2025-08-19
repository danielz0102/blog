import type { AstroCookies } from 'astro'
import { ActionError } from 'astro:actions'

type GetCookie = AstroCookies['get']
type AstroCookie = ReturnType<GetCookie>

export function validateTokenCookie(
  cookie: AstroCookie,
): asserts cookie is NonNullable<AstroCookie> {
  if (cookie === undefined) {
    throw new ActionError({
      code: 'UNAUTHORIZED',
      message: 'Authentication failed',
    })
  }
}
