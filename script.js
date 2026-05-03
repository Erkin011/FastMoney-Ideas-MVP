import { useState, useEffect } from "react";

// ─── IDEAS DATABASE (15 идей) ────────────────────────────────────────────────

const IDEAS_DB = [
{
id: 1, title: "Курьер на велосипеде", emoji: "🚲",
category: "offline", investment: "none", speed: "fast", minAge: 14,
income: { min: 3000, max: 8000, period: "день" }, difficulty: 2,
tags: ["доставка", "физическая работа", "Алматы", "Астана"],
description: "Доставляй еду и посылки по городу через Glovo, Яндекс.Еда или Chocofood. Первые деньги — уже в первый рабочий день.",
steps: [
"Скачай приложение Glovo или Яндекс.Еда и зарегистрируйся как курьер",
"Нужно разрешение родителей, если тебе нет 18 — они подпишут за 5 минут",
"Купи или арендуй термосумку (~2,000₸) — у некоторых сервисов есть своя",
"Работай в часы пик: обед 12–14, ужин 18–21 — в это время заказов больше всего",
"Выводи деньги ежедневно на карту. Готово!"
],
risks: ["В дождь и мороз заказов меньше", "Нужен исправный велосипед", "Физически устаёшь в жару"],
realExample: "Азамат, 16 лет, Алматы — 25,000–40,000₸ в неделю, работает 4–5 часов после школы.",
},
{
id: 2, title: "Монтаж видео", emoji: "🎬",
category: "online", investment: "none", speed: "medium", minAge: 13,
income: { min: 5000, max: 50000, period: "проект" }, difficulty: 3,
tags: ["фриланс", "творчество", "удалённо"],
description: "Монтируй видео для TikTok-блогеров, кафе, барберов и бизнесов. Спрос растёт каждый год — все хотят контент, но мало кто умеет монтировать.",
steps: [
"Установи CapCut (телефон) или DaVinci Resolve (ПК) — оба бесплатны",
"Смонтируй 3 крутых видео для портфолио (можно из чужих материалов с YouTube)",
"Зарегистрируйся на Kwork.ru — создай гиг за 3,000–7,000₸",
"Напиши напрямую в 15–20 телеграм-каналов казахстанских блогеров",
"Первый заказ за 1–2 недели. С 3+ отзывами цена вырастет до 20,000–50,000₸"
],
risks: ["Поиск первых клиентов займёт 1–2 недели", "Нужен смартфон или ПК", "Конкуренция на фриланс-площадках"],
realExample: "Дина, 15 лет, Астана — делает 3–4 видео в неделю, доход 60,000–80,000₸/мес.",
},
{
id: 3, title: "Репетитор для младших", emoji: "📚",
category: "offline", investment: "none", speed: "fast", minAge: 14,
income: { min: 2000, max: 5000, period: "час" }, difficulty: 2,
tags: ["обучение", "стабильный", "офлайн", "онлайн"],
description: "Хорошо знаешь математику, физику или английский? Учи тех, кто помладше. Самый уважаемый и стабильный заработок для школьника.",
steps: [
"Выбери предмет, в котором ты реально силён (оценка 4–5)",
"Напиши пост в родительские WhatsApp/Telegram-чаты своей школы или района",
"Установи стартовую цену 1,500–2,500₸/час — ниже взрослых репетиторов",
"Проведи первые 2–3 занятия, попроси отзыв в чат",
"После 5 отзывов подними цену до 3,500–5,000₸/час"
],
risks: ["Нужно реально хорошо знать предмет", "Ученики иногда отменяют занятия", "Родители торгуются"],
realExample: "Тимур, 17 лет — 5 учеников по математике, 90,000₸/мес, работает 2–3 часа в день.",
},
{
id: 4, title: "Хенд-мейд и продажи", emoji: "🎨",
category: "offline", investment: "small", speed: "medium", minAge: 13,
income: { min: 500, max: 8000, period: "изделие" }, difficulty: 2,
tags: ["творчество", "продажи", "Instagram", "OLX"],
description: "Делай и продавай слаймы, свечи, украшения из бисера, мыло или чехлы с принтами. Казахстанский рынок хенд-мейда активно растёт.",
steps: [
"Выбери нишу: слаймы (дёшево), украшения из бисера, соевые свечи, мыло",
"Закупи материалы на старт: 3,000–10,000₸ на Kaspi.kz или базаре",
"Сними красивые фото/видео процесса создания на телефон",
"Создай Instagram и TikTok: выкладывай процесс + готовый результат",
"Продавай через OLX.kz, Instagram DM, и местные барахолки"
],
risks: ["Нужны стартовые вложения на материалы", "Первый месяц продажи идут медленно", "Конкуренция в популярных нишах"],
realExample: "Айгерим, 15 лет, Шымкент — украшения из бисера, 45,000–70,000₸/мес через Instagram.",
},
{
id: 5, title: "SMM для местного бизнеса", emoji: "📱",
category: "online", investment: "none", speed: "medium", minAge: 14,
income: { min: 15000, max: 60000, period: "мес/клиент" }, difficulty: 3,
tags: ["фриланс", "соцсети", "бизнес", "удалённо"],
description: "Кафе, барберы, салоны и магазины нуждаются в Instagram/TikTok, но не умеют вести. Ты можешь стать их SMM-специалистом.",
steps: [
"Посмотри 5 YouTube-видео про основы SMM (бесплатно, 2–3 часа)",
"Возьми реальный бизнес рядом с домой и сделай 9 постов-примеров как «фейк-кейс»",
"Зайди лично в 5–10 кафе/барберов/магазинов со своим планом",
"Предложи 2 недели бесплатно за отзыв и кейс в портфолио",
"После кейса бери 15,000–30,000₸/мес за 1 аккаунт"
],
risks: ["Первый клиент — самый тяжёлый", "Клиенты иногда не платят вовремя", "Нужна хорошая камера смартфона"],
realExample: "Нурлан, 17 лет — ведёт 3 аккаунта, зарабатывает 90,000₸/мес, учится в 11 классе.",
},
{
id: 6, title: "Перепродажа с OLX", emoji: "🛒",
category: "offline", investment: "small", speed: "fast", minAge: 14,
income: { min: 2000, max: 20000, period: "сделка" }, difficulty: 2,
tags: ["продажи", "OLX", "перепродажа", "барахолка"],
description: "Покупай дёшево на барахолках или у людей срочно, перепродавай дороже на OLX.kz или в телеграм-группах. Классика заработка с минимальным стартом.",
steps: [
"Изучи цены на OLX по категориям: телефоны, одежда, игрушки, электроника",
"Ищи объявления «срочно продам» — там цена ниже рынка на 20–40%",
"Купи за 5,000₸, почисти/сфотографируй и продай за 8,000–10,000₸",
"Реинвестируй прибыль — купи 2–3 вещи сразу",
"Специализируйся: телефоны, кроссовки или детские вещи — самый ходовой товар"
],
risks: ["Нужны стартовые деньги", "Можно купить «кота в мешке»", "Иногда товар продаётся медленно"],
realExample: "Санжар, 16 лет — перепродаёт б/у телефоны, зарабатывает 50,000–80,000₸/мес.",
},
{
id: 7, title: "Написание текстов / копирайтинг", emoji: "✍️",
category: "online", investment: "none", speed: "medium", minAge: 13,
income: { min: 1000, max: 15000, period: "статья" }, difficulty: 2,
tags: ["фриланс", "писательство", "удалённо", "без навыков"],
description: "Пиши тексты для сайтов, постов в Instagram и описания товаров. Начать можно без портфолио — клиентам нужен просто грамотный текст.",
steps: [
"Зарегистрируйся на Kwork.ru — создай гиг «напишу текст за 1,000₸»",
"Сделай 3 примера текстов в разных стилях (товар, статья, Instagram-пост)",
"Напиши в казахстанские бизнес-чаты в Telegram: «Пишу тексты от 1,000₸»",
"Первые 5–10 заказов — любая цена, главное получить отзывы",
"После 10 отзывов подними цену до 3,000–7,000₸ за текст"
],
risks: ["Конкуренция на фрилансе высокая", "Первые заказы за копейки", "Нужна грамотность и стиль"],
realExample: "Малика, 16 лет — пишет описания товаров для интернет-магазинов, 40,000₸/мес, 2–3 часа в день.",
},
{
id: 8, title: "Мойка машин во дворе", emoji: "🚗",
category: "offline", investment: "small", speed: "fast", minAge: 13,
income: { min: 1500, max: 5000, period: "машина" }, difficulty: 1,
tags: ["физическая работа", "офлайн", "быстрый старт", "двор"],
description: "Мой машины соседей прямо во дворе. Не нужна автомойка — только вода, тряпки и желание работать. Спрос есть всегда.",
steps: [
"Купи: ведро, губки, тряпки из микрофибры, автошампунь — итого ~2,000–3,000₸",
"Сфоткай результат после первой машины (можно машину родителей)",
"Напиши пост в домовой чат: «Помою машину — 2,000₸, выезжаю во двор»",
"Работай по выходным — в субботу утром больше всего желающих",
"Добавь полировку за +1,000₸ — клиенты охотно берут"
],
risks: ["Зимой сложнее работать", "Нужен доступ к воде", "Сезонность"],
realExample: "Ерлан, 14 лет, Алматы — моет 5–8 машин в выходной день, 15,000–25,000₸ за уикенд.",
},
{
id: 9, title: "Дизайн в Canva", emoji: "🖼",
category: "online", investment: "none", speed: "medium", minAge: 13,
income: { min: 2000, max: 20000, period: "проект" }, difficulty: 2,
tags: ["фриланс", "дизайн", "удалённо", "Canva"],
description: "Делай логотипы, посты для Instagram, баннеры и визитки в Canva. Это просто, красиво и хорошо оплачивается — особенно для малого бизнеса.",
steps: [
"Зарегистрируйся в Canva.com — всё бесплатно",
"Посмотри 2–3 видео «Canva для бизнеса» на YouTube",
"Сделай 5–10 примеров работ: логотип, пост, баннер, визитка",
"Создай профиль на Kwork.ru со стартовой ценой 2,000₸ за логотип",
"Напиши в малые бизнесы напрямую через Instagram DM"
],
risks: ["Canva Pro стоит денег (можно обойтись бесплатной)", "Конкуренция с профессионалами", "Клиенты часто просят правки"],
realExample: "Жанна, 15 лет — делает логотипы и посты для кафе, 55,000₸/мес на 2–3 часа в день.",
},
{
id: 10, title: "Помощь пожилым с телефоном", emoji: "📞",
category: "offline", investment: "none", speed: "fast", minAge: 13,
income: { min: 1000, max: 3000, period: "визит" }, difficulty: 1,
tags: ["офлайн", "помощь", "соседи", "быстрый старт"],
description: "Помогай бабушкам и дедушкам разбираться с телефоном, устанавливать приложения, переводить деньги и пользоваться Kaspi. Спрос огромный.",
steps: [
"Расскажи соседям и родственникам, что помогаешь с телефонами",
"Установи прайс: 1,000₸ за выезд + час работы",
"Повесь объявление на подъезде: «Помогу с телефоном, недорого»",
"Расширь: настройка ТВ-приставок, установка антивируса, восстановление данных",
"Постоянные клиенты будут рекомендовать тебя друзьям"
],
risks: ["Доход нестабильный", "Иногда нужно терпение", "Проблемы бывают сложными"],
realExample: "Асель, 14 лет — помогает 4–6 соседям в неделю, стабильно 20,000–30,000₸/мес.",
},
{
id: 11, title: "Перевод текстов", emoji: "🌐",
category: "online", investment: "none", speed: "medium", minAge: 14,
income: { min: 500, max: 5000, period: "страница" }, difficulty: 2,
tags: ["фриланс", "языки", "удалённо", "английский"],
description: "Если хорошо знаешь казахский + русский или английский — переводи тексты для бизнесов, документы и субтитры. Спрос стабильный.",
steps: [
"Определи языковые пары: каз-рус, рус-англ или все три",
"Сделай 3–5 переводов-примеров (можно из публичных текстов)",
"Разместись на Kwork.ru: «Перевод текста каз/рус — 500₸/страница»",
"Найди клиентов в телеграм-группах казахстанских предпринимателей",
"С опытом берись за технические тексты — там платят больше"
],
risks: ["Нужно реально хорошо знать язык", "Работа может быть скучной", "Конкуренция с профессионалами"],
realExample: "Дастан, 17 лет — переводит юридические документы, 60,000₸/мес, 2 часа в день.",
},
{
id: 12, title: "Продажа выпечки", emoji: "🍰",
category: "offline", investment: "small", speed: "fast", minAge: 13,
income: { min: 500, max: 3000, period: "единица" }, difficulty: 2,
tags: ["еда", "офлайн", "выпечка", "школа"],
description: "Пеки торты, пирожные, самсу или чизкейки и продавай через Instagram, в школе или соседям. Домашняя выпечка ценится выше магазинной.",
steps: [
"Освой 2–3 рецепта, которые получаются стабильно хорошо",
"Сфотографируй каждое изделие — красивое фото продаёт само",
"Создай Instagram: «Домашняя выпечка [Город]»",
"Начни с предзаказов — берёшь деньги вперёд, покупаешь ингредиенты",
"Добавь доставку +500₸ — клиенты охотно платят за удобство"
],
risks: ["Нужны деньги на ингредиенты", "Первые попытки могут не удаться", "Срок годности ограничен"],
realExample: "Лейла, 16 лет, Алматы — продаёт чизкейки и брауни, 70,000₸/мес через Instagram.",
},
{
id: 13, title: "Настройка рекламы в Instagram", emoji: "📣",
category: "online", investment: "none", speed: "medium", minAge: 15,
income: { min: 10000, max: 40000, period: "мес/клиент" }, difficulty: 4,
tags: ["фриланс", "реклама", "бизнес", "удалённо"],
description: "Таргетолог — один из самых высокооплачиваемых навыков. Настраивай рекламу для малого бизнеса в Instagram. Клиенты платят много, потому что реклама приносит им продажи.",
steps: [
"Пройди бесплатный курс «Meta Blueprint» (официальный, на русском)",
"Настрой тестовую рекламную кампанию на 1,000–2,000₸ своих денег",
"Найди первого клиента: кафе, магазин, салон — за 50% скидки или бесплатно",
"Сделай кейс: потратили X₸ — получили Y заявок/продаж",
"Продавай кейс следующим клиентам за 15,000–40,000₸/мес"
],
risks: ["Нужен бюджет на тест рекламы", "Клиенты ждут результатов быстро", "Алгоритмы меняются"],
realExample: "Адиль, 17 лет — ведёт рекламу для 3 бизнесов, 120,000₸/мес, полностью удалённо.",
},
{
id: 14, title: "Создание сайтов на конструкторе", emoji: "💻",
category: "online", investment: "none", speed: "medium", minAge: 14,
income: { min: 15000, max: 80000, period: "проект" }, difficulty: 3,
tags: ["фриланс", "IT", "сайты", "удалённо"],
description: "Делай простые сайты-визитки для бизнесов на Tilda или Wix. Не нужно знать код — только научиться конструктору и продавать.",
steps: [
"Изучи Tilda.cc — бесплатный тариф + 3 часа на YouTube",
"Создай 2 демо-сайта: для кафе и для мастера по маникюру",
"Напиши в 20 бизнес-чатов Telegram: «Сделаю сайт за 20,000₸»",
"Первый сайт делай за 10,000₸ — ради кейса",
"Добавь допуслуги: обновление контента, SEO-текст — +5,000₸/мес"
],
risks: ["Обучение займёт 1–2 недели", "Клиенты могут просить нереальные правки", "Tilda платная для коммерческих сайтов"],
realExample: "Алибек, 16 лет — делает сайты для ресторанов и салонов, 150,000₸/мес, 2–3 проекта.",
},
{
id: 15, title: "Уход за домашними животными", emoji: "🐾",
category: "offline", investment: "none", speed: "fast", minAge: 13,
income: { min: 2000, max: 8000, period: "день" }, difficulty: 1,
tags: ["животные", "офлайн", "соседи", "стабильный"],
description: "Выгуливай собак, сиди с питомцами пока хозяева уехали, корми кошек. Казахстанцы всё больше заводят питомцев — спрос растёт.",
steps: [
"Расскажи всем соседям, друзьям и родственникам что берёшься за это",
"Установи цены: выгул собаки — 1,000₸/час, присмотр на день — 3,000–5,000₸",
"Напиши пост в домовые чаты с фото (можно с чужим питомцем с разрешения)",
"Первые 2–3 клиента — со скидкой, за отзыв в чате",
"Расширяйся: стрижка когтей, купание — дополнительный доход"
],
risks: ["Животные бывают агрессивными", "Нужна ответственность", "Аллергия на шерсть"],
realExample: "Камила, 14 лет — выгуливает 4 собаки каждый день, зарабатывает 35,000–45,000₸/мес.",
},
];

