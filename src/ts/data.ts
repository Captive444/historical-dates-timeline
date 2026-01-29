export interface HistoricalEvent {
  year: number;
  description: string;
}

export interface TimePeriod {
  id: number;
  period: string;      
  title: string;        
  events: HistoricalEvent[];
}


export const timePeriods: TimePeriod[] = [
  {
    id: 1,
    period: "2015-2022",
    title: "Современный период развития",
    events: [
      { year: 2015, description: "Запуск нового продукта на рынок" },
      { year: 2017, description: "Расширение команды разработки" },
      { year: 2020, description: "Выход на международный рынок" },
      { year: 2022, description: "Достижение отметки в 1 млн пользователей" }
    ]
  },
  {
    id: 2,
    period: "2010-2014",
    title: "Период активного роста",
    events: [
      { year: 2010, description: "Основание компании" },
      { year: 2012, description: "Первое крупное инвестирование" },
      { year: 2013, description: "Запуск мобильного приложения" }
    ]
  },
  {
    id: 3,
    period: "2005-2009",
    title: "Формирование основ",
    events: [
      { year: 2005, description: "Первые исследования рынка" },
      { year: 2007, description: "Разработка прототипа" },
      { year: 2008, description: "Тестирование с первыми пользователями" }
    ]
  },
  {
    id: 4,
    period: "2000-2004",
    title: "Начальный этап",
    events: [
      { year: 2000, description: "Идея проекта" },
      { year: 2002, description: "Создание команды единомышленников" },
      { year: 2003, description: "Первые переговоры с инвесторами" }
    ]
  },
  {
    id: 5,
    period: "1995-1999",
    title: "Предпосылки",
    events: [
      { year: 1995, description: "Изучение технологий" },
      { year: 1997, description: "Первые эксперименты" },
      { year: 1999, description: "Определение направления развития" }
    ]
  },
  {
    id: 6,
    period: "1990-1994",
    title: "Истоки",
    events: [
      { year: 1990, description: "Появление ключевой идеи" },
      { year: 1992, description: "Первые наброски концепции" },
      { year: 1994, description: "Анализ рынка и конкурентов" }
    ]
  }
];

