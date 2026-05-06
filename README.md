# 사주 · 점성술 통합 분석 웹앱

이 프로젝트는 사용자 입력(이름, 생년월일, 태어난 시각, 성별)을 받아 **실제 사주 분석 결과를 생성**하는 웹앱입니다.

## 핵심 변경점
- 프롬프트만 생성하는 도구가 아니라, `/api/analyze`를 통해 실제 분석 텍스트를 반환
- 개인정보는 저장하지 않고 응답 생성 용도로만 사용
- Vercel 배포 시 서버리스 함수로 동작

## 로컬 실행
```bash
python3 -m http.server 8000
```
> 정적 페이지만 확인됩니다. 실제 분석 API(`/api/analyze`)는 Vercel 서버리스 환경에서 동작합니다.

## Vercel 배포 (실제 분석 동작)
1. GitHub 저장소를 Vercel에 Import
2. Project Settings > Environment Variables에서 아래 변수 추가
   - `OPENAI_API_KEY` = 본인 OpenAI API 키
3. Framework Preset: `Other`
4. Build Command: 비움
5. Output Directory: 비움 또는 `.`
6. Deploy

## Vercel 404 / API 오류 체크
- 404 NOT_FOUND 발생 시 Root Directory가 저장소 루트인지 확인
- `vercel.json`이 배포에 반영되었는지 확인
- `/api/analyze` 호출 시 500이면 `OPENAI_API_KEY` 누락 여부 확인

## 커스텀 도메인 (선택)
- GitHub Pages를 쓸 경우 `CUSTOM_DOMAIN` 변수로 CNAME 자동 생성 가능
- Vercel은 Project > Domains에서 직접 연결

## 개인정보 안내
- 서버는 DB에 저장하지 않음
- 입력 데이터는 분석 응답 생성을 위해서만 사용됨
