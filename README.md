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

## 실제 배포 (GitHub Pages 권장)

### 1) 저장소 준비
1. 이 저장소를 GitHub에 push
2. 기본 브랜치를 `main`으로 설정
3. 저장소 `Settings > Pages`에서 Source를 **GitHub Actions**로 선택

### 2) 자동 배포
- `main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`로 자동 배포
- 배포 URL은 `https://gayeon-semicolon.github.io/project-1_saja/`

### 3) 커스텀 도메인 연결 (선택)
이 저장소는 `CNAME`을 고정 파일로 두지 않고, **Repository Variable**로 관리합니다.

1. GitHub 저장소 `Settings > Secrets and variables > Actions > Variables` 이동
2. `CUSTOM_DOMAIN` 변수 추가 (예: `saju.yourdomain.com`)
3. DNS에 CNAME 레코드 추가
   - 이름: `fortune`
   - 값: `gayeon-semicolon.github.io`
4. 재배포하면 워크플로가 `CNAME` 파일을 자동 생성
5. `Settings > Pages`에서 `Enforce HTTPS` 체크

참고: `CNAME.example`은 예시 파일입니다.

---

## Vercel 배포
1. GitHub 저장소를 Vercel에 Import
2. Framework Preset: `Other`
3. Build Command: 비움
4. Output Directory: `.`
5. Deploy

## Netlify 배포
1. GitHub 저장소를 Netlify에 연결
2. Build Command: 비움
3. Publish directory: `.`
4. Deploy

## 개인정보 안내
- 이 프로젝트는 서버 API 호출 없이 동작하는 정적 웹사이트입니다.
- 사용자가 입력한 이름/생년월일/출생시각/성별 데이터는 브라우저 세션에서만 처리됩니다.
- 페이지 새로고침 시 데이터는 사라집니다.


### Vercel 404 (NOT_FOUND) 해결
Vercel에서 아래 오류가 나면 보통 프로젝트 루트/출력 경로 또는 라우팅 설정 문제입니다.

`404: NOT_FOUND`

체크 순서:
1. Vercel Project Settings > **General**
   - Root Directory: 저장소 루트(`project-1_saja`)로 설정
2. Vercel Project Settings > **Build & Output Settings**
   - Framework Preset: `Other`
   - Build Command: 비움
   - Output Directory: 비움 또는 `.`
3. 이 저장소의 `vercel.json`이 배포에 포함됐는지 확인
   - 현재 모든 경로를 `index.html`로 rewrite 하도록 설정됨
4. **Redeploy** (기존 배포 재시도 말고 새 배포 권장)

그래도 안 되면:
- Vercel 대시보드의 배포 로그에서 `index.html` 업로드 여부 확인
- 잘못된 Root Directory로 인해 다른 폴더가 배포되는지 확인
