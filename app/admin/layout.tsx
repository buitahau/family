"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  CalendarIcon, 
  ImageIcon, 
  SettingsIcon, 
  LogOutIcon,
  ShieldIcon,
  HomeIcon
} from "lucide-react";

const navigationItems = [
  {
    name: 'Family Members',
    href: '/admin/member',
    icon: UsersIcon,
    description: 'Manage family profiles'
  },
  {
    name: 'Special Events',
    href: '/admin/event',
    icon: CalendarIcon,
    description: 'Manage events and occasions'
  },
  {
    name: 'Image Gallery',
    href: '/admin/gallery',
    icon: ImageIcon,
    description: 'Organize family photos'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: SettingsIcon,
    description: 'Application settings'
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  const pathname = usePathname();

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    window.location.href = '/admin';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ShieldIcon className="text-indigo-600" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Family Management</p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname.startsWith(item.href);
                
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent 
                        size={20} 
                        className={`${
                          isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${isActive ? 'text-indigo-900' : ''}`}>
                          {item.name}
                        </div>
                        <div className={`text-xs ${
                          isActive ? 'text-indigo-600' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link href="/">
              <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                <HomeIcon size={20} className="text-gray-400" />
                <span className="font-medium">Back to Family Site</span>
              </div>
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
            >
              <LogOutIcon size={20} className="text-gray-400" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
}