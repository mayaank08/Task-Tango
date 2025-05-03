
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // This is just a wrapper that redirects to our Dashboard
  // In a real app, this would check authentication first
  return <Navigate to="/dashboard" replace />;
};

export default Index;
