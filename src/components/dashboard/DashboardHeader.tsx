
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
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
        <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
