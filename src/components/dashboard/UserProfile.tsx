
import React from 'react';
import { format } from 'date-fns';
import { User as UserType } from '@/contexts/AuthContext';
import { User, Calendar, ChevronRight, LogOut, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <GlassCard className={`p-6 ${className}`}>
        <div className="text-center py-8">
          <p>Please log in to view your profile</p>
          <Button className="mt-4" asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      </GlassCard>
    );
  }

  const getPlanBadgeColor = (plan: UserType['plan']) => {
    switch (plan) {
      case 'free':
        return 'bg-blue-500/10 text-blue-500';
      case 'pro':
        return 'bg-purple-500/10 text-purple-500';
      case 'enterprise':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">User Profile</h2>
        <Button variant="outline" size="sm" className="gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-16 h-16 bg-neural-primary/10 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-neural-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={`${getPlanBadgeColor(user.plan)} border-0`}>
              {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
            </Badge>
            <span className="text-xs text-muted-foreground">ID: {user.id}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-neural-primary" />
            <span className="text-sm font-medium">Account Info</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Joined</span>
              <span className="text-sm">{format(user.joinedDate, 'PPP')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Last active</span>
              <span className="text-sm">{format(user.lastActive, 'PPP')}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4 text-neural-primary" />
            <span className="text-sm font-medium">Subscription</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Current plan</span>
              <span className="text-sm capitalize">{user.plan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Status</span>
              <Badge variant="outline" className="bg-neural-success/10 text-neural-success border-0 text-xs">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Usage History</h3>
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
            View All
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-3">
          <Separator />
          {user.usageHistory.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium">{item.action}</p>
                  {item.contractAddress && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contract: {item.contractAddress.substring(0, 6)}...{item.contractAddress.substring(item.contractAddress.length - 4)}
                    </p>
                  )}
                </div>
                <div className="text-xs text-right text-muted-foreground">
                  {format(item.date, 'MMM d, yyyy')}
                </div>
              </div>
              {index < user.usageHistory.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default UserProfile;
