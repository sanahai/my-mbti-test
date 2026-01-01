import { Brain } from "lucide-react";
import { Link } from "wouter";

interface FooterLink {
  name: string;
  href: string;
  disabled?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  
  const footerSections: FooterSection[] = [
    {
      title: "테스트",
      links: [
        { name: "MBTI 성격 유형 검사", href: "/test/mbti" },
        { name: "Big Five 성격 검사", href: "/test/bigfive" },
        { name: "Teto-Egen 성격 검사", href: "/test/tetoegen" },
      ]
    },
    {
      title: "정보",
      links: [
        { name: "서비스 소개", href: "/", disabled: true },
        { name: "개인정보처리방침", href: "/", disabled: true },
        { name: "이용약관", href: "/", disabled: true },
      ]
    },
    {
      title: "지원",
      links: [
        { name: "자주 묻는 질문", href: "/", disabled: true },
        { name: "문의하기", href: "/chat" },
        { name: "피드백", href: "/", disabled: true },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">TEST MIND</span>
            </div>
            <p className="text-gray-400">
              전 세계 수백만 명이 사용하는 신뢰성 높은 성격 검사 서비스입니다.
            </p>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.disabled ? (
                      <span className="text-gray-500 cursor-not-allowed">
                        {link.name}
                      </span>
                    ) : (
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TEST MIND. 모든 권리를 보유합니다.</p>
        </div>
      </div>
    </footer>
  );
}
