@ts-nocheck
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, CheckCircle, Lightbulb, Eye } from "lucide-react";
import { generateTestResultPDF, generateDetailedTextPDF } from "@/lib/pdf-generator";
import type { MBTIResult, BigFiveResult, TetoEgenResult } from "@shared/schema";

interface ResultCardProps {
  result: MBTIResult | BigFiveResult | TetoEgenResult;
  testType: string;
  onShare?: () => void;
  onDownload?: () => void;
  resultId?: string;
}

export default function ResultCard({ result, testType, onShare, onDownload, resultId }: ResultCardProps) {
  
  const handleVisualPDFDownload = async () => {
    try {
      const elementId = `result-card-${resultId || 'default'}`;
      await generateTestResultPDF(result, testType, elementId);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      // 기존 다운로드 방식을 fallback으로 사용
      if (onDownload) onDownload();
    }
  };

  const handleDetailedView = () => {
    // 새 창으로 상세 결과 페이지 열기
    const url = `/detailed-result/${resultId}`;
    window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  };

  const handlePDFDownload = async () => {
    try {
      await generateDetailedTextPDF(result, testType);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      // 기존 다운로드 방식을 fallback으로 사용
      if (onDownload) onDownload();
    }
  };
  const renderMBTIResult = (mbtiResult: MBTIResult) => (
    <div>
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-primary">{mbtiResult.type}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{mbtiResult.description}</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: mbtiResult.type[0] === 'E' ? '외향형' : '내향형', code: mbtiResult.type[0], value: mbtiResult.dimensions.EI },
          { label: mbtiResult.type[1] === 'N' ? '직관형' : '감각형', code: mbtiResult.type[1], value: mbtiResult.dimensions.SN },
          { label: mbtiResult.type[2] === 'F' ? '감정형' : '사고형', code: mbtiResult.type[2], value: mbtiResult.dimensions.TF },
          { label: mbtiResult.type[3] === 'P' ? '인식형' : '판단형', code: mbtiResult.type[3], value: mbtiResult.dimensions.JP }
        ].map((dim, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{dim.label}</div>
            <div className="text-sm text-gray-600">{dim.code}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${dim.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">주요 특징</h4>
          <ul className="space-y-2 text-gray-600">
            {mbtiResult.traits.map((trait, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">성장 포인트</h4>
          <ul className="space-y-2 text-gray-600">
            {mbtiResult.growthAreas.map((area, index) => (
              <li key={index} className="flex items-start">
                <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderBigFiveResult = (bigFiveResult: BigFiveResult) => (
    <div>
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-secondary">Big 5</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Big Five 성격 분석</h3>
        <p className="text-lg text-gray-600">{bigFiveResult.description}</p>
      </div>

      <div className="space-y-6">
        {[
          { name: '개방성', key: 'openness' as const, description: '새로운 경험과 아이디어에 대한 개방성' },
          { name: '성실성', key: 'conscientiousness' as const, description: '체계성과 목표 지향성' },
          { name: '외향성', key: 'extraversion' as const, description: '사회적 상호작용과 에너지' },
          { name: '친화성', key: 'agreeableness' as const, description: '타인과의 협력과 공감' },
          { name: '신경성', key: 'neuroticism' as const, description: '감정적 안정성과 스트레스 대처' }
        ].map((dimension) => (
          <div key={dimension.key} className="bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-gray-900">{dimension.name}</h4>
              <span className="text-lg font-bold text-primary">
                {bigFiveResult.dimensions[dimension.key]}점
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{dimension.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-300" 
                style={{ width: `${bigFiveResult.dimensions[dimension.key]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTetoEgenResult = (tetoResult: TetoEgenResult) => (
    <div>
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">
            {tetoResult.category === 'teto' ? '테토' : '에겐'}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {tetoResult.category === 'teto' ? '테토' : '에겐'} {tetoResult.gender === 'male' ? '남성' : '여성'}
        </h3>
        <p className="text-lg text-gray-600">{tetoResult.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-6 rounded-xl">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">
            {tetoResult.category === 'teto' ? '테토' : '에겐'} 성향 특징
          </h4>
          <ul className="space-y-3">
            {tetoResult.traits.map((trait, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span className="text-gray-700">{trait}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">연애 스타일</h4>
          <ul className="space-y-3">
            {tetoResult.relationshipStyle.map((style, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                <span className="text-gray-700">{style}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          궁합 분석
        </h4>
        <div className="space-y-2">
          {tetoResult.compatibility.map((comp, index) => (
            <p key={index} className="text-blue-800">{comp}</p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8" id={`result-card-${resultId || 'default'}`}>
        {testType === 'mbti' && renderMBTIResult(result as MBTIResult)}
        {testType === 'bigfive' && renderBigFiveResult(result as BigFiveResult)}
        {testType === 'tetoegen' && renderTetoEgenResult(result as TetoEgenResult)}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={onShare} className="bg-secondary hover:bg-secondary/90">
            <Share2 className="w-4 h-4 mr-2" />
            결과 공유하기
          </Button>
          <Button variant="outline" onClick={handleDetailedView}>
            <Eye className="w-4 h-4 mr-2" />
            결과보기
          </Button>
          <Button variant="outline" onClick={handlePDFDownload}>
            <Download className="w-4 h-4 mr-2" />
            pdf 다운로드
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
