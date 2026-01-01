import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { signupSchema, type SignupForm } from "@shared/schema";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
  });

  const sendVerificationCode = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast({
        title: "오류",
        description: "이메일을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setSendingCode(true);
    try {
      // TODO: API 호출로 인증코드 발송
      await new Promise(resolve => setTimeout(resolve, 1500)); // 시뮬레이션
      
      setCodeSent(true);
      toast({
        title: "인증코드 발송 완료",
        description: `${email}로 인증코드가 발송되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "인증코드 발송에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setSendingCode(false);
    }
  };

  const onSubmit = async (data: SignupForm) => {
    if (!codeSent) {
      toast({
        title: "오류",
        description: "먼저 인증코드를 발송해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 회원가입 API 호출
      console.log("Signup data:", data);
      
      // 임시 로직: '123456'을 올바른 코드로 처리
      if (data.verificationCode !== '123456') {
        toast({
          title: "잘못된 인증코드",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "회원가입 성공",
        description: "환영합니다! 자동 로그인됩니다.",
      });
      
      // 자동 로그인 후 메인 페이지로 이동
      setLocation("/");
    } catch (error) {
      toast({
        title: "회원가입 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center leading-tight" style={{fontFamily: 'var(--font-malgun)', fontSize: 'clamp(1.125rem, 3vw, 1.75rem)', maxWidth: '100%', overflowWrap: 'break-word'}}>회원가입</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* 이메일 (아이디) */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="email"
                            placeholder="example@example.com"
                            className="pl-9"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 비밀번호 */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="8자 이상 입력하세요"
                            className="pl-9 pr-9"
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 비밀번호 확인 */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="비밀번호를 다시 입력하세요"
                            className="pl-9 pr-9"
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 인증코드 발송 버튼 */}
                <div className="space-y-3">
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={sendVerificationCode}
                    disabled={sendingCode || !form.getValues('email') || codeSent}
                  >
                    {sendingCode ? "발송 중..." : codeSent ? "인증코드 발송완료" : "인증코드 발송"}
                  </Button>
                </div>

                {/* 인증코드 입력 */}
                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>인증코드</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6자리 인증코드 입력"
                          maxLength={6}
                          {...field}
                          disabled={!codeSent}
                        />
                      </FormControl>
                      <FormMessage />
                      {codeSent && (
                        <p className="text-xs text-muted-foreground">
                          테스트용 인증코드: 123456
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || !codeSent}
                >
                  {isLoading ? "가입 중..." : "회원가입"}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm mt-6">
              <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
              <Link href="/login">
                <a className="text-primary hover:underline font-medium">
                  로그인
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}