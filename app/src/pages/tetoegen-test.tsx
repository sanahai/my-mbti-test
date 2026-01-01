import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "@/components/test/progress-bar";
import QuestionInterface from "@/components/test/question-interface";
import { tetoEgenQuestions } from "@/data/test-questions";
import { calculateTetoEgenResult } from "@/lib/test-scoring";

export default function TetoEgenTest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [showGenderSelection, setShowGenderSelection] = useState(true);
  const autoProgressTimeout = useRef<NodeJS.Timeout | null>(null);

  // Create test session on component mount
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/test-sessions", {
        testType: "tetoegen",
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
        testType: "tetoegen",
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
    if (gender && !sessionId) {
      createSessionMutation.mutate();
    }
  }, [gender]);

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

  const handleGenderSelect = () => {
    if (gender) {
      setShowGenderSelection(false);
    } else {
      toast({
        title: "성별 선택 필요",
        description: "테스트를 진행하려면 성별을 선택해주세요.",
        variant: "destructive"
      });
    }
  };

  const handleAnswer = (value: number) => {
    const questionId = tetoEgenQuestions[currentQuestion].id;
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
    
    if (currentQuestion < tetoEgenQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate and submit results
      if (gender) {
        const result = calculateTetoEgenResult(answers, gender);
        submitResultMutation.mutate(result);
      }
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

  const currentQuestionData = tetoEgenQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id];
  const canGoNext = currentAnswer !== undefined;
  const canGoBack = currentQuestion > 0;

  if (showGenderSelection) {
    return (
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="text-center mb-4">
          <h1 className="font-black text-foreground mb-1 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.35rem, 4.5vw, 1.875rem)', maxWidth: '100%', overflowWrap: 'break-word', fontWeight: 'bolder', textShadow: '0.5px 0.5px 0px currentColor'}}>Teto-Egen 성격 검사</h1>
          <p className="text-sm text-muted-foreground">당신의 성별을 선택해주세요</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-4">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(0.8rem, 2.5vw, 1.125rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>성별 선택</h3>
                <p className="text-muted-foreground text-sm">성별에 따라 분석 결과가 달라질 수 있습니다.</p>
              </div>

              <RadioGroup value={gender || ''} onValueChange={(value) => setGender(value as 'male' | 'female')}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="flex-1 cursor-pointer text-sm font-medium">남성</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="flex-1 cursor-pointer text-sm font-medium">여성</Label>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleGenderSelect}
                className="w-full bg-accent hover:bg-accent/90"
                disabled={!gender}
              >
                테스트 시작하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (createSessionMutation.isPending) {
    return (
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">테스트를 준비하고 있습니다...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
      <div className="text-center mb-4">
        <h1 className="font-black text-foreground mb-1 text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.35rem, 4.5vw, 1.875rem)', maxWidth: '100%', overflowWrap: 'break-word', fontWeight: 'bolder', textShadow: '0.5px 0.5px 0px currentColor'}}>Teto-Egen 성격 검사</h1>
        <p className="text-sm text-muted-foreground">각 질문에 대해 당신에게 가장 적합한 답을 선택해주세요 <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-1">인기</span></p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-4">
          <ProgressBar 
            key={`tetoegen-progress-${currentQuestion}`}
            current={currentQuestion + 1} 
            total={tetoEgenQuestions.length}
            testName="Teto-Egen"
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">결과를 분석하고 있습니다...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
