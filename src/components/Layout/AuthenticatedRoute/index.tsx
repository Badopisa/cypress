import { useRouter } from 'next/router'
import React from 'react'

export const authenticatedRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthenticatedRoute = (props: P) => {
    const router = useRouter()
      return <WrappedComponent {...props} />
  }
  return AuthenticatedRoute
}
