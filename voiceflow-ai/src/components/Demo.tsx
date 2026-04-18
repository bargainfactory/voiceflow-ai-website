"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Send, Mic, Volume2 } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import type { LangCode } from "../i18n";

type Message = { role: "ai" | "user"; text: string };
type VoiceLine = { text: string; rate: number; pitch: number; pause: number };

const voiceScripts: Record<LangCode, VoiceLine[]> = {
  en: [
    { text: "Hello, thanks for calling VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "This is Alex, how's it going today", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "So I'm really glad you called", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "I'd love to help you figure out how we can make things easier for your business", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Let me give you the quick version of what we do", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "Basically we build AI agents that talk to your customers", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "Just like I'm talking to you right now, pretty cool right", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "And honestly, the results have been incredible", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "I've helped hundreds of businesses with exactly this", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "Most of our clients are cutting their support costs by about 70 percent", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "Some even more than that", rate: 0.88, pitch: 0.96, pause: 1100 },
    { text: "Here's the part I love though, it works twenty four seven", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "So at 3 AM when nobody wants to answer the phone, your AI agent's got it covered", rate: 0.84, pitch: 0.97, pause: 1300 },
    { text: "Appointment booking, lead qualification, customer support, all handled automatically", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "And we use some really great technology", rate: 0.87, pitch: 0.96, pause: 400 },
    { text: "Voiceflow for conversations, Eleven Labs for voice, and Twilio for the phone system", rate: 0.86, pitch: 0.96, pause: 1000 },
    { text: "So here's what I'd suggest if you're open to it", rate: 0.9, pitch: 0.98, pause: 800 },
    { text: "Over on the right side of your screen there's a chat you can try", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Go ahead and ask me anything in there, I'll respond just like I would for your customers", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "And if you like what you see, we've got a few pilot slots open this month", rate: 0.86, pitch: 0.98, pause: 500 },
    { text: "We can set one up for you, no pressure at all", rate: 0.85, pitch: 0.98, pause: 1000 },
    { text: "Does that sound good", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "Awesome, I'm really happy you reached out, talk to you soon", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  es: [
    { text: "Hola, gracias por llamar a VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "Soy Alex, como estas hoy", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "Me alegra mucho que hayas llamado", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Me encantaría ayudarte a descubrir como podemos facilitar las cosas para tu negocio", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Déjame darte la versión rápida de lo que hacemos", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "Básicamente construimos agentes de inteligencia artificial que hablan con tus clientes", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "Tal como estoy hablando contigo ahora mismo, bastante genial verdad", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "Y honestamente, los resultados han sido increíbles", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "He ayudado a cientos de negocios con exactamente esto", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "La mayoría de nuestros clientes están reduciendo sus costos de soporte en un 70 por ciento", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "Algunos incluso más que eso", rate: 0.88, pitch: 0.96, pause: 1100 },
    { text: "Y lo mejor es que funciona las veinticuatro horas del día, los siete días de la semana", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "Así que a las 3 de la mañana cuando nadie quiere contestar el teléfono, tu agente lo tiene cubierto", rate: 0.84, pitch: 0.97, pause: 1300 },
    { text: "Reservas de citas, calificación de leads, soporte al cliente, todo manejado automáticamente", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "Si te interesa, en la parte derecha de tu pantalla hay un chat que puedes probar", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Pregúntame lo que quieras ahí, responderé tal como lo haría con tus clientes", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Te parece bien", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "Genial, estoy muy contento de que te hayas comunicado, hablamos pronto", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  fr: [
    { text: "Bonjour, merci d'avoir appelé VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "Je suis Alex, comment allez-vous aujourd'hui", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "Je suis vraiment content que vous ayez appelé", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "J'aimerais vous aider à découvrir comment nous pouvons faciliter les choses pour votre entreprise", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Laissez-moi vous donner la version rapide de ce que nous faisons", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "En gros, nous construisons des agents d'intelligence artificielle qui parlent avec vos clients", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "Exactement comme je vous parle en ce moment, plutôt cool non", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "Et honnêtement, les résultats ont été incroyables", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "J'ai aidé des centaines d'entreprises avec exactement cela", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "La plupart de nos clients réduisent leurs coûts de support d'environ 70 pour cent", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "Et le meilleur, ça fonctionne vingt-quatre heures sur vingt-quatre, sept jours sur sept", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "Réservation de rendez-vous, qualification de prospects, support client, tout est géré automatiquement", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "Sur la droite de votre écran, il y a un chat que vous pouvez essayer", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Posez-moi n'importe quelle question, je répondrai comme je le ferais pour vos clients", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Est-ce que ça vous convient", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "Super, je suis vraiment content que vous nous ayez contactés, à bientôt", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  de: [
    { text: "Hallo, vielen Dank für Ihren Anruf bei VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "Ich bin Alex, wie geht es Ihnen heute", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "Es freut mich sehr, dass Sie angerufen haben", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Ich würde Ihnen gerne helfen herauszufinden, wie wir die Dinge für Ihr Unternehmen einfacher machen können", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Lassen Sie mich Ihnen kurz erklären, was wir machen", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "Im Grunde bauen wir KI-Agenten, die mit Ihren Kunden sprechen", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "Genau so wie ich jetzt mit Ihnen spreche, ziemlich cool oder", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "Und ehrlich gesagt waren die Ergebnisse unglaublich", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "Ich habe Hunderten von Unternehmen genau damit geholfen", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "Die meisten unserer Kunden senken ihre Supportkosten um etwa 70 Prozent", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "Und das Beste ist, es funktioniert rund um die Uhr, sieben Tage die Woche", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "Terminbuchung, Lead-Qualifizierung, Kundensupport, alles wird automatisch erledigt", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "Auf der rechten Seite Ihres Bildschirms gibt es einen Chat, den Sie ausprobieren können", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Fragen Sie mich einfach alles, ich antworte genau so, wie ich es für Ihre Kunden tun würde", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Klingt das gut", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "Wunderbar, ich freue mich sehr, dass Sie sich gemeldet haben, bis bald", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  pt: [
    { text: "Olá, obrigado por ligar para a VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "Eu sou o Alex, como você está hoje", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "Estou muito feliz que você ligou", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Adoraria ajudar você a descobrir como podemos facilitar as coisas para o seu negócio", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Deixa eu te dar a versão rápida do que fazemos", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "Basicamente construímos agentes de inteligência artificial que conversam com seus clientes", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "Assim como estou falando com você agora, bem legal né", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "E honestamente, os resultados têm sido incríveis", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "Já ajudei centenas de empresas com exatamente isso", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "A maioria dos nossos clientes está reduzindo os custos de suporte em cerca de 70 por cento", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "E o melhor é que funciona vinte e quatro horas por dia, sete dias por semana", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "Agendamento de consultas, qualificação de leads, suporte ao cliente, tudo automatizado", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "No lado direito da sua tela tem um chat que você pode experimentar", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "Pergunte o que quiser, vou responder como faria com seus clientes", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "Parece bom pra você", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "Ótimo, estou muito feliz que você entrou em contato, até logo", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  ja: [
    { text: "こんにちは、VoiceFlow AIにお電話いただきありがとうございます", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "アレックスです、今日はいかがですか", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "お電話いただけて本当にうれしいです", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "御社のビジネスをもっと楽にする方法を一緒に見つけたいと思います", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "私たちが何をしているか、簡単にご説明しますね", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "基本的に、お客様と会話するAIエージェントを作っています", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "今、私がお話ししているように、すごいでしょう", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "正直に言って、結果は素晴らしいものでした", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "何百もの企業様をまさにこれでお手伝いしてきました", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "ほとんどのお客様がサポートコストを約70パーセント削減しています", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "しかも24時間365日稼働します", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "予約管理、リード獲得、カスタマーサポート、すべて自動で処理されます", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "画面の右側にチャットがありますので、ぜひお試しください", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "何でも聞いてください、お客様に対応するのと同じようにお答えします", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "いかがでしょうか", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "素晴らしい、ご連絡いただけて本当にうれしいです、またお話ししましょう", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  zh: [
    { text: "您好，感谢致电VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "我是Alex，您今天好吗", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "非常高兴您打来电话", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "我很乐意帮助您了解我们如何让您的业务更轻松", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "让我简单介绍一下我们做什么", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "基本上，我们构建能与您客户对话的人工智能代理", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "就像我现在和您说话一样，很酷对吧", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "说实话，效果非常惊人", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "我已经帮助了数百家企业解决了同样的问题", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "大多数客户的支持成本降低了约百分之七十", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "而且它全天候工作，每周七天，每天二十四小时", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "预约安排、潜客筛选、客户支持，全部自动处理", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "在屏幕右侧有一个聊天窗口，您可以试试", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "随便问我什么，我会像服务您的客户一样回答", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "您觉得怎么样", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "太好了，很高兴您联系我们，回头聊", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  ko: [
    { text: "안녕하세요, VoiceFlow AI에 전화해 주셔서 감사합니다", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "저는 알렉스입니다, 오늘 어떠세요", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "전화해 주셔서 정말 기쁩니다", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "귀하의 비즈니스를 더 쉽게 만들 수 있는 방법을 함께 찾아보고 싶습니다", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "저희가 하는 일을 간단히 설명해 드리겠습니다", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "기본적으로 고객과 대화하는 인공지능 에이전트를 만듭니다", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "지금 제가 말하고 있는 것처럼요, 멋지지 않나요", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "솔직히 말씀드리면 결과가 정말 놀라웠습니다", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "수백 개의 기업을 이렇게 도와왔습니다", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "대부분의 고객이 지원 비용을 약 70퍼센트 절감하고 있습니다", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "게다가 일주일 내내 하루 24시간 작동합니다", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "예약 관리, 리드 검증, 고객 지원, 모두 자동으로 처리됩니다", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "화면 오른쪽에 채팅이 있으니 한번 사용해 보세요", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "무엇이든 물어보세요, 고객에게 대응하듯이 답변해 드리겠습니다", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "좋으신가요", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "좋습니다, 연락해 주셔서 정말 기쁩니다, 곧 다시 이야기해요", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
  ar: [
    { text: "مرحبا، شكرا لاتصالك بـ VoiceFlow AI", rate: 0.88, pitch: 1.0, pause: 600 },
    { text: "أنا أليكس، كيف حالك اليوم", rate: 0.88, pitch: 1.0, pause: 1400 },
    { text: "سعيد جدا أنك اتصلت", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "أود مساعدتك في اكتشاف كيف يمكننا تسهيل الأمور لعملك", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "دعني أعطيك نبذة سريعة عما نفعله", rate: 0.9, pitch: 0.98, pause: 700 },
    { text: "في الأساس نبني وكلاء ذكاء اصطناعي يتحدثون مع عملائك", rate: 0.87, pitch: 0.96, pause: 500 },
    { text: "تماما كما أتحدث معك الآن، رائع أليس كذلك", rate: 0.88, pitch: 0.97, pause: 1200 },
    { text: "وبصراحة النتائج كانت مذهلة", rate: 0.88, pitch: 0.98, pause: 500 },
    { text: "لقد ساعدت مئات الشركات في هذا بالضبط", rate: 0.87, pitch: 0.97, pause: 900 },
    { text: "معظم عملائنا يخفضون تكاليف الدعم بنسبة سبعين بالمئة تقريبا", rate: 0.85, pitch: 0.95, pause: 500 },
    { text: "ويعمل على مدار الساعة طوال أيام الأسبوع", rate: 0.86, pitch: 0.97, pause: 500 },
    { text: "حجز المواعيد وتأهيل العملاء والدعم كله يتم تلقائيا", rate: 0.87, pitch: 0.96, pause: 900 },
    { text: "على الجانب الأيمن من شاشتك يوجد محادثة يمكنك تجربتها", rate: 0.87, pitch: 0.97, pause: 500 },
    { text: "اسألني أي شيء هناك وسأجيب كما أفعل مع عملائك", rate: 0.86, pitch: 0.97, pause: 1100 },
    { text: "هل يبدو ذلك جيدا", rate: 0.9, pitch: 1.01, pause: 600 },
    { text: "رائع، سعيد جدا أنك تواصلت معنا، نتحدث قريبا", rate: 0.9, pitch: 1.01, pause: 0 },
  ],
};

const langToBcp47: Record<LangCode, string> = {
  en: "en", es: "es", fr: "fr", de: "de", pt: "pt", ja: "ja", zh: "zh", ko: "ko", ar: "ar",
};

const preferredVoices: Record<LangCode, string[]> = {
  en: ["Microsoft David", "Google US English Male", "Google US English", "Daniel"],
  es: ["Microsoft Pablo", "Google español", "Jorge", "Paulina"],
  fr: ["Microsoft Paul", "Google français", "Thomas", "Google French"],
  de: ["Microsoft Stefan", "Google Deutsch", "Google German", "Anna"],
  pt: ["Microsoft Daniel", "Google português", "Google Portuguese", "Luciana"],
  ja: ["Microsoft Ichiro", "Google 日本語", "Google Japanese", "Kyoko", "Otoya"],
  zh: ["Microsoft Kangkang", "Google 普通话", "Google Chinese", "Ting-Ting"],
  ko: ["Microsoft Heami", "Google 한국의", "Google Korean", "Yuna"],
  ar: ["Microsoft Naayf", "Google العربية", "Google Arabic", "Maged"],
};

function findBestVoice(voices: SpeechSynthesisVoice[], lang: LangCode): SpeechSynthesisVoice | undefined {
  const bcp = langToBcp47[lang];
  const prefs = preferredVoices[lang];

  for (const pref of prefs) {
    const match = voices.find(v => v.name.includes(pref) && v.lang.startsWith(bcp));
    if (match) return match;
  }

  for (const pref of prefs) {
    const match = voices.find(v => v.name.includes(pref));
    if (match) return match;
  }

  const langMatch = voices.find(v => v.lang.startsWith(bcp) && !v.name.toLowerCase().includes("female"));
  if (langMatch) return langMatch;

  return voices.find(v => v.lang.startsWith(bcp)) || voices[0];
}

const chatResponses: Record<string, string> = {
  pricing: "Great question! So it starts at $497 a month for the basics. But honestly, most folks go with the Professional at $997 because you get everything... chatbot, voice agent, CRM integration, the whole deal. Want me to break down what\u2019s included?",
  price: "Sure thing! The Starter is $497 a month, and the Professional is $997 which is our most popular by far. It\u2019s got both chatbot and voice agent plus all the integrations. What kind of budget are you working with? I can help find the right fit.",
  cost: "Oh yeah, this is the part I love explaining. So yes, there\u2019s a monthly cost... but most of our clients save over $10,000 a month after switching. The ROI calculator above will give you a real number for your business. Want me to walk you through it?",
  demo: "Ha, well you\u2019re kind of in one right now! This chat is live. And if you haven\u2019t tried the voice agent yet, hit that Call button on the left... that\u2019s me talking in real time. Go ahead, give it a try!",
  healthcare: "Oh, healthcare is actually one of our strongest areas! We\u2019ve got HIPAA-compliant agents handling appointment scheduling, patient triage, insurance verification... all of it. MedFirst Clinic saw 73% call deflection and saved over $12,000 a month. Want me to show you how it\u2019d work for your practice?",
  "real estate": "Real estate, nice! So our agents do 24/7 lead qualification, property info, showing scheduling... the works. Apex Realty captured 340% more qualified leads after switching. I mean, that\u2019s huge. Can I ask what kind of properties you\u2019re focused on?",
  ecommerce: "E-commerce, awesome! Our chatbot handles order tracking, returns, product recommendations... and we\u2019re talking 2-second response times. ShopWave hit 82% auto-resolution which freed up their whole team. What platform is your store on? I can tell you exactly how we\u2019d plug in.",
  legal: "Got it... legal. So we handle client intake, consultation scheduling, and FAQ handling while keeping everything completely confidential. It\u2019s actually a really smooth experience for clients calling in. Want me to walk you through how it\u2019d look for a firm like yours?",
  integration: "Oh yeah, we play nice with pretty much everything! Salesforce, HubSpot, Zoho for CRM. Twilio, WhatsApp, SMS for communications. And we\u2019ve got a full API for custom stuff too. What tools is your team using right now? I\u2019ll tell you exactly how we connect.",
  how: "Great question! So it\u2019s actually really simple. First, we design a custom AI agent trained on your business. Then we hook it up to your existing tools. And then... it goes live, handling conversations 24/7. Setup usually takes about 1 to 2 weeks. Does that make sense so far?",
  trial: "Absolutely! We do a 14-day free trial on the Professional plan. Full access to everything... chatbot, voice agent, analytics, all of it. Just fill out the quick form below and we\u2019ll have you set up within 24 hours. No credit card needed or anything like that.",
  support: "So on Starter you get email support. Professional gets you priority support with under 2-hour response times. And Enterprise? You get a dedicated account manager... like your own person on our team. Which level sounds right for what you need?",
  language: "Oh yeah, we\u2019re fully multilingual! Professional supports 5 languages, Enterprise does all of them. English, Spanish, French, German, Portuguese, Japanese, Chinese, Korean... and we\u2019re adding more every month. Do you need multi-language support?",
  help: "Of course! That\u2019s literally what I\u2019m here for. Tell me a bit about your business and what you\u2019re looking for... I\u2019ll point you in the right direction.",
  hello: "Hey! Really happy you\u2019re here. I\u2019m Alex... I help businesses set up AI agents that handle customer conversations 24/7. Are you looking to learn more, or do you have something specific in mind?",
  hi: "Hey there! Great to hear from you. I\u2019m Alex. What can I help you with today?",
  thanks: "You\u2019re so welcome! Honestly, this is the best part of my job. If anything else comes up, I\u2019m right here. Don\u2019t hesitate!",
  thank: "Happy to help! Seriously, anytime. Is there anything else I can do for you?",
  appointment: "Absolutely, I\u2019d love to help with that! What day works best for you this week? We can usually get something set up pretty quickly.",
  frustrated: "I totally get it, and I\u2019m really sorry you\u2019re dealing with that. That sounds frustrating. Let\u2019s fix it right now... can you tell me a bit more about what\u2019s going on?",
  problem: "Oh no, I\u2019m sorry to hear that. Don\u2019t worry though... we\u2019ll figure this out together. Walk me through what happened and I\u2019ll get it sorted.",
  issue: "I hear you. Let\u2019s get that taken care of right away. Can you give me a few more details so I can help you the best way possible?",
  agent: "Sure thing! If you\u2019d prefer a human team member, I can absolutely connect you. But I\u2019m also happy to help if you want to give me a shot first... totally your call!",
  human: "No problem at all! I can connect you with one of our specialists. But just so you know, I can handle most things pretty quickly if you want to try me first. What would you prefer?",
  "not sure": "Totally fair! Can I ask what\u2019s making you hesitate? Sometimes it helps to hear how businesses similar to yours are using it. No pressure at all.",
  expensive: "I hear you, and I totally understand budget concerns. Here\u2019s the thing though... most of our clients actually save 5 to 10 times what they spend with us. Would it help if I showed you the math for your specific situation?",
  competitor: "That\u2019s smart, doing your research! I\u2019d say the biggest thing that sets us apart is the voice agent side... most competitors only do text chat. Plus we handle the whole setup for you. Want me to explain what makes our approach different?",
  "how long": "Great question! From kickoff to going live, it\u2019s usually about 1 to 2 weeks. We handle all the heavy lifting... you just give us your business info and we build it out. Pretty painless honestly.",
  results: "Oh, the results have been wild honestly. MedFirst Clinic cut calls by 73%. Apex Realty got 340% more leads. ShopWave hit 82% auto-resolution. And those are just a few. Want me to find a case study in your industry?",
  roi: "So here\u2019s the exciting part... most clients see positive ROI in the very first month. We\u2019re talking $10,000 plus in monthly savings on average. Try the ROI calculator above with your actual numbers... I think you\u2019ll be pretty impressed.",
};

const defaultResponses = [
  "Hmm, that\u2019s a really good point! You know what, I think our Professional package would be a perfect fit. It\u2019s got everything... chatbot, voice agent, the whole nine yards. Want me to go into the details?",
  "I hear you! A lot of our clients started with the exact same question. Here\u2019s what I\u2019d suggest... let\u2019s set up a quick personalized demo so you can see exactly how it\u2019d work for your business. Sound good?",
  "That\u2019s great, thanks for sharing that! Every business is different, you know? So we\u2019d totally customize this for you. If you fill out the quick form below, I can put together a real recommendation.",
  "Oh interesting! So we\u2019ve helped over 500 businesses at this point, and honestly every single one is unique. Tell me a bit more about what you\u2019re working with... I\u2019ll give you my honest take.",
  "Got it, got it. So here\u2019s what I\u2019m thinking... have you checked out the case studies above? Some of those numbers are pretty wild. And if you want, we can dig deeper into any of them. Just say the word!",
  "Makes total sense! You know what might help? We\u2019ve got a few pilot slots open this month where you can test everything risk-free. Want me to check if there\u2019s one available for you?",
];

function playRingTone(audioCtx: AudioContext) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 440;
  osc.type = "sine";
  gain.gain.value = 0.15;
  const now = audioCtx.currentTime;
  for (let i = 0; i < 3; i++) {
    gain.gain.setValueAtTime(0.15, now + i * 1.2);
    gain.gain.setValueAtTime(0, now + i * 1.2 + 0.4);
    gain.gain.setValueAtTime(0.15, now + i * 1.2 + 0.5);
    gain.gain.setValueAtTime(0, now + i * 1.2 + 0.9);
  }
  osc.start(now);
  osc.stop(now + 3.6);
}

function playConnectTone(audioCtx: AudioContext) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 600;
  osc.type = "sine";
  gain.gain.value = 0.1;
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.start(now);
  osc.stop(now + 0.3);
}

export default function Demo() {
  const { t, lang } = useLanguage();
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected" | "speaking">("idle");
  const [callTime, setCallTime] = useState(0);
  const [spokenLine, setSpokenLine] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: t.demo.chatGreeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [barHeights, setBarHeights] = useState([12, 17, 22, 17, 12]);
  const [responseIndex, setResponseIndex] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const scriptIndexRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const langRef = useRef(lang);

  useEffect(() => { langRef.current = lang; }, [lang]);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis.cancel();
    speechRef.current = null;
    scriptIndexRef.current = 0;
    setSpokenLine("");
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
  }, []);

  const animateBars = useCallback((speaking: boolean) => {
    if (!speaking) {
      setBarHeights([12, 17, 22, 17, 12]);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }
    const animate = () => {
      setBarHeights(prev => prev.map(() => 4 + Math.random() * 32));
      animFrameRef.current = requestAnimationFrame(() => {
        setTimeout(animate, 90);
      });
    };
    animate();
  }, []);

  const speakNext = useCallback(() => {
    const currentLang = langRef.current;
    const script = voiceScripts[currentLang];
    if (scriptIndexRef.current >= script.length) {
      setCallState("connected");
      setSpokenLine("");
      animateBars(false);
      return;
    }

    const line = script[scriptIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(line.text);
    speechRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const bestVoice = findBestVoice(voices, currentLang);
    if (bestVoice) utterance.voice = bestVoice;

    utterance.rate = line.rate;
    utterance.pitch = line.pitch;
    utterance.lang = langToBcp47[currentLang];

    const displayText = line.text;

    utterance.onstart = () => {
      setCallState("speaking");
      setSpokenLine(displayText);
      animateBars(true);
    };
    utterance.onend = () => {
      animateBars(false);
      setCallState("connected");
      setSpokenLine("");
      scriptIndexRef.current += 1;
      setTimeout(speakNext, line.pause);
    };
    utterance.onerror = () => {
      animateBars(false);
      setCallState("connected");
      setSpokenLine("");
    };

    window.speechSynthesis.speak(utterance);
  }, [animateBars]);

  const startCall = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    setCallState("ringing");
    playRingTone(audioCtxRef.current);
    setTimeout(() => {
      playConnectTone(audioCtxRef.current!);
      setCallState("connected");
      scriptIndexRef.current = 0;
      setTimeout(speakNext, 1000);
    }, 3800);
  }, [speakNext]);

  const endCall = useCallback(() => {
    stopSpeech();
    setCallState("idle");
    setCallTime(0);
    setSpokenLine("");
    animateBars(false);
  }, [stopSpeech, animateBars]);

  useEffect(() => {
    if (callState === "idle" || callState === "ringing") return;
    const interval = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  useEffect(() => { return () => { stopSpeech(); }; }, [stopSpeech]);
  useEffect(() => { if (typeof window !== "undefined") window.speechSynthesis.getVoices(); }, []);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return m + ":" + sec;
  };

  const getChatResponse = (userText: string): string => {
    const lower = userText.toLowerCase();
    for (const [keyword, response] of Object.entries(chatResponses)) {
      if (lower.includes(keyword)) return response;
    }
    const resp = defaultResponses[responseIndex % defaultResponses.length];
    setResponseIndex((i) => i + 1);
    return resp;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setTyping(true);
    const response = getChatResponse(userText);
    const delay = 500 + Math.min(response.length * 5, 1500);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: response }]);
    }, delay);
  };

  return (
    <section id="demo" className="py-24 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.demo.headline} <span className="gradient-text">{t.demo.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.demo.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Mic className="w-5 h-5 text-emerald-400" />
              {t.demo.voiceTitle}
            </h3>

            <div className="bg-slate-900/80 rounded-2xl p-8 text-center min-h-[320px] flex flex-col items-center justify-center">
              {callState === "idle" ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-white font-medium mb-1">{t.demo.alexName}</p>
                  <p className="text-slate-400 text-sm mb-1">{t.demo.alexRole}</p>
                  <p className="text-slate-600 text-xs mb-6">{t.demo.speakersOn}</p>
                  <button
                    onClick={startCall}
                    className="animate-pulse-glow px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all hover:scale-105"
                  >
                    <Volume2 className="w-5 h-5 inline mr-2" />
                    {t.demo.callAlex}
                  </button>
                </>
              ) : callState === "ringing" ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Phone className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-white font-medium mb-1">{t.demo.alexName}</p>
                  <p className="text-yellow-400 text-sm mb-1 animate-pulse">{t.demo.ringing}</p>
                  <p className="text-slate-600 text-xs mb-6">{t.demo.connecting}</p>
                  <button
                    onClick={endCall}
                    className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all"
                  >
                    <PhoneOff className="w-4 h-4 inline mr-2" />
                    {t.demo.cancel}
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-1.5 h-14 mb-3">
                    {barHeights.map((h, i) => (
                      <div
                        key={i}
                        className={"w-2.5 rounded-full transition-all duration-75 " + (
                          callState === "speaking" ? "bg-emerald-400" : "bg-emerald-800"
                        )}
                        style={{ height: h + "px" }}
                      />
                    ))}
                  </div>
                  <p className="text-white font-medium text-sm mb-0.5">{t.demo.alexName}</p>
                  <p className={"text-xs mb-3 " + (
                    callState === "speaking" ? "text-emerald-400" : "text-slate-500"
                  )}>
                    {callState === "speaking" ? t.demo.speaking : t.demo.listening}
                  </p>
                  {spokenLine && (
                    <p className="text-slate-400 text-xs italic mb-3 max-w-[280px] mx-auto leading-relaxed min-h-[40px]">
                      &ldquo;{spokenLine}&rdquo;
                    </p>
                  )}
                  {!spokenLine && callState === "connected" && (
                    <p className="text-slate-600 text-xs mb-3 min-h-[40px]">
                      ...
                    </p>
                  )}
                  <p className="text-slate-600 text-xs mb-4">{fmt(callTime)}</p>
                  <button
                    onClick={endCall}
                    className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all"
                  >
                    <PhoneOff className="w-4 h-4 inline mr-2" />
                    {t.demo.endCall}
                  </button>
                </>
              )}
            </div>

            <p className="text-slate-600 text-xs mt-4 text-center">
              {t.demo.poweredVoice}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" />
              {t.demo.chatTitle}
            </h3>

            <div
              ref={chatRef}
              className="flex-1 bg-slate-900/80 rounded-2xl p-4 space-y-4 overflow-y-auto min-h-[300px] max-h-[400px]"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <span className="text-emerald-400 text-xs font-bold">A</span>
                    </div>
                  )}
                  <div
                    className={"max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed " + (
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-md"
                        : "bg-slate-700 text-slate-200 rounded-bl-md"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <span className="text-emerald-400 text-xs font-bold">A</span>
                  </div>
                  <div className="bg-slate-700 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-md text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.demo.chatPlaceholder}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={handleSend}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-500 text-xs mt-3 text-center">
              {t.demo.chatHints}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
