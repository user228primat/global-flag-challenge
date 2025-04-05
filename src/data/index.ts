import { Category, CategoryId } from '../types';

// Parse country data from the provided format
// Format: CountryName;Capital;flagFile.svg
const parseCountryData = (data: string): Category => {
  const lines = data.trim().split('\n');
  const [categoryName, ...countryLines] = lines;
  
  const countries = countryLines.map(line => {
    const [name, capital, flagFile] = line.split(';');
    return { name, capital, flagFile };
  });

  return {
    id: categoryName.toLowerCase().replace(/\s+/g, '') as CategoryId,
    title: categoryName,
    count: countries.length,
    countries
  };
};

// Define category groups
export const categoryGroups = {
  levels: ['level1', 'level2', 'level3'],
  regions: ['europe', 'asia', 'northAmerica', 'southAmerica', 'africa', 'australiaOceania']
};

// Define category display names
export const categoryDisplayNames = {
  level1: 'Уровень 1',
  level2: 'Уровень 2',
  level3: 'Уровень 3',
  europe: 'Европа',
  asia: 'Азия',
  northAmerica: 'Северная Америка',
  southAmerica: 'Южная Америка',
  africa: 'Африка',
  australiaOceania: 'Австралия и Океания',
  capitals: 'Столицы',
  capitalsEurope: 'Столицы Европы',
  capitalsAsia: 'Столицы Азии',
  capitalsNorthAmerica: 'Столицы Северной Америки',
  capitalsSouthAmerica: 'Столицы Южной Америки',
  capitalsAfrica: 'Столицы Африки',
  capitalsAustraliaOceania: 'Столицы Австралии и Океании',
  allFlags: 'Все флаги'
};

// Prepare game categories
export const gameCategories = {
  level1: parseCountryData(level1Data),
  level2: parseCountryData(level2Data),
  level3: parseCountryData(level3Data),
  europe: parseCountryData(europeData),
  asia: parseCountryData(asiaData),
  northAmerica: parseCountryData(northAmericaData),
  southAmerica: parseCountryData(southAmericaData),
  africa: parseCountryData(africaData),
  australiaOceania: parseCountryData(australiaOceaniaData),
  allFlags: parseCountryData(allFlagsData)
};

// Complete the missing Sint Maarten entry in northAmericaData
const northAmericaData = `Северная Америка
Американские Виргинские острова;Шарлотта-Амалия;vi.svg
Ангилья;Валли;ai.svg
Антигуа и Барбуда;Сент-Джонс;ag.svg
Аруба;Ораньестад;aw.svg
Багамские Острова;Нассау;bs.svg
Барбадос;Бриджтаун;bb.svg
Белиз;Бельмопан;bz.svg
Бермуды;Гамильтон;bm.svg
Бонайре;Кралендейк;bq.svg
Британские Виргинские острова;Род-Таун;vg.svg
Гаити;Порт-о-Пренс;ht.svg
Гватемала;Гватемала;gt.svg
Гондурас;Тегусигальпа;hn.svg
Гренада;Сент-Джорджес;gd.svg
Гренландия;Нуук;gl.svg
Доминика;Розо;dm.svg
Доминиканская Республика;Санто-Доминго;do.svg
Канада;Оттава;ca.svg
Коста-Рика;Сан-Хосе;cr.svg
Куба;Гавана;cu.svg
Кюрасао;Виллемстад;cw.svg
Мексика;Мехико;mx.svg
Монтсеррат;Плимут;ms.svg
Никарагуа;Манагуа;ni.svg
Острова Кайман;Джорджтаун;ky.svg
Панама;Панама;pa.svg
Пуэрто-Рико;Сан-Хуан;pr.svg
Саба;Боттом;sb.svg
Сальвадор;Сан-Сальвадор;sv.svg
Сент-Винсент и Гренадины;Кингстаун;vc.svg
Сент-Китс и Невис;Бастер;kn.svg
Сент-Люсия;Кастри;lc.svg
Синт-Мартен;Филипсбург;sx.svg
Синт-Эстатиус;Ораньестад;tf.svg
США;Вашингтон;us.svg
Тёркс и Кайкос;Коберн-Таун;tc.svg
Тринидад и Тобаго;Порт-оф-Спейн;tt.svg
Ямайка;Кингстон;jm.svg
`;

export { 
  parseCountryData, 
  level1Data, 
  level2Data, 
  level3Data, 
  allFlagsData, 
  europeData, 
  asiaData, 
  northAmericaData, 
  southAmericaData, 
  africaData, 
  australiaOceaniaData 
};
