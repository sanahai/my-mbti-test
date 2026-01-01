import React, { createContext, useContext, ReactNode } from 'react';

// 한국어만 사용하는 단순한 언어 컨텍스트
interface LanguageContextType {
  language: 'ko';
  setLanguage: (lang: 'ko') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 항상 한국어만 사용
  const t = (key: string): string => {
    // 모든 키에 대해 빈 문자열 반환 (실제로는 사용하지 않음)
    return '';
  };

  return (
    <LanguageContext.Provider value={{ 
      language: 'ko', 
      setLanguage: () => {}, // 언어 변경 불가
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}