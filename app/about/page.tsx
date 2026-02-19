import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Daily Givepro 블로그 소개",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        About
      </h1>
      <div className="prose prose-lg prose-neutral dark:prose-invert">
        <p>
          안녕하세요! <strong>Daily Givepro</strong>에 오신 것을 환영합니다.
          테크, 제품 리뷰, 개발 튜토리얼, 일상 이야기를 나누는 블로그입니다.
        </p>
        <h2>이 블로그에서 다루는 주제</h2>
        <ul>
          <li>
            <strong>기술</strong> - 개발 도구, 프로그래밍 팁, 최신 기술 트렌드
          </li>
          <li>
            <strong>리뷰</strong> - 키보드, 모니터, 가젯 등 제품 리뷰
          </li>
          <li>
            <strong>튜토리얼</strong> - 따라하기 쉬운 개발 가이드
          </li>
          <li>
            <strong>일상</strong> - 일상 속 유용한 정보와 생각
          </li>
        </ul>
        <h2>Contact</h2>
        <p>궁금한 점이나 협업 제안이 있으시면 편하게 연락 주세요.</p>
      </div>
    </div>
  );
}
