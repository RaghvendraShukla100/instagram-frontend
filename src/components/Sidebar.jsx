import {
  Home,
  Search,
  Compass,
  Clapperboard,
  Send,
  Heart,
  Plus,
  User,
  Circle,
  Link2,
  Menu,
  Settings,
  Bookmark,
  Moon,
  Activity,
  MessageCircle,
  LogOut,
  UserRound,
  ChevronRight,
  ChevronLeft,
  SunMoon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

const navItems = [
  { label: "Home", icon: <Home size={22} />, route: "/" },
  { label: "Search", icon: <Search size={22} />, route: "/search" },
  { label: "Explore", icon: <Compass size={22} />, route: "/explore" },
  { label: "Reels", icon: <Clapperboard size={22} />, route: "/reels" },
  { label: "Messages", icon: <Send size={22} />, route: "/messages" },
  {
    label: "Notifications",
    icon: <Heart size={22} />,
    route: "/notifications",
  },
  { label: "Create", icon: <Plus size={22} />, route: "/create" },
  { label: "Profile", icon: <User size={22} />, route: "/profile" },
  { label: "Meta AI", icon: <Circle size={22} />, route: "/meta-ai" },
  { label: "Threads", icon: <Link2 size={22} />, route: "/threads" },
];

export default function Sidebar() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showAppearanceSubMenu, setShowAppearanceSubMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const moreRef = useRef();
  const navigate = useNavigate(); // ✅ Use navigate hook

  // Apply Tailwind dark mode class to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        closeMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenus = () => {
    setShowMoreMenu(false);
    setShowAppearanceSubMenu(false);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-1/5 bg-white dark:bg-black text-black dark:text-white p-5 flex flex-col justify-between z-40 transition-colors">
      <div>
        <div
          className="text-3xl font-serif italic mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Instagram
        </div>

        <nav className="flex flex-col gap-5">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 px-3 py-2 rounded-md transition"
              onClick={() => {
                closeMenus();
                if (item.route) navigate(item.route); // ✅ Navigate if route exists
              }}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* More Dropdown */}
      <div ref={moreRef} className="relative">
        <div
          className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 px-3 py-2 rounded-md transition"
          onClick={() => {
            setShowMoreMenu((prev) => !prev);
            setShowAppearanceSubMenu(false);
          }}
        >
          <Menu size={22} />
          <span className="text-sm">More</span>
        </div>

        {showMoreMenu && !showAppearanceSubMenu && (
          <div className="absolute bottom-12 left-0 bg-white dark:bg-neutral-900 text-black dark:text-white w-64 rounded-2xl shadow-xl py-2 text-sm z-50 transition-colors">
            <DropdownItem
              icon={<Settings size={18} />}
              label="Settings"
              onClick={closeMenus}
            />
            <DropdownItem
              icon={<Activity size={18} />}
              label="Your Activity"
              onClick={closeMenus}
            />
            <DropdownItem
              icon={<Bookmark size={18} />}
              label="Saved"
              onClick={closeMenus}
            />
            <DropdownItem
              icon={<Moon size={18} />}
              label="Switch appearance"
              rightIcon={<ChevronRight size={16} />}
              onClick={() => setShowAppearanceSubMenu(true)}
            />
            <DropdownItem
              icon={<MessageCircle size={18} />}
              label="Report a problem"
              onClick={closeMenus}
            />
            <hr className="my-2 border-gray-300 dark:border-gray-700" />
            <DropdownItem
              icon={<UserRound size={18} />}
              label="Switch accounts"
              onClick={closeMenus}
            />
            <DropdownItem
              icon={<LogOut size={18} />}
              label="Log out"
              onClick={closeMenus}
            />
          </div>
        )}

        {showAppearanceSubMenu && (
          <div className="absolute bottom-12 left-0 bg-white dark:bg-neutral-900 text-black dark:text-white w-64 rounded-t-2xl shadow-xl text-sm z-50 transition-colors">
            <div
              className="px-4 py-3 flex items-center gap-2 font-semibold cursor-pointer"
              onClick={() => setShowAppearanceSubMenu(false)}
            >
              <ChevronLeft size={18} />
              <SunMoon size={18} />
              Switch appearance
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />
            <div className="px-4 py-3 flex items-center justify-between">
              <span>Dark mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable dropdown item component
function DropdownItem({ icon, label, rightIcon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center justify-between cursor-pointer rounded-lg transition"
    >
      <span className="flex items-center gap-3">
        {icon} {label}
      </span>
      {rightIcon}
    </div>
  );
}
