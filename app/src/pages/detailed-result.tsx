import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateDetailedTextPDF } from "@/lib/pdf-generator";
import type { TestResult } from "@shared/schema";
import { mbtiQuestions, bigFiveQuestions, tetoEgenQuestions } from "@/data/test-questions";

export default function DetailedResult() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: result, isLoading, error } = useQuery<TestResult>({
    queryKey: ["/api/test-results", id],
    enabled: !!id,
  });

  const getQuestions = (testType: string) => {
    switch (testType) {
      case 'mbti': return mbtiQuestions;
      case 'bigfive': return bigFiveQuestions;
      case 'tetoegen': return tetoEgenQuestions;
      default: return [];
    }
  };

  const getAnswerOptions = () => {
    return [
      '전혀 그렇지 않다',
      '그렇지 않다', 
      '보통이다',
      '그렇다',
      '매우 그렇다'
    ];
  };

  const getTestDisplayName = (testType?: string) => {
    switch (testType) {
      case 'mbti': return 'MBTI';
      case 'bigfive': return 'Big Five';
      case 'tetoegen': return 'Teto-Egen';
      default: return '성격검사';
    }
  };

  const getMBTIImage = (type: string) => {
    const typeImages: Record<string, string> = {
      'ENTJ': '👑', // 지도자
      'INTJ': '🏛️', // 건축가
      'ENFJ': '🌟', // 선도자
      'INFJ': '🔮', // 옹호자
      'ENFP': '🌈', // 활동가
      'INFP': '🎨', // 중재자
      'ENTP': '💡', // 토론가
      'INTP': '🔬', // 논리술사
      'ESTJ': '⚖️', // 경영자
      'ISTJ': '📋', // 현실주의자
      'ESFJ': '🤝', // 집정관
      'ISFJ': '🛡️', // 수호자
      'ESTP': '🎯', // 사업가
      'ISTP': '🔧', // 만능재주꾼
      'ESFP': '🎭', // 연예인
      'ISFP': '🎵', // 모험가
    };
    return typeImages[type] || '🧠';
  };

  const getBigFiveTraitImage = (trait: string) => {
    const traitImages: Record<string, string> = {
      'openness': '🌟', // 경험에 대한 개방성
      'conscientiousness': '📊', // 성실성
      'extraversion': '🎉', // 외향성
      'agreeableness': '🤝', // 친화성
      'neuroticism': '⚡', // 신경성
    };
    return traitImages[trait] || '📈';
  };

  const handlePDFDownload = async () => {
    if (!result) return;
    
    try {
      await generateDetailedTextPDF(result.result, result.testType);
      toast({
        title: "PDF 다운로드 완료",
        description: "상세 결과가 PDF로 다운로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "PDF 다운로드에 실패했습니다.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">결과를 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-6">
              요청하신 검사 결과를 찾을 수 없습니다.
            </p>
            <Button onClick={() => window.close()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              창 닫기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const questions = getQuestions(result.testType);
  const answers = result.answers as Record<number, number> || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Simplified Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {getTestDisplayName(result.testType)} 상세 결과
          </h1>
          <p className="text-lg text-muted-foreground">
            완료일: {new Date(result.completedAt || '').toLocaleDateString()}
          </p>
        </div>

        {/* Questions and Answers */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">질문별 답변 내역</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-medium text-gray-900 w-16">번호</th>
                    <th className="text-left py-2 px-2 font-medium text-gray-900">질문</th>
                    <th className="text-left py-2 px-2 font-medium text-gray-900 w-32">답변</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => {
                    const answer = answers[index];
                    const answerOptions = getAnswerOptions();
                    const selectedOption = answerOptions[answer] || '답변없음';
                    
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-2 text-primary font-medium">{index + 1}</td>
                        <td className="py-2 px-2 text-gray-700">{question.text.ko}</td>
                        <td className="py-2 px-2 text-gray-600 text-xs">{selectedOption}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">상세 분석 결과</h2>
            
            {/* Answer Pattern Analysis */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 답변 패턴 분석</h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                {(() => {
                  const answerCounts = [0, 0, 0, 0, 0];
                  Object.values(answers).forEach((answer: any) => {
                    if (answer >= 0 && answer < 5) answerCounts[answer]++;
                  });
                  const totalAnswers = Object.keys(answers).length;
                  const answerLabels = ['전혀 아님', '아님', '보통', '그럼', '매우 그럼'];
                  
                  return (
                    <div className="grid grid-cols-5 gap-2 text-center text-sm">
                      {answerCounts.map((count, idx) => (
                        <div key={idx} className="bg-white rounded p-2">
                          <div className="font-medium text-gray-900">{answerLabels[idx]}</div>
                          <div className="text-2xl font-bold text-blue-600">{count}</div>
                          <div className="text-gray-600">{totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0}%</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Main Result */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border border-blue-200">
              {result.testType === 'mbti' && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center mx-auto mb-6 shadow-lg border-4 border-blue-200">
                      <div className="text-5xl mb-2">
                        {getMBTIImage((result.result as any).type)}
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {(result.result as any).type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {(result.result as any).description}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">💪 강점과 특징</h4>
                      <ul className="space-y-2">
                        {((result.result as any).traits || []).map((trait: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                            <span className="text-gray-700">{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 개발 포인트</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700">
                            {(result.result as any).type.includes('I') ? '팀 프로젝트에서 적극적으로 의견 제시하기' : '개인 시간을 가지며 내면 성찰 늘리기'}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700">
                            {(result.result as any).type.includes('S') ? '새로운 가능성과 창의적 사고 탐구하기' : '현실적 세부사항에 더 주의깊게 접근하기'}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700">
                            {(result.result as any).type.includes('T') ? '타인의 감정과 입장을 더 고려하기' : '객관적 분석과 논리적 판단력 기르기'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">📊 성향 분석</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: (result.result as any).type[0] === 'E' ? '외향형 (E)' : '내향형 (I)', value: (result.result as any).dimensions?.EI || 0 },
                        { label: (result.result as any).type[1] === 'N' ? '직관형 (N)' : '감각형 (S)', value: (result.result as any).dimensions?.SN || 0 },
                        { label: (result.result as any).type[2] === 'F' ? '감정형 (F)' : '사고형 (T)', value: (result.result as any).dimensions?.TF || 0 },
                        { label: (result.result as any).type[3] === 'P' ? '인식형 (P)' : '판단형 (J)', value: (result.result as any).dimensions?.JP || 0 }
                      ].map((dim, index) => (
                        <div key={index} className="text-center">
                          <div className="text-sm font-medium text-gray-700 mb-1">{dim.label}</div>
                          <div className="text-2xl font-bold text-primary">{dim.value}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${dim.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {result.testType === 'bigfive' && (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Big Five 성격 분석
                    </h3>
                    <p className="text-lg text-gray-600">{(result.result as any).description}</p>
                  </div>
                  
                  <div className="space-y-6">
                    {Object.entries((result.result as any).dimensions || {}).map(([key, value]) => {
                      const dimensionInfo = {
                        openness: { name: '개방성', desc: '새로운 경험과 창의성에 대한 개방도', icon: '🌟' },
                        conscientiousness: { name: '성실성', desc: '조직적이고 목표 지향적인 성향', icon: '📊' },
                        extraversion: { name: '외향성', desc: '사회적 상호작용과 에너지 충전 방식', icon: '🎉' },
                        agreeableness: { name: '친화성', desc: '타인과의 협력과 공감 능력', icon: '🤝' },
                        neuroticism: { name: '신경성', desc: '감정적 안정성과 스트레스 대응', icon: '⚡' }
                      };
                      const info = dimensionInfo[key as keyof typeof dimensionInfo] || { name: key, desc: '', icon: '📈' };
                      const score = Number(value);
                      
                      return (
                        <div key={key} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{info.icon}</span>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{info.name}</h4>
                                <p className="text-sm text-gray-600">{info.desc}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-primary">{score}점</span>
                              <div className="text-sm text-gray-600">
                                {score >= 80 ? '매우 높음' : score >= 60 ? '높음' : score >= 40 ? '보통' : score >= 20 ? '낮음' : '매우 낮음'}
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-300" 
                                 style={{ width: `${score}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {result.testType === 'tetoegen' && (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center mx-auto mb-6 shadow-lg border-4 border-pink-200">
                      <div className="text-5xl mb-2">
                        {(result.result as any).category === 'teto' ? '🔥' : '🌸'}
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {(result.result as any).category === 'teto' ? '테토' : '에겐'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {(result.result as any).category === 'teto' ? '테토' : '에겐'} {(result.result as any).gender === 'male' ? '남성' : '여성'}
                    </h3>
                    <p className="text-lg text-gray-600">{(result.result as any).description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-3">✨</span>성격 특징
                      </h4>
                      <ul className="space-y-2">
                        {((result.result as any).traits || []).map((trait: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3"></div>
                            <span className="text-gray-700">{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-3">💕</span>연애 스타일
                      </h4>
                      <ul className="space-y-2">
                        {[
                          (result.result as any).category === 'teto' ? '적극적이고 활발한 연애 스타일' : '차분하고 안정적인 연애 스타일',
                          (result.result as any).category === 'teto' ? '새로운 도전과 모험을 함께 즐기는 타입' : '깊이 있는 대화와 진솔한 관계를 추구',
                          (result.result as any).category === 'teto' ? '감정 표현이 직접적이고 솔직함' : '배려심 깊고 세심한 관심 표현'
                        ].map((style: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                            <span className="text-gray-700">{style}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                    <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">💝</span>궁합 분석
                    </h4>
                    <div className="space-y-2">
                      {[
                        (result.result as any).category === 'teto' ? '에겐 타입과 서로 보완적인 관계를 형성할 수 있습니다' : '테토 타입과 균형 잡힌 관계를 만들어갈 수 있습니다',
                        '비슷한 가치관을 가진 동일 타입과도 좋은 관계를 유지할 수 있습니다',
                        '상대방의 특성을 이해하고 존중하는 것이 관계 발전의 핵심입니다'
                      ].map((comp: string, idx: number) => (
                        <p key={idx} className="text-blue-800 flex items-start">
                          <span className="mr-2">•</span>{comp}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Practical Advice */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💡</span>실생활 적용 가이드
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 업무/학습 스타일</h4>
                  <p className="text-sm text-gray-600">
                    {result.testType === 'mbti' && (
                      (result.result as any).type.includes('E') ? 
                      '팀워크와 토론을 통해 아이디어를 발전시키는 것을 선호합니다. 브레인스토밍이나 그룹 프로젝트에서 강점을 발휘할 수 있습니다.' :
                      '혼자서 집중할 수 있는 환경에서 깊이 있게 사고하는 것을 선호합니다. 개인 작업 공간과 충분한 준비 시간이 도움이 됩니다.'
                    )}
                    {result.testType === 'bigfive' && (
                      '성실성이 높으면 계획적이고 체계적인 접근을, 개방성이 높으면 창의적이고 유연한 사고를 활용해보세요.'
                    )}
                    {result.testType === 'tetoegen' && (
                      (result.result as any).category === 'teto' ?
                      '적극적이고 도전적인 업무 환경에서 능력을 발휘할 수 있습니다. 새로운 프로젝트나 리더십 역할에 도전해보세요.' :
                      '안정적이고 협력적인 환경에서 꾸준히 성과를 내는 타입입니다. 팀 조화와 업무 안정성을 중시하세요.'
                    )}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💼 대인관계 팁</h4>
                  <p className="text-sm text-gray-600">
                    {result.testType === 'mbti' && (
                      (result.result as any).type.includes('F') ? 
                      '감정적 공감과 따뜻한 소통을 중시합니다. 상대방의 감정을 이해하고 배려하는 관계 형성에 강점이 있습니다.' :
                      '논리적이고 객관적인 소통을 선호합니다. 명확한 근거와 합리적인 판단 기준을 제시하면 좋습니다.'
                    )}
                    {result.testType === 'bigfive' && (
                      '친화성과 외향성 점수를 참고하여 자신의 소통 스타일을 파악하고, 상대방에게 맞는 접근 방식을 선택해보세요.'
                    )}
                    {result.testType === 'tetoegen' && (
                      '자신의 성향을 이해하고 상대방과의 궁합을 고려한 소통 방식을 개발하면 더 원활한 인간관계를 만들 수 있습니다.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}