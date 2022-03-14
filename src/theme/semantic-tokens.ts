import { Pseudos, SemanticValue } from '@chakra-ui/react'

export type SemanticTokens = Partial<
  Record<string, Record<string, SemanticValue<keyof Pseudos>>>
>

export const semanticTokens: SemanticTokens = {
  colors: {
    sonalysisPurplePrimary: {
      default: 'primary',
      _dark: 'brand.900',
    },
  },
}
