import { createHash } from 'node:crypto'

/** MD5 hex digest of a UTF-8 string. */
export default function md5(input) {
  return createHash('md5').update(input, 'utf8').digest('hex')
}
