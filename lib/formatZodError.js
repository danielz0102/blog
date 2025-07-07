import { flattenError } from 'zod/v4'

export const formatZodError = (error) => flattenError(error).fieldErrors
