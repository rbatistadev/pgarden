'use client';
import PGLogo from '@/images/vercel.svg';
import { ProfileAvatar } from '@/modules/ui/components/avatars';
import { Button } from '@/modules/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/modules/ui/components/dropdown-menu';
import { cn } from '@/modules/ui/lib/cn';
import {
  ChevronRightIcon,
  LogOutIcon,
  LucideProps,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  Clock,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';
import { NavigationLink } from './NavigationLing';
import { useNavBarStore } from '@/store/nav-bar.store';

export const MainNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const { isMainNavCollapsed, setIsMainNavCollapsed } = useNavBarStore();
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsMainNavCollapsed(!isMainNavCollapsed);
  };

  const mainNavigation = [
    {
      name: 'Fichaje',
      href: `/attendance`,
      icon: Clock,
      isActive: pathname?.includes('/attendance'),
      isHidden: false,
    },
  ];

  const dropdownNavigation: Array<{
    href: string;
    target: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  }> = [];

  useEffect(() => {
    const toggleTextOpacity = () => {
      setIsTextVisible(isCollapsed);
    };
    const timeoutId = setTimeout(toggleTextOpacity, 150);
    return () => clearTimeout(timeoutId);
  }, [isCollapsed]);

  return (
    <aside
      className={cn(
        'z-40 flex flex-col justify-between rounded-r-xl border-r border-slate-200 bg-white pt-3 shadow-md transition-all duration-100',
        !isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar-expanded',
      )}
    >
      <div>
        {/* Logo and Toggle */}

        <div className="flex items-center justify-between px-3 pb-4">
          {!isCollapsed && (
            <Link
              href={'/dashboard'}
              className={cn(
                'flex items-center justify-center transition-opacity duration-100',
                isTextVisible ? 'opacity-0' : 'opacity-100',
              )}
            >
              <h1>People Garden Logo</h1>
              <Image src={PGLogo} width={24} height={30} alt={'People Garden'} />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              'rounded-xl bg-slate-50 p-1 text-slate-600 transition-all hover:bg-slate-100 focus:outline-none focus:ring-0 focus:ring-transparent',
            )}
          >
            {isCollapsed ? (
              <PanelLeftOpenIcon strokeWidth={1.5} />
            ) : (
              <PanelLeftCloseIcon strokeWidth={1.5} />
            )}
          </Button>
        </div>
        <ul>
          {mainNavigation.map(
            item =>
              !item.isHidden && (
                <NavigationLink
                  key={item.name}
                  href={item.href}
                  isActive={item.isActive}
                  isCollapsed={isCollapsed}
                  isTextVisible={isTextVisible}
                  linkText={item.name}
                >
                  <item.icon strokeWidth={1.5} />
                </NavigationLink>
              ),
          )}
        </ul>
      </div>

      {/* User Switch */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            id="userDropdownTrigger"
            className="w-full rounded-br-xl border-t py-4 transition-colors duration-200 hover:bg-slate-50 focus:outline-none"
          >
            <div
              className={cn(
                'flex cursor-pointer flex-row items-center gap-3',
                isCollapsed ? 'justify-center px-2' : 'px-4',
              )}
            >
              <ProfileAvatar userId={'avatar'} />
              {!isCollapsed && !isTextVisible && (
                <>
                  <div
                    className={cn(
                      isTextVisible ? 'opacity-0' : 'opacity-100',
                      'grow overflow-hidden',
                    )}
                  >
                    <p
                      title={'demo@gmail.com' /* user?.email */}
                      className={cn(
                        'ph-no-capture ph-no-capture -mb-0.5 truncate text-sm font-bold text-slate-700',
                      )}
                    >
                      {/* //TODO: Update with correct name and email */}
                      Demo
                      {/* {user?.name ? <span>{user?.name}</span> : <span>{user?.email}</span>} */}
                    </p>
                    <p className="text-sm text-slate-700">Account</p>
                  </div>
                  <ChevronRightIcon
                    className={cn('h-5 w-5 shrink-0 text-slate-700 hover:text-slate-500')}
                  />
                </>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            id="userDropdownInnerContentWrapper"
            side="right"
            sideOffset={10}
            alignOffset={5}
            align="end"
          >
            {/* Dropdown Items */}

            {dropdownNavigation.map(link => (
              <Link
                href={link.href}
                target={link.target}
                className="flex w-full items-center"
                key={link.label}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              >
                <DropdownMenuItem>
                  <link.icon className="mr-2 h-4 w-4" strokeWidth={1.5} />
                  {link.label}
                </DropdownMenuItem>
              </Link>
            ))}
            {/* Logout */}
            <DropdownMenuItem
              onClick={async () => {
                //TODO: Remove data from auth Zustand

                router.push('/auth/login');
              }}
              icon={<LogOutIcon className="mr-2 h-4 w-4" strokeWidth={1.5} />}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
