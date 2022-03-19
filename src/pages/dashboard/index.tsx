import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute'
import React from 'react'

const Dashboard = () =>  {
  return (
    <div>index</div>
  )
}

export default authenticatedRoute(Dashboard)