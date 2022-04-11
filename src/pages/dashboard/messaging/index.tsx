import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import React from 'react';

const Messaging = () => {
  return (
    <>
      <DashboardDesktopNav />
    </>
  );
};

export default authenticatedRoute(Messaging);
