
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '@/components/Logo';
import UserMenu from '@/components/UserMenu';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Link, 
  Calendar, 
  Star, 
  DollarSign, 
  HelpCircle, 
  AlertCircle, 
  FileText, 
  Settings,
  Share2
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path) {
      setActiveItem(path);
    } else {
      setActiveItem('dashboard');
    }
  }, [location]);

  const navigationItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'workflow', icon: Share2, label: 'Workflow', path: '/workflow' },
    { id: 'connections', icon: Link, label: 'Connections', path: '/connections' },
    { id: 'templates', icon: FileText, label: 'Templates', path: '/templates' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', path: '/calendar' },
    { id: 'divider1', type: 'divider' },
    { id: 'upgrade', icon: Star, label: 'Upgrade Here', path: '/upgrade' },
    { id: 'affiliate', icon: DollarSign, label: 'Affiliate Area', path: '/affiliate' },
    { id: 'divider2', type: 'divider' },
    { id: 'support', icon: HelpCircle, label: 'Support', path: '/support' },
    { id: 'feature', icon: AlertCircle, label: 'Feature Request', path: '/feature-request' },
    { id: 'announcements', icon: FileText, label: 'Announcements', path: '/announcements' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                if (item.type === 'divider') {
                  return <div key={item.id} className="my-2 mx-3 h-[1px] bg-gray-200" />;
                }
                
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <a href={item.path}>
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-x-hidden">
          <div className="border-b border-gray-200 bg-white p-4 flex justify-end">
            <UserMenu />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
