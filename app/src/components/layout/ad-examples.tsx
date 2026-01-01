import { Adsense } from '@ctrl/react-adsense';

// 예시 컴포넌트들 - 실제 사용 시 client와 slot ID를 본인 것으로 변경하세요

// 1. 반응형 디스플레이 광고 (가장 일반적)
export function ResponsiveDisplayAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full my-4">
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
      />
    </div>
  );
}

// 2. 사각형 광고 (300x250)
export function SquareAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full flex justify-center my-4">
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'inline-block', width: '300px', height: '250px' }}
      />
    </div>
  );
}

// 3. 리더보드 광고 (728x90)
export function LeaderboardAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full flex justify-center my-4">
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'inline-block', width: '728px', height: '90px' }}
      />
    </div>
  );
}

// 4. 스카이스크래퍼 광고 (160x600) - 사이드바용
export function SkyscraperAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full flex justify-center my-4">
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'inline-block', width: '160px', height: '600px' }}
      />
    </div>
  );
}

// 5. 인-아티클 광고 (기사 내용 중간)
export function InArticleAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="text-center text-xs text-gray-500 mb-2">Advertisement</div>
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'block', textAlign: 'center' }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
}

// 6. 인-피드 광고 (목록 형태 콘텐츠용)
export function InFeedAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full my-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="text-center text-xs text-gray-500 mb-2">Sponsored</div>
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'block' }}
        layout="in-feed"
        format="fluid"
      />
    </div>
  );
}

// 7. 모바일 전용 광고
export function MobileAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full block md:hidden my-4">
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
      />
    </div>
  );
}

// 8. 데스크톱 전용 광고
export function DesktopAd({ client, slot }: { client: string; slot: string }) {
  return (
    <div className="w-full hidden md:block my-4">
      <Adsense
        client={client}
        slot={slot}
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
      />
    </div>
  );
}