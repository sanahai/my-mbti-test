import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import TestSelection from "@/pages/test-selection";
import MBTITest from "@/pages/mbti-test.tsx";
import BigFiveTest from "@/pages/bigfive-test.tsx";
import TetoEgenTest from "@/pages/tetoegen-test.tsx";
import TestResult from "@/pages/test-result.tsx";
import DetailedResult from "@/pages/detailed-result.tsx";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import ChatSpace from "@/pages/chat";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdBanner from "@/components/layout/ad-banner";

function Router() {
  const [location] = useLocation();

  // 라우트 변경 시 페이지 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tests" component={TestSelection} />
      <Route path="/test/mbti" component={MBTITest} />
      <Route path="/test/bigfive" component={BigFiveTest} />
      <Route path="/test/tetoegen" component={TetoEgenTest} />
      <Route path="/result/:id" component={TestResult} />
      <Route path="/detailed-result/:id" component={DetailedResult} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/chat" component={ChatSpace} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-background text-foreground">
                <Header />
                <Router />
                <AdBanner />
                <Footer />
              </div>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
