import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Users,
  TestTube,
  MessageSquare,
  TrendingUp,
  Calendar,
  Eye,
  Trash2,
  Crown,
  Activity
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import type { User, TestResult } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // 관리자 권한 확인
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      toast({
        title: "접근 권한 없음",
        description: "관리자만 접근할 수 있는 페이지입니다.",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, user?.role, setLocation, toast]);

  // 전체 사용자 조회 (관리자 전용)
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // 전체 테스트 결과 조회 (관리자 전용)
  const { data: allResults, isLoading: resultsLoading } = useQuery<TestResult[]>({
    queryKey: ["/api/admin/test-results"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // 시스템 통계 조회
  const { data: stats } = useQuery<any>({
    queryKey: ["/api/statistics"],
    enabled: isAuthenticated,
  });

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

  const getTestBadgeVariant = (testType: string) => {
    switch (testType) {
      case 'mbti': return 'default';
      case 'bigfive': return 'secondary';
      case 'tetoegen': return 'destructive';
      default: return 'outline';
    }
  };

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'google': return { variant: 'secondary' as const, label: 'Google' };
      case 'kakao': return { variant: 'destructive' as const, label: 'Kakao' };
      default: return { variant: 'outline' as const, label: 'Email' };
    }
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

  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // useEffect에서 리다이렉트 처리됨
  }

  const totalUsers = users?.length || 0;
  const totalTests = allResults?.length || 0;
  const adminUsers = users?.filter(u => u.role === 'admin').length || 0;
  const recentUsers = users?.filter(u => {
    const createdAt = new Date(u.createdAt || '');
    const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreation <= 7;
  }).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.25rem, 4vw, 2.5rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>관리자 대시보드</h1>
              <p className="text-muted-foreground">시스템 관리 및 모니터링</p>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">전체 사용자</p>
                    <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">총 테스트 수</p>
                    <p className="text-2xl font-bold text-foreground">{totalTests}</p>
                  </div>
                  <TestTube className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">관리자</p>
                    <p className="text-2xl font-bold text-foreground">{adminUsers}</p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">신규 사용자 (7일)</p>
                    <p className="text-2xl font-bold text-foreground">{recentUsers}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 관리 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 사용자 관리 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{fontFamily: 'var(--font-malgun)'}}>
                <Users className="w-5 h-5" />
                사용자 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">사용자 목록을 불러오는 중...</p>
                </div>
              ) : users && users.length > 0 ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>사용자</TableHead>
                          <TableHead>가입일</TableHead>
                          <TableHead>역할</TableHead>
                          <TableHead>Provider</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.slice(0, 10).map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{user.username || user.email}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatDate(user.createdAt)}
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role === 'admin' ? '관리자' : '일반'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getProviderBadge(user.provider || 'email').variant}>
                                {getProviderBadge(user.provider || 'email').label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {users.length > 10 && (
                    <p className="text-sm text-muted-foreground text-center">
                      총 {users.length}명 중 최근 10명 표시
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">등록된 사용자가 없습니다.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 테스트 결과 관리 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                테스트 결과 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resultsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">테스트 결과를 불러오는 중...</p>
                </div>
              ) : allResults && allResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>사용자 ID</TableHead>
                          <TableHead>테스트 유형</TableHead>
                          <TableHead>완료일</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allResults.slice(0, 10).map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">
                              {result.userId?.slice(0, 8)}...
                            </TableCell>
                            <TableCell>
                              <Badge variant={getTestBadgeVariant(result.testType)}>
                                {result.testType.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatDate(result.completedAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {allResults.length > 10 && (
                    <p className="text-sm text-muted-foreground text-center">
                      총 {allResults.length}개 중 최근 10개 표시
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TestTube className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">테스트 결과가 없습니다.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 커뮤니티 관리 (향후 확장) */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              커뮤니티 관리
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">커뮤니티 관리 기능</h3>
              <p className="text-muted-foreground mb-6">
                수다공간 메시지 관리, 신고된 콘텐츠 처리 등의 기능이 준비 중입니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">메시지 관리</h4>
                    <p className="text-sm text-muted-foreground">부적절한 메시지 모니터링</p>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">신고 관리</h4>
                    <p className="text-sm text-muted-foreground">사용자 신고 처리</p>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">활동 로그</h4>
                    <p className="text-sm text-muted-foreground">사용자 활동 모니터링</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}