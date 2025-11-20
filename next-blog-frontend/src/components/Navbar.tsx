import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <a href="/" className="font-bold">My Blog</a>
            <ThemeToggle />
        </div>
    );
}
