import { Link, useLocation } from "wouter";
import { Brain, Menu, Moon, Sun, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "로그아웃 완료",
        description: "성공적으로 로그아웃되었습니다.",
      });
    } catch (error) {
      toast({
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const navigation = [
    { name: "홈", href: "/" },
    { name: "MBTI", href: "/test/mbti" },
    { name: "Big Five", href: "/test/bigfive" },
    { name: "Teto-Egen", href: "/test/tetoegen" },
    { name: "수다공간", href: "/chat" },
  ];


  return (
    <header className="bg-background border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">TEST MIND</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`text-muted-foreground hover:text-primary transition-colors cursor-pointer ${
                  location === item.href ? 'text-primary font-medium' : ''
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      대시보드
                    </Button>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm">
                        <User className="w-4 h-4 mr-2" />
                        관리자
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      로그인
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">
                      회원가입
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span className={`text-lg cursor-pointer ${
                      location === item.href ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
                
                <div className="border-t pt-4 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full">
                          <User className="w-4 h-4 mr-2" />
                          대시보드
                        </Button>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link href="/admin">
                          <Button variant="outline" className="w-full">
                            <User className="w-4 h-4 mr-2" />
                            관리자
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        로그아웃
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">
                          로그인
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full">
                          회원가입
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" onClick={toggleTheme} className="justify-start w-full">
                    {theme === 'light' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                    {theme === 'light' ? '다크 모드' : '라이트 모드'}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
