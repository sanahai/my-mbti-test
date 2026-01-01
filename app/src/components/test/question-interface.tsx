import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { Question } from "@/data/test-questions";

interface QuestionInterfaceProps {
  question: Question;
  currentAnswer?: number;
  onAnswer: (value: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onHome?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  isFirstQuestion?: boolean;
}

export default function QuestionInterface({
  question,
  currentAnswer,
  onAnswer,
  onPrevious,
  onNext,
  onHome,
  canGoBack = false,
  canGoNext = false,
  isFirstQuestion = false
}: QuestionInterfaceProps) {
  const { language } = useLanguage();
  
  const answerOptions = [
    { 
      value: 5, 
      label: {
        ko: "매우 그렇다",
        en: "Strongly Agree",
        vi: "Hoàn toàn đồng ý",
        th: "เห็นด้วยอย่างยิ่ง"
      }, 
      color: "text-gray-700" 
    },
    { 
      value: 4, 
      label: {
        ko: "그렇다",
        en: "Agree",
        vi: "Đồng ý",
        th: "เห็นด้วย"
      }, 
      color: "text-gray-700" 
    },
    { 
      value: 3, 
      label: {
        ko: "보통이다",
        en: "Neutral",
        vi: "Trung lập",
        th: "เป็นกลาง"
      }, 
      color: "text-gray-700" 
    },
    { 
      value: 2, 
      label: {
        ko: "그렇지 않다",
        en: "Disagree",
        vi: "Không đồng ý",
        th: "ไม่เห็นด้วย"
      }, 
      color: "text-gray-700" 
    },
    { 
      value: 1, 
      label: {
        ko: "전혀 그렇지 않다",
        en: "Strongly Disagree",
        vi: "Hoàn toàn không đồng ý",
        th: "ไม่เห็นด้วยอย่างยิ่ง"
      }, 
      color: "text-gray-700" 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-2">
      {/* Question */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {question.text[language]}
        </h3>
        
        {/* Answer Options */}
        <div className="space-y-2 max-w-2xl mx-auto">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`w-full p-2.5 text-left border rounded-lg transition-colors ${
                currentAnswer === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-primary/5'
              }`}
            >
              <span className={`text-sm font-medium ${
                currentAnswer === option.value ? 'text-primary' : option.color
              }`}>
                {option.label[language]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        {isFirstQuestion ? (
          <Button 
            variant="outline" 
            onClick={onHome}
            className="flex items-center text-sm h-9 px-3"
          >
            <Home className="w-3 h-3 mr-1" />
            홈으로
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={!canGoBack}
            className="flex items-center text-sm h-9 px-3"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            {language === 'ko' ? '이전' : language === 'en' ? 'Previous' : language === 'vi' ? 'Trước' : 'ก่อนหน้า'}
          </Button>
        )}
        <Button 
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center text-sm h-9 px-3"
        >
          {language === 'ko' ? '다음' : language === 'en' ? 'Next' : language === 'vi' ? 'Tiếp theo' : 'ถัดไป'}
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
