
interface ProgressBarProps {
  current: number;
  total: number;
  testName?: string;
}

export default function ProgressBar({ current, total, testName }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700">
          {testName ? `${testName} 테스트 진행 중...` : '테스트 진행 중...'}
        </span>
        <span className="text-xs font-medium text-gray-700">
          {current} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
