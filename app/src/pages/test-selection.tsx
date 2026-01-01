import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Star, Heart, Clock, HelpCircle, BarChart, TrendingUp } from "lucide-react";

export default function TestSelection() {
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="font-bold text-gray-900 mb-4 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.25rem, 4vw, 2.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>성격 테스트 선택</h1>
        <p className="text-lg text-gray-600">각각의 테스트는 독립적으로 진행할 수 있습니다</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* MBTI Test Card */}
        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1rem, 3vw, 1.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>MBTI 테스트</h3>
              <p className="text-gray-600">16가지 성격 유형</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                <span>약 15-20분 소요</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <HelpCircle className="w-4 h-4 text-muted-foreground mr-2" />
                <span>70개 질문</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BarChart className="w-4 h-4 text-muted-foreground mr-2" />
                <span>상세한 성격 분석</span>
              </div>
            </div>
            
            <Link href="/test/mbti">
              <Button className="w-full">
                MBTI 테스트 시작
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Big Five Test Card */}
        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1rem, 3vw, 1.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>Big Five 테스트</h3>
              <p className="text-gray-600">5가지 성격 차원</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                <span>약 12-15분 소요</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <HelpCircle className="w-4 h-4 text-muted-foreground mr-2" />
                <span>50개 질문</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BarChart className="w-4 h-4 text-muted-foreground mr-2" />
                <span>과학적 성격 분석</span>
              </div>
            </div>
            
            <Link href="/test/bigfive">
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                Big Five 테스트 시작
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Teto-Egen Test Card */}
        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1rem, 3vw, 1.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>Teto-Egen 테스트</h3>
              <p className="text-gray-600">호르몬 기반 성격 유형 <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-1">HOT</span></p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                <span>약 8-10분 소요</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <HelpCircle className="w-4 h-4 text-muted-foreground mr-2" />
                <span>28개 질문</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-muted-foreground mr-2" />
                <span>최신 트렌드 테스트</span>
              </div>
            </div>
            
            <Link href="/test/tetoegen">
              <Button className="w-full bg-accent hover:bg-accent/90">
                Teto-Egen 테스트 시작
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Test Comparison Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-900 mb-4 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.125rem, 3.5vw, 2rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>테스트 간 연관성 분석</h2>
            <p className="text-lg text-gray-600">여러 테스트 결과를 종합하여 더 깊이 있는 자기 이해를 제공합니다</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">MBTI × Teto-Egen 궁합</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">EN</span>
                      <span className="font-medium text-gray-900">외향형 직관형</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold">테토</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">IS</span>
                      <span className="font-medium text-gray-900">내향형 감각형</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">에겐</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * 일반적인 경향성이며, 개인차가 존재할 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Big Five × MBTI 연관성</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">외향성 (Extraversion)</span>
                    <span className="text-primary font-semibold">E/I 지표와 연관</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">성실성 (Conscientiousness)</span>
                    <span className="text-primary font-semibold">J/P 지표와 연관</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">개방성 (Openness)</span>
                    <span className="text-primary font-semibold">N/S 지표와 연관</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">친화성 (Agreeableness)</span>
                    <span className="text-primary font-semibold">F/T 지표와 연관</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
