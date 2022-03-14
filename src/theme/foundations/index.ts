import { borders } from './borders'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { radii } from './radius'
import { sizes } from './sizes'
import { spacing } from './spacing'
import { typography } from './typography'
import { zIndices } from './z-index'

export const foundations = {
  breakpoints,
  zIndices,
  radii,
  colors,
  ...typography,
  sizes,
  space: spacing,
  borders,
}
