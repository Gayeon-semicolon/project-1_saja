# 사주 · 점성술 통합 리딩 프롬프트 생성기

사용자 입력(이름, 생년월일, 태어난 시각, 성별)을 바탕으로 사주/점성술 분석용 프롬프트를 생성하는 정적 웹페이지입니다.

## 특징
- 개인정보 비저장: 입력 데이터는 브라우저 메모리에서만 사용
- 2026년 중심 운세 항목이 포함된 구조화 프롬프트 자동 생성
- 프롬프트 복사 버튼 제공
- 정적 호스팅에 바로 배포 가능 (GitHub Pages / Vercel / Netlify)

## 로컬 실행
```bash
python3 -m http.server 8000
```
브라우저에서 `http://localhost:8000` 접속.

---

## 배포 방법

### 1) GitHub Pages (추천)
1. 이 저장소를 GitHub에 push
2. 기본 브랜치를 `main`으로 설정
3. 저장소 `Settings > Pages`에서 Source를 **GitHub Actions**로 선택
4. `main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`로 자동 배포

### 2) Vercel
1. GitHub 저장소를 Vercel에 Import
2. Framework Preset: `Other`
3. Build Command: 비움
4. Output Directory: `.`
5. Deploy

### 3) Netlify
1. GitHub 저장소를 Netlify에 연결
2. Build Command: 비움
3. Publish directory: `.`
4. Deploy

## 개인정보 안내
- 이 프로젝트는 서버 API 호출 없이 동작하는 정적 웹사이트입니다.
- 사용자가 입력한 이름/생년월일/출생시각/성별 데이터는 브라우저 세션에서만 처리됩니다.
- 페이지 새로고침 시 데이터는 사라집니다.


## 커스텀 도메인 연결
예시 도메인: `saju.example.com` (현재 `CNAME` 파일과 동일)  
실제 배포 시에는 본인 도메인으로 `CNAME` 파일 값을 반드시 변경하세요.

### A) GitHub Pages 도메인 연결
1. 저장소 루트의 `CNAME` 파일 값을 원하는 도메인으로 변경 (예: `fortune.mybrand.com`)
2. DNS 제공업체에서 아래 레코드 추가
   - `subdomain` 방식 권장(CNAME):
     - 이름: `fortune`
     - 값: `<github-username>.github.io`
3. GitHub 저장소 `Settings > Pages`에서 Custom domain에 같은 도메인 입력
4. `Enforce HTTPS` 활성화

### B) Vercel 도메인 연결
1. Vercel 프로젝트 > `Settings > Domains`
2. 도메인 추가 후 안내되는 DNS 레코드(CNAME 또는 A) 적용
3. SSL(HTTPS) 자동 발급 확인

### C) Netlify 도메인 연결
1. Netlify 사이트 > `Domain settings`
2. Custom domain 추가
3. DNS 레코드(보통 CNAME) 적용 후 TLS 인증서 발급 확인

### DNS 전파 체크
- 일반적으로 수 분~24시간 소요
- `dig`, `nslookup`, 또는 DNS checker 사이트로 확인
