import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { MBTIResult, BigFiveResult, TetoEgenResult } from '@shared/schema';

export async function generateTestResultPDF(
  result: MBTIResult | BigFiveResult | TetoEgenResult,
  testType: string,
  elementId: string
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('결과 요소를 찾을 수 없습니다.');
    }

    // Canvas로 변환
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    
    // PDF 생성
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // 헤더 추가
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(getTestDisplayName(testType) + ' 결과', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('생성일: ' + new Date().toLocaleDateString('ko-KR'), 20, 30);
    pdf.text('제공: 심리 테스트 허브', 20, 37);

    // 선 추가
    pdf.setLineWidth(0.5);
    pdf.line(20, 42, 190, 42);

    position = 50;

    // 이미지 추가
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth - 40, (imgHeight * (imgWidth - 40)) / imgWidth);
    heightLeft -= pageHeight;

    // 여러 페이지가 필요한 경우
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 20, position, imgWidth - 40, (imgHeight * (imgWidth - 40)) / imgWidth);
      heightLeft -= pageHeight;
    }

    // 푸터 정보 추가
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(
        `페이지 ${i} / ${pageCount}`,
        pdf.internal.pageSize.getWidth() - 30,
        pdf.internal.pageSize.getHeight() - 10
      );
    }

    // 다운로드
    const fileName = `${getTestDisplayName(testType)}_결과_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('PDF 생성 중 오류:', error);
    throw new Error('PDF 생성에 실패했습니다.');
  }
}

export function generateDetailedTextPDF(
  result: MBTIResult | BigFiveResult | TetoEgenResult,
  testType: string
): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let yPosition = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // 한글 폰트 설정 (기본 폰트 사용)
  pdf.setFont('helvetica');

  // 제목
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(getTestDisplayName(testType) + ' Results', margin, yPosition);
  yPosition += lineHeight * 2;

  // 날짜
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Generated: ' + new Date().toLocaleDateString('ko-KR'), margin, yPosition);
  yPosition += lineHeight;
  pdf.text('Source: Psychology Test Hub', margin, yPosition);
  yPosition += lineHeight * 2;

  // 선 추가
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += lineHeight;

  // 테스트별 상세 결과
  if (testType === 'mbti') {
    const mbtiResult = result as MBTIResult;
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MBTI Type: ' + mbtiResult.type, margin, yPosition);
    yPosition += lineHeight * 1.5;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Description: ' + mbtiResult.description, margin, yPosition);
    yPosition += lineHeight * 2;

    // 차원별 점수
    pdf.setFont('helvetica', 'bold');
    pdf.text('Dimension Scores:', margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Extraversion/Introversion: ${mbtiResult.dimensions.EI}%`, margin + 5, yPosition);
    yPosition += lineHeight;
    pdf.text(`Sensing/Intuition: ${mbtiResult.dimensions.SN}%`, margin + 5, yPosition);
    yPosition += lineHeight;
    pdf.text(`Thinking/Feeling: ${mbtiResult.dimensions.TF}%`, margin + 5, yPosition);
    yPosition += lineHeight;
    pdf.text(`Judging/Perceiving: ${mbtiResult.dimensions.JP}%`, margin + 5, yPosition);
    yPosition += lineHeight * 2;

    // 특징들
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Traits:', margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    mbtiResult.traits.forEach((trait) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text('• ' + trait, margin + 5, yPosition);
      yPosition += lineHeight;
    });

  } else if (testType === 'bigfive') {
    const bigFiveResult = result as BigFiveResult;
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Big Five Personality Analysis', margin, yPosition);
    yPosition += lineHeight * 2;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Description: ' + bigFiveResult.description, margin, yPosition);
    yPosition += lineHeight * 2;

    // 차원별 점수
    pdf.setFont('helvetica', 'bold');
    pdf.text('Dimension Scores:', margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    Object.entries(bigFiveResult.dimensions).forEach(([key, value]) => {
      const dimensionNames: Record<string, string> = {
        openness: 'Openness',
        conscientiousness: 'Conscientiousness', 
        extraversion: 'Extraversion',
        agreeableness: 'Agreeableness',
        neuroticism: 'Neuroticism'
      };
      pdf.text(`${dimensionNames[key]}: ${value}%`, margin + 5, yPosition);
      yPosition += lineHeight;
    });

  } else if (testType === 'tetoegen') {
    const tetoResult = result as TetoEgenResult;
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Teto-Egen Type: ${tetoResult.type}`, margin, yPosition);
    yPosition += lineHeight * 2;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Description: ' + tetoResult.description, margin, yPosition);
    yPosition += lineHeight * 2;

    // 특징들
    pdf.setFont('helvetica', 'bold');
    pdf.text('Personality Traits:', margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    tetoResult.traits.forEach((trait) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text('• ' + trait, margin + 5, yPosition);
      yPosition += lineHeight;
    });

    yPosition += lineHeight;

    // 연애 스타일
    pdf.setFont('helvetica', 'bold');
    pdf.text('Relationship Style:', margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    tetoResult.relationshipStyle.forEach((style) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text('• ' + style, margin + 5, yPosition);
      yPosition += lineHeight;
    });

    yPosition += lineHeight;

    // 궁합
    pdf.setFont('helvetica', 'bold');
    pdf.text('Compatibility:', margin, yPosition);
    yPosition += lineHeight;
    
    pdf.setFont('helvetica', 'normal');
    tetoResult.compatibility.forEach((comp) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text('• ' + comp, margin + 5, yPosition);
      yPosition += lineHeight;
    });
  }

  // 푸터
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Page ${i} / ${pageCount}`,
      pageWidth - 30,
      pageHeight - 10
    );
  }

  // 다운로드
  const fileName = `${getTestDisplayName(testType)}_Detailed_Results_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}

function getTestDisplayName(testType: string): string {
  switch (testType) {
    case 'mbti': return 'MBTI';
    case 'bigfive': return 'Big Five';
    case 'tetoegen': return 'Teto-Egen';
    default: return 'Personality Test';
  }
}