const ACHIEVEMENTS = [
{ id: "first_idea", title: "Первый шаг", desc: "Открыл первую идею", emoji: "🌱", xp: 50 },
{ id: "first_done", title: "Первый заработок", desc: "Отметил идею выполненной", emoji: "💰", xp: 200 },
{ id: "streak_3", title: "3 дня подряд", desc: "3-дневный стрик активности", emoji: "🔥", xp: 150 },
{ id: "income_10k", title: "10 000₸ клуб", desc: "Добавил 10,000₸ в трекер", emoji: "💎", xp: 300 },
{ id: "five_ideas", title: "Исследователь", desc: "Открыл 5 разных идей", emoji: "🗺", xp: 100 },
{ id: "ai_used", title: "Умный пользователь", desc: "Использовал AI-генератор", emoji: "🤖", xp: 75 },
{ id: "income_50k", title: "50 000₸", desc: "Добавил 50,000₸ в трекер", emoji: "🏆", xp: 500 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useLocalStorage(key, initial) {
const [val, setVal] = useState(() => {
try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
catch { return initial; }
});
const set = (v) => { setVal(v); localStorage.setItem(key, JSON.stringify(v)); };
return [val, set];
}

const diffLabel = (n) => ["", "Очень легко", "Легко", "Средне", "Сложно", "Хардкор"][n] ?? "—";
const fmt = (n) => n?.toLocaleString("ru-KZ") ?? "0";
const incomeStr = (idea) => ${fmt(idea.income.min)}–${fmt(idea.income.max)}₸/${idea.income.period};

function tag(text, color) {
return (
<span style={{
background: ${color}22, color, border: 1px solid ${color}44,
borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 700,
whiteSpace: "nowrap"
}}>{text}</span>
);
}

// ─── AI GENERATOR ─────────────────────────────────────────────────────────────

async function callAI(profile) {
const systemPrompt = Ты — эксперт по заработку для подростков в Казахстане. Отвечаешь ТОЛЬКО валидным JSON-массивом, без markdown, без текста до или после.;

const userPrompt = `Подростку ${profile.age} лет, город: ${profile.city || "Казахстан"}, навыки: ${profile.skills}, свободного времени: ${profile.hours} часов в день.

Придумай ровно 6 реальных, легальных, безопасных идей заработка. Учти местные казахстанские условия и сервисы (Kaspi, Glovo, OLX.kz, Telegram-каналы).

Верни ТОЛЬКО JSON-массив из 6 объектов:
[{"title":"...","emoji":"...","income":"например 5,000–15,000₸/день","difficulty":"Легко","timeNeeded":"2–3 часа/день","description":"2–3 предложения","firstStep":"конкретное действие прямо сейчас","warning":"главный риск"}]`;

const res = await fetch("https://api.anthropic.com/v1/messages", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
model: "claude-sonnet-4-20250514",
max_tokens: 1500,
system: systemPrompt,
messages: [{ role: "user", content: userPrompt }],
}),
});

