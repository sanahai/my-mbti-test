import type { MBTIResult, BigFiveResult, TetoEgenResult } from "@shared/schema";

export function calculateMBTIResult(answers: Record<number, number>): MBTIResult {
  const categories = {
    EI: { positive: 0, total: 0 },
    SN: { positive: 0, total: 0 },
    TF: { positive: 0, total: 0 },
    JP: { positive: 0, total: 0 }
  };

  // Calculate scores for each dimension
  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId);
    let category: keyof typeof categories;
    let reverse = false;

    // Determine category and reverse flag based on question ID
    if (id <= 18) {
      category = 'EI';
      reverse = [3, 4, 6, 8, 10, 12, 14, 16, 18].includes(id);
    } else if (id <= 36) {
      category = 'SN';
      reverse = [21, 22, 24, 26, 28, 30, 32, 34, 36].includes(id);
    } else if (id <= 54) {
      category = 'TF';
      reverse = [39, 40, 42, 44, 46, 48, 50, 52, 54].includes(id);
    } else {
      category = 'JP';
      reverse = [57, 58, 60, 62, 64, 66, 68, 70].includes(id);
    }

    const score = reverse ? 6 - answer : answer;
    categories[category].positive += score;
    categories[category].total += 5;
  });

  // Calculate percentages
  const dimensions = {
    EI: Math.round((categories.EI.positive / categories.EI.total) * 100),
    SN: Math.round((categories.SN.positive / categories.SN.total) * 100),
    TF: Math.round((categories.TF.positive / categories.TF.total) * 100),
    JP: Math.round((categories.JP.positive / categories.JP.total) * 100)
  };

  // Determine type
  const type = [
    dimensions.EI > 50 ? 'E' : 'I',
    dimensions.SN > 50 ? 'N' : 'S',
    dimensions.TF > 50 ? 'F' : 'T',
    dimensions.JP > 50 ? 'J' : 'P'
  ].join('');

  const typeDescriptions: Record<string, { name: string; description: string; traits: string[]; growthAreas: string[] }> = {
    ENFP: {
      name: '활동가',
      description: '열정적이고 창의적인 사회적 자유영혼',
      traits: ['열정적이고 활기찬 성격', '창의적 문제 해결 능력', '뛰어난 의사소통 스킬', '새로운 가능성을 탐구'],
      growthAreas: ['집중력 향상 필요', '세부사항 관리 개선', '일정 관리 체계화', '감정 조절 연습']
    },
    ENFJ: {
      name: '선도자',
      description: '카리스마 있고 영감을 주는 지도자',
      traits: ['타인에게 영감을 주는 능력', '뛰어난 의사소통 스킬', '공감 능력이 뛰어남', '비전을 제시하는 능력'],
      growthAreas: ['자기 돌봄이 필요', '비판에 대한 내성 키우기', '개인적 경계 설정', '완벽주의 완화']
    },
    ENTP: {
      name: '변론가',
      description: '똑똑하고 호기심 많은 사상가',
      traits: ['혁신적인 아이디어 창출', '논리적 사고 능력', '적응력이 뛰어남', '토론을 즐김'],
      growthAreas: ['일관성 있는 실행력', '루틴 작업에 대한 인내심', '감정적 배려 증진', '세부사항 관리']
    },
    ENTJ: {
      name: '통솔자',
      description: '대담하고 상상력 있는 강력한 지도자',
      traits: ['강력한 리더십', '전략적 사고', '목표 지향적', '결단력이 뛰어남'],
      growthAreas: ['타인의 감정 고려', '인내심 기르기', '협력적 접근', '완벽주의 완화']
    },
    INFP: {
      name: '중재자',
      description: '시적이고 친절한 이타주의자',
      traits: ['깊은 가치관과 신념', '창의적이고 상상력 풍부', '진정성을 추구', '다른 사람을 이해하고 공감'],
      growthAreas: ['자신감 향상', '현실적 목표 설정', '갈등 상황 대처', '시간 관리 개선']
    },
    INFJ: {
      name: '옹호자',
      description: '선의의 옹호자이자 이상주의자',
      traits: ['통찰력이 뛰어남', '이상주의적', '결단력 있음', '창의적 문제 해결'],
      growthAreas: ['완벽주의 극복', '현실과 이상의 균형', '자기 돌봄', '유연성 기르기']
    },
    INTP: {
      name: '논리술사',
      description: '혁신적인 발명가',
      traits: ['논리적 분석 능력', '독립적 사고', '호기심이 많음', '객관적 판단'],
      growthAreas: ['감정 표현 능력', '실용적 적용', '사회적 기술', '일관된 실행력']
    },
    INTJ: {
      name: '건축가',
      description: '상상력이 풍부하고 전략적인 사상가',
      traits: ['전략적 사고', '독립적', '결단력 있음', '높은 기준 추구'],
      growthAreas: ['타인과의 협력', '감정적 이해', '유연성', '비판에 대한 개방성']
    },
    ESFP: {
      name: '연예인',
      description: '자발적이고 열정적인 연예인',
      traits: ['활발하고 친근함', '실용적', '유연성 있음', '타인을 즐겁게 함'],
      growthAreas: ['장기 계획 수립', '비판에 대한 내성', '집중력 향상', '체계적 접근']
    },
    ESFJ: {
      name: '집정관',
      description: '매우 배려심 많고 사교적인 성격',
      traits: ['타인을 돌보는 능력', '협력적', '조직력 뛰어남', '충성심 강함'],
      growthAreas: ['자기 주장', '변화에 대한 적응', '비판에 대한 대처', '개인적 욕구 인식']
    },
    ESTP: {
      name: '사업가',
      description: '똑똑하고 에너지 넘치는 지각자',
      traits: ['실용적 문제 해결', '적응력 뛰어남', '사교적', '현실적'],
      growthAreas: ['장기적 사고', '세부사항 주의', '감정적 깊이', '계획적 접근']
    },
    ESTJ: {
      name: '경영자',
      description: '뛰어난 관리자',
      traits: ['조직력 뛰어남', '책임감 강함', '실용적', '결단력 있음'],
      growthAreas: ['유연성', '타인의 감정 고려', '변화에 대한 개방성', '창의적 접근']
    },
    ISFP: {
      name: '모험가',
      description: '유연하고 매력적인 예술가',
      traits: ['예술적 감각', '온화함', '유연성', '조화 추구'],
      growthAreas: ['자기 표현', '장기 계획', '갈등 대처', '결단력']
    },
    ISFJ: {
      name: '수호자',
      description: '따뜻하고 헌신적인 수호자',
      traits: ['책임감 강함', '세심함', '신뢰할 수 있음', '협력적'],
      growthAreas: ['자기 주장', '변화 수용', '개인적 욕구 표현', '비판에 대한 대처']
    },
    ISTP: {
      name: '장인',
      description: '대담하고 실용적인 실험자',
      traits: ['실용적 문제 해결', '독립적', '유연함', '냉정한 판단'],
      growthAreas: ['감정 표현', '장기 계획', '타인과의 소통', '일관성']
    },
    ISTJ: {
      name: '현실주의자',
      description: '사실적이고 신뢰할 수 있는 실용주의자',
      traits: ['책임감 강함', '체계적', '신뢰할 수 있음', '꼼꼼함'],
      growthAreas: ['유연성', '새로운 아이디어 수용', '감정 표현', '변화에 대한 적응']
    }
  };

  const typeInfo = typeDescriptions[type] || {
    name: '알 수 없음',
    description: '성격 유형을 확인할 수 없습니다.',
    traits: [],
    growthAreas: []
  };

  return {
    type,
    dimensions,
    description: typeInfo.description,
    traits: typeInfo.traits,
    growthAreas: typeInfo.growthAreas
  };
}

