import { Bell, Menu, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const userInitial = user?.fullName
    ? user.fullName.trim().charAt(0).toUpperCase()
    : "U";

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-8">
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          title="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600"
            title={user?.email || "User profile"}
          >
            {userInitial}
          </div>

          {user?.fullName && (
            <span className="hidden text-sm font-medium text-slate-700 sm:inline-block">
              {user.fullName}
            </span>
          )}

          <button
            type="button"
            onClick={logout}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
