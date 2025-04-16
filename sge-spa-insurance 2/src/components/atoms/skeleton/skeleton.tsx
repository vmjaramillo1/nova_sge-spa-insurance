import { memo } from 'react'
import styled from '@emotion/styled'

import './skeleton.scss'

interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
  animate?: boolean
}

const Skeleton = styled.span<SkeletonProps>`
  border-radius: ${({ borderRadius }) => borderRadius ?? '4px'};
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '16px'};
  display: block;

  overflow: hidden;
  position: relative;

  background: ${({ animate }) =>
    animate
      ? `linear-gradient(
          89.85deg,
          #eae9f3 0.11%,
          #f5f6fa 0.12%,
          #dee3ed 99.87%
        )`
      : `#DEE3ED`};

  animation: ${({ animate }) =>
    animate ? 'skeleton-loading 1.5s ease-in-out infinite' : 'none'};
`

Skeleton.defaultProps = {
  ['aria-hidden']: 'true',
  animate: true,
  role: 'presentation',
}

export default memo(Skeleton)
