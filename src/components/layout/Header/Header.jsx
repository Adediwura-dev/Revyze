import { Bell, Menu } from "lucide-react";

const Header = ({ onMenuClick }) => {
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
        >
          <Bell size={20} />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
          B
        </div>
      </div>
    </header>
  );
};

export default Header;