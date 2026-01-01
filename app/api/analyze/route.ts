import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// 1. Claude 설정 (환경변수에서 키를 자동으로 가져옵니다)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    // 2. 화면(page.tsx)에서 보낸 MBTI 데이터와 점수 받기
    const body = await request.json();
    const { mbti, scores } = body;

    console.log(`📡 [분석 시작] 유형: ${mbti}`);

    // 3. Claude 3 Haiku 모델에 분석 요청
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // 가장 빠르고 경제적인 모델
      max_tokens: 1500,
      system: "당신은 전문 심리 상담가입니다. 반드시 JSON 형식으로만 답변하세요. 잡담은 절대 하지 마세요.",
      messages: [
        {
          role: "user",
          content: `사용자의 MBTI 유형은 ${mbti}입니다. 
          각 차원의 점수는 E/I: ${scores.EI}, S/N: ${scores.SN}, T/F: ${scores.TF}, J/P: ${scores.JP}입니다. 

          이 정보를 바탕으로 다음 JSON 형식으로만 응답해주세요:
          {
            "type": "${mbti}",
            "title": "유형의 창의적인 별명 (예: 용감한 수호자)",
            "description": "이 유형의 성격 특징 3문장 요약",
            "strengths": ["강점1", "강점2", "강점3"],
            "weaknesses": ["보완점1", "보완점2", "보완점3"],
            "careers": ["추천직업1", "추천직업2", "추천직업3"]
          }`
        }
      ]
    });

    // 4. Claude의 응답 텍스트만 추출
    const text = response.content[0].type === 'text' ? response.content[0].text : "";
    
    // 5. 혹시 모를 텍스트 찌꺼기(마크다운 등) 제거 후 JSON 파싱
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanText);

    console.log(`✅ [분석 완료] 데이터 전송 중`);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("❌ Claude API 에러:", error);
    
    // 에러 발생 시 사용자에게 보여줄 최소한의 안내
    return NextResponse.json(
      { error: "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}