if (!res.ok) throw new Error(API error: ${res.status});
const data = await res.json();
const text = data.content?.map(b => b.text || "").join("") || "[]";
const clean = text.replace(/json|/g, "").trim();
return JSON.parse(clean);
}

// ─── CARD COMPONENT ───────────────────────────────────────────────────────────

function IdeaCard({ idea, onClick, done, viewed }) {
const [hov, setHov] = useState(false);
return (
<div onClick={() => onClick(idea)}
onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
style={{
background: hov ? "rgba(0,255,136,0.05)" : "rgba(255,255,255,0.025)",
border: 1px solid ${done ? "#00ff8866" : hov ? "#00ff8833" : "#ffffff0f"},
borderRadius: 16, padding: "16px 18px", cursor: "pointer",
transition: "all 0.22s ease",
transform: hov ? "translateY(-2px)" : "none",
boxShadow: hov ? "0 8px 32px rgba(0,255,136,0.1)" : "none",
position: "relative", overflow: "hidden"
}}>
{done && (
<div style={{
position: "absolute", top: 10, right: 10,
background: "#00ff88", color: "#0a0a14",
fontSize: 9, fontWeight: 900, padding: "2px 8px", borderRadius: 99, letterSpacing: 0.5
}}>✓ СДЕЛАНО</div>
)}
<div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
<span style={{ fontSize: 34, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{idea.emoji}</span>
<div style={{ flex: 1, minWidth: 0 }}>
<div style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 5, lineHeight: 1.3 }}>{idea.title}</div>
<div style={{ fontSize: 12, color: "#888", marginBottom: 10, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
{idea.description}
</div>
<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
{tag(incomeStr(idea), "#00ff88")}
{tag(diffLabel(idea.difficulty), "#0099ff")}
{tag(idea.category === "online" ? "🌐 Онлайн" : "🏙 Офлайн", "#aa77ff")}
</div>
</div>
</div>
</div>
);
}

// ─── IDEA DETAIL ──────────────────────────────────────────────────────────────

function IdeaDetail({ idea, onBack, onMarkDone, isDone, onAddIncome, onUnlock }) {
const [amount, setAmount] = useState("");
const [saved, setSaved] = useState(false);

const handleSave = () => {
const n = parseInt(amount);
if (!isNaN(n) && n > 0) { onAddIncome(n, idea.title); setSaved(true); setAmount(""); }
};

return (
<div style={{ animation: "fadeUp .3s ease" }}>
<button onClick={onBack} style={backBtn}>← Назад</button>

<div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 22 }}>  
    <span style={{ fontSize: 52, lineHeight: 1 }}>{idea.emoji}</span>  
    <div>  
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{idea.title}</h1>  
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>  
        {tag(incomeStr(idea), "#00ff88")}  
        {tag(diffLabel(idea.difficulty), "#0099ff")}  
        {tag(`👶 от ${idea.minAge} лет`, "#ff9966")}  
      </div>  
    </div>  
  </div>  

  <Glass style={{ padding: 18, marginBottom: 14 }}>  
    <p style={{ color: "#ccc", lineHeight: 1.75, margin: 0, fontSize: 14 }}>{idea.description}</p>  
  </Glass>  

  <Glass color="#0088ff" style={{ padding: 18, marginBottom: 14 }}>  
    <SectionTitle color="#4da6ff">📋 Пошаговый план</SectionTitle>  
    {idea.steps.map((s, i) => (  
      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 11, alignItems: "flex-start" }}>  
        <div style={{  
          background: "linear-gradient(135deg,#0088ff,#00ff88)", borderRadius: "50%",  
          width: 22, height: 22, flexShrink: 0, display: "flex", alignItems: "center",  
          justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#0a0a14", marginTop: 2  
        }}>{i + 1}</div>  
        <span style={{ color: "#ddd", fontSize: 13, lineHeight: 1.6 }}>{s}</span>  
      </div>  
    ))}  
  </Glass>  

  <Glass color="#ff6644" style={{ padding: 18, marginBottom: 14 }}>  
    <SectionTitle color="#ff8866">⚠️ Риски</SectionTitle>  
    {idea.risks.map((r, i) => (  
      <div key={i} style={{ color: "#ffbbaa", fontSize: 13, marginBottom: 6 }}>• {r}</div>  
    ))}  
  </Glass>  

  <Glass color="#ffd700" style={{ padding: 18, marginBottom: 22 }}>  
    <SectionTitle color="#ffd700">✨ Реальный пример</SectionTitle>  
    <p style={{ color: "#ffe999", fontSize: 13, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>  
      "{idea.realExample}"  
    </p>  
  </Glass>  

  {!isDone ? (  
    <button onClick={() => { onMarkDone(idea.id); onUnlock("first_done"); }}  
      style={{ width: "100%", padding: 15, borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 900, fontSize: 15, background: "linear-gradient(135deg,#00ff88,#0088ff)", color: "#0a0a14", marginBottom: 12, transition: "opacity .2s" }}>  
      ✅ Отметить выполненным (+200 XP)  
    </button>  
  ) : (  
    <div style={{ textAlign: "center", color: "#00ff88", fontWeight: 800, marginBottom: 12 }}>🎉 Ты выполнил эту идею!</div>  
  )}  

  <Glass style={{ padding: 16 }}>  
    <div style={{ color: "#888", fontSize: 12, marginBottom: 10 }}>💸 Добавить в трекер дохода</div>  
    <div style={{ display: "flex", gap: 8 }}>  
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Сумма в ₸" type="number"  
        style={{ flex: 1, background: "#111127", border: "1px solid #2a2a44", borderRadius: 8, padding: "10px 13px", color: "#fff", fontSize: 14, outline: "none" }} />  
      <button onClick={handleSave} style={{ background: "#00ff8818", border: "1px solid #00ff8840", borderRadius: 8, color: "#00ff88", padding: "10px 16px", cursor: "pointer", fontWeight: 800, fontSize: 14 }}>  
        + Добавить  
      </button>  
    </div>  
    {saved && <div style={{ color: "#00ff88", fontSize: 12, marginTop: 8 }}>✓ Добавлено в трекер!</div>}  
  </Glass>  
</div>

);
}

// ─── AI TAB ───────────────────────────────────────────────────────────────────

function AITab({ onUnlock }) {
const [form, setForm] = useState({ age: "", city: "", skills: "", hours: "" });
const [loading, setLoading] = useState(false);
const [results, setResults] = useState([]);
const [error, setError] = useState("");
const [expanded, setExpanded] = useState(null);

const handle = async () => {
if (!form.age || !form.skills) { setError("Заполни хотя бы возраст и навыки"); return; }
setError(""); setLoading(true); setResults([]);
try {
const ideas = await callAI(form);
setResults(ideas);
onUnlock("ai_used");
} catch (e) {
setError("Ошибка при генерации. Попробуй ещё раз.");
console.error(e);
}
setLoading(false);
};

return (
<div style={{ animation: "fadeUp .3s ease" }}>
<div style={{ textAlign: "center", marginBottom: 26 }}>
<div style={{ fontSize: 48, marginBottom: 8 }}>🤖</div>
<h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0 }}>AI-Генератор идей</h2>
<p style={{ color: "#666", fontSize: 13, margin: "8px 0 0" }}>Расскажи о себе — получи идеи лично для тебя</p>
</div>

<div style={{ display: "grid", gap: 13, marginBottom: 18 }}>  
    {[  
      { k: "age", label: "Возраст", ph: "например: 16", type: "number" },  
      { k: "city", label: "Город", ph: "например: Алматы, Шымкент, Астана" },  
      { k: "skills", label: "Твои навыки и интересы", ph: "например: монтаж видео, рисование, математика" },  
      { k: "hours", label: "Свободных часов в день", ph: "например: 3", type: "number" },  
    ].map(f => (  
      <div key={f.k}>  
        <label style={{ display: "block", color: "#777", fontSize: 11, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{f.label}</label>  
        <input value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}  
          placeholder={f.ph} type={f.type || "text"}  
          style={{ width: "100%", background: "#111127", border: "1px solid #222244", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />  
      </div>  
    ))}  
  </div>  

  {error && <div style={{ color: "#ff6644", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</div>}  

  <button onClick={handle} disabled={loading} style={{  
    width: "100%", padding: 15, borderRadius: 12, border: "none",  
    background: loading ? "#1a1a2e" : "linear-gradient(135deg,#00ff88,#0088ff)",  
    color: loading ? "#444" : "#0a0a14", fontWeight: 900, fontSize: 15,  
    cursor: loading ? "not-allowed" : "pointer", transition: "all .2s",  
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8  
  }}>  
    {loading ? <><Spinner />Генерирую идеи...</> : "✨ Сгенерировать мои идеи"}  
  </button>  

  {results.length > 0 && (  
    <div style={{ marginTop: 26 }}>  
      <div style={{ color: "#00ff88", fontSize: 13, fontWeight: 700, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>  
        🎯 {results.length} идей специально для тебя  
      </div>  
      {results.map((r, i) => (  
        <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}  
          style={{ marginBottom: 12, cursor: "pointer" }}>  
          <Glass style={{ padding: 18, transition: "all .2s" }}>  
            <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>  
              <span style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{r.emoji}</span>  
              <div style={{ flex: 1 }}>  
                <div style={{ fontWeight: 800, color: "#fff", marginBottom: 6, fontSize: 15 }}>{r.title}</div>  
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: expanded === i ? 12 : 0 }}>  
                  {tag(r.income, "#00ff88")}  
                  {tag(r.difficulty, "#0099ff")}  
                  {tag(r.timeNeeded, "#aa77ff")}  
                </div>  
                {expanded === i && (  
                  <div style={{ marginTop: 10 }}>  
                    <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.65, margin: "0 0 12px" }}>{r.description}</p>  
                    <div style={{ background: "#00ff8812", border: "1px solid #00ff8830", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>  
                      <div style={{ color: "#00ff88", fontSize: 11, fontWeight: 800, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Первый шаг прямо сейчас</div>  
                      <div style={{ color: "#aaffcc", fontSize: 13 }}>{r.firstStep}</div>  
                    </div>  
                    {r.warning && (  
                      <div style={{ color: "#ff9966", fontSize: 12 }}>⚠️ {r.warning}</div>  
                    )}  
                  </div>  
                )}  
              </div>  
              <span style={{ color: "#444", fontSize: 12, marginTop: 4, flexShrink: 0 }}>{expanded === i ? "▲" : "▼"}</span>  
            </div>  
          </Glass>  
        </div>  
      ))}  
    </div>  
  )}  
</div>

);
}

// ─── PROGRESS TAB ─────────────────────────────────────────────────────────────

function ProgressTab({ income, doneIds, xp }) {
const total = income.reduce((a, b) => a + b.amount, 0);
const days = Array.from({ length: 7 }, (_, i) => {
const d = new Date(); d.setDate(d.getDate() - (6 - i));
const ds = d.toDateString();
return {
label: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][d.getDay()],
amount: income.filter(e => new Date(e.date).toDateString() === ds).reduce((a, b) => a + b.amount, 0)
};
});
const maxA = Math.max(...days.map(d => d.amount), 1);

return (
<div style={{ animation: "fadeUp .3s ease" }}>
<h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 18 }}>📈 Мой прогресс</h2>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>  
    {[  
      { v: `${fmt(total)}₸`, l: "Всего заработано", c: "#00ff88" },  
      { v: doneIds.length, l: "Выполнено идей", c: "#0099ff" },  
      { v: xp, l: "Всего XP", c: "#ffd700" },  
      { v: Math.floor(xp / 200) + 1, l: "Уровень", c: "#ff7755" },  
    ].map((s, i) => (  
      <Glass key={i} color={s.c} style={{ padding: 16, textAlign: "center" }}>  
        <div style={{ fontSize: 24, fontWeight: 900, color: s.c }}>{s.v}</div>  
        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{s.l}</div>  
      </Glass>  
    ))}  
  </div>  

  <Glass style={{ padding: 18, marginBottom: 16 }}>  
    <div style={{ color: "#aaa", fontSize: 13, marginBottom: 14, fontWeight: 700 }}>График заработка (7 дней)</div>  
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90 }}>  
      {days.map((d, i) => (  
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>  
          <div style={{  
            width: "100%", minHeight: 4, borderRadius: "3px 3px 0 0",  
            background: d.amount > 0 ? "linear-gradient(180deg,#00ff88,#0066cc)" : "#1a1a2e",  
            height: `${(d.amount / maxA) * 70 + 4}px`, transition: "height .5s ease"  
          }} />  
          <span style={{ fontSize: 10, color: "#555" }}>{d.label}</span>  
        </div>  
      ))}  
    </div>  
  </Glass>  

  {income.length > 0 ? (  
    <Glass style={{ padding: 16 }}>  
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 12, fontWeight: 700 }}>История</div>  
      {income.slice().reverse().slice(0, 10).map((e, i) => (  
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ffffff06", fontSize: 13 }}>  
          <span style={{ color: "#888" }}>{e.source}</span>  
          <span style={{ color: "#00ff88", fontWeight: 700 }}>+{fmt(e.amount)}₸</span>  
        </div>  
      ))}  
    </Glass>  
  ) : (  
    <div style={{ textAlign: "center", color: "#444", padding: "30px 0" }}>  
      Пока нет записей. Добавь первый заработок!  
    </div>  
  )}  
</div>

);
}

// ─── ACHIEVEMENTS TAB ─────────────────────────────────────────────────────────

function AchievementsTab({ unlocked }) {
return (
<div style={{ animation: "fadeUp .3s ease" }}>
<h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 18 }}>🏆 Достижения</h2>
<div style={{ display: "grid", gap: 10 }}>
{ACHIEVEMENTS.map(a => {
const got = unlocked.includes(a.id);
return (
<Glass key={a.id} color={got ? "#ffd700" : "#222"} style={{ padding: 16, opacity: got ? 1 : 0.45, display: "flex", gap: 14, alignItems: "center" }}>
<span style={{ fontSize: 34, filter: got ? "none" : "grayscale(1) brightness(.4)" }}>{a.emoji}</span>
<div>
<div style={{ fontWeight: 800, color: got ? "#ffd700" : "#555", marginBottom: 2 }}>{a.title}</div>
<div style={{ fontSize: 12, color: "#666" }}>{a.desc}</div>
<div style={{ fontSize: 11, color: got ? "#00ff88" : "#444", marginTop: 4 }}>+{a.xp} XP</div>
</div>
{got && <div style={{ marginLeft: "auto", fontSize: 22, color: "#ffd700" }}>✓</div>}
</Glass>
);
})}
</div>
</div>
);
}

