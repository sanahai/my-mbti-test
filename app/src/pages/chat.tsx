import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Users, Send, Heart, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage } from "@shared/schema";

interface PaginatedMessages {
  messages: ChatMessage[];
  total: number;
}

export default function ChatSpace() {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch statistics for user count
  const { data: statistics } = useQuery({
    queryKey: ['/api/statistics'],
    queryFn: async () => {
      const response = await fetch('/api/statistics');
      if (!response.ok) throw new Error('Failed to fetch statistics');
      return response.json();
    },
  });

  // Fetch messages with pagination
  const { data: messagesData, isLoading } = useQuery<PaginatedMessages>({
    queryKey: ['/api/chat/messages', currentPage, limit],
    queryFn: async () => {
      const response = await fetch(`/api/chat/messages?page=${currentPage}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    },
  });

  const messages = messagesData?.messages || [];
  const totalMessages = messagesData?.total || 0;
  const totalPages = Math.ceil(totalMessages / limit);

  // Create message mutation
  const createMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest('POST', '/api/chat/messages', { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/messages'] });
      setNewMessage('');
      setCurrentPage(1); // Go to first page to see new message
      toast({
        title: "메시지 전송 완료",
        description: "메시지가 성공적으로 전송되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "전송 실패",
        description: "메시지 전송 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isAuthenticated) return;
    createMessageMutation.mutate(newMessage.trim());
  };

  // Like message mutation
  const likeMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return apiRequest('POST', `/api/chat/messages/${messageId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/messages'] });
    },
    onError: () => {
      toast({
        title: "좋아요 실패",
        description: "좋아요 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  });

  const handleLike = (messageId: string) => {
    likeMutation.mutate(messageId);
  };

  // Delete message mutation (Admin only)
  const deleteMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return apiRequest('DELETE', `/api/chat/messages/${messageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/messages'] });
      toast({
        title: "메시지 삭제 완료",
        description: "메시지가 성공적으로 삭제되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "삭제 실패",
        description: "메시지 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  });

  const handleDelete = (messageId: string) => {
    if (window.confirm('정말로 이 메시지를 삭제하시겠습니까?')) {
      deleteMutation.mutate(messageId);
    }
  };

  const formatTime = (date: Date | string | null) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-foreground">수다공간</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            심리 테스트 결과를 공유하고 다양한 이야기를 나눠보세요
          </p>
        </div>

        {/* 통계 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium text-foreground">전체 메시지</h3>
              <p className="text-2xl font-bold text-blue-500">{totalMessages}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium text-foreground">활성 사용자</h3>
              <p className="text-2xl font-bold text-green-500">{statistics?.totalUsers || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-medium text-foreground">총 좋아요</h3>
              <p className="text-2xl font-bold text-red-500">
                {messages.reduce((sum, msg) => sum + (msg.likes || 0), 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 메시지 작성 */}
        {isAuthenticated ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">새 메시지 작성</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="메시지를 입력해주세요..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {newMessage.length}/500
                  </span>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    전송
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">로그인이 필요합니다</h3>
              <p className="text-muted-foreground mb-4">
                메시지를 작성하려면 먼저 로그인해주세요.
              </p>
              <Button asChild>
                <a href="/login">로그인하기</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 메시지 목록 */}
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">
                        {message.username}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-foreground mb-3 leading-relaxed">
                      {message.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(message.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                        data-testid={`button-like-${message.id}`}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {message.likes || 0}
                      </Button>
                      {user?.role === 'admin' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(message.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          data-testid={`button-delete-${message.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전
            </Button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                if (totalPages <= 5) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                
                // Show pages around current page
                const start = Math.max(1, currentPage - 2);
                const end = Math.min(totalPages, currentPage + 2);
                const actualPageNum = start + i;
                
                if (actualPageNum <= end) {
                  return (
                    <Button
                      key={actualPageNum}
                      variant={currentPage === actualPageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(actualPageNum)}
                    >
                      {actualPageNum}
                    </Button>
                  );
                }
                return null;
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              다음
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                아직 메시지가 없습니다
              </h3>
              <p className="text-muted-foreground">
                첫 번째 메시지를 작성해보세요!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}