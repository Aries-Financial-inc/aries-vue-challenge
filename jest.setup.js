import { config } from '@vue/test-utils'

/**
 * Mock generics utils for testing
 */

const mocks = {
  // $styles to support CSS modules
  $style: new Proxy(
    {},
    {
      get(_, className) {
        return className
      }
    }
  )
}
config.mocks = mocks
