
import { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '@/types';
import { Badge } from '@/components/ui/badge';

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationDropdown({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Play a subtle animation every 5 seconds if there are unread notifications
  useEffect(() => {
    if (unreadCount > 0 && !isOpen) {
      const interval = setInterval(() => {
        setPlayAnimation(true);
        setTimeout(() => setPlayAnimation(false), 1000);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [unreadCount, isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`relative ${playAnimation ? 'animate-bounce' : ''}`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-task-purple-400 text-white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={onMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[300px] p-4">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-2 rounded-md ${
                    notification.read ? 'bg-white' : 'bg-task-purple-100'
                  }`}
                >
                  <div className="flex-1">
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-gray-500 text-sm">No notifications</p>
              <p className="text-xs text-gray-400 mt-1">
                You're all caught up!
              </p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
