import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Heart, Clock, HelpCircle, BarChart, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";

interface StatsData {
  totalUsers: number;
  totalTests: number;
  testsByType: Record<string, number>;
  popularResults: {
    mbti?: Array<{ type: string; count: number; percentage: string }>;
    tetoegen?: Array<{ type: string; count: number; percentage: string }>;
  };
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: stats } = useQuery<StatsData>({
    queryKey: ["/api/statistics"],
  });

  const scrollToTests = () => {
    const element = document.getElementById('tests');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTestStart = (testType: string) => {
    if (isAuthenticated) {
      setLocation(`/test/${testType}`);
    } else {
      setLocation(`/login?redirect=${encodeURIComponent(`/test/${testType}`)}`);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-[5%] sm:px-6 lg:px-8 py-6">
      {/* Hero Section */}
      <section className="text-center py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-extrabold text-foreground mb-5 tracking-tight text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>
            TEST MIND...
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed font-bold italic">
            전 세계 수백만 명이 검증한 정확한 성격 검사로 자신만의 고유한 성격 유형을 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
            <Button onClick={() => handleTestStart('mbti')} className="w-full sm:w-auto px-4 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-primary hover:bg-primary/90">
              MBTI 테스트
            </Button>
            <Button onClick={() => handleTestStart('bigfive')} className="w-full sm:w-auto px-4 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-secondary hover:bg-secondary/90">
              Big Five 테스트
            </Button>
            <Button onClick={() => handleTestStart('tetoegen')} className="w-full sm:w-auto px-4 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-purple-600 hover:bg-purple-700">
              Teto-Egen 테스트
            </Button>
          </div>
        </div>
      </section>

      {/* Test Selection */}
      <section id="tests" className="py-12">
        <div className="text-center mb-8">
          <h2 className="font-black text-foreground mb-3 tracking-wide text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.125rem, 4.5vw, 2rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>어떤 테스트를 받아보시겠어요?</h2>
          <p className="text-base sm:text-lg text-muted-foreground font-bold tracking-wide">각기 다른 관점에서 당신의 성격을 분석해보세요</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* MBTI Test Card */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-black text-foreground mb-2 tracking-wide text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.275rem, 3.5vw, 1.625rem)', maxWidth: '100%', overflowWrap: 'break-word', fontWeight: 'bolder', textShadow: '0.5px 0.5px 0px currentColor'}}>MBTI 성격 유형 검사</h3>
                <p className="text-muted-foreground font-bold italic" style={{transform: 'scale(0.85)', transformOrigin: 'center', fontSize: '1.1875rem'}}>16가지 성격 유형으로 나누어 분석하는 가장 유명한 성격 검사</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>약 10-15분 소요</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <HelpCircle className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>60개 문항</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <BarChart className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>16가지 성격 유형 분석</span>
                </div>
              </div>
              
              <Button className="w-full font-bold" onClick={() => handleTestStart('mbti')}>
                MBTI 테스트 시작
              </Button>
            </CardContent>
          </Card>

          {/* Big Five Test Card */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-black text-foreground mb-2 tracking-wide text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.275rem, 3.5vw, 1.625rem)', maxWidth: '100%', overflowWrap: 'break-word', fontWeight: 'bolder', textShadow: '0.5px 0.5px 0px currentColor'}}>Big Five 성격 검사</h3>
                <p className="text-muted-foreground font-bold italic" style={{transform: 'scale(0.85)', transformOrigin: 'center', fontSize: '1.1875rem'}}>5가지 주요 성격 차원으로 분석하는 과학적 성격 검사</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>약 8-12분 소요</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <HelpCircle className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>44개 문항</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <BarChart className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>5가지 성격 차원 분석</span>
                </div>
              </div>
              
              <Button className="w-full bg-secondary hover:bg-secondary/90 font-bold" onClick={() => handleTestStart('bigfive')}>
                Big Five 테스트 시작
              </Button>
            </CardContent>
          </Card>

          {/* Teto-Egen Test Card */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-black text-foreground mb-2 tracking-wide text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.275rem, 3.5vw, 1.625rem)', maxWidth: '100%', overflowWrap: 'break-word', fontWeight: 'bolder', textShadow: '0.5px 0.5px 0px currentColor'}}>Teto-Egen 성격 검사</h3>
                <p className="text-muted-foreground font-bold italic" style={{transform: 'scale(0.85)', transformOrigin: 'center', fontSize: '1.1875rem'}}>최신 심리학 이론을 바탕으로 한 현대적 성격 분석 도구 <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-1 not-italic font-bold">인기</span></p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>약 5-8분 소요</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <HelpCircle className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>25개 문항</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-muted-foreground mr-2" />
                  <span>현대적 성격 분석</span>
                </div>
              </div>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700 font-bold" onClick={() => handleTestStart('tetoegen')}>
                Teto-Egen 테스트 시작
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      {stats && (
        <section className="py-12">
          <div className="text-center mb-8">
            <h2 className="font-extrabold text-foreground mb-3 tracking-tight text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.25rem, 4vw, 2rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>지금까지의 통계</h2>
            <p className="text-base sm:text-lg text-muted-foreground font-bold italic tracking-wide">많은 분들이 함께 참여하고 있습니다</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-9">
            {/* 총 사용자 수 - 모바일에서 전체 너비, 데스크톱에서 3행 차지 */}
            <Card className="col-span-1 lg:row-span-3">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center h-full flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-2 sm:mb-4 font-mono tracking-wider">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-bold tracking-wide">총 사용자 수</div>
              </CardContent>
            </Card>
            
            {/* 나머지 통계들을 별도 그리드로 배치 */}
            <div className="col-span-1 lg:col-span-2 grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              <Card>
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-secondary mb-1 sm:mb-2 font-mono tracking-wider">{(stats.testsByType.mbti || 0).toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-bold tracking-wide">MBTI</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-accent mb-1 sm:mb-2 font-mono tracking-wider">{(stats.testsByType.tetoegen || 0).toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-bold tracking-wide">Teto-Egen</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-yellow-500 mb-1 sm:mb-2 font-mono tracking-wider">{(stats.testsByType.bigfive || 0).toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-bold tracking-wide">Big Five</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Popular Results */}
          <Card className="max-w-6xl mx-auto">
            <CardContent className="p-6">
              <h3 className="font-black text-gray-900 mb-8 text-center tracking-wide leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.125rem, 3.5vw, 1.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>인기 테스트 결과</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 tracking-wider text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>MBTI Top 5</h4>
                  <div className="space-y-3">
                    {stats.popularResults.mbti?.slice(0, 5).map((result: any) => (
                      <div key={result.type} className="flex justify-between items-center">
                        <span className="font-black text-primary">{result.type}</span>
                        <span className="text-gray-600 font-bold">{result.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 tracking-wider text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>Teto-Egen 분포</h4>
                  <div className="space-y-3">
                    {stats.popularResults.tetoegen?.map((result: any) => (
                      <div key={result.type} className="flex justify-between items-center">
                        <span className="font-black text-accent">{result.type}</span>
                        <span className="text-gray-600 font-bold">{result.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 tracking-wider text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>Big Five 평균</h4>
                  <div className="space-y-4">
                    {[
                      { name: "외향성", value: 67 },
                      { name: "성실성", value: 72 },
                      { name: "개방성", value: 74 }
                    ].map((dimension) => (
                      <div key={dimension.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-bold text-gray-700">{dimension.name}</span>
                          <span className="text-sm text-gray-600 font-bold">{dimension.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${dimension.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}
