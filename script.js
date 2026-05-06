const form = document.getElementById('fortune-form');
const output = document.getElementById('prompt-output');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

function buildPrompt(data) {
  return `아래 사용자 정보를 바탕으로 사주 + 점성술 통합 리딩을 작성해줘.\n
[개인정보 처리 원칙]\n- 이름, 생년월일, 태어난 시, 성별 등 개인정보는 답변 생성 용도로만 사용하고 따로 저장하지 마.\n\n[사용자 정보]\n- 이름: ${data.name}\n- 성별: ${data.gender}\n- 생년월일: ${data.birthDate}\n- 태어난 시각: ${data.birthTime}\n- 출생지: ${data.birthPlace || '미입력'}\n- 만세력/점성술 참고 데이터: ${data.reference || '미입력'}\n- 추가 요청사항: ${data.extra || '없음'}\n\n[분석 지시]\n지금의 데이터로 더 자세한 정보를 만세력 사이트 정보(사용자가 제공한 참고 데이터 포함) 기준으로 정리해줘.\n1. 연간 운세\n2. 일생의 운의 흐름\n3. 2026년 올해 운의 흐름\n4. 그 외의 추가 정보(사주 + 태어난 점성술 데이터 종합)\n\n아래 항목을 일반적이고 쉬운 언어로, 친절하게 답변해줘:\n- 타고난 성향\n- 2026년을 맞이하는 마음가짐\n- 솔라 리턴으로 보는 2026년의 테마\n- 별들의 역행으로 보는 올해의 터닝 포인트\n- 길성/흉성이 가져올 행운과 위험\n- 2026년 별들의 주요 움직임과 그 영향\n- 올해의 애정운\n- 올해의 직업운\n- 올해의 금전운\n- 올해의 합격운\n- 올해의 이동운\n- 올해의 관계운\n- 올해의 건강운\n- 월별 운세(1~12월)\n- 2026년에 기억해야 할 시기\n- 2026년 조언 + 2027년 준비\n\n추가 요구사항:\n1) 한자어는 가능한 쉬운 표현으로 풀어서 설명하고, 시기별 특징/주의점/해결 방식을 제안해줘.\n2) 가장 수익적으로 여유로운 시기와 이성운이 높은 시기를 구체적으로 짚어줘.\n3) 사주와 잘 맞는 직업 추천\n4) 직업군 3개 이내 순위 + 이유\n5) 1월 종합운, 주의점, 누려야 할 포인트, 행운 아이템, 타파 방법\n\n[출력 형식]\n- 제목과 소제목을 사용해 보기 쉽게 정리\n- 월별 운세는 표 형태\n- 불확실한 내용은 \"추정\"이라고 표시\n- 마지막에 \"요약 체크리스트\" 7개 항목으로 정리`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  output.textContent = buildPrompt(data);
});

copyBtn.addEventListener('click', async () => {
  if (!output.textContent || output.textContent.includes('아직 생성')) return;
  await navigator.clipboard.writeText(output.textContent);
  copyBtn.textContent = '복사됨!';
  setTimeout(() => (copyBtn.textContent = '프롬프트 복사'), 1200);
});

clearBtn.addEventListener('click', () => {
  form.reset();
  output.textContent = '아직 생성되지 않았습니다.';
});
