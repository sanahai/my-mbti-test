interface AdBannerProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdBanner({ 
  client = "ca-pub-XXXXXXXXXXXXXXXXX", // AdSense 게시자 ID로 교체
  slot = "XXXXXXXXXX", // 광고 슬롯 ID로 교체  
  format = "auto",
  responsive = true,
  style,
  className = ""
}: AdBannerProps) {
  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center items-center">
          <div className={`w-full max-w-4xl ${className}`}>
            {/* 개발 환경에서는 placeholder, 프로덕션에서는 실제 광고 */}
            <div 
              className="h-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400"
              style={{ minHeight: '90px', ...style }}
            >
              <div className="text-center">
                {isDevelopment ? (
                  <>
                    <div className="text-sm font-medium mb-1">광고 영역 (개발 모드)</div>
                    <div className="text-xs opacity-70">
                      Client: {client}<br />
                      Slot: {slot}
                    </div>
                  </>
                ) : (
                  <div className="text-sm">
                    {/* 프로덕션에서는 실제 AdSense 코드를 여기에 추가 */}
                    Google AdSense 광고 영역
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 광고 라벨 */}
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Advertisement
          </span>
        </div>
      </div>
    </div>
  );
}