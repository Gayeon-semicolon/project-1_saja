module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: '서버 환경변수 OPENAI_API_KEY가 설정되지 않았습니다.' });
  }

  const { name, gender, birthDate, birthTime, birthPlace, reference, extra } = req.body || {};

  const prompt = `아래 사용자 정보를 바탕으로 사주 + 점성술 통합 리딩을 작성해줘.
[개인정보 처리 원칙]
- 이름, 생년월일, 태어난 시, 성별 등 개인정보는 답변 생성 용도로만 사용하고 저장하지 마.
[사용자 정보]
- 이름: ${name}
- 성별: ${gender}
- 생년월일: ${birthDate}
- 태어난 시각: ${birthTime}
- 출생지: ${birthPlace || '미입력'}
- 만세력/점성술 참고 데이터: ${reference || '미입력'}
- 추가 요청사항: ${extra || '없음'}

[분석 지시]
지금의 데이터로 더 자세한 정보를 만세력 사이트 정보(사용자가 제공한 참고 데이터 포함) 기준으로 정리해줘.
1. 연간 운세
2. 일생의 운의 흐름
3. 2026년 올해 운의 흐름
4. 사주 + 태어난 점성술 데이터 종합

아래 항목 모두 포함:
- 타고난 성향
- 2026년 마음가짐
- 솔라 리턴 테마
- 역행 터닝포인트
- 길성/흉성 영향
- 애정/직업/금전/합격/이동/관계/건강운
- 월별운세(1~12월)
- 2026년 핵심 시기
- 2026년 조언 + 2027년 준비
- 수익적으로 여유로운 시기/이성운 높은 시기
- 어울리는 직업 추천과 TOP3 순위
- 1월 종합운 + 행운 아이템 + 타파 방법

쉬운 한국어로 친절하게 설명하고, 표와 소제목을 활용해줘.`;

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: prompt,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'OpenAI API 호출 실패' });
    }

    const result = data.output_text || '분석 결과를 생성하지 못했습니다.';
    return res.status(200).json({ result });
  } catch (e) {
    return res.status(500).json({ error: e.message || '서버 오류' });
  }
}
