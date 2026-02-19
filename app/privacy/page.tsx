import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://daily-givepro.vercel.app";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Daily Givepro";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE_NAME}의 개인정보처리방침입니다.`,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        개인정보처리방침
      </h1>
      <div className="prose prose-lg prose-neutral dark:prose-invert">
        <p>
          <strong>{SITE_NAME}</strong>(이하 &quot;본 블로그&quot;)는 이용자의
          개인정보를 중요시하며, 개인정보 보호법 등 관련 법령을 준수합니다.
        </p>

        <h2>1. 수집하는 개인정보</h2>
        <p>
          본 블로그는 별도의 회원가입 절차 없이 운영되며, 다음과 같은 정보가
          자동으로 수집될 수 있습니다:
        </p>
        <ul>
          <li>방문 기록 (접속 일시, IP 주소, 브라우저 종류)</li>
          <li>쿠키 정보</li>
          <li>방문 페이지 및 이용 행태</li>
        </ul>

        <h2>2. 개인정보의 이용 목적</h2>
        <p>수집된 정보는 다음의 목적을 위해 사용됩니다:</p>
        <ul>
          <li>웹사이트 이용 통계 분석 (Google Analytics)</li>
          <li>맞춤형 광고 제공 (Google AdSense)</li>
          <li>서비스 개선 및 사용자 경험 향상</li>
        </ul>

        <h2>3. 쿠키(Cookie) 사용</h2>
        <p>본 블로그는 다음과 같은 쿠키를 사용합니다:</p>
        <ul>
          <li>
            <strong>Google Analytics 쿠키</strong>: 웹사이트 트래픽 분석을 위해
            사용됩니다. Google의 개인정보처리방침은{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              여기
            </a>
            에서 확인할 수 있습니다.
          </li>
          <li>
            <strong>Google AdSense 쿠키</strong>: 맞춤형 광고 제공을 위해
            사용됩니다. 사용자는 Google의{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              광고 설정
            </a>
            에서 맞춤 광고를 비활성화할 수 있습니다.
          </li>
          <li>
            <strong>테마 설정 쿠키</strong>: 다크 모드/라이트 모드 설정을
            저장합니다.
          </li>
        </ul>

        <h2>4. 제3자 서비스</h2>
        <p>본 블로그는 다음과 같은 제3자 서비스를 이용합니다:</p>
        <ul>
          <li>
            <strong>Google Analytics</strong>: 웹사이트 방문 통계 수집
          </li>
          <li>
            <strong>Google AdSense</strong>: 광고 게재
          </li>
          <li>
            <strong>Vercel</strong>: 웹사이트 호스팅
          </li>
        </ul>
        <p>
          각 서비스의 개인정보처리방침은 해당 서비스의 웹사이트에서 확인할 수
          있습니다.
        </p>

        <h2>5. 제휴 마케팅 링크</h2>
        <p>
          본 블로그의 일부 글에는 제휴 마케팅 링크가 포함될 수 있습니다.
          이용자가 해당 링크를 통해 상품을 구매하면 블로그 운영자에게 소정의
          수수료가 지급될 수 있으며, 이는 이용자의 구매 가격에 영향을 미치지
          않습니다.
        </p>

        <h2>6. 개인정보의 보유 및 파기</h2>
        <p>
          자동으로 수집된 정보는 수집 목적이 달성되면 지체 없이 파기합니다.
          다만, 제3자 서비스(Google Analytics 등)에서 수집한 정보는 해당
          서비스의 정책에 따릅니다.
        </p>

        <h2>7. 이용자의 권리</h2>
        <ul>
          <li>
            브라우저 설정을 통해 쿠키 사용을 거부하거나 삭제할 수 있습니다.
          </li>
          <li>
            Google의 광고 설정에서 맞춤 광고를 비활성화할 수 있습니다.
          </li>
          <li>
            개인정보 관련 문의는 블로그 About 페이지를 통해 연락하실 수
            있습니다.
          </li>
        </ul>

        <h2>8. 방침 변경</h2>
        <p>
          본 개인정보처리방침은 법령이나 서비스 변경에 따라 수정될 수 있으며,
          변경 시 본 페이지에 게시합니다.
        </p>

        <p className="text-sm text-gray-500">
          시행일: 2026년 2월 19일
        </p>
      </div>
    </div>
  );
}
