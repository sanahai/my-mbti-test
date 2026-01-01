export interface Question {
  id: number;
  text: {
    ko: string;
    en: string;
    vi: string;
    th: string;
  };
  category?: string;
  reverse?: boolean;
}

export const mbtiQuestions: Question[] = [
  // Extraversion vs Introversion
  { 
    id: 1, 
    text: {
      ko: "새로운 사람들과 만나는 것을 좋아한다",
      en: "I enjoy meeting new people",
      vi: "Tôi thích gặp gỡ những người mới",
      th: "ฉันชอบการพบปะผู้คนใหม่ๆ"
    }, 
    category: "EI" 
  },
  { 
    id: 2, 
    text: {
      ko: "파티에서 에너지를 얻는다",
      en: "I gain energy from parties",
      vi: "Tôi có được năng lượng từ các bữa tiệc",
      th: "ฉันได้พลังงานจากงานปาร์ตี้"
    }, 
    category: "EI" 
  },
  { 
    id: 3, 
    text: {
      ko: "혼자 있는 시간을 통해 에너지를 충전한다",
      en: "I recharge my energy through alone time",
      vi: "Tôi nạp năng lượng qua thời gian ở một mình",
      th: "ฉันชาร์จพลังงานผ่านการใช้เวลาคนเดียว"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 4, 
    text: {
      ko: "큰 그룹보다는 소수의 친한 친구들과 시간을 보내는 것을 선호한다",
      en: "I prefer spending time with a few close friends rather than large groups",
      vi: "Tôi thích dành thời gian với một vài người bạn thân hơn là nhóm lớn",
      th: "ฉันชอบใช้เวลากับเพื่อนสนิทไม่กี่คนมากกว่ากลุ่มใหญ่"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 5, 
    text: {
      ko: "사교적이고 외향적이라는 말을 자주 듣는다",
      en: "I'm often told that I'm sociable and outgoing",
      vi: "Tôi thường được nói là hòa đồng và cởi mở",
      th: "ฉันมักจะได้ยินว่าเป็นคนเข้าสังคมและเปิดเผย"
    }, 
    category: "EI" 
  },
  { 
    id: 6, 
    text: {
      ko: "말하기 전에 깊이 생각하는 편이다",
      en: "I tend to think deeply before speaking",
      vi: "Tôi có xu hướng suy nghĩ kỹ trước khi nói",
      th: "ฉันมักคิดอย่างลึกซึ้งก่อนพูด"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 7, 
    text: {
      ko: "새로운 환경에 빠르게 적응한다",
      en: "I quickly adapt to new environments",
      vi: "Tôi thích ứng nhanh với môi trường mới",
      th: "ฉันปรับตัวเข้ากับสภาพแวดล้อมใหม่ได้อย่างรวดเร็ว"
    }, 
    category: "EI" 
  },
  { 
    id: 8, 
    text: {
      ko: "조용하고 평화로운 환경을 선호한다",
      en: "I prefer quiet and peaceful environments",
      vi: "Tôi thích môi trường yên tĩnh và bình yên",
      th: "ฉันชอบสภาพแวดล้อมที่เงียบและสงบ"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 9, 
    text: {
      ko: "주목받는 것을 즐긴다",
      en: "I enjoy being the center of attention",
      vi: "Tôi thích được chú ý",
      th: "ฉันชอบเป็นจุดสนใจ"
    }, 
    category: "EI" 
  },
  { 
    id: 10, 
    text: {
      ko: "내성적이라는 말을 자주 듣는다",
      en: "I'm often told that I'm introverted",
      vi: "Tôi thường được nói là hướng nội",
      th: "ฉันมักจะได้ยินว่าเป็นคนเก็บตัว"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 11, 
    text: {
      ko: "대화를 먼저 시작하는 편이다",
      en: "I tend to start conversations first",
      vi: "Tôi có xu hướng bắt đầu cuộc trò chuyện trước",
      th: "ฉันมักเป็นคนเริ่มบทสนทนาก่อน"
    }, 
    category: "EI" 
  },
  { 
    id: 12, 
    text: {
      ko: "생각을 정리한 후에 말하는 편이다",
      en: "I prefer to organize my thoughts before speaking",
      vi: "Tôi thích sắp xếp suy nghĩ trước khi nói",
      th: "ฉันชอบจัดระเบียบความคิดก่อนพูด"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 13, 
    text: {
      ko: "활동적이고 바쁜 생활을 선호한다",
      en: "I prefer an active and busy lifestyle",
      vi: "Tôi thích lối sống năng động và bận rộn",
      th: "ฉันชอบการใช้ชีวิตที่กระฉับกระเฉงและยุ่งวุ่นวาย"
    }, 
    category: "EI" 
  },
  { 
    id: 14, 
    text: {
      ko: "혼자만의 시간이 많이 필요하다",
      en: "I need a lot of alone time",
      vi: "Tôi cần nhiều thời gian ở một mình",
      th: "ฉันต้องการเวลาอยู่คนเดียวมาก"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 15, 
    text: {
      ko: "다양한 활동에 참여하는 것을 좋아한다",
      en: "I enjoy participating in various activities",
      vi: "Tôi thích tham gia các hoạt động đa dạng",
      th: "ฉันชอบเข้าร่วมกิจกรรมต่างๆ"
    }, 
    category: "EI" 
  },
  { 
    id: 16, 
    text: {
      ko: "깊이 있는 일대일 대화를 선호한다",
      en: "I prefer deep one-on-one conversations",
      vi: "Tôi thích những cuộc trò chuyện sâu sắc một đối một",
      th: "ฉันชอบการสนทนาแบบลึกซึ้งแค่สองคน"
    }, 
    category: "EI", 
    reverse: true 
  },
  { 
    id: 17, 
    text: {
      ko: "즉흥적으로 친구들과 만나는 것을 좋아한다",
      en: "I enjoy meeting friends spontaneously",
      vi: "Tôi thích gặp bạn bè một cách tự phát",
      th: "ฉันชอบพบปะเพื่อนแบบไม่วางแผน"
    }, 
    category: "EI" 
  },
  { 
    id: 18, 
    text: {
      ko: "계획된 만남을 선호한다",
      en: "I prefer planned meetings",
      vi: "Tôi thích những cuộc gặp được lên kế hoạch",
      th: "ฉันชอบการพบปะที่วางแผนไว้"
    }, 
    category: "EI", 
    reverse: true 
  },

  // Sensing vs Intuition
  { 
    id: 19, 
    text: {
      ko: "현실적이고 실용적인 것을 중요하게 생각한다",
      en: "I value practical and realistic things",
      vi: "Tôi coi trọng những điều thực tế và thiết thực",
      th: "ฉันให้ค่ากับสิ่งที่ถูกต้องและใช้ได้จริง"
    }, 
    category: "SN" 
  },
  { 
    id: 20, 
    text: {
      ko: "미래의 가능성보다는 현재에 집중한다",
      en: "I focus on the present rather than future possibilities",
      vi: "Tôi tập trung vào hiện tại hơn là khả năng tương lai",
      th: "ฉันมุ่งเน้นที่ปัจจุบันมากกว่าความเป็นไปได้ในอนาคต"
    }, 
    category: "SN" 
  },
  { 
    id: 21, 
    text: {
      ko: "새로운 아이디어와 개념에 흥미를 느낀다",
      en: "I'm interested in new ideas and concepts",
      vi: "Tôi quan tâm đến ý tưởng và khái niệm mới",
      th: "ฉันสนใจในไอเดียและแนวคิดใหม่ๆ"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 22, 
    text: {
      ko: "상상력이 풍부하다는 말을 자주 듣는다",
      en: "I'm often told that I have a rich imagination",
      vi: "Tôi thường được nói là có trí tưởng tượng phong phú",
      th: "ฉันมักจะได้ยินว่ามีจินตนาการที่อุดมสมบูรณ์"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 23, 
    text: {
      ko: "세부사항에 주의를 기울이는 편이다",
      en: "I tend to pay attention to details",
      vi: "Tôi có xu hướng chú ý đến chi tiết",
      th: "ฉันมักใส่ใจในรายละเอียด"
    }, 
    category: "SN" 
  },
  { 
    id: 24, 
    text: {
      ko: "직감과 영감을 중요하게 생각한다",
      en: "I value intuition and inspiration",
      vi: "Tôi coi trọng trực giác và cảm hứng",
      th: "ฉันให้ค่ากับสัญชาตญาณและแรงบันดาลใจ"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 25, 
    text: {
      ko: "경험에 기반해서 판단하는 편이다",
      en: "I tend to make judgments based on experience",
      vi: "Tôi có xu hướng đưa ra phán đoán dựa trên kinh nghiệm",
      th: "ฉันมักตัดสินใจโดยอาศัยประสบการณ์"
    }, 
    category: "SN" 
  },
  { 
    id: 26, 
    text: {
      ko: "추상적인 개념에 흥미를 느낀다",
      en: "I'm interested in abstract concepts",
      vi: "Tôi quan tâm đến các khái niệm trừu tru",
      th: "ฉันสนใจในแนวคิดเชิงนิรุปาธิ"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 27, 
    text: {
      ko: "단계별로 차근차근 일을 진행한다",
      en: "I proceed with work step by step",
      vi: "Tôi tiến hành công việc theo từng bước",
      th: "ฉันทำงานทีละขั้นตอน"
    }, 
    category: "SN" 
  },
  { 
    id: 28, 
    text: {
      ko: "큰 그림을 보는 것을 선호한다",
      en: "I prefer to see the big picture",
      vi: "Tôi thích nhìn toàn cảnh",
      th: "ฉันชอบมองภาพรวม"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 29, 
    text: {
      ko: "검증된 방법을 선호한다",
      en: "I prefer proven methods",
      vi: "Tôi thích các phương pháp đã được chứng minh",
      th: "ฉันชอบวิธีการที่พิสูจน์แล้ว"
    }, 
    category: "SN" 
  },
  { 
    id: 30, 
    text: {
      ko: "새로운 방법을 시도해보는 것을 좋아한다",
      en: "I like trying new methods",
      vi: "Tôi thích thử các phương pháp mới",
      th: "ฉันชอบลองวิธีการใหม่ๆ"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 31, 
    text: {
      ko: "구체적인 사실을 중요하게 생각한다",
      en: "I value concrete facts",
      vi: "Tôi coi trọng các sự thật cụ thể",
      th: "ฉันให้ค่ากับข้อเท็จจริงที่ชัดเจน"
    }, 
    category: "SN" 
  },
  { 
    id: 32, 
    text: {
      ko: "은유나 상징적 표현을 좋아한다",
      en: "I like metaphors and symbolic expressions",
      vi: "Tôi thích các phép ẩn dụ và biểu hiện tượng trưng",
      th: "ฉันชอบอุปมาและการแสดงออกเชิงสัญลักษณ์"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 33, 
    text: {
      ko: "현재 상황에 집중하는 편이다",
      en: "I tend to focus on the present situation",
      vi: "Tôi có xu hướng tập trung vào tình huống hiện tại",
      th: "ฉันมักตั้งใจกับสถานการณ์ปัจจุบัน"
    }, 
    category: "SN" 
  },
  { 
    id: 34, 
    text: {
      ko: "미래 계획을 세우는 것을 좋아한다",
      en: "I enjoy making future plans",
      vi: "Tôi thích lập kế hoạch tương lai",
      th: "ฉันชอบการวางแผนอนาคต"
    }, 
    category: "SN", 
    reverse: true 
  },
  { 
    id: 35, 
    text: {
      ko: "실용성을 중시한다",
      en: "I value practicality",
      vi: "Tôi coi trọng tính thiết thực",
      th: "ฉันให้ค่ากับความใช้ได้จริง"
    }, 
    category: "SN" 
  },
  { 
    id: 36, 
    text: {
      ko: "창의성을 중시한다",
      en: "I value creativity",
      vi: "Tôi coi trọng tính sáng tạo",
      th: "ฉันให้ค่ากับความคิดสร้างสรรค์"
    }, 
    category: "SN", 
    reverse: true 
  },

  // Thinking vs Feeling
  { 
    id: 37, 
    text: {
      ko: "논리적 분석을 통해 결정을 내린다",
      en: "I make decisions through logical analysis",
      vi: "Tôi đưa ra quyết định qua phân tích logic",
      th: "ฉันตัดสินใจโดยการวิเคราะห์ตรรกะ"
    }, 
    category: "TF" 
  },
  { 
    id: 38, 
    text: {
      ko: "객관적인 기준으로 판단한다",
      en: "I judge based on objective criteria",
      vi: "Tôi phán đoán dựa trên tiêu chuẩn khách quan",
      th: "ฉันตัดสินตามเกณฑ์การตัดสินใจที่เป็นกลาง"
    }, 
    category: "TF" 
  },
  { 
    id: 39, 
    text: {
      ko: "다른 사람의 감정을 고려해서 결정한다",
      en: "I make decisions considering others' emotions",
      vi: "Tôi đưa ra quyết định có xem xét cảm xúc của người khác",
      th: "ฉันตัดสินใจโดยพิจารณาอารมณ์ของคนอื่น"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 40, 
    text: {
      ko: "공감 능력이 뛰어나다는 말을 자주 듣는다",
      en: "I'm often told that I have excellent empathy",
      vi: "Tôi thường được nói là có khả năng đồng cảm tốt",
      th: "ฉันมักจะได้ยินว่ามีความสามารถในการเข้าใจผู้อื่น"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 41, 
    text: {
      ko: "비판적 사고를 중요하게 생각한다",
      en: "I value critical thinking",
      vi: "Tôi coi trọng tư duy phê phán",
      th: "ฉันให้ค่ากับการคิดอย่างมีวิจารณญาณ"
    }, 
    category: "TF" 
  },
  { 
    id: 42, 
    text: {
      ko: "조화와 협력을 중시한다",
      en: "I value harmony and cooperation",
      vi: "Tôi coi trọng sự hài hòa và hợp tác",
      th: "ฉันให้ค่ากับความสามัคคีและการร่วมมือ"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 43, 
    text: {
      ko: "사실과 데이터에 기반해서 판단한다",
      en: "I judge based on facts and data",
      vi: "Tôi phán đoán dựa trên sự thật và dữ liệu",
      th: "ฉันตัดสินใจตามข้อเท็จจริงและข้อมูล"
    }, 
    category: "TF" 
  },
  { 
    id: 44, 
    text: {
      ko: "개인적인 가치를 중요하게 생각한다",
      en: "I value personal values",
      vi: "Tôi coi trọng các giá trị cá nhân",
      th: "ฉันให้ค่ากับคุณค่าส่วนตัว"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 45, 
    text: {
      ko: "일관성과 공정성을 추구한다",
      en: "I pursue consistency and fairness",
      vi: "Tôi theo đuổi tính nhất quán và công bằng",
      th: "ฉันตั้งหาความสอดคล้องและความยุติธรรม"
    }, 
    category: "TF" 
  },
  { 
    id: 46, 
    text: {
      ko: "타인의 기분을 잘 파악한다",
      en: "I'm good at understanding others' moods",
      vi: "Tôi giỏi trong việc hiểu tâm trạng của người khác",
      th: "ฉันเก่งในการเข้าใจอารมณ์ของคนอื่น"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 47, 
    text: {
      ko: "경쟁을 즐기는 편이다",
      en: "I tend to enjoy competition",
      vi: "Tôi có xu hướng thích tranh đua",
      th: "ฉันมักจะสนุกกับการแข่งขัน"
    }, 
    category: "TF" 
  },
  { 
    id: 48, 
    text: {
      ko: "갈등 상황을 피하려고 한다",
      en: "I try to avoid conflict situations",
      vi: "Tôi cố gắng tránh các tình huống xung đột",
      th: "ฉันพยายามหลีกเลี่ยงสถานการณ์ขัดแย้ง"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 49, 
    text: {
      ko: "원인과 결과를 분석하는 것을 좋아한다",
      en: "I enjoy analyzing cause and effect",
      vi: "Tôi thích phân tích nguyên nhân và hậu quả",
      th: "ฉันชอบวิเคราะห์สาเหตุและผลที่ตามมา"
    }, 
    category: "TF" 
  },
  { 
    id: 50, 
    text: {
      ko: "다른 사람을 도와주는 것에서 만족감을 느낀다",
      en: "I feel satisfaction from helping others",
      vi: "Tôi cảm thấy hài lòng khi giúp đỡ người khác",
      th: "ฉันรู้สึกพึงพอใจจากการช่วยเหลือคนอื่น"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 51, 
    text: {
      ko: "효율성을 중시한다",
      en: "I value efficiency",
      vi: "Tôi coi trọng hiệu quả",
      th: "ฉันให้ค่ากับประสิทธิภาพ"
    }, 
    category: "TF" 
  },
  { 
    id: 52, 
    text: {
      ko: "인간관계를 중시한다",
      en: "I value human relationships",
      vi: "Tôi coi trọng các mối quan hệ con người",
      th: "ฉันให้ค่ากับความสัมพันธ์ระหว่างคน"
    }, 
    category: "TF", 
    reverse: true 
  },
  { 
    id: 53, 
    text: {
      ko: "직설적으로 의견을 표현한다",
      en: "I express my opinions directly",
      vi: "Tôi bày tỏ ý kiến một cách thẳng thắn",
      th: "ฉันแสดงความคิดเห็นอย่างตรงไปตรงมา"
    }, 
    category: "TF" 
  },
  { 
    id: 54, 
    text: {
      ko: "다른 사람의 감정을 상하게 하지 않으려고 조심한다",
      en: "I'm careful not to hurt others' feelings",
      vi: "Tôi cẩn thận không làm tổn thương cảm xúc của người khác",
      th: "ฉันระวังไม่ให้ทำร้ายความรู้สึกของคนอื่น"
    }, 
    category: "TF", 
    reverse: true 
  },

  // Judging vs Perceiving
  { 
    id: 55, 
    text: {
      ko: "계획을 세우고 그대로 실행하는 것을 선호한다",
      en: "I prefer to make plans and follow them",
      vi: "Tôi thích lập kế hoạch và thực hiện theo",
      th: "ฉันชอบทำแผนและปฏิบัติตาม"
    }, 
    category: "JP" 
  },
  { 
    id: 56, 
    text: {
      ko: "정해진 일정과 마감일을 중시한다",
      en: "I value fixed schedules and deadlines",
      vi: "Tôi coi trọng lịch trình cố định và thời hạn",
      th: "ฉันให้ความสำคัญกับกำหนดการและเส้นตาย"
    }, 
    category: "JP" 
  },
  { 
    id: 57, 
    text: {
      ko: "융통성 있게 계획을 변경하는 것을 좋아한다",
      en: "I like to flexibly change plans",
      vi: "Tôi thích thay đổi kế hoạch một cách linh hoạt",
      th: "ฉันชอบเปลี่ยนแผนอย่างยืดหยุ่น"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 58, 
    text: {
      ko: "즉흥적으로 행동하는 것을 즐긴다",
      en: "I enjoy acting spontaneously",
      vi: "Tôi thích hành động một cách tự phát",
      th: "ฉันสนุกกับการกระทำแบบไม่วางแผน"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 59, 
    text: {
      ko: "체계적이고 조직적이라는 말을 자주 듣는다",
      en: "I'm often told that I'm systematic and organized",
      vi: "Tôi thường được nói là có hệ thống và tổ chức tốt",
      th: "ฉันมักจะได้ยินว่าเป็นคนเป็นระบบและมีระเบียบ"
    }, 
    category: "JP" 
  },
  { 
    id: 60, 
    text: {
      ko: "여러 선택지를 열어두는 것을 선호한다",
      en: "I prefer to keep multiple options open",
      vi: "Tôi thích để mở nhiều lựa chọn",
      th: "ฉันชอบเปิดทางเลือกหลายๆ อย่าง"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 61, 
    text: {
      ko: "미리 준비하는 편이다",
      en: "I tend to prepare in advance",
      vi: "Tôi có xu hướng chuẩn bị trước",
      th: "ฉันมักจะเตรียมตัวล่วงหน้า"
    }, 
    category: "JP" 
  },
  { 
    id: 62, 
    text: {
      ko: "마지막 순간에 처리하는 것이 더 효율적이다",
      en: "It's more efficient to handle things at the last moment",
      vi: "Xử lý việc vào phút cuối hiệu quả hơn",
      th: "การจัดการเรื่องในนาทีสุดท้ายมีประสิทธิภาพมากกว่า"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 63, 
    text: {
      ko: "일을 완료하고 나서야 편안함을 느낀다",
      en: "I feel comfortable only after completing tasks",
      vi: "Tôi chỉ cảm thấy thoải mái sau khi hoàn thành công việc",
      th: "ฉันรู้สึกสบายใจเมื่อทำงานเสร็จแล้วเท่านั้น"
    }, 
    category: "JP" 
  },
  { 
    id: 64, 
    text: {
      ko: "여러 일을 동시에 진행하는 것을 좋아한다",
      en: "I like to work on multiple tasks simultaneously",
      vi: "Tôi thích làm nhiều việc cùng một lúc",
      th: "ฉันชอบทำงานหลายอย่างในเวลาเดียวกัน"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 65, 
    text: {
      ko: "규칙과 절차를 중시한다",
      en: "I value rules and procedures",
      vi: "Tôi coi trọng quy tắc và thủ tục",
      th: "ฉันให้ค่ากับกฎและขั้นตอน"
    }, 
    category: "JP" 
  },
  { 
    id: 66, 
    text: {
      ko: "상황에 따라 유연하게 대응한다",
      en: "I respond flexibly according to the situation",
      vi: "Tôi ứng phó linh hoạt theo tình huống",
      th: "ฉันตอบสนองอย่างยืดหยุ่นตามสถานการณ์"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 67, 
    text: {
      ko: "결정을 빨리 내리는 편이다",
      en: "I tend to make decisions quickly",
      vi: "Tôi có xu hướng quyết định nhanh",
      th: "ฉันมักจะตัดสินใจอย่างรวดเร็ว"
    }, 
    category: "JP" 
  },
  { 
    id: 68, 
    text: {
      ko: "모든 가능성을 고려한 후에 결정한다",
      en: "I decide after considering all possibilities",
      vi: "Tôi quyết định sau khi xem xét tất cả khả năng",
      th: "ฉันตัดสินใจหลังจากพิจารณาความเป็นไปได้ทั้งหมด"
    }, 
    category: "JP", 
    reverse: true 
  },
  { 
    id: 69, 
    text: {
      ko: "정리정돈이 잘 되어 있는 환경을 선호한다",
      en: "I prefer well-organized environments",
      vi: "Tôi thích môi trường được sắp xếp gọn gàng",
      th: "ฉันชอบสภาพแวดล้อมที่เป็นระเบียบ"
    }, 
    category: "JP" 
  },
  { 
    id: 70, 
    text: {
      ko: "자유롭고 개방적인 환경을 선호한다",
      en: "I prefer free and open environments",
      vi: "Tôi thích môi trường tự do và cởi mở",
      th: "ฉันชอบสภาพแวดล้อมที่เสรีและเปิดกว้าง"
    }, 
    category: "JP", 
    reverse: true 
  },
];

export const bigFiveQuestions: Question[] = [
  // Openness to Experience
  { 
    id: 1, 
    text: {
      ko: "새로운 경험을 추구한다",
      en: "I seek new experiences",
      vi: "Tôi tìm kiếm những trải nghiệm mới",
      th: "ฉันแสวงหาประสบการณ์ใหม่ๆ"
    }, 
    category: "openness" 
  },
  { 
    id: 2, 
    text: {
      ko: "상상력이 풍부하다",
      en: "I have a rich imagination",
      vi: "Tôi có trí tưởng tượng phong phú",
      th: "ฉันมีจินตนาการที่อุดมสมบูรณ์"
    }, 
    category: "openness" 
  },
  { 
    id: 3, 
    text: {
      ko: "예술적 감각이 있다",
      en: "I have artistic sensibility",
      vi: "Tôi có cảm quan nghệ thuật",
      th: "ฉันมีความรู้สึกด้านศิลปะ"
    }, 
    category: "openness" 
  },
  { 
    id: 4, 
    text: {
      ko: "창의적인 활동을 즐긴다",
      en: "I enjoy creative activities",
      vi: "Tôi thích các hoạt động sáng tạo",
      th: "ฉันสนุกกับกิจกรรมสร้างสรรค์"
    }, 
    category: "openness" 
  },
  { 
    id: 5, 
    text: {
      ko: "새로운 아이디어에 개방적이다",
      en: "I'm open to new ideas",
      vi: "Tôi cởi mở với ý tưởng mới",
      th: "ฉันเปิดรับแนวคิดใหม่ๆ"
    }, 
    category: "openness" 
  },
  { 
    id: 6, 
    text: {
      ko: "전통적인 방식을 선호한다",
      en: "I prefer traditional ways",
      vi: "Tôi thích cách thức truyền thống",
      th: "ฉันชอบวิธีแบบดั้งเดิม"
    }, 
    category: "openness", 
    reverse: true 
  },
  { 
    id: 7, 
    text: {
      ko: "철학적 문제에 관심이 많다",
      en: "I'm very interested in philosophical problems",
      vi: "Tôi rất quan tâm đến các vấn đề triết học",
      th: "ฉันสนใจในปัญหาเชิงปรัชญามาก"
    }, 
    category: "openness" 
  },
  { 
    id: 8, 
    text: {
      ko: "호기심이 많다",
      en: "I'm very curious",
      vi: "Tôi rất tò mò",
      th: "ฉันเป็นคนอยากรู้อยากเห็น"
    }, 
    category: "openness" 
  },
  { 
    id: 9, 
    text: {
      ko: "변화를 즐긴다",
      en: "I enjoy change",
      vi: "Tôi thích sự thay đổi",
      th: "ฉันสนุกกับการเปลี่ยนแปลง"
    }, 
    category: "openness" 
  },
  { 
    id: 10, 
    text: {
      ko: "예측 가능한 것을 선호한다",
      en: "I prefer predictable things",
      vi: "Tôi thích những điều có thể dự đoán được",
      th: "ฉันชอบสิ่งที่คาดเดาได้"
    }, 
    category: "openness", 
    reverse: true 
  },

  // Conscientiousness
  { 
    id: 11, 
    text: {
      ko: "체계적으로 일을 처리한다",
      en: "I handle work systematically",
      vi: "Tôi xử lý công việc một cách có hệ thống",
      th: "ฉันจัดการงานอย่างเป็นระบบ"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 12, 
    text: {
      ko: "세부사항에 주의를 기울인다",
      en: "I pay attention to details",
      vi: "Tôi chú ý đến chi tiết",
      th: "ฉันใส่ใจในรายละเอียด"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 13, 
    text: {
      ko: "계획을 세우고 따른다",
      en: "I make and follow plans",
      vi: "Tôi lập kế hoạch và thực hiện theo",
      th: "ฉันทำแผนและปฏิบัติตาม"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 14, 
    text: {
      ko: "책임감이 강하다",
      en: "I have a strong sense of responsibility",
      vi: "Tôi có tinh thần trách nhiệm cao",
      th: "ฉันมีความรับผิดชอบสูง"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 15, 
    text: {
      ko: "시간 약속을 잘 지킨다",
      en: "I keep time commitments well",
      vi: "Tôi giữ lời hẹn về thời gian tốt",
      th: "ฉันรักษาเวลานัดหมายได้ดี"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 16, 
    text: {
      ko: "게으르다는 말을 자주 듣는다",
      en: "I'm often told that I'm lazy",
      vi: "Tôi thường được nói là lười biếng",
      th: "ฉันมักจะได้ยินว่าขี้เกียจ"
    }, 
    category: "conscientiousness", 
    reverse: true 
  },
  { 
    id: 17, 
    text: {
      ko: "목표를 달성하기 위해 끈기 있게 노력한다",
      en: "I work persistently to achieve goals",
      vi: "Tôi nỗ lực kiên trì để đạt được mục tiêu",
      th: "ฉันทำงานอย่างมุ่งมั่นเพื่อบรรลุเป้าหมาย"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 18, 
    text: {
      ko: "정리정돈을 잘한다",
      en: "I organize things well",
      vi: "Tôi sắp xếp mọi thứ tốt",
      th: "ฉันจัดระเบียบของได้ดี"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 19, 
    text: {
      ko: "자제력이 강하다",
      en: "I have strong self-control",
      vi: "Tôi có khả năng tự chế tốt",
      th: "ฉันมีการควบคุมตนเองที่ดี"
    }, 
    category: "conscientiousness" 
  },
  { 
    id: 20, 
    text: {
      ko: "충동적으로 행동하는 편이다",
      en: "I tend to act impulsively",
      vi: "Tôi có xu hướng hành động bốc đồng",
      th: "ฉันมักจะกระทำอย่างหุนหันพลันแล่น"
    }, 
    category: "conscientiousness", 
    reverse: true 
  },

  // Extraversion
  { 
    id: 21, 
    text: {
      ko: "사교적이다",
      en: "I'm sociable",
      vi: "Tôi là người hòa đồng",
      th: "ฉันเป็นคนเข้าสังคมได้ดี"
    }, 
    category: "extraversion" 
  },
  { 
    id: 22, 
    text: {
      ko: "활기차고 에너지가 넘친다",
      en: "I'm lively and energetic",
      vi: "Tôi sống động và tràn đầy năng lượng",
      th: "ฉันมีชีวิตชีวาและเต็มไปด้วยพลังงาน"
    }, 
    category: "extraversion" 
  },
  { 
    id: 23, 
    text: {
      ko: "주목받는 것을 즐긴다",
      en: "I enjoy being the center of attention",
      vi: "Tôi thích được chú ý",
      th: "ฉันสนุกกับการเป็นจุดสนใจ"
    }, 
    category: "extraversion" 
  },
  { 
    id: 24, 
    text: {
      ko: "낙천적이다",
      en: "I'm optimistic",
      vi: "Tôi là người lạc quan",
      th: "ฉันเป็นคนมองโลกในแง่ดี"
    }, 
    category: "extraversion" 
  },
  { 
    id: 25, 
    text: {
      ko: "대화를 주도하는 편이다",
      en: "I tend to lead conversations",
      vi: "Tôi có xu hướng dẫn dắt cuộc trò chuyện",
      th: "ฉันมักจะเป็นคนนำการสนทนา"
    }, 
    category: "extraversion" 
  },
  { 
    id: 26, 
    text: {
      ko: "조용한 편이다",
      en: "I'm rather quiet",
      vi: "Tôi khá yên lặng",
      th: "ฉันค่อนข้างเงียบ"
    }, 
    category: "extraversion", 
    reverse: true 
  },
  { 
    id: 27, 
    text: {
      ko: "많은 사람들과 어울리는 것을 좋아한다",
      en: "I like to socialize with many people",
      vi: "Tôi thích giao lưu với nhiều người",
      th: "ฉันชอบคบหาสมาคมกับหลายคน"
    }, 
    category: "extraversion" 
  },
  { 
    id: 28, 
    text: {
      ko: "리더십을 발휘하는 편이다",
      en: "I tend to demonstrate leadership",
      vi: "Tôi có xu hướng thể hiện khả năng lãnh đạo",
      th: "ฉันมักจะแสดงภาวะผู้นำ"
    }, 
    category: "extraversion" 
  },
  { 
    id: 29, 
    text: {
      ko: "모험을 좋아한다",
      en: "I like adventures",
      vi: "Tôi thích phiêu lưu",
      th: "ฉันชอบการผจญภัย"
    }, 
    category: "extraversion" 
  },
  { 
    id: 30, 
    text: {
      ko: "혼자 있는 시간을 선호한다",
      en: "I prefer alone time",
      vi: "Tôi thích thời gian ở một mình",
      th: "ฉันชอบเวลาอยู่คนเดียว"
    }, 
    category: "extraversion", 
    reverse: true 
  },

  // Agreeableness
  { 
    id: 31, 
    text: {
      ko: "다른 사람을 신뢰한다",
      en: "I trust other people",
      vi: "Tôi tin tượng người khác",
      th: "ฉันไว้วางใจคนอื่น"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 32, 
    text: {
      ko: "협력적이다",
      en: "I'm cooperative",
      vi: "Tôi hợp tác tốt",
      th: "ฉันร่วมมือได้ดี"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 33, 
    text: {
      ko: "동정심이 많다",
      en: "I'm compassionate",
      vi: "Tôi có lòng thương cảm",
      th: "ฉันมีความเมตตากรุณา"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 34, 
    text: {
      ko: "갈등을 피하려고 한다",
      en: "I try to avoid conflict",
      vi: "Tôi cố gắng tránh xung đột",
      th: "ฉันพยายามหลีกเลี่ยงความขัดแย้ง"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 35, 
    text: {
      ko: "관대하다",
      en: "I'm generous",
      vi: "Tôi rộng lượng",
      th: "ฉันใจกว้าง"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 36, 
    text: {
      ko: "비판적이다",
      en: "I'm critical",
      vi: "Tôi hay phê phán",
      th: "ฉันชอบวิจารณ์"
    }, 
    category: "agreeableness", 
    reverse: true 
  },
  { 
    id: 37, 
    text: {
      ko: "타인의 감정에 민감하다",
      en: "I'm sensitive to others' emotions",
      vi: "Tôi nhạy cảm với cảm xúc của người khác",
      th: "ฉันไวต่ออารมณ์ของคนอื่น"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 38, 
    text: {
      ko: "도움을 주는 것을 좋아한다",
      en: "I like helping others",
      vi: "Tôi thích giúp đỡ người khác",
      th: "ฉันชอบช่วยเหลือคนอื่น"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 39, 
    text: {
      ko: "겸손하다",
      en: "I'm humble",
      vi: "Tôi khiêm tốn",
      th: "ฉันถ่อมตน"
    }, 
    category: "agreeableness" 
  },
  { 
    id: 40, 
    text: {
      ko: "경쟁적이다",
      en: "I'm competitive",
      vi: "Tôi hay cạnh tranh",
      th: "ฉันชอบแข่งขัน"
    }, 
    category: "agreeableness", 
    reverse: true 
  },

  // Neuroticism
  { 
    id: 41, 
    text: {
      ko: "스트레스를 많이 받는다",
      en: "I experience a lot of stress",
      vi: "Tôi bị stress nhiều",
      th: "ฉันเครียดมาก"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 42, 
    text: {
      ko: "걱정이 많다",
      en: "I worry a lot",
      vi: "Tôi lo lắng nhiều",
      th: "ฉันกังวลมาก"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 43, 
    text: {
      ko: "감정 기복이 심하다",
      en: "I have extreme mood swings",
      vi: "Tôi có thay đổi tâm trạng mạnh",
      th: "ฉันมีอารมณ์แปรปรวนมาก"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 44, 
    text: {
      ko: "쉽게 불안해진다",
      en: "I get anxious easily",
      vi: "Tôi dễ lo âu",
      th: "ฉันวิตกกังวลง่าย"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 45, 
    text: {
      ko: "우울해지는 경우가 많다",
      en: "I often get depressed",
      vi: "Tôi thường xuyên cảm thấy chán nản",
      th: "ฉันมักเศร้าใจ"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 46, 
    text: {
      ko: "감정적으로 안정적이다",
      en: "I'm emotionally stable",
      vi: "Tôi ổn định về mặt cảm xúc",
      th: "ฉันมีอารมณ์มั่นคง"
    }, 
    category: "neuroticism", 
    reverse: true 
  },
  { 
    id: 47, 
    text: {
      ko: "예민하다",
      en: "I'm sensitive",
      vi: "Tôi nhạy cảm",
      th: "ฉันไวความรู้สึก"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 48, 
    text: {
      ko: "쉽게 화를 낸다",
      en: "I get angry easily",
      vi: "Tôi dễ nổi giận",
      th: "ฉันโกรธง่าย"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 49, 
    text: {
      ko: "자신감이 부족하다",
      en: "I lack confidence",
      vi: "Tôi thiếu tự tin",
      th: "ฉันขาดความมั่นใจ"
    }, 
    category: "neuroticism" 
  },
  { 
    id: 50, 
    text: {
      ko: "차분하고 평온하다",
      en: "I'm calm and peaceful",
      vi: "Tôi bình tĩnh và thanh thản",
      th: "ฉันสงบและเงียบสงัด"
    }, 
    category: "neuroticism", 
    reverse: true 
  },
];

export const tetoEgenQuestions: Question[] = [
  { 
    id: 1, 
    text: {
      ko: "운동이나 신체활동을 즐긴다",
      en: "I enjoy exercise or physical activities",
      vi: "Tôi thích tập thể dục hoặc hoạt động thể chất",
      th: "ฉันสนุกกับการออกกำลังกายหรือกิจกรรมทางกาย"
    }, 
    category: "teto" 
  },
  { 
    id: 2, 
    text: {
      ko: "직설적으로 의견을 표현한다",
      en: "I express my opinions directly",
      vi: "Tôi bày tỏ ý kiến một cách thẳng thắn",
      th: "ฉันแสดงความคิดเห็นอย่างตรงไปตรงมา"
    }, 
    category: "teto" 
  },
  { 
    id: 3, 
    text: {
      ko: "경쟁 상황에서 동기부여를 받는다",
      en: "I get motivated in competitive situations",
      vi: "Tôi có động lực trong các tình huống cạnh tranh",
      th: "ฉันได้แรงจูงใจในสถานการณ์แข่งขัน"
    }, 
    category: "teto" 
  },
  { 
    id: 4, 
    text: {
      ko: "리더십을 발휘하는 것을 좋아한다",
      en: "I like to demonstrate leadership",
      vi: "Tôi thích thể hiện khả năng lãnh đạo",
      th: "ฉันชอบแสดงภาวะผู้นำ"
    }, 
    category: "teto" 
  },
  { 
    id: 5, 
    text: {
      ko: "모험적인 활동을 선호한다",
      en: "I prefer adventurous activities",
      vi: "Tôi thích các hoạt động mạo hiểm",
      th: "ฉันชอบกิจกรรมที่เสี่ยงภัย"
    }, 
    category: "teto" 
  },
  { 
    id: 6, 
    text: {
      ko: "적극적으로 행동하는 편이다",
      en: "I tend to act proactively",
      vi: "Tôi có xu hướng hành động tích cực",
      th: "ฉันมักจะกระทำอย่างกระตือรือร้น"
    }, 
    category: "teto" 
  },
  { 
    id: 7, 
    text: {
      ko: "도전적인 과제를 즐긴다",
      en: "I enjoy challenging tasks",
      vi: "Tôi thích những nhiệm vụ thử thách",
      th: "ฉันสนุกกับงานที่ท้าทาย"
    }, 
    category: "teto" 
  },
  { 
    id: 8, 
    text: {
      ko: "독립적으로 일하는 것을 선호한다",
      en: "I prefer to work independently",
      vi: "Tôi thích làm việc độc lập",
      th: "ฉันชอบทำงานอย่างอิสระ"
    }, 
    category: "teto" 
  },
  { 
    id: 9, 
    text: {
      ko: "빠른 결정을 내리는 편이다",
      en: "I tend to make quick decisions",
      vi: "Tôi có xu hướng quyết định nhanh",
      th: "ฉันมักจะตัดสินใจอย่างรวดเร็ว"
    }, 
    category: "teto" 
  },
  { 
    id: 10, 
    text: {
      ko: "위험을 감수하는 것을 두려워하지 않는다",
      en: "I'm not afraid to take risks",
      vi: "Tôi không sợ chấp nhận rủi ro",
      th: "ฉันไม่กลัวที่จะเสี่ยง"
    }, 
    category: "teto" 
  },
  { 
    id: 11, 
    text: {
      ko: "자신감이 넘친다",
      en: "I'm full of confidence",
      vi: "Tôi tràn đầy tự tin",
      th: "ฉันเต็มไปด้วยความมั่นใจ"
    }, 
    category: "teto" 
  },
  { 
    id: 12, 
    text: {
      ko: "목표 지향적이다",
      en: "I'm goal-oriented",
      vi: "Tôi hướng đến mục tiêu",
      th: "ฉันมุ่งเน้นไปที่เป้าหมาย"
    }, 
    category: "teto" 
  },
  { 
    id: 13, 
    text: {
      ko: "논쟁을 즐기는 편이다",
      en: "I tend to enjoy arguments",
      vi: "Tôi có xu hướng thích tranh luận",
      th: "ฉันมักจะสนุกกับการโต้เถียง"
    }, 
    category: "teto" 
  },
  { 
    id: 14, 
    text: {
      ko: "섬세하고 감정적인 편이다",
      en: "I'm delicate and emotional",
      vi: "Tôi tinh tế và cảm xúc",
      th: "ฉันละเอียดอ่อนและอ่อนไหว"
    }, 
    category: "egen" 
  },
  { 
    id: 15, 
    text: {
      ko: "타인의 감정에 민감하다",
      en: "I'm sensitive to others' emotions",
      vi: "Tôi nhạy cảm với cảm xúc của người khác",
      th: "ฉันไวต่ออารมณ์ของคนอื่น"
    }, 
    category: "egen" 
  },
  { 
    id: 16, 
    text: {
      ko: "협력을 중시한다",
      en: "I value cooperation",
      vi: "Tôi coi trọng sự hợp tác",
      th: "ฉันให้ความสำคัญกับความร่วมมือ"
    }, 
    category: "egen" 
  },
  { 
    id: 17, 
    text: {
      ko: "예술이나 미적 감각에 관심이 많다",
      en: "I'm very interested in art or aesthetic sense",
      vi: "Tôi rất quan tâm đến nghệ thuật hoặc cảm quan thẩm mỹ",
      th: "ฉันสนใจในศิลปะหรือความรู้สึกด้านความงาม"
    }, 
    category: "egen" 
  },
  { 
    id: 18, 
    text: {
      ko: "조화로운 관계를 추구한다",
      en: "I seek harmonious relationships",
      vi: "Tôi theo đuổi các mối quan hệ hài hòa",
      th: "ฉันแสวงหาความสัมพันธ์ที่กลมเกลียว"
    }, 
    category: "egen" 
  },
  { 
    id: 19, 
    text: {
      ko: "신중하게 결정을 내린다",
      en: "I make decisions carefully",
      vi: "Tôi đưa ra quyết định một cách thận trọng",
      th: "ฉันตัดสินใจอย่างรอบคอบ"
    }, 
    category: "egen" 
  },
  { 
    id: 20, 
    text: {
      ko: "공감 능력이 뛰어나다",
      en: "I have excellent empathy skills",
      vi: "Tôi có khả năng đồng cảm tuyệt vời",
      th: "ฉันมีความสามารถในการเข้าใจผู้อื่นเป็นเยี่ยม"
    }, 
    category: "egen" 
  },
  { 
    id: 21, 
    text: {
      ko: "갈등 상황을 피하려고 한다",
      en: "I try to avoid conflict situations",
      vi: "Tôi cố gắng tránh các tình huống xung đột",
      th: "ฉันพยายามหลีกเลี่ยงสถานการณ์ขัดแย้ง"
    }, 
    category: "egen" 
  },
  { 
    id: 22, 
    text: {
      ko: "세심하고 배려심이 많다",
      en: "I'm meticulous and considerate",
      vi: "Tôi tỉ mỉ và chu đáo",
      th: "ฉันละเอียดและเอาใจใส่"
    }, 
    category: "egen" 
  },
  { 
    id: 23, 
    text: {
      ko: "안정성을 추구한다",
      en: "I seek stability",
      vi: "Tôi theo đuổi sự ổn định",
      th: "ฉันแสวงหาความมั่นคง"
    }, 
    category: "egen" 
  },
  { 
    id: 24, 
    text: {
      ko: "감성적인 것을 중요하게 생각한다",
      en: "I value emotional things",
      vi: "Tôi coi trọng những điều cảm tính",
      th: "ฉันให้ความสำคัญกับสิ่งที่เกี่ยวกับอารมณ์"
    }, 
    category: "egen" 
  },
  { 
    id: 25, 
    text: {
      ko: "다른 사람을 돌보는 것을 좋아한다",
      en: "I like taking care of others",
      vi: "Tôi thích chăm sóc người khác",
      th: "ฉันชอบดูแลคนอื่น"
    }, 
    category: "egen" 
  },
  { 
    id: 26, 
    text: {
      ko: "평화로운 환경을 선호한다",
      en: "I prefer peaceful environments",
      vi: "Tôi thích môi trường bình yên",
      th: "ฉันชอบสภาพแวดล้อมที่สงบสุข"
    }, 
    category: "egen" 
  },
  { 
    id: 27, 
    text: {
      ko: "직관과 감정을 중시한다",
      en: "I value intuition and emotions",
      vi: "Tôi coi trọng trực giác và cảm xúc",
      th: "ฉันให้ความสำคัญกับสัญชาตญาณและอารมณ์"
    }, 
    category: "egen" 
  },
  { 
    id: 28, 
    text: {
      ko: "부드럽고 온화한 성격이다",
      en: "I have a gentle and mild personality",
      vi: "Tôi có tính cách nhẹ nhàng và ôn hòa",
      th: "ฉันมีบุคลิกที่อ่อนโยนและสุภาพ"
    }, 
    category: "egen" 
  },
];