export function calculateBigFiveResult(answers: Record<number, number>): BigFiveResult {
  const categories = {
    openness: { positive: 0, total: 0 },
    conscientiousness: { positive: 0, total: 0 },
    extraversion: { positive: 0, total: 0 },
    agreeableness: { positive: 0, total: 0 },
    neuroticism: { positive: 0, total: 0 }
  };

  const categoryMapping: Record<number, { category: keyof typeof categories; reverse: boolean }> = {
    1: { category: 'openness', reverse: false },
    2: { category: 'openness', reverse: false },
    3: { category: 'openness', reverse: false },
    4: { category: 'openness', reverse: false },
    5: { category: 'openness', reverse: false },
    6: { category: 'openness', reverse: true },
    7: { category: 'openness', reverse: false },
    8: { category: 'openness', reverse: false },
    9: { category: 'openness', reverse: false },
    10: { category: 'openness', reverse: true },
    11: { category: 'conscientiousness', reverse: false },
    12: { category: 'conscientiousness', reverse: false },
    13: { category: 'conscientiousness', reverse: false },
    14: { category: 'conscientiousness', reverse: false },
    15: { category: 'conscientiousness', reverse: false },
    16: { category: 'conscientiousness', reverse: true },
    17: { category: 'conscientiousness', reverse: false },
    18: { category: 'conscientiousness', reverse: false },
    19: { category: 'conscientiousness', reverse: false },
    20: { category: 'conscientiousness', reverse: true },
    21: { category: 'extraversion', reverse: false },
    22: { category: 'extraversion', reverse: false },
    23: { category: 'extraversion', reverse: false },
    24: { category: 'extraversion', reverse: false },
    25: { category: 'extraversion', reverse: false },
    26: { category: 'extraversion', reverse: true },
    27: { category: 'extraversion', reverse: false },
    28: { category: 'extraversion', reverse: false },
    29: { category: 'extraversion', reverse: false },
    30: { category: 'extraversion', reverse: true },
    31: { category: 'agreeableness', reverse: false },
    32: { category: 'agreeableness', reverse: false },
    33: { category: 'agreeableness', reverse: false },
    34: { category: 'agreeableness', reverse: false },
    35: { category: 'agreeableness', reverse: false },
    36: { category: 'agreeableness', reverse: true },
    37: { category: 'agreeableness', reverse: false },
    38: { category: 'agreeableness', reverse: false },
    39: { category: 'agreeableness', reverse: false },
    40: { category: 'agreeableness', reverse: true },
    41: { category: 'neuroticism', reverse: false },
    42: { category: 'neuroticism', reverse: false },
    43: { category: 'neuroticism', reverse: false },
    44: { category: 'neuroticism', reverse: false },
    45: { category: 'neuroticism', reverse: false },
    46: { category: 'neuroticism', reverse: true },
    47: { category: 'neuroticism', reverse: false },
    48: { category: 'neuroticism', reverse: false },
    49: { category: 'neuroticism', reverse: false },
    50: { category: 'neuroticism', reverse: true }
  };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId);
    const mapping = categoryMapping[id];
    if (mapping) {
      const score = mapping.reverse ? 6 - answer : answer;
      categories[mapping.category].positive += score;
      categories[mapping.category].total += 5;
    }
  });

  const dimensions = {
    openness: Math.round((categories.openness.positive / categories.openness.total) * 100),
    conscientiousness: Math.round((categories.conscientiousness.positive / categories.conscientiousness.total) * 100),
    extraversion: Math.round((categories.extraversion.positive / categories.extraversion.total) * 100),
    agreeableness: Math.round((categories.agreeableness.positive / categories.agreeableness.total) * 100),
    neuroticism: Math.round((categories.neuroticism.positive / categories.neuroticism.total) * 100)
  };

  const generateDescription = (dims: typeof dimensions) => {
    const traits = [];
    
    if (dims.openness > 70) traits.push('매우 창의적이고 개방적');
    else if (dims.openness > 50) traits.push('창의적이고 새로운 경험에 개방적');
    else if (dims.openness > 30) traits.push('실용적이고 전통적 가치를 중시');
    else traits.push('매우 실용적이고 보수적');

    if (dims.conscientiousness > 70) traits.push('매우 성실하고 체계적');
    else if (dims.conscientiousness > 50) traits.push('책임감 있고 조직적');
    else if (dims.conscientiousness > 30) traits.push('유연하고 자발적');
    else traits.push('매우 자유롭고 즉흥적');

    if (dims.extraversion > 70) traits.push('매우 외향적이고 사교적');
    else if (dims.extraversion > 50) traits.push('외향적이고 활발함');
    else if (dims.extraversion > 30) traits.push('내향적이고 조용함');
    else traits.push('매우 내향적이고 독립적');

    return traits.join(', ') + '인 성격입니다.';
  };

  return {
    dimensions,
    description: generateDescription(dimensions),
    summary: 'Big Five 성격 검사 결과입니다.'
  };
}

