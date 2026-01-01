import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Eye, User, TestTube } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import type { TestResult } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  // 로그인 확인
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "회원 전용 페이지입니다. 로그인 후 이용해주세요.",
        variant: "destructive",
      });
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation, toast]);

  // 내 테스트 결과 조회
  const { data: testResults, isLoading: resultsLoading } = useQuery<TestResult[]>({
    queryKey: ["/api/my-test-results"],
    enabled: isAuthenticated,
  });

  const getTestDisplayName = (testType: string) => {
    switch (testType) {
      case 'mbti': return 'MBTI';
      case 'bigfive': return 'Big Five';
      case 'tetoegen': return 'Teto-Egen';
      default: return testType;
    }
  };

  const getTestBadgeVariant = (testType: string) => {
    switch (testType) {
      case 'mbti': return 'default';
      case 'bigfive': return 'secondary';
      case 'tetoegen': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // useEffect에서 리다이렉트 처리됨
  }

  const completedTests = testResults?.length || 0;
  const testsByType = testResults?.reduce((acc, result) => {
    acc[result.testType] = (acc[result.testType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 사용자 정보 섹션 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.125rem, 3.5vw, 2rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>안녕하세요, {user?.email?.split('@')[0]}님!</h1>
              <p className="text-muted-foreground">회원 전용 대시보드에 오신 것을 환영합니다</p>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">총 완료한 테스트</p>
                    <p className="text-2xl font-bold text-foreground">{completedTests}</p>
                  </div>
                  <TestTube className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">MBTI 테스트</p>
                    <p className="text-2xl font-bold text-foreground">{testsByType.mbti || 0}</p>
                  </div>
                  <Badge variant="default">MBTI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Big Five 테스트</p>
                    <p className="text-2xl font-bold text-foreground">{testsByType.bigfive || 0}</p>
                  </div>
                  <Badge variant="secondary">Big Five</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Teto-Egen 테스트</p>
                    <p className="text-2xl font-bold text-foreground">{testsByType.tetoegen || 0}</p>
                  </div>
                  <Badge variant="destructive">Teto-Egen</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 테스트 내역 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{fontFamily: 'var(--font-malgun)'}}>
              <FileText className="w-5 h-5" />
              나의 테스트 내역
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resultsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">테스트 내역을 불러오는 중...</p>
              </div>
            ) : testResults && testResults.length > 0 ? (
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={getTestBadgeVariant(result.testType)}>
                          {getTestDisplayName(result.testType)}
                        </Badge>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {getTestDisplayName(result.testType)} 테스트 결과
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(result.completedAt)}
                          </div>
                        </div>
                      </div>
                      <Link href={`/result/${result.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          결과 보기
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <TestTube className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">아직 완료한 테스트가 없습니다</h3>
                <p className="text-muted-foreground mb-6">다양한 심리 테스트를 통해 자신을 알아보세요!</p>
                <div className="flex gap-4 justify-center">
                  <Link href="/test/mbti">
                    <Button>MBTI 테스트 하기</Button>
                  </Link>
                  <Link href="/test/bigfive">
                    <Button variant="outline">Big Five 테스트 하기</Button>
                  </Link>
                  <Link href="/test/tetoegen">
                    <Button variant="outline">Teto-Egen 테스트 하기</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}