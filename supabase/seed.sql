-- Seed Categories
INSERT INTO categories (id, slug, name_uz, sort_order) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'savdo', 'Savdo', 1),
  ('a2222222-2222-2222-2222-222222222222', 'talim', 'Ta''lim', 2),
  ('a3333333-3333-3333-3333-333333333333', 'hujjat', 'Hujjat', 3),
  ('a4444444-4444-4444-4444-444444444444', 'ombor', 'Ombor', 4),
  ('a5555555-5555-5555-5555-555555555555', 'hr', 'HR', 5),
  ('a6666666-6666-6666-6666-666666666666', 'tahlil', 'Tahlil', 6),
  ('a7777777-7777-7777-7777-777777777777', 'boshqa', 'Boshqa', 7)
ON CONFLICT (slug) DO NOTHING;

-- Seed System Types
INSERT INTO system_types (id, slug, abbr, full_name_en, description_uz, definition_uz, when_needed_uz, key_features, category_id, icon, faq) VALUES
(
  'b1111111-1111-1111-1111-111111111111',
  'erp',
  'ERP',
  'Enterprise Resource Planning',
  'Korxona resurslarini rejalashtirish va boshqarish tizimi',
  'ERP (Enterprise Resource Planning) — kompaniyaning barcha asosiy jarayonlarini (moliya, buxgalteriya, ta''minot, ishlab chiqarish, xodimlar va savdo) yagona ma''lumotlar bazasiga birlashtiruvchi kompleks boshqaruv platformasi.',
  'Korxonada bo''limlar o''rtasida ma''lumot almashinuvi sekinlashganda, hisobotlar bir-biriga to''g''ri kelmaganda va real vaqt rejimida yagona moliya-ombor nazorati zarur bo''lganda kerak bo''ladi.',
  '["Moliya va buxgalteriya hisobi", "Ta''minot zanjiri va omborxona nazorati", "Ishlab chiqarish quvvatlarini rejalashtirish", "Yagona boshqaruv hisobotlari va audit"]'::jsonb,
  'a4444444-4444-4444-4444-444444444444',
  'Boxes',
  '[{"q": "ERP bilan oddiy buxgalteriya dasturi orasida nima farq bor?", "a": "Buxgalteriya dasturi faqat o''tgan moliyaviy amallarni ro''yxatga oladi, ERP esa kompaniyaning barcha resurslarini oldindan rejalashtirish va boshqarish imkonini beradi."}, {"q": "O''zbekistonda eng keng tarqalgan ERP qaysi?", "a": "O''zbekistonda 1C:ERP, Odoo hamda yirik sanoat korxonalarida SAP tizimlari eng mashhur hisoblanadi."}]'::jsonb
),
(
  'b2222222-2222-2222-2222-222222222222',
  'crm',
  'CRM',
  'Customer Relationship Management',
  'Mijozlar bilan munosabatlarni boshqarish tizimi',
  'CRM (Customer Relationship Management) — mijozlar bilan aloqalarni ro''yxatga olish, savdo voronkasini boshqarish, bitimlar holatini kuzatish va xizmat ko''rsatish sifatini oshirishga qaratilgan dasturiy vosita.',
  'Mijozlar so''rovlari (leadlar) yo''qolib qolayotganda, sotuvchilar kim bilan qanday gaplashganini eslay olmaganda va savdo rejasini avtomatlashtirish talab etilganda kerak.',
  '["Mijozlar yagona bazasi (baza kontaktlar)", "Savdo bosqichlari (pipeline / voronka)", "Qo''ng''iroqlar va Telegram/Instagram integratsiyasi", "Savdo bo''limi KPI tahlili"]'::jsonb,
  'a1111111-1111-1111-1111-111111111111',
  'Users',
  '[{"q": "CRM kichik do''konga kerakmi?", "a": "Chakana savdo nuqtasiga ko''proq POS kerak bo''ladi. Agar do''kon korporativ B2B savdo yoki uzoq muddatli xaridorlar bilan ishlasa, CRM juda foydali."}, {"q": "Telegramdan kelgan mijozlar CRMga tushadimi?", "a": "Ha, AmoCRM va Bitrix24 kabi zamonaviy CRM tizimlari Telegram botlar va kanallar bilan to''liq integratsiya qilinadi."}]'::jsonb
),
(
  'b3333333-3333-3333-3333-333333333333',
  'pos',
  'POS',
  'Point of Sale',
  'Savdo nuqtasi va kassa avtomatlashtirish tizimi',
  'POS (Point of Sale) — tovarlarni shtrix-kod orqali skanerlash, xaridorga fiskal chek chop etish, to''lovlarni (naqd, plastik karta, QR) qabul qilish va kassadagi operatsiyalarni hisobga olish apparat-dasturiy majmuasi.',
  'Do''kon, supermarket, dorixona yoki kafeda xaridorlarga xizmat ko''rsatish tezligini oshirish, kamomadning oldini olish va Soliq qo''mitasi onlayn-NKM talablariga rioya qilish uchun kerak.',
  '["Shtrix-kod skaneri va tarozi bilan ishlash", "Fiskal onlayn chek chop etish (OFD)", "Kassir smenasi va naqd pul balansi", "Sodiqlik kartalari va chegirma tizimi"]'::jsonb,
  'a1111111-1111-1111-1111-111111111111',
  'Store',
  '[{"q": "O''zbekiston qonunchiligida POS cheki shartmi?", "a": "Ha, barcha savdo va xizmat ko''rsatish nuqtalarida Soliq.uz bilan bog''langan fiskal kassa yoki virtual kassa chekini berish majburiydir."}]'::jsonb
),
(
  'b4444444-4444-4444-4444-444444444444',
  'wms',
  'WMS',
  'Warehouse Management System',
  'Omborxonani boshqarish tizimi',
  'WMS (Warehouse Management System) — tovarlarning omborga kirishi, manzil bo''yicha joylashtirilishi, saqlanish sharoiti, inventarizatsiya va yuklab jo''natilishini nazorat qiluvchi maxsus tizim.',
  'Omborda qaysi tovar qayerda turgani adashib ketganda, yaroqlilik muddati nazoratdan chiqqanda va yirik yuk aylanmasida adashishlar bo''lganda zarur.',
  '["Manzilli saqlash (yacheykalar va sektorlar)", "TSD (Terminallar) orqali shtrix-kod o''qish", "Yaroqlilik muddati va FIFO/FEFO hisobi", "Avtomatik inventarizatsiya o''tkazish"]'::jsonb,
  'a4444444-4444-4444-4444-444444444444',
  'Warehouse',
  '[{"q": "WMS bilan 1C ombor hisobining farqi nima?", "a": "1C tovarlarning umumiy miqdori va tannarxini hisoblaydi, WMS esa jismoniy joylashuvi (javon, qavat, yacheyka) va xodimlarning harakatini optimallashtiradi."}]'::jsonb
),
(
  'b5555555-5555-5555-5555-555555555555',
  'hrm',
  'HRM',
  'Human Resource Management',
  'Inson resurslari / xodimlarni boshqarish tizimi',
  'HRM tizimi xodimlarni ishga qabul qilish, davomat, ta''tillar, KPI baholash va kadrlar hisobini yuritishga mo''ljallangan.',
  'Xodimlar soni 30 dan oshganda, qog''ozbozlik ko''payganda va oylik hisoblashda davomat xatolari yuz berganda.',
  '["Elektron tabel va Face ID davomat", "Xodimlar shaxsiy profili va hujjatlari", "Mehnat shartnomalari monitoringi", "KPI va rag''batlantirish tizimi"]'::jsonb,
  'a5555555-5555-5555-5555-555555555555',
  'UserCheck',
  '[]'::jsonb
),
(
  'b6666666-6666-6666-6666-666666666666',
  'hris',
  'HRIS',
  'Human Resource Information System',
  'Xodimlar haqidagi ma''lumotlar tizimi',
  'Kompaniya xodimlarining barcha ma''lumotlari, malakasi va ta''tillar tarixini saqlovchi markaziy axborot bazasi.',
  'Yirik korxonalarda kadrlar hisobotlarini tizimlashtirish uchun.',
  '["Markaziy xodimlar katalogi", "Karyera o''sishi tarixi", "Malaka oshirish va sertifikatlar nazorati"]'::jsonb,
  'a5555555-5555-5555-5555-555555555555',
  'BadgeCheck',
  '[]'::jsonb
),
(
  'b7777777-7777-7777-7777-777777777777',
  'lms',
  'LMS',
  'Learning Management System',
  'Ta''lim va o''quv jarayonlarini boshqarish tizimi',
  'O''quv kurslari, video darslar, testlar, uy vazifalari va talabalar davomatini onlayn boshqarish platformasi.',
  'O''quv markazlari, xususiy maktablar yoki korporativ ichki xodimlarni o''qitish uchun.',
  '["Guruhlar va dars jadvali", "Video darslar va topshiriqlar tekshirish", "O''quvchilar balansi va to''lovlar nazorati", "Sertifikatlar generatsiyasi"]'::jsonb,
  'a2222222-2222-2222-2222-222222222222',
  'GraduationCap',
  '[]'::jsonb
),
(
  'b8888888-8888-8888-8888-888888888888',
  'bpm',
  'BPM',
  'Business Process Management',
  'Biznes jarayonlarni boshqarish tizimi',
  'Kompaniyaning muntazam takrorlanadigan ish jarayonlarini (masalan, arizani tasdiqlash, tovar berish, hisob ochish) qadam-baqadam modellashtirish va nazorat qilish vositasi.',
  'Qaror qabul qilish zanjiri uzoqqa cho''zilib ketganda va mas''uliyatsizlik paydo bo''lganda.',
  '["Vizual jarayon xaritasi (workflow)", "Avtomatik eslatmalar va muddatlar", "Elektron imzo bilan tasdiqlash", "Jarayonlar tezligi statistikasi"]'::jsonb,
  'a7777777-7777-7777-7777-777777777777',
  'GitBranch',
  '[]'::jsonb
),
(
  'b9999999-9999-9999-9999-999999999999',
  'cms',
  'CMS',
  'Content Management System',
  'Sayt kontentini boshqarish tizimi (masalan: WordPress)',
  'Dasturchi yordamisiz veb-sayt sahifalarini, maqolalar va tovarlar katalogini yaratish hamda tahrirlash imkonini beruvchi platforma.',
  'Veb-saytga tez-tez yangiliklar, mahsulotlar yoki bloglar joylash kerak bo''lganda.',
  '["Vizual matn muharriri (WYSIWYG)", "Media kutubxona (rasm, video)", "SEO optimallashtirish vositalari", "Foydalanuvchi huquqlari taqsimoti"]'::jsonb,
  'a7777777-7777-7777-7777-777777777777',
  'FileText',
  '[]'::jsonb
),
(
  'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'dms',
  'DMS',
  'Document Management System',
  'Elektron hujjat aylanmasini boshqarish tizimi',
  'Korxona ichidagi va tashqi kontragentlar bilan elektron shartnomalar, hisob-fakturalar, aktlar va arizalarni qonuniy kuchga ega elektron imzo (E-imzo) bilan almashish tizimi.',
  'Qog''oz sarfi oshib ketganda, hujjatlar yo''lda yo''qolganda va Didox/Soliq bilan integratsiya kerak bo''lganda.',
  '["E-imzo (ERI) bilan hujjat imzolash", "Hujjatlar arxivi va tezkor qidiruv", "Didox, Soliq va banklar bilan bog''lanish", "Kelim-chiqim xatlari marshruti"]'::jsonb,
  'a3333333-3333-3333-3333-333333333333',
  'FolderArchive',
  '[]'::jsonb
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'scm',
  'SCM',
  'Supply Chain Management',
  'Ta''minot zanjiri va logistikani boshqarish tizimi',
  'Xom-ashyo yetkazib beruvchilardan tortib to yakuniy iste''molchigacha bo''lgan butun moddiy oqimni boshqarish tizimi.',
  'Ishlab chiqarish va yirik savdo tarmoqlarida uzilishlarning oldini olish uchun.',
  '["Yetkazib beruvchilar reytingi", "Xom-ashyo yetishmovchiligi prognozi", "Tranzit yuklar monitoringi", "Logistika xarajatlari tahlili"]'::jsonb,
  'a4444444-4444-4444-4444-444444444444',
  'Truck',
  '[]'::jsonb
),
(
  'bccccccc-cccc-cccc-cccc-cccccccccccc',
  'tms',
  'TMS',
  'Transport Management System',
  'Transport va yetkazib berishni boshqarish tizimi',
  'Avtotransport parki, haydovchilar marshruti, yoqilg''i sarfi va yetkazib berish xizmatlarini boshqarish vositasi.',
  'Kuryerlik xizmatlari, yuk tashish va do''konlarning yetkazib berish bo''limlarida.',
  '["Optimal marshrutni xaritada chizish", "GPS trekerlar bilan integratsiya", "Yoqilg''i va transport xarajatlari", "Buyurtmachi uchun onlayn kuzatuv"]'::jsonb,
  'a4444444-4444-4444-4444-444444444444',
  'Navigation',
  '[]'::jsonb
),
(
  'bddddddd-dddd-dddd-dddd-dddddddddddd',
  'bi',
  'BI',
  'Business Intelligence',
  'Biznes tahlil va hisobotlar tizimi',
  'Turli tizimlardagi (1C, CRM, Excel, SQL) ma''lumotlarni to''plab, kompaniya rahbariyati uchun interaktiv vizual diagrammalar va grafiklar ko''rinishida taqdim etuvchi tahliliy tizim.',
  'Rahbar yuzlab sahifali jadvallardan charchab, bir qarashda biznesning umumiy holatini ko''rmoqchi bo''lganda.',
  '["Interaktiv rahbar paneli (Dashboard)", "Turli bazalardan ma''lumot yig''ish", "Daromad va xarajat tendensiyalari", "Prognozlash va anomaliyalarni topish"]'::jsonb,
  'a6666666-6666-6666-6666-666666666666',
  'BarChart3',
  '[]'::jsonb
),
(
  'beeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'saas',
  'SaaS',
  'Software as a Service',
  'Bulutli xizmat sifatidagi dasturiy ta''minot',
  'Dasturni shaxsiy serverga o''rnatmasdan, internet orqali oylik yoki yillik obuna to''lovi evaziga tayyor xizmat sifatida ishlatish modeli.',
  'Server va IT ma''murlar uchun katta mablag'' sarflamasdan darhol zamonaviy dasturdan foydalanishni boshlash uchun.',
  '["Tezkor ulanish va brauzer orqali ishlash", "Avtomatik yangilanishlar", "Ma''lumotlar xavfsiz zaxirasi", "Moslashuvchan oylik to''lov"]'::jsonb,
  'a7777777-7777-7777-7777-777777777777',
  'Cloud',
  '[]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Platforms
INSERT INTO platforms (id, slug, name, full_name, description_uz, audience_uz, pricing_model, deployment, integrations, local_support, website_url, category_id) VALUES
(
  'c1111111-1111-1111-1111-111111111111',
  '1c',
  '1C',
  '1C:Enterprise (1С:Предприятие)',
  'Buxgalteriya, savdo, ombor va xodimlar hisobi bo''yicha MDH hududidagi eng ommabop korporativ platforma.',
  'O''zbekistondagi barcha turdagi kichik, o''rta va yirik korxonalar, buxgalterlar va moliyachilar.',
  'one_time',
  'hybrid',
  '["Didox", "Soliq.uz", "Virtual kassa", "Telegram bot", "Bank-Mijoz"]'::jsonb,
  true,
  'https://1c.uz',
  'a4444444-4444-4444-4444-444444444444'
),
(
  'c2222222-2222-2222-2222-222222222222',
  'bitrix24',
  'Bitrix24',
  'Bitrix24 Korporativ Portali',
  'CRM, vazifalar taqsimoti, ichki chat, video qo''ng''iroqlar va loyiha boshqaruvini birlashtirgan universal platforma.',
  'Savdo bo''limiga ega bo''lgan, jamoaviy masofaviy ishlaydigan o''rta va yirik kompaniyalar.',
  'subscription',
  'cloud',
  '["Telegram", "WhatsApp", "IP-Telefoniya", "1C", "Elektron pochta"]'::jsonb,
  true,
  'https://bitrix24.com',
  'a1111111-1111-1111-1111-111111111111'
),
(
  'c3333333-3333-3333-3333-333333333333',
  'amocrm',
  'AmoCRM',
  'AmoCRM Savdo Tizimi',
  'Savdo voronkasi va xabar almashish (messendjerlar) orqali sotuvga ixtisoslashgan yengil va juda qulay CRM.',
  'Faol savdo bilan shug''ullanuvchi, ijtimoiy tarmoqlar orqali mijoz jalb qiluvchi kompaniyalar.',
  'subscription',
  'cloud',
  '["Telegram", "Instagram Direct", "Facebook Messenger", "Zadarma", "1C"]'::jsonb,
  true,
  'https://amocrm.com',
  'a1111111-1111-1111-1111-111111111111'
),
(
  'c4444444-4444-4444-4444-444444444444',
  'sap',
  'SAP',
  'Systems, Applications & Products in Data Processing (SAP S/4HANA)',
  'Yirik xalqaro korporatsiyalar va davlat holdinglari uchun jahon miqyosidagi yetakchi nemis ERP platformasi.',
  'Yirik zavodlar, tog''-kon metallurgiya majmualari, banklar va transmilliy kompaniyalar.',
  'custom',
  'hybrid',
  '["Global bank tizimlari", "Boshqaruv hisobi", "Lojistika modullari"]'::jsonb,
  true,
  'https://sap.com',
  'a4444444-4444-4444-4444-444444444444'
),
(
  'c5555555-5555-5555-5555-555555555555',
  'odoo',
  'Odoo',
  'Odoo Open-Source ERP & CRM',
  'Ochiq kodli, modulli va tez moslashuvchan zamonaviy xalqaro ERP tizimi.',
  'Moslashuvchan IT arxitekturasini xohlovchi o''rta biznes va distribyutorlik korxonalari.',
  'freemium',
  'cloud',
  '["E-commerce", "Omborxona", "Ishlab chiqarish", "Buxgalteriya API"]'::jsonb,
  false,
  'https://odoo.com',
  'a4444444-4444-4444-4444-444444444444'
),
(
  'c6666666-6666-6666-6666-666666666666',
  'salesforce',
  'Salesforce',
  'Salesforce Customer 360',
  'Dunyodagi eng yirik va qudratli bulutli CRM ekotizimi.',
  'Xalqaro miqyosda ishlovchi yirik korporatsiyalar va xizmat ko''rsatuvchilar.',
  'subscription',
  'cloud',
  '["Minglab AppExchange ilovalari", "Slack", "Tableau"]'::jsonb,
  false,
  'https://salesforce.com',
  'a1111111-1111-1111-1111-111111111111'
),
(
  'c7777777-7777-7777-7777-777777777777',
  'hubspot',
  'HubSpot',
  'HubSpot Inbound Marketing & CRM',
  'Inbound marketing, kontent va mijozlar oqimini jalb qilish uchun eng yaxshi xalqaro CRM platformasi.',
  'B2B xizmatlar, IT kompaniyalar va raqamli marketing agentliklari.',
  'freemium',
  'cloud',
  '["Google Ads", "WordPress", "Mailchimp", "Zapier"]'::jsonb,
  false,
  'https://hubspot.com',
  'a1111111-1111-1111-1111-111111111111'
),
(
  'c8888888-8888-8888-8888-888888888888',
  'trello',
  'Trello',
  'Trello Kanban Board',
  'Kanban vizual doskalari asosida vazifalarni sodda va qulay boshqarish vositasi.',
  'Startaplar, kichik jamoalar va shaxsiy loyihalar ustida ishlovchilar.',
  'freemium',
  'cloud',
  '["Slack", "Google Drive", "Confluence"]'::jsonb,
  false,
  'https://trello.com',
  'a7777777-7777-7777-7777-777777777777'
),
(
  'c9999999-9999-9999-9999-999999999999',
  'jira',
  'Jira',
  'Jira Software by Atlassian',
  'Dasturiy ta''minot ishlab chiquvchilar va Agile jamoalari uchun sanoat standarti hisoblangan loyiha boshqaruvi.',
  'IT kompaniyalar, texnologik jamoalar va murakkab mahsulot yaratuvchilar.',
  'subscription',
  'cloud',
  '["GitHub", "GitLab", "Bitbucket", "Confluence"]'::jsonb,
  false,
  'https://atlassian.com/software/jira',
  'a7777777-7777-7777-7777-777777777777'
),
(
  'caaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'asana',
  'Asana',
  'Asana Work Management',
  'Jamoaviy vazifalar, loyiha vaqtlari va maqsadlarini aniq koordinatsiya qilish platformasi.',
  'O''rta va yirik korxonalarning loyiha menejerlari va kreativ jamoalari.',
  'freemium',
  'cloud',
  '["Slack", "Zoom", "Google Workspace", "Microsoft Teams"]'::jsonb,
  false,
  'https://asana.com',
  'a7777777-7777-7777-7777-777777777777'
),
(
  'cbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'notion',
  'Notion',
  'Notion All-in-One Workspace',
  'Kompaniya ichki bilimlari bazasi (wiki), hujjatlar va yengil vazifalar uchun yagona ish maydoni.',
  'IT, konsalting, ta''lim va zamonaviy jamoalar.',
  'freemium',
  'cloud',
  '["Figma", "Slack", "GitHub", "Google Drive"]'::jsonb,
  false,
  'https://notion.so',
  'a3333333-3333-3333-3333-333333333333'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Local Uzbek Systems
INSERT INTO local_systems (id, slug, name, description_uz, use_case_tags, official_url) VALUES
(
  'd1111111-1111-1111-1111-111111111111',
  'billz',
  'BILLZ',
  'Chakana va kiyim-kechak do''konlari, supermarketlar uchun O''zbekistonda yaratilgan yetakchi POS va ombor hisobi tizimi. Fiskal kassa va to''lovlar bilan to''liq integratsiya qilingan.',
  ARRAY['Chakana savdo', 'Ombor', 'Kassa', 'Soliq'],
  'https://billz.uz'
),
(
  'd2222222-2222-2222-2222-222222222222',
  'modme',
  'Modme',
  'O''quv markazlari va ta''lim muassasalari uchun maxsus yaratilgan CRM va LMS tizimi. Dars jadvallari, o''quvchilar hisobi va ota-onalarga SMS xabarnomalar yuborishni avtomatlashtiradi.',
  ARRAY['O''quv markazi', 'Ta''lim', 'SMS xabarnoma', 'Click/Payme'],
  'https://modme.uz'
),
(
  'd3333333-3333-3333-3333-333333333333',
  'didox',
  'Didox',
  'Elektron hisob-fakturalar (EHF), shartnomalar, dalolatnomalar va ishonchnomalarni E-imzo orqali qonuniy almashish bo''yicha O''zbekistondagi 1-raqamli DMS operatori.',
  ARRAY['Hujjat aylanmasi', 'Soliq', 'E-imzo', 'Buxgalteriya'],
  'https://didox.uz'
),
(
  'd4444444-4444-4444-4444-444444444444',
  'soliq-uz',
  'Soliq.uz / MySoliq',
  'Davlat soliq qo''mitasining rasmiy elektron xizmatlar portali, onlayn-NKM fiskal ma''lumotlar operatori va soliq hisobotlari yagona tizimi.',
  ARRAY['Soliq', 'Fiskal kassa', 'Hisobotlar', 'Davlat xizmatlari'],
  'https://soliq.uz'
),
(
  'd5555555-5555-5555-5555-555555555555',
  'iiko',
  'iiko',
  'Restoranlar, kafelar, barlar va yetkazib berish xizmatlari uchun ixtisoslashtirilgan kassa, oshxona va texnologik xaritalar boshqaruv tizimi.',
  ARRAY['Restoran', 'Kafe', 'Kassa', 'Yetkazib berish'],
  'https://iiko.uz'
),
(
  'd6666666-6666-6666-6666-666666666666',
  'r-keeper',
  'R-Keeper',
  'Umumiy ovqatlanish va mehmondo''stlik sohasida uzoq yillik tajribaga ega bo''lgan professional POS va oshxona boshqaruvi tizimi.',
  ARRAY['Restoran', 'Mehmonxona', 'Kassa', 'Ombor hisobi'],
  'https://r-keeper.uz'
)
ON CONFLICT (slug) DO NOTHING;