// ─── COMMUNITY TAB ────────────────────────────────────────────────────────────

const STORIES = [
{ name: "Азамат К.", city: "Алматы", idea: "Курьер на велосипеде", earned: 38000, days: 7, emoji: "🚲", text: "За первую неделю заработал 38,000₸! Работаю 4 часа после школы. Главное — пиковые часы." },
{ name: "Дина М.", city: "Астана", idea: "Монтаж видео", earned: 75000, days: 30, emoji: "🎬", text: "Нашла 3 клиентов через Telegram за 2 недели. Теперь стабильно 75к в месяц, сижу дома." },
{ name: "Тимур Б.", city: "Шымкент", idea: "Репетитор", earned: 90000, days: 60, emoji: "📚", text: "5 учеников по математике. Родители рекомендуют меня друг другу — клиентов уже больше чем нужно." },
{ name: "Айгерим С.", city: "Алматы", idea: "Украшения из бисера", earned: 55000, days: 45, emoji: "🎨", text: "Начала с вложением 5,000₸. Первый заказ пришёл за 3 дня после первого поста в Instagram." },
{ name: "Нурлан А.", city: "Астана", idea: "SMM для бизнеса", earned: 90000, days: 30, emoji: "📱", text: "3 кафе, 3 аккаунта, 90,000₸/мес. Первый клиент согласился с 5-й попытки — это нормально!" },
{ name: "Лейла К.", city: "Алматы", idea: "Домашняя выпечка", earned: 68000, days: 30, emoji: "🍰", text: "Начала с чизкейков, теперь делаю торты на заказ. TikTok очень помог — пришли 150 подписчиков за неделю." },
];

function CommunityTab() {
return (
<div style={{ animation: "fadeUp .3s ease" }}>
<h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 4 }}>👥 Сообщество</h2>
<p style={{ color: "#555", fontSize: 13, marginBottom: 20 }}>Реальные истории тех, кто уже зарабатывает</p>
{STORIES.map((s, i) => (
<Glass key={i} style={{ padding: 18, marginBottom: 12 }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
<div>
<span style={{ fontWeight: 800, color: "#fff", fontSize: 14 }}>{s.name}</span>
<span style={{ color: "#555", fontSize: 12, marginLeft: 8 }}>{s.city}</span>
</div>
<span style={{ fontSize: 26 }}>{s.emoji}</span>
</div>
<p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.65, margin: "0 0 12px", fontStyle: "italic" }}>"{s.text}"</p>
<div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
{tag(${fmt(s.earned)}₸ за ${s.days} дней, "#00ff88")}
{tag(s.idea, "#0099ff")}
</div>
</Glass>
))}
</div>
);
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Glass({ children, color = "#ffffff", style = {} }) {
return (
<div style={{
background: "rgba(255,255,255,0.025)",
border: 1px solid ${color}18,
borderRadius: 14,
backdropFilter: "blur(8px)",
...style
}}>{children}</div>
);
}

