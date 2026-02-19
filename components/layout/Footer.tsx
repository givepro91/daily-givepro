import Link from "next/link";

function SocialLinks() {
  const links = [
    { name: "GitHub", href: "https://github.com" },
    { name: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <SocialLinks />
          <nav aria-label="Footer navigation" className="flex gap-4">
            <Link
              href="/feed.xml"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              RSS
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              개인정보처리방침
            </Link>
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Daily Givepro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
