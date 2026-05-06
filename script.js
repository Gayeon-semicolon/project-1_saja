const form = document.getElementById('fortune-form');
const output = document.getElementById('result-output');
const analyzeBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = '분석 중...';
  output.textContent = '사주 분석을 생성하고 있습니다. 잠시만 기다려주세요...';

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.error || '분석 생성에 실패했습니다.');
    }

    output.textContent = payload.result;
  } catch (err) {
    output.textContent = `오류: ${err.message}`;
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '분석 시작';
  }
});

clearBtn.addEventListener('click', () => {
  form.reset();
  output.textContent = '아직 분석되지 않았습니다.';
});
