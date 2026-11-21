export type Sector =
  | "retail"
  | "education"
  | "horeca"
  | "manufacturing"
  | "services"
  | "logistics";

export type CompanySize = "micro" | "small" | "medium" | "enterprise";

export type PrimaryGoal = "sales" | "warehouse" | "finance" | "employees" | "all";

export interface RecommendationInput {
  sector: Sector;
  size: CompanySize;
  goal: PrimaryGoal;
}

export interface RecommendationResult {
  id: string;
  name: string;
  category: string;
  reason_uz: string;
  link: string;
}

export function recommendSystems(input: RecommendationInput): RecommendationResult[] {
  const { sector, size, goal } = input;
  const results: RecommendationResult[] = [];

  // Retail Sector
  if (sector === "retail") {
    results.push({
      id: "billz",
      name: "BILLZ (POS & Ombor)",
      category: "Mahalliy POS tizimi",
      reason_uz:
        "Chakana savdo, kiyim-kechak va supermarketlar uchun O‘zbekiston kassa apparatlari hamda Soliq.uz fiskalizatsiyasiga 100% moslashgan.",
      link: "/ozbekiston",
    });

    if (size === "medium" || size === "enterprise" || goal === "warehouse") {
      results.push({
        id: "1c",
        name: "1C:Trade & Ombor",
        category: "Boshqaruv hisobi",
        reason_uz:
          "Katta tovar aylanmasi, ulgurji savdo va filiallararo ombor qoldiqlarini aniq nazorat qilish uchun eng mustahkam yechim.",
        link: "/platformalar/1c",
      });
    } else {
      results.push({
        id: "amocrm",
        name: "AmoCRM",
        category: "Savdo va Mijozlar",
        reason_uz:
          "Telegram va Instagram orqali kelgan onlayn buyurtmalarni zudlik bilan qabul qilish va doimiy mijozlarni qayta jalb qilish uchun.",
        link: "/platformalar/amocrm",
      });
    }

    results.push({
      id: "didox",
      name: "Didox (E-hujjat DMS)",
      category: "Elektron hisob-faktura",
      reason_uz:
        "Yetkazib beruvchilardan kelgan tovar schyot-fakturalarini bir soniyada elektron imzo bilan qabul qilish va Soliqqa yuborish uchun.",
      link: "/ozbekiston",
    });
    return results.slice(0, 3);
  }

  // Education Sector
  if (sector === "education") {
    results.push({
      id: "modme",
      name: "Modme CRM & LMS",
      category: "Ta'lim boshqaruvi",
      reason_uz:
        "O‘quv markazlari uchun dars jadvallari, o‘quvchilar balansi, to‘lovlar va ota-onalarga SMS xabarnomalarni to‘liq avtomatlashtiradi.",
      link: "/ozbekiston",
    });

    results.push({
      id: "amocrm",
      name: "AmoCRM",
      category: "Lidlar va Qabullar",
      reason_uz:
        "Kurslarga yangi o‘quvchilarni jalb qilish, reklama samaradorligini o‘lchash va savdo voronkasini tezkor yuritish.",
      link: "/platformalar/amocrm",
    });

    results.push({
      id: "didox",
      name: "Didox",
      category: "Hujjat aylanmasi",
      reason_uz:
        "Talabalar va korporativ mijozlar bilan rasmiy elektron shartnomalar tuzish uchun.",
      link: "/ozbekiston",
    });
    return results.slice(0, 3);
  }

  // HoReCa (Restaurants, Cafes)
  if (sector === "horeca") {
    results.push({
      id: "iiko",
      name: "iiko POS & Restoran",
      category: "Restoran avtomatizatsiyasi",
      reason_uz:
        "Oshxona texnologik xaritalari, mahsulot sarfi, ofitsiantlar plansheti va tezkor yetkazib berish xizmati uchun jahon standarti.",
      link: "/ozbekiston",
    });

    results.push({
      id: "r-keeper",
      name: "R-Keeper",
      category: "Kassa va Mehmonxona",
      reason_uz:
        "Uzoq yillik ishonchli kassa apparatlari, mehmonlar sodiqlik dasturlari va ombor zaxiralari nazorati.",
      link: "/ozbekiston",
    });

    results.push({
      id: "1c",
      name: "1C:Buxgalteriya",
      category: "Rasmiy soliq & hisob",
      reason_uz:
        "Oshxona xarajatlari, xodimlar oyligi va davlat soliq hisobotlarini yagona tizimda shakllantirish.",
      link: "/platformalar/1c",
    });
    return results.slice(0, 3);
  }

  // Manufacturing / Production
  if (sector === "manufacturing") {
    if (size === "enterprise") {
      results.push({
        id: "sap",
        name: "SAP S/4HANA",
        category: "Global Korporativ ERP",
        reason_uz:
          "Yirik ishlab chiqarish quvvatlari, xom-ashyo yetkazib berish zanjiri va xalqaro moliya auditini eng yuqori darajada boshqaradi.",
        link: "/platformalar/sap",
      });
    } else {
      results.push({
        id: "odoo",
        name: "Odoo ERP",
        category: "Modulli Ochiq ERP",
        reason_uz:
          "Ishlab chiqarish (MRP), sexlar bo‘yicha topshiriqlar, mahsulot tannarxi va ombor hisobini moslashuvchan tarzda yuritadi.",
        link: "/platformalar/odoo",
      });
    }

    results.push({
      id: "1c",
      name: "1C:ERP & Buxgalteriya",
      category: "Ishlab chiqarish & Soliq",
      reason_uz:
        "O‘zbekiston milliy buxgalteriya standartlari (BHMS) bo‘yicha tannarxni to‘liq hisoblab beruvchi standart tizim.",
      link: "/platformalar/1c",
    });

    results.push({
      id: "didox",
      name: "Didox DMS",
      category: "Elektron hujjatlar",
      reason_uz:
        "Ulgurji xaridorlar va xom-ashyo yetkazib beruvchilar bilan qog‘ozsiz yirik elektron shartnoma aylanmasi.",
      link: "/ozbekiston",
    });
    return results.slice(0, 3);
  }

  // Default / Services / Logistics
  results.push({
    id: "bitrix24",
    name: "Bitrix24",
    category: "Korporativ Portal & CRM",
    reason_uz:
      "Jamoaviy vazifalar, ichki chatlar, mijozlar bilan munosabatlar va xodimlar davomatini yagona bulutda birlashtiradi.",
    link: "/platformalar/bitrix24",
  });

  results.push({
    id: "amocrm",
    name: "AmoCRM",
    category: "Savdo voronkasi",
    reason_uz:
      "Menejerlar faoliyatini va savdo voronkasini qulay nazorat qilish hamda xizmatlar ko‘rsatish tezligini oshirish.",
    link: "/platformalar/amocrm",
  });

  results.push({
    id: "didox",
    name: "Didox E-hujjat",
    category: "Elektron faktura",
    reason_uz:
      "B2B xizmat ko‘rsatish va konsalting shartnomalarini masofadan turib E-imzo orqali qonuniy rasmiylashtirish.",
    link: "/ozbekiston",
  });

  return results.slice(0, 3);
}