function SectionTitle({ children, color }) {
return <div style={{ color, fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{children}</div>;
}

function Spinner() {
return <div style={{ width: 16, height: 16, border: "2px solid #333", borderTopColor: "#00ff88", borderRadius: "50%", animation: "spin .6s linear infinite", flexShrink: 0 }} />;
}

function XPBar({ xp }) {
const level = Math.floor(xp / 200) + 1;
const pct = (xp % 200) / 200 * 100;
return (
<div style={{ display: "flex", alignItems: "center", gap: 11 }}>
<div style={{
background: "linear-gradient(135deg,#00ff88,#0088ff)", borderRadius: "50%",
width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
fontSize: 13, fontWeight: 900, color: "#0a0a14", flexShrink: 0
}}>{level}</div>
<div style={{ flex: 1 }}>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555", marginBottom: 4 }}>
<span>Уровень {level}</span><span>{xp % 200}/200 XP</span>
</div>
<div style={{ background: "#111127", borderRadius: 99, height: 5, overflow: "hidden" }}>
<div style={{ width: ${pct}%, height: "100%", background: "linear-gradient(90deg,#00ff88,#0088ff)", transition: "width .7s ease", borderRadius: 99 }} />
</div>
</div>
</div>
);
}

const backBtn = {
background: "rgba(255,255,255,0.04)", border: "1px solid #ffffff10",
borderRadius: 8, color: "#777", padding: "7px 14px", cursor: "pointer",
fontSize: 12, marginBottom: 20, display: "inline-block"
};

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
const [tab, setTab] = useState("home");
const [detail, setDetail] = useState(null);
const [filter, setFilter] = useLocalStorage("fm_filter", "all");
const [doneIds, setDoneIds] = useLocalStorage("fm_done", []);
const [xp, setXp] = useLocalStorage("fm_xp", 0);
const [income, setIncome] = useLocalStorage("fm_income", []);
const [unlocked, setUnlocked] = useLocalStorage("fm_ach", []);
const [viewedIds, setViewedIds] = useLocalStorage("fm_viewed", []);

const addXp = (n) => setXp(p => p + n);

const unlock = (id) => {
if (!unlocked.includes(id)) {
const a = ACHIEVEMENTS.find(x => x.id === id);
setUnlocked(p => [...p, id]);
if (a) addXp(a.xp);
}
};

const openIdea = (idea) => {
setDetail(idea);
unlock("first_idea");
const next = viewedIds.includes(idea.id) ? viewedIds : [...viewedIds, idea.id];
setViewedIds(next);
if (next.length >= 5) unlock("five_ideas");
};

const markDone = (id) => {
if (!doneIds.includes(id)) { setDoneIds(p => [...p, id]); addXp(200); }
};

const addIncome = (amount, source) => {
const next = [...income, { amount, source, date: new Date().toISOString() }];
setIncome(next);
addXp(50);
const total = next.reduce((a, b) => a + b.amount, 0);
if (total >= 10000) unlock("income_10k");
if (total >= 50000) unlock("income_50k");
};

const filtered = IDEAS_DB.filter(i => {
if (filter === "online") return i.category === "online";
if (filter === "offline") return i.category === "offline";
if (filter === "free") return i.investment === "none";
if (filter === "fast") return i.speed === "fast";
return true;
});

const totalIncome = income.reduce((a, b) => a + b.amount, 0);

const NAV = [
{ id: "home", icon: "💡", label: "Идеи" },
{ id: "ai", icon: "🤖", label: "AI" },
{ id: "progress", icon: "📈", label: "Прогресс" },
{ id: "achievements", icon: "🏆", label: "Ачивки" },
{ id: "community", icon: "👥", label: "Сообщество" },
];

return (
<div style={{ minHeight: "100vh", background: "#0a0a14", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff" }}>
<style>{  @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }   @keyframes spin { to { transform:rotate(360deg) } }   * { box-sizing: border-box; margin: 0; padding: 0; }   input::placeholder { color: #333; }   ::-webkit-scrollbar { width: 3px; }   ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }   button { font-family: inherit; }  }</style>

{/* HEADER */}  
  <div style={{  
    background: "rgba(10,10,20,0.96)", backdropFilter: "blur(20px)",  
    borderBottom: "1px solid #ffffff08", padding: "12px 18px",  
    position: "sticky", top: 0, zIndex: 100,  
    display: "flex", justifyContent: "space-between", alignItems: "center"  
  }}>  
    <div>  
      <div style={{ fontSize: 17, fontWeight: 900, background: "linear-gradient(135deg,#00ff88,#0088ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>  
        ⚡ FastMoney Ideas  
      </div>  
      <div style={{ fontSize: 9, color: "#333", letterSpacing: 1.5, textTransform: "uppercase" }}>для подростков Казахстана</div>  
    </div>  
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>  
      <div style={{ textAlign: "right" }}>  
        <div style={{ fontSize: 14, fontWeight: 800, color: "#00ff88" }}>{fmt(totalIncome)}₸</div>  
        <div style={{ fontSize: 9, color: "#444" }}>заработано</div>  
      </div>  
      <div style={{  
        background: "linear-gradient(135deg,#00ff88,#0088ff)", borderRadius: "50%",  
        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",  
        fontSize: 12, fontWeight: 900, color: "#0a0a14"  
      }}>{Math.floor(xp / 200) + 1}</div>  
    </div>  
  </div>  

  {/* BODY */}  
  <div style={{ maxWidth: 580, margin: "0 auto", padding: "18px 14px 100px" }}>  

    {/* HOME */}  
    {tab === "home" && !detail && (  
      <div style={{ animation: "fadeUp .3s ease" }}>  
        <Glass style={{ padding: "13px 16px", marginBottom: 18 }}>  
          <XPBar xp={xp} />  
        </Glass>  

        <div style={{  
          background: "linear-gradient(135deg,rgba(0,255,136,.08),rgba(0,136,255,.08))",  
          border: "1px solid #00ff8820", borderRadius: 14, padding: "18px 18px",  
          marginBottom: 20, display: "flex", gap: 14, alignItems: "center"  
        }}>  
          <span style={{ fontSize: 44 }}>💸</span>  
          <div>  
            <div style={{ fontWeight: 900, fontSize: 17, color: "#fff", marginBottom: 3 }}>Заработай с нуля</div>  
            <div style={{ color: "#666", fontSize: 12, lineHeight: 1.5 }}>{IDEAS_DB.length} реальных идей для подростков · Казахстан</div>  
          </div>  
        </div>  

        {/* Filters */}  
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 6, marginBottom: 18, scrollbarWidth: "none" }}>  
          {[  
            { id: "all", label: "Все идеи" },  
            { id: "online", label: "🌐 Онлайн" },  
            { id: "offline", label: "🏙 Офлайн" },  
            { id: "free", label: "💸 Без вложений" },  
            { id: "fast", label: "⚡ Быстрый старт" },  
          ].map(f => (  
            <button key={f.id} onClick={() => setFilter(f.id)} style={{  
              background: filter === f.id ? "linear-gradient(135deg,#00ff88,#0088ff)" : "rgba(255,255,255,0.04)",  
              border: `1px solid ${filter === f.id ? "transparent" : "#ffffff0c"}`,  
              borderRadius: 99, padding: "7px 13px", color: filter === f.id ? "#0a0a14" : "#777",  
              fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s"  
            }}>{f.label}</button>  
          ))}  
        </div>  

        <div style={{ color: "#444", fontSize: 11, marginBottom: 12 }}>{filtered.length} идей</div>  
        <div style={{ display: "grid", gap: 10 }}>  
          {filtered.map(idea => (  
            <IdeaCard key={idea.id} idea={idea} onClick={openIdea}  
              done={doneIds.includes(idea.id)} viewed={viewedIds.includes(idea.id)} />  
          ))}  
        </div>  
      </div>  
    )}  

    {tab === "home" && detail && (  
      <IdeaDetail idea={detail} onBack={() => setDetail(null)}  
        onMarkDone={markDone} isDone={doneIds.includes(detail.id)}  
        onAddIncome={addIncome} onUnlock={unlock} />  
    )}  

    {tab === "ai" && <AITab onUnlock={unlock} />}  
    {tab === "progress" && <ProgressTab income={income} doneIds={doneIds} xp={xp} />}  
    {tab === "achievements" && <AchievementsTab unlocked={unlocked} />}  
    {tab === "community" && <CommunityTab />}  
  </div>  

  {/* BOTTOM NAV */}  
  <div style={{  
    position: "fixed", bottom: 0, left: 0, right: 0,  
    background: "rgba(10,10,20,0.97)", backdropFilter: "blur(20px)",  
    borderTop: "1px solid #ffffff08",  
    display: "flex", justifyContent: "space-around",  
    padding: "8px 0 16px", zIndex: 100  
  }}>  
    {NAV.map(t => (  
      <button key={t.id} onClick={() => { setTab(t.id); setDetail(null); }} style={{  
        background: "none", border: "none", cursor: "pointer",  
        display: "flex", flexDirection: "column", alignItems: "center", gap: 3,  
        padding: "4px 10px", opacity: tab === t.id ? 1 : 0.35, transition: "opacity .2s"  
      }}>  
        <span style={{ fontSize: 20, filter: tab === t.id ? "drop-shadow(0 0 6px #00ff88aa)" : "none" }}>{t.icon}</span>  
        <span style={{ fontSize: 9, color: tab === t.id ? "#00ff88" : "#555", fontWeight: tab === t.id ? 800 : 400, letterSpacing: 0.3 }}>{t.label}</span>  
      </button>  
    ))}  
  </div>  
</div>

);
}
