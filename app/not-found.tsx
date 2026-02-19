import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - 페이지를 찾을 수 없습니다",
  description: "요청하신 페이지를 찾을 수 없습니다.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
        404
      </h1>
      <p className="mb-2 text-xl text-gray-600 dark:text-gray-400">
        페이지를 찾을 수 없습니다
      </p>
      <p className="mb-8 text-gray-500 dark:text-gray-500">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
        >
          블로그 보기
        </Link>
      </div>
    </div>
  );
}
