import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import ResultCard from "@/components/test/result-card";
import type { TestResult } from "@shared/schema";

export default function TestResult() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const { data: result, isLoading, error } = useQuery<TestResult>({
    queryKey: ["/api/test-results", id],
    enabled: !!id,
  });

  const handleShare = async () => {
    const shareData = {
      title: `${getTestDisplayName(result?.testType)} 성격검사 결과`,
      text: "나의 성격검사 결과를 확인해보세요!",
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback for browsers without Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "링크 복사됨",
          description: "결과 링크가 클립보드에 복사되었습니다.",
        });
      } catch (error) {
        toast({
          title: "공유 실패",
          description: "링크 복사에 실패했습니다.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      toast({
        title: "회원 전용",
        description: "PDF 다운로드는 회원만 이용할 수 있습니다. 로그인 후 이용해주세요.",
        variant: "destructive"
      });
      return;
    }

    // Simple PDF generation fallback - in a real app, you'd use a proper PDF library
    const printWindow = window.open('', '_blank');
    if (printWindow && result) {
      const testName = getTestDisplayName(result.testType);
      printWindow.document.write(`
        <html>
          <head>
            <title>${testName} 성격검사 결과</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #6366F1; }
              .result-section { margin: 20px 0; }
            </style>
          </head>
          <body>
            <h1>${testName} 성격검사 결과</h1>
            <div class="result-section">
              <h2>검사 결과</h2>
              <pre>${JSON.stringify(result.result, null, 2)}</pre>
            </div>
            <div class="result-section">
              <p>완료일: ${new Date(result.completedAt || '').toLocaleDateString()}</p>
              <p>제공: Psychology Test Hub</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      toast({
        title: "다운로드 실패",
        description: "PDF 다운로드에 실패했습니다.",
        variant: "destructive"
      });
    }
  };

  const getTestDisplayName = (testType?: string) => {
    switch (testType) {
      case 'mbti': return 'MBTI';
      case 'bigfive': return 'Big Five';
      case 'tetoegen': return 'Teto-Egen';
      default: return "성격검사";
    }
  };

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">결과를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">결과를 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-6">
              요청하신 검사 결과를 찾을 수 없습니다.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/tests">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            테스트 목록으로
          </Button>
        </Link>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {getTestDisplayName(result.testType)} 성격검사 결과
          </h1>
          <p className="text-muted-foreground">
            완료일: {new Date(result.completedAt || '').toLocaleDateString()}
          </p>
        </div>
      </div>

      <ResultCard
        result={result.result as any}
        testType={result.testType}
        onShare={handleShare}
        onDownload={handleDownload}
        resultId={result.id}
      />

      {/* Additional Actions */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-foreground mb-6">다른 테스트도 해보세요</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {result.testType !== 'mbti' && (
            <Link href="/test/mbti">
              <Button variant="outline">MBTI 성격 유형 검사</Button>
            </Link>
          )}
          {result.testType !== 'bigfive' && (
            <Link href="/test/bigfive">
              <Button variant="outline" className="bg-secondary hover:bg-secondary/90 text-white border-secondary">
                Big Five 성격 검사
              </Button>
            </Link>
          )}
          {result.testType !== 'tetoegen' && (
            <Link href="/test/tetoegen">
              <Button variant="outline" className="bg-accent hover:bg-accent/90 text-white border-accent">
                Teto-Egen 성격 검사
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Test Compatibility Section */}
      {result.testType === 'tetoegen' && (
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              다른 테스트와의 연관성
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                💡 더 정확한 성격 분석을 위해
              </h4>
              <p className="text-blue-800 mb-4">
                MBTI와 Big Five 테스트를 함께 진행하면 더욱 정확하고 다각적인 성격 분석 결과를 얻을 수 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/test/mbti">
                  <Button size="sm" variant="outline">
                    MBTI 테스트 진행하기
                  </Button>
                </Link>
                <Link href="/test/bigfive">
                  <Button size="sm" variant="outline">
                    Big Five 테스트 진행하기
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
