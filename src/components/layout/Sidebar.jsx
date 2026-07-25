import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, CreditCard, Receipt, Settings, LogOut, X } from "lucide-react";
import { cn } from "../../utils/cn";
import MarqueeComponent from "react-fast-marquee";
const Marquee = MarqueeComponent.default || MarqueeComponent;

export const Sidebar = ({ isOpen, onClose, role }) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Add Client", href: "/admin/add-client", icon: UserPlus },
    { name: "Assign Payment", href: "/admin/assign-payment", icon: CreditCard },
    { name: "Payments", href: "/admin/payments", icon: Receipt },
  ];

  const clientLinks = [
    { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
    { name: "Payment History", href: "/client/payment-history", icon: Receipt },
    { name: "Invoices", href: "/client/invoice", icon: CreditCard },
  ];

  const links = role === "admin" ? adminLinks : clientLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform flex-col border-r-2 border-border bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:flex",
          isOpen ? "translate-x-0" : "-translate-x-full",
          !mounted && "hidden lg:flex"
        )}
      >
        <div className="flex h-24 items-center justify-between px-6 border-b-2 border-border bg-accent">
          <Link to="/" className="flex flex-col w-full overflow-hidden">
            <Marquee speed={40} gradient={false} className="w-full">
              <span className="text-3xl font-black uppercase tracking-tighter text-black mx-2">
                PAYFLOW
              </span>
            </Marquee>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-black hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          <nav className="space-y-4 mt-8">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 text-xl font-bold uppercase tracking-tighter transition-all duration-300 border-2",
                    isActive
                      ? "bg-accent border-accent text-black"
                      : "border-transparent text-foreground hover:border-border hover:bg-muted"
                  )}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                >
                  <Icon size={24} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-4 mb-8">
            <Link
              to="#"
              className="flex items-center gap-4 px-4 py-4 text-xl font-bold uppercase tracking-tighter border-2 border-transparent text-foreground hover:border-border hover:bg-muted transition-all duration-300"
            >
              <Settings size={24} />
              SETTINGS
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-4 px-4 py-4 text-xl font-bold uppercase tracking-tighter border-2 border-transparent text-[#EF4444] hover:border-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all duration-300"
            >
              <LogOut size={24} />
              LOGOUT
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
