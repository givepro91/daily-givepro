import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";

export const metadata: Metadata = {
  title: "About",
  description:
    "Daily Givepro 블로그를 운영하는 개발자 소개. 7년차 풀스택 개발자가 테크, 리뷰, 튜토리얼, 일상 이야기를 공유합니다.",
  openGraph: {
    title: "About | Daily Givepro",
    description:
      "Daily Givepro 블로그를 운영하는 개발자 소개. 실무 경험을 바탕으로 한 기술 블로그.",
    url: `${SITE_URL}/about`,
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
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
        </p>
        <p>
          저는 7년차 풀스택 개발자로, 스타트업부터 중견 기업까지 다양한 환경에서
          웹 서비스를 만들어 왔습니다. React, Next.js, TypeScript를 주력으로
          사용하며, 백엔드는 Node.js와 Python을 활용합니다.
        </p>
        <p>
          이 블로그는 개발 실무에서 직접 겪은 경험과 노하우를 정리하는
          공간입니다. 공식 문서나 일반적인 튜토리얼에서 다루지 않는{" "}
          <strong>실전에서 부딪히는 문제들과 해결 과정</strong>을 중심으로
          글을 씁니다.
        </p>

        <h2>블로그에서 다루는 주제</h2>
        <ul>
          <li>
            <strong>기술 (Tech)</strong> — 프론트엔드/백엔드 아키텍처, 성능
            최적화, 새로운 기술 스택 도입 경험. 단순 소개가 아닌 실무
            적용기를 공유합니다.
          </li>
          <li>
            <strong>튜토리얼 (Tutorial)</strong> — React Hooks, TypeScript,
            Docker, CI/CD 등 핵심 기술을 실전 코드와 함께 설명합니다.
            초보자도 따라할 수 있도록 단계별로 구성합니다.
          </li>
          <li>
            <strong>리뷰 (Review)</strong> — 키보드, 모니터, 생산성 도구 등
            개발자에게 필요한 장비와 소프트웨어를 직접 사용해보고 솔직하게
            리뷰합니다.
          </li>
          <li>
            <strong>일상 (Life)</strong> — 개발자 커리어, 원격 근무, 번아웃
            관리 등 개발자로 살아가면서 배운 것들을 나눕니다.
          </li>
        </ul>

        <h2>블로그를 시작한 이유</h2>
        <p>
          개발을 하면서 수많은 블로그 글에 도움을 받았습니다. 특히 누군가의
          삽질 기록이 제 시간을 아껴준 경험이 많았습니다. 저도 같은 방식으로
          다른 개발자들에게 도움이 되고 싶어 이 블로그를 시작했습니다.
        </p>
        <p>
          모든 글은 실제 프로젝트에서의 경험을 바탕으로 작성됩니다. &quot;이론적으로
          이렇다&quot;가 아니라 &quot;실제로 해보니 이랬다&quot;를 전달하는 것이
          이 블로그의 핵심 가치입니다.
        </p>

        <h2>기술 스택</h2>
        <p>이 블로그 자체도 직접 개발한 프로젝트입니다.</p>
        <ul>
          <li>
            <strong>프레임워크</strong>: Next.js (App Router)
          </li>
          <li>
            <strong>스타일링</strong>: Tailwind CSS v4
          </li>
          <li>
            <strong>콘텐츠</strong>: MDX (Markdown + JSX)
          </li>
          <li>
            <strong>배포</strong>: Vercel
          </li>
          <li>
            <strong>언어</strong>: TypeScript
          </li>
        </ul>

        <h2>Contact</h2>
        <p>
          궁금한 점, 글에 대한 피드백, 협업 제안이 있으시면 편하게 연락
          주세요. 기술 관련 질문도 환영합니다.
        </p>
        <ul>
          <li>
            <strong>GitHub</strong>:{" "}
            <a
              href="https://github.com/givepro91"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/givepro91
            </a>
          </li>
          <li>
            <strong>Email</strong>: givepro91@gmail.com
          </li>
        </ul>
      </div>
    </div>
  );
}
