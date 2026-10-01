# daily-givepro

개인 블로그. Next.js(App Router) + MDX 로 쓰고 Vercel 에 배포한다.

- 사이트 — https://daily-givepro.vercel.app
- 글은 `content/` 에 MDX 로 둔다. 컴포넌트는 `components/`, 라우트는 `app/`.

> **Status (2026-10):** 2026-03 이후 멈춰 있다. 지금 글은 [Brunch](https://brunch.co.kr/@eb877c69f69b451) 와 [Tistory](https://givepro.tistory.com) 에 쓰고, 작업 기록은 [포트폴리오](https://givepro91.github.io) 에 남긴다.

## 개발

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

환경 변수는 `.env.example` 을 복사해 채운다.
