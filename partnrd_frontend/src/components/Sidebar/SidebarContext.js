import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from './useSidebar';

export default function SidebarContext({ children })
{
    const { pathname } = useLocation();
    return <SidebarProvider defaultItem={pathname}>{children}</SidebarProvider>; 
}