export function calculateTetoEgenResult(answers: Record<number, number>, gender: 'male' | 'female'): TetoEgenResult {
  let tetoScore = 0;
  let egenScore = 0;

  const tetoQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const egenQuestions = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId);
    if (tetoQuestions.includes(id)) {
      tetoScore += answer;
    } else if (egenQuestions.includes(id)) {
      egenScore += answer;
    }
  });

  const category = tetoScore > egenScore ? 'teto' : 'egen';
  const score = category === 'teto' ? tetoScore : egenScore;
  
  let type: TetoEgenResult['type'];
  if (category === 'teto' && gender === 'male') type = 'tetonam';
  else if (category === 'teto' && gender === 'female') type = 'tetonnyeo';
  else if (category === 'egen' && gender === 'male') type = 'egennam';
  else type = 'egennyeo';

  const typeDescriptions = {
    tetonam: {
      description: '테토 남성 - 남성적이고 활동적인 성격',
      traits: ['적극적이고 행동지향적', '리더십이 강함', '경쟁을 즐김', '직설적이고 솔직함'],
      relationshipStyle: ['주도적인 연애 스타일', '직접적인 감정 표현', '보호자 역할 선호'],
      compatibility: ['에겐 여성과 높은 궁합', '테토 여성과도 좋은 궁합']
    },
    tetonnyeo: {
      description: '테토 여성 - 표현력이 풍부하고 외향적인 성격',
      traits: ['표현력이 풍부함', '사교적이고 외향적', '모험적이고 도전적', '독립적인 성향'],
      relationshipStyle: ['적극적인 어프로치', '감정 표현이 솔직함', '주도권을 잡는 편'],
      compatibility: ['에겐 남성과 매우 좋은 궁합', '테토 남성과도 균형잡힌 관계']
    },
    egennam: {
      description: '에겐 남성 - 섬세하고 감정적인 성격',
      traits: ['섬세하고 배려심 많음', '예술적 감각이 뛰어남', '감정 표현이 풍부함', '협력적이고 온화함'],
      relationshipStyle: ['로맨틱하고 세심한 연애', '감정적 교감 중시', '상대방을 배려함'],
      compatibility: ['테토 여성과 매우 좋은 궁합', '상호 보완적인 관계 형성']
    },
    egennyeo: {
      description: '에겐 여성 - 전통적이고 여성적인 성격',
      traits: ['온화하고 부드러움', '공감 능력이 뛰어남', '조화를 추구함', '안정성을 중시함'],
      relationshipStyle: ['따뜻하고 포용적', '감정적 지지 제공', '관계의 안정성 추구'],
      compatibility: ['테토 남성과 전통적인 좋은 궁합', '상호 보완적 관계']
    }
  };

  const typeInfo = typeDescriptions[type];

  return {
    type,
    category,
    gender,
    score,
    description: typeInfo.description,
    traits: typeInfo.traits,
    relationshipStyle: typeInfo.relationshipStyle,
    compatibility: typeInfo.compatibility
  };
}
