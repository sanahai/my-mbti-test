import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import ProgressBar from "@/components/test/progress-bar";
import QuestionInterface from "@/components/test/question-interface";
import { bigFiveQuestions } from "@/data/test-questions";
import { calculateBigFiveResult } from "@/lib/test-scoring";

export default function BigFiveTest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const autoProgressTimeout = useRef<NodeJS.Timeout | null>(null);

  // Create test session on component mount
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/test-sessions", {
        testType: "bigfive",
        currentQuestion: 0,
        answers: {}
      });
      return response.json();
    },
    onSuccess: (session) => {
      setSessionId(session.id);
    },
    onError: () => {
      toast({
        title: "오류 발생",
        description: "테스트 세션을 생성하는데 실패했습니다.",
        variant: "destructive"
      });
    }
  });

  // Update session
  const updateSessionMutation = useMutation({
    mutationFn: async (data: { currentQuestion: number; answers: Record<number, number> }) => {
      if (!sessionId) return;
      const response = await apiRequest("PUT", `/api/test-sessions/${sessionId}`, data);
      return response.json();
    }
  });

  // Submit test results
  const submitResultMutation = useMutation({
    mutationFn: async (result: any) => {
      const response = await apiRequest("POST", "/api/test-results", {
        testType: "bigfive",
        answers,
        result
      });
      return response.json();
    },
    onSuccess: (result) => {
      // Clean up session
      if (sessionId) {
        apiRequest("DELETE", `/api/test-sessions/${sessionId}`);
      }
      setLocation(`/result/${result.id}`);
    },
    onError: () => {
      toast({
        title: "오류 발생",
        description: "결과를 저장하는데 실패했습니다.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (isAuthenticated && !sessionId) {
      createSessionMutation.mutate();
    }
  }, [isAuthenticated, sessionId]);

  useEffect(() => {
    if (sessionId) {
      updateSessionMutation.mutate({
        currentQuestion,
        answers
      });
    }
  }, [currentQuestion, answers, sessionId]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (autoProgressTimeout.current) {
        clearTimeout(autoProgressTimeout.current);
      }
    };
  }, []);

  // 회원 전용 테스트 - 로그인 확인
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "회원 전용",
        description: "Big Five 테스트는 회원만 이용할 수 있습니다. 로그인 후 이용해주세요.",
        variant: "destructive",
      });
      setLocation(`/login?redirect=${encodeURIComponent('/test/bigfive')}`);
    }
  }, [isAuthenticated, isLoading, setLocation, toast]);

  // 로그인 상태 확인 중이거나 비로그인 상태면 로딩 표시
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">테스트를 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  const handleAnswer = (value: number) => {
    const questionId = bigFiveQuestions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // 이전 타이머가 있다면 정리
    if (autoProgressTimeout.current) {
      clearTimeout(autoProgressTimeout.current);
    }
    
    // 답변 선택 후 500ms 후 자동으로 다음 질문으로 이동
    autoProgressTimeout.current = setTimeout(() => {
      handleNext();
      autoProgressTimeout.current = null;
    }, 500);
  };

  const handleNext = () => {
    // 자동 진행 타이머가 있다면 취소 (중복 진행 방지)
    if (autoProgressTimeout.current) {
      clearTimeout(autoProgressTimeout.current);
      autoProgressTimeout.current = null;
    }
    
    if (currentQuestion < bigFiveQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate and submit results
      const result = calculateBigFiveResult(answers);
      submitResultMutation.mutate(result);
    }
  };

  const handlePrevious = () => {
    // 자동 진행 타이머가 있다면 취소
    if (autoProgressTimeout.current) {
      clearTimeout(autoProgressTimeout.current);
      autoProgressTimeout.current = null;
    }
    
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleHome = () => {
    setLocation('/');
  };

  const currentQuestionData = bigFiveQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id];
  const canGoNext = currentAnswer !== undefined;
  const canGoBack = currentQuestion > 0;

  if (createSessionMutation.isPending) {
    return (
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">테스트를 준비하고 있습니다...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
      <div className="text-center mb-4">
        <h1 className="font-black text-gray-900 mb-1 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.35rem, 4.5vw, 1.875rem)', maxWidth: '100%', overflowWrap: 'break-word', fontWeight: 'bolder', textShadow: '0.5px 0.5px 0px currentColor'}}>Big Five 성격 테스트</h1>
        <p className="text-sm text-gray-600">각 질문에 대해 가장 적절한 답변을 선택해주세요</p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-4">
          <ProgressBar 
            key={`bigfive-progress-${currentQuestion}`}
            current={currentQuestion + 1} 
            total={bigFiveQuestions.length}
            testName="Big Five"
          />
          
          {currentQuestionData && (
            <QuestionInterface
              question={currentQuestionData}
              currentAnswer={currentAnswer}
              onAnswer={handleAnswer}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onHome={handleHome}
              canGoBack={canGoBack}
              canGoNext={canGoNext}
              isFirstQuestion={currentQuestion === 0}
            />
          )}
        </CardContent>
      </Card>

      {submitResultMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">결과를 분석하고 있습니다...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
