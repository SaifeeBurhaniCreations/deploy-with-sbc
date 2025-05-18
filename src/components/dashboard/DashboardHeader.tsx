
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, ExternalLink, LogOut, Settings, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const notifications = [
  { id: 1, title: 'Deployment Complete', message: 'Client Portal is now live', time: '2 min ago', read: false },
  { id: 2, title: 'New Comment', message: 'John commented on Marketing Site', time: '1 hour ago', read: false },
  { id: 3, title: 'Build Failed', message: 'Admin Dashboard build failed', time: '3 hours ago', read: true },
  { id: 4, title: 'Update Available', message: 'New platform version available', time: 'Yesterday', read: true },
];

const DashboardHeader = () => {
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);
  const { toast } = useToast();
  
  const markAllAsRead = () => {
    setUnreadCount(0);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-semibold">
            <span className="gradient-text">SBC</span>-Deploy
          </h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative rounded-full h-9 w-9 p-0">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-sm">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${!notification.read ? 'bg-slate-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <span className="text-xs text-slate-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-slate-500 text-sm">
                  No notifications
                </div>
              )}
            </div>
            <div className="p-2 border-t border-slate-100">
              <Button variant="ghost" size="sm" className="w-full justify-center" asChild>
                <Link to="/dashboard/notifications">View all notifications</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-9 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Saifee" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Saifee</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="flex items-center w-full cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Deployment Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/domain" className="flex items-center w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configure Domain</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/preview" className="flex items-center w-full cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Preview Site</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
