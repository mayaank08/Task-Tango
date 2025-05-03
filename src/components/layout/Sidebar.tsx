
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, ListTodo, Calendar, Users, Settings, Menu, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // For mobile: show/hide based on mobileOpen state
  // For desktop: adjust width based on collapsed state
  const sidebarClasses = cn(
    'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-20',
    {
      'w-64': !collapsed && !isMobile,
      'w-20': collapsed && !isMobile,
      'fixed inset-y-0 left-0 transform': isMobile,
      'translate-x-0': mobileOpen && isMobile,
      '-translate-x-full': !mobileOpen && isMobile,
    }
  );

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'My Tasks', icon: ListTodo, path: '/my-tasks' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {isMobile && (
        <div className="fixed top-4 left-4 z-30">
          <Button variant="outline" size="icon" onClick={toggleSidebar} className="rounded-full bg-white shadow-md">
            <Menu size={20} />
          </Button>
        </div>
      )}

      <div className={sidebarClasses}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            {(!collapsed || isMobile) && (
              <span className="font-bold text-xl bg-gradient-to-r from-task-purple-400 to-task-purple-600 bg-clip-text text-transparent">
                TaskTango
              </span>
            )}
            {collapsed && !isMobile && (
              <span className="font-bold text-xl">TT</span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
            {isMobile ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <nav className="flex-1 pt-5">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 transition-colors group",
                    { 
                      "justify-center": collapsed && !isMobile,
                      "space-x-3": !collapsed || isMobile
                    }
                  )}
                >
                  <item.icon size={20} />
                  {(!collapsed || isMobile) && <span>{item.name}</span>}
                  {collapsed && !isMobile && (
                    <span className="absolute left-full ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded scale-0 group-hover:scale-100 transition-transform origin-left whitespace-nowrap z-10">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-task-purple-400 flex items-center justify-center text-white font-medium">
              JD
            </div>
            {(!collapsed || isMobile) && (
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Developer</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};
