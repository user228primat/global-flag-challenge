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

// Asia data
const asiaData = `Азия
Азербайджан;Баку;az.svg
Армения;Ереван;am.svg
Афганистан;Кабул;af.svg
Бангладеш;Дакка;bd.svg
Бахрейн;Манама;bh.svg
Бруней;Бандар-Сери-Бегаван;bn.svg
Бутан;Тхимпху;bt.svg
Восточный Тимор;Дили;tl.svg
Вьетнам;Ханой;vn.svg
Гонконг;Гонконг;hk.svg
Грузия;Тбилиси;ge.svg
Израиль;Иерусалим;il.svg
Индия;Нью-Дели;in.svg
Индонезия;Джакарта;id.svg
Иордания;Амман;jo.svg
Ирак;Багдад;iq.svg
Иран;Тегеран;ir.svg
Йемен;Сана;ye.svg
Казахстан;Астана;kz.svg
Камбоджа;Пномпень;kh.svg
Катар;Доха;qa.svg
Китай;Пекин;cn.svg
Кокосовые острова;Уэст-Айленд;cc.svg
Кувейт;Эль-Кувейт;kw.svg
Кыргызстан;Бишкек;kg.svg
Лаос;Вьентьян;la.svg
Ливан;Бейрут;lb.svg
Макао;Макао;mo.svg
Малайзия;Куала-Лумпур;my.svg
Мальдивы;Мале;mv.svg
Монголия;Улан-Батор;mn.svg
Мьянма;Нейпьидо;mm.svg
Непал;Катманду;np.svg
ОАЭ;Абу-Даби;ae.svg
Оман;Маскат;om.svg
Остров Рождества;Флайинг-Фиш-Ков;cx.svg
Пакистан;Исламабад;pk.svg
Палестина;Рамалла;ps.svg
Россия;Москва;ru.svg
Саудовская Аравия;Эр-Рияд;sa.svg
Северная Корея;Пхеньян;kp.svg
Сингапур;Сингапур;sg.svg
Сирия;Дамаск;sy.svg
Таджикистан;Душанбе;tj.svg
Таиланд;Бангкок;th.svg
Тайвань;Тайбэй;tw.svg
Туркменистан;Ашхабад;tm.svg
Турция;Анкара;tr.svg
Узбекистан;Ташкент;uz.svg
Филиппины;Манила;ph.svg
Шри-Ланка;Шри-Джаяварденепура-Котте;lk.svg
Южная Корея;Сеул;kr.svg
Япония;Токио;jp.svg`;

// South America data
const southAmericaData = `Южная Америка
Аргентина;Буэнос-Айрес;ar.svg
Боливия;Сукре;bo.svg
Бразилия;Бразилия;br.svg
Венесуэла;Каракас;ve.svg
Гайана;Джорджтаун;gy.svg
Колумбия;Богота;co.svg
Парагвай;Асунсьон;py.svg
Перу;Лима;pe.svg
Суринам;Парамарибо;sr.svg
Уругвай;Монтевидео;uy.svg
Чили;Сантьяго;cl.svg
Эквадор;Кито;ec.svg`;

// Australia and Oceania data
const australiaOceaniaData = `Австралия и Океания
Австралия;Канберра;au.svg
Американское Самоа;Паго-Паго;as.svg
Вануату;Порт-Вила;vu.svg
Гуам;Хагатна;gu.svg
Кирибати;Южная Тарава;ki.svg
Маршалловы Острова;Маджуро;mh.svg
Науру;Ярен;nr.svg
Ниуэ;Алофи;nu.svg
Новая Зеландия;Веллингтон;nz.svg
Новая Каледония;Нумеа;nc.svg
Остров Норфолк;Кингстон;nf.svg
Остров Пасхи;Анга-Роа;easter-island.svg
Острова Кука;Аваруа;ck.svg
Острова Питкэрн;Адамстаун;pn.svg
Палау;Нгерулмуд;pw.svg
Папуа – Новая Гвинея;Порт-Морсби;pg.svg
Самоа;Апиа;ws.svg
Северные Марианские Острова;Сайпан;mp.svg
Соломоновы Острова;Хониара;sb.svg
Токелау;Атафу;tk.svg
Тонга;Нукуалофа;to.svg
Тувалу;Фунафути;tv.svg
Федеративные Штаты Микронезии;Паликир;fm.svg
Фиджи;Сува;fj.svg
Французская Полинезия;Папеэте;pf.svg`;

// Europe data
const europeData = `Европа
Австрия;Вена;at.svg
Азербайджан;Баку;az.svg
Аландские острова;Мариехамн;ax.svg
Албания;Тирана;al.svg
Англия;Лондон;gb-eng.svg
Андорра;Андорра-ла-Велья;ad.svg
Армения;Ереван;am.svg
Беларусь;Минск;by.svg
Бельгия;Брюссель;be.svg
Болгария;София;bg.svg
Босния и Герцеговина;Сараево;ba.svg
Ватикан;Ватикан;va.svg
Великобритания;Лондон;gb.svg
Венгрия;Будапешт;hu.svg
Германия;Берлин;de.svg
Гернси;Сент-Питер-Порт;gg.svg
Гибралтар;Гибралтар;gi.svg
Греция;Афины;gr.svg
Грузия;Тбилиси;ge.svg
Дания;Копенгаген;dk.svg
Джерси;Сент-Хельер;je.svg
Европейский союз;Брюссель;eu.svg
Ирландия;Дублин;ie.svg
Исландия;Рейкьявик;is.svg
Испания;Мадрид;es.svg
Италия;Рим;it.svg
Казахстан;Астана;kz.svg
Кипр;Никосия;cy.svg
Косово;Приштина;xk.svg
Латвия;Рига;lv.svg
Литва;Вильнюс;lt.svg
Лихтенштейн;Вадуц;li.svg
Люксембург;Люксембург;lu.svg
Мальта;Валлетта;mt.svg
Молдова;Кишинёв;md.svg
Монако;Монако;mc.svg
Нидерланды;Амстердам;nl.svg
Норвегия;Осло;no.svg
Остров Мэн;Дуглас;im.svg
Польша;Варшава;pl.svg
Португалия;Лиссабон;pt.svg
Россия;Москва;ru.svg
Румыния;Бухарест;ro.svg
Сан-Марино;Сан-Марино;sm.svg
Северная Ирландия;Белфаст;gb-nir.svg
Северная Македония;Скопье;mk.svg
Сербия;Белград;rs.svg
Словакия;Братислава;sk.svg
Словения;Любляна;si.svg
Турция;Анкара;tr.svg
Украина;Киев;ua.svg
Уэльс;Кардифф;gb-wls.svg
Фарерские острова;Торсхавн;fo.svg
Финляндия;Хельсинки;fi.svg
Франция;Париж;fr.svg
Хорватия;Загреб;hr.svg
Черногория;Подгорица;me.svg
Чехия;Прага;cz.svg
Швейцария;Берн;ch.svg
Швеция;Стокгольм;se.svg
Шотландия;Эдинбург;gb-sct.svg
Эстония;Таллин;ee.svg`;

// North America data
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
Ямайка;Кингстон;jm.svg`;

// Africa data
const africaData = `Африка
Алжир;Алжир;dz.svg
Ангола;Луанда;ao.svg
Бенин;Порто-Ново;bj.svg
Ботсвана;Габороне;bw.svg
Буркина-Фасо;Уагадугу;bf.svg
Бурунди;Гитега;bi.svg
Габон;Либревиль;ga.svg
Гамбия;Банжул;gm.svg
Гана;Аккра;gh.svg
Гвинея;Конакри;gn.svg
Гвинея-Бисау;Бисау;gw.svg
Демократическая Республика Конго;Киншаса;cd.svg
Джибути;Джибути;dj.svg
Египет;Каир;eg.svg
Замбия;Лусака;zm.svg
Зимбабве;Хараре;zw.svg
Кабо-Верде;Прая;cv.svg
Камерун;Яунде;cm.svg
Кения;Найроби;ke.svg
Коморы;Морони;km.svg
Кот-д'Ивуар;Ямусукро;ci.svg
Лесото;Масеру;ls.svg
Либерия;Монровия;lr.svg
Ливия;Триполи;ly.svg
Маврикий;Порт-Луи;mu.svg
Мавритания;Нуакшот;mr.svg
Мадагаскар;Антананариву;mg.svg
Малави;Лилонгве;mw.svg
Мали;Бамако;ml.svg
Марокко;Рабат;ma.svg
Мозамбик;Мапуту;mz.svg
Намибия;Виндхук;na.svg
Нигер;Ниамей;ne.svg
Нигерия;Абуджа;ng.svg
Республика Конго;Браззавиль;cg.svg
Руанда;Кигали;rw.svg
Сан-Томе и Принсипи;Сан-Томе;st.svg
Сейшельские Острова;Виктория;sc.svg
Сенегал;Дакар;sn.svg
Сомали;Могадишо;so.svg
Судан;Хартум;sd.svg
Сьерра-Леоне;Фритаун;sl.svg
Танзания;Додома;tz.svg
Того;Ломе;tg.svg
Тунис;Тунис;tn.svg
Уганда;Кампала;ug.svg
Центральноафриканская Республика;Банги;cf.svg
Чад;Нджамена;td.svg
Экваториальная Гвинея;Малабо;gq.svg
Эритрея;Асмэра;er.svg
Эсватини;Мбабане;sz.svg
Эфиопия;Аддис-Абеба;et.svg
ЮАР;Претория;za.svg
Южный Судан;Джуба;ss.svg`;

// Level 1 data - оставляем как есть
const level1Data = `Уровень 1
Беларусь;Минск;by.svg
Бразилия;Бразилиа;br.svg
Великобритания;Лондон;gb.svg
Германия;Берлин;de.svg
Индия;Нью-Дели;in.svg
Испания;Мадрид;es.svg
Италия;Рим;it.svg
Казахстан;Астана;kz.svg
Канада;Оттава;ca.svg
Китай;Пекин;cn.svg
Россия;Москва;ru.svg
США;Вашингтон;us.svg
Турция;Анкара;tr.svg
Украина;Киев;ua.svg
Франция;Париж;fr.svg
Южная Корея;Сеул;kr.svg
Япония;Токио;jp.svg`;

// Level 2 data - обновляем до 50 стран
const level2Data = `Уровень 2
Австралия;Канберра;au.svg
Австрия;Вена;at.svg
Азербайджан;Баку;az.svg
Алжир;Алжир;dz.svg
Аргентина;Буэнос-Айрес;ar.svg
Армения;Ереван;am.svg
Афганистан;Кабул;af.svg
Беларусь;Минск;by.svg
Бельгия;Брюссель;be.svg
Болгария;София;bg.svg
Бразилия;Бразилиа;br.svg
Великобритания;Лондон;gb.svg
Венгрия;Будапешт;hu.svg
Вьетнам;Ханой;vn.svg
Германия;Берлин;de.svg
Греция;Афины;gr.svg
Грузия;Тбилиси;ge.svg
Дания;Копенгаген;dk.svg
Египет;Каир;eg.svg
Израиль;Иерусалим;il.svg
Индия;Нью-Дели;in.svg
Индонезия;Джакарта;id.svg
Ирак;Багдад;iq.svg
Иран;Тегеран;ir.svg
Ирландия;Дублин;ie.svg
Исландия;Рейкьявик;is.svg
Испания;Мадрид;es.svg
Италия;Рим;it.svg
Казахстан;Астана;kz.svg
Канада;Оттава;ca.svg
Кения;Найроби;ke.svg
Китай;Пекин;cn.svg
Колумбия;Богота;co.svg
Малайзия;Куала-Лумпур;my.svg
Мексика;Мехико;mx.svg
Нидерланды;Амстердам;nl.svg
Новая Зеландия;Веллингтон;nz.svg
Норвегия;Осло;no.svg
ОАЭ;Абу-Даби;ae.svg
Пакистан;Исламабад;pk.svg
Польша;Варшава;pl.svg
Португалия;Лиссабон;pt.svg
Россия;Москва;ru.svg
Саудовская Аравия;Эр-Рияд;sa.svg
Сингапур;Сингапур;sg.svg
США;Вашингтон;us.svg
Турция;Анкара;tr.svg
Украина;Киев;ua.svg
Швеция;Стокгольм;se.svg
Япония;Токио;jp.svg`;

// Level 3 data - обновляем до 100 стран
const level3Data = `Уровень 3
Австралия;Канберра;au.svg
Австрия;Вена;at.svg
Азербайджан;Баку;az.svg
Албания;Тирана;al.svg
Алжир;Алжир;dz.svg
Ангола;Луанда;ao.svg
Аргентина;Буэнос-Айрес;ar.svg
Армения;Ереван;am.svg
Афганистан;Кабул;af.svg
Бангладеш;Дакка;bd.svg
Бахрейн;Манама;bh.svg
Беларусь;Минск;by.svg
Бельгия;Брюссель;be.svg
Болгария;София;bg.svg
Боливия;Сукре;bo.svg
Босния и Герцеговина;Сараево;ba.svg
Ботсвана;Габороне;bw.svg
Бразилия;Бразилиа;br.svg
Буркина-Фасо;Уагадугу;bf.svg
Бурунди;Гитега;bi.svg
Великобритания;Лондон;gb.svg
Венгрия;Будапешт;hu.svg
Венесуэла;Каракас;ve.svg
Вьетнам;Ханой;vn.svg
Габон;Либревиль;ga.svg
Гаити;Порт-о-Пренс;ht.svg
Гамбия;Банжул;gm.svg
Гана;Аккра;gh.svg
Гватемала;Гватемала;gt.svg
Гвинея;Конакри;gn.svg
Германия;Берлин;de.svg
Гондурас;Тегусигальпа;hn.svg
Греция;Афины;gr.svg
Грузия;Тбилиси;ge.svg
Дания;Копенгаген;dk.svg
Доминиканская Республика;Санто-Доминго;do.svg
Египет;Каир;eg.svg
Замбия;Лусака;zm.svg
Зимбабве;Хараре;zw.svg
Израиль;Иерусалим;il.svg
Индия;Нью-Дели;in.svg
Индонезия;Джакарта;id.svg
Иордания;Амман;jo.svg
Ирак;Багдад;iq.svg
Иран;Тегеран;ir.svg
Ирландия;Дублин;ie.svg
Исландия;Рейкьявик;is.svg
Испания;Мадрид;es.svg
Италия;Рим;it.svg
Йемен;Сана;ye.svg
Казахстан;Астана;kz.svg
Камбоджа;Пномпень;kh.svg
Камерун;Яунде;cm.svg
Канада;Оттава;ca.svg
Кения;Найроби;ke.svg
Кипр;Никосия;cy.svg
Китай;Пекин;cn.svg
Колумбия;Богота;co.svg
Коста-Рика;Сан-Хосе;cr.svg
Кот-д'Ивуар;Ямусукро;ci.svg
Куба;Гавана;cu.svg
Кувейт;Эль-Кувейт;kw.svg
Кыргызстан;Бишкек;kg.svg
Лаос;Вьентьян;la.svg
Латвия;Рига;lv.svg
Ливан;Бейрут;lb.svg
Ливия;Триполи;ly.svg
Литва;Вильнюс;lt.svg
Люксембург;Люксембург;lu.svg
Маврикий;Порт-Луи;mu.svg
Мадагаскар;Антананариву;mg.svg
Малайзия;Куала-Лумпур;my.svg
Мали;Бамако;ml.svg
Марокко;Рабат;ma.svg
Мексика;Мехико;mx.svg
Мозамбик;Мапуту;mz.svg
Молдова;Кишинёв;md.svg
Монголия;Улан-Батор;mn.svg
Намибия;Виндхук;na.svg
Непал;Катманду;np.svg
Нигерия;Абуджа;ng.svg
Нидерланды;Амстердам;nl.svg
Никарагуа;Манагуа;ni.svg
Новая Зеландия;Веллингтон;nz.svg
Норвегия;Осло;no.svg
ОАЭ;Абу-Даби;ae.svg
Оман;Маскат;om.svg
Пакистан;Исламабад;pk.svg
Панама;Панама;pa.svg
Папуа – Новая Гвинея;Порт-Морсби;pg.svg
Парагвай;Асунсьон;py.svg
Перу;Лима;pe.svg
Польша;Варшава;pl.svg
Португалия;Лиссабон;pt.svg
Россия;Москва;ru.svg
Руанда;Кигали;rw.svg
Румыния;Бухарест;ro.svg
Саудовская Аравия;Эр-Рияд;sa.svg
Сенегал;Дакар;sn.svg
Сербия;Белград;rs.svg
Сингапур;Сингапур;sg.svg
Сирия;Дамаск;sy.svg
Словакия;Братислава;sk.svg
Словения;Любляна;si.svg
США;Вашингтон;us.svg`;

// All flags data
const allFlagsData = `Все флаги
Австралия;Канберра;au.svg
Австрия;Вена;at.svg
Азербайджан;Баку;az.svg
Аландские острова;Мариехамн;ax.svg
Албания;Тирана;al.svg
Алжир;Алжир;dz.svg
Американские Виргинские острова;Шарлотта-Амалия;vi.svg
Американское Самоа;Паго-Паго;as.svg
Ангилья;Валли;ai.svg
Англия;Лондон;gb-eng.svg
Ангола;Луанда;ao.svg
Андорра;Андорра-ла-Велья;ad.svg
Антигуа и Барбуда;Сент-Джонс;ag.svg
Аргентина;Буэнос-Айрес;ar.svg
Армения;Ереван;am.svg
Аруба;Ораньестад;aw.svg
Афганистан;Кабул;af.svg
Багамские Острова;Нассау;bs.svg
Бангладеш;Дакка;bd.svg
Барбадос;Бриджтаун;bb.svg
Бахрейн;Манама;bh.svg
Беларусь;Минск;by.svg
Белиз;Бельмопан;bz.svg
Бельгия;Брюссель;be.svg
Бенин;Порто-Ново;bj.svg
Бермуды;Гамильтон;bm.svg
Болгария;София;bg.svg
Боливия;Сукре;bo.svg
Бонайре;Кралендейк;bq.svg
Босния и Герцеговина;Сараево;ba.svg
Ботсвана;Габороне;bw.svg
Бразилия;Бразилия;br.svg
Британские Виргинские острова;Род-Таун;vg.svg
Бруней;Бандар-Сери-Бегаван;bn.svg
Буркина-Фасо;Уагадугу;bf.svg
Бурунди;Гитега;bi.svg
Бутан;Тхимпху;bt.svg
Вануату;Порт-Вила;vu.svg
Ватикан;Ватикан;va.svg
Великобритания;Лондон;gb.svg
Венгрия;Будапешт;hu.svg
Венесуэла;Каракас;ve.svg
Восточный Тимор;Дили;tl.svg
Вьетнам;Ханой;vn.svg
Габон;Либревиль;ga.svg
Гаити;Порт-о-Пренс;ht.svg
Гайана;Джорджтаун;gy.svg
Гамбия;Банжул;gm.svg
Гана;Аккра;gh.svg
Гватемала;Гватемала;gt.svg
Гвинея-Бисау;Бисау;gw.svg
Гвинея;Конакри;gn.svg
Германия;Берлин;de.svg
Гернси;Сент-Питер-Порт;gg.svg
Гибралтар;Гибралтар;gi.svg
Гондурас;Тегусигальпа;hn.svg
Гонконг;Гонконг;hk.svg
Гренада;Сент-Джорджес;gd.svg
Гренландия;Нуук;gl.svg
Греция;Афины;gr.svg
Грузия;Тбилиси;ge.svg
Гуам;Хагатна;gu.svg
Дания;Копенгаген;dk.svg
Демократическая Республика Конго;Киншаса;cd.svg
Джерси;Сент-Хельер;je.svg
Джибути;Джибути;dj.svg
Доминика;Розо;dm.svg
Доминиканская Республика;Санто-Доминго;do.svg
Европейский союз;Брюссель;eu.svg
Египет;Каир;eg.svg
Замбия;Лусака;zm.svg
Зимбабве;Хараре;zw.svg
Израиль;Иерусалим;il.svg
Индия;Нью-Дели;in.svg
Индонезия;Джакарта;id.svg
Иордания;Амман;jo.svg
Ирак;Багдад;iq.svg
Иран;Тегеран;ir.svg
Ирландия;Дублин;ie.svg
Исландия;Рейкьявик;is.svg
Испания;Мадрид;es.svg
Италия;Рим;it.svg
Йемен;Сана;ye.svg
Кабо-Верде;Прая;cv.svg
Казахстан;Астана;kz.svg
Камбоджа;Пномпень;kh.svg
Камерун;Яунде;cm.svg
Канада;Оттава;ca.svg
Катар;Доха;qa.svg
Кения;Найроби;ke.svg
Кипр;Никосия;cy.svg
Кирибати;Южная Тарава;ki.svg
Китай;Пекин;cn.svg
Кокосовые острова;Уэст-Айленд;cc.svg
Колумбия;Богота;co.svg
Коморы;Морони;km.svg
Косово;Приштина;xk.svg
Коста-Рика;Сан-Хосе;cr.svg
Кот-д'Ивуар;Ямусукро;ci.svg
Куба;Гавана;cu.svg
Кувейт;Эль-Кувейт;kw.svg
Кыргызстан;Бишкек;kg.svg
Кюрасао;Виллемстад;cw.svg
Лаос;Вьентьян;la.svg
Латвия;Рига;lv.svg
Лесото;Масеру;ls.svg
Либерия;Монровия;lr.svg
Ливан;Бейрут;lb.svg
Ливия;Триполи;ly.svg
Литва;Вильнюс;lt.svg
Лихтенштейн;Вадуц;li.svg
Люксембург;Люксембург;lu.svg
Маврикий;Порт-Луи;mu.svg
Мавритания;Нуакшот;mr.svg
Мадагаскар;Антананариву;mg.svg
Макао;Макао;mo.svg
Малави;Лилонгве;mw.svg
Мали;Бамако;ml.svg
Марокко;Рабат;ma.svg
Мексика;Мехико;mx.svg
Мозамбик;Мапуту;mz.svg
Молдова;Кишинёв;md.svg
Монако;Монако;mc.svg
Монголия;Улан-Батор;mn.svg
Мьянма;Нейпьидо;mm.svg
Намибия;Виндхук;na.svg
Науру;Ярен;nr.svg
Непал;Катманду;np.svg
Нигер;Ниамей;ne.svg
Нигерия;Абуджа;ng.svg
Нидерланды;Амстердам;nl.svg
Никарагуа;Манагуа;ni.svg
Ниуэ;Алофи;nu.svg
Новая Зеландия;Веллингтон;nz.svg
Новая Каледония;Нумеа;nc.svg
Норвегия;Осло;no.svg
ОАЭ;Абу-Даби;ae.svg
Оман;Маскат;om.svg
Остров Мэн;Дуглас;im.svg
Остров Норфолк;Кингстон;nf.svg
Остров Пасхи;Анга-Роа;easter-island.svg
Остров Рождества;Флайинг-Фиш-Ков;cx.svg
Острова Кайман;Джорджтаун;ky.svg
Острова Кука;Аваруа;ck.svg
Острова Питкэрн;Адамстаун;pn.svg
Пакистан;Исламабад;pk.svg
Палау;Нгерулмуд;pw.svg
Палестина;Рамалла;ps.svg
Панама;Панама;pa.svg
Папуа – Новая Гвинея;Порт-Морсби;pg.svg
Парагвай;Асунсьон;py.svg
Перу;Лима;pe.svg
Польша;Варшава;pl.svg
Португалия;Лиссабон;pt.svg
Пуэрто-Рико;Сан-Хуан;pr.svg
Республика Конго;Браззавиль;cg.svg
Россия;Москва;ru.svg
Руанда;Кигали;rw.svg
Румыния;Бухарест;ro.svg
Саба;Боттом;sb.svg
Сальвадор;Сан-Сальвадор;sv.svg
Самоа;Апиа;ws.svg
Сан-Марино;Сан-Марино;sm.svg
Сан-Томе и Принсипи;Сан-Томе;st.svg
Саудовская Аравия;Эр-Рияд;sa.svg
Северная Ирландия;Белфаст;gb-nir.svg
Северная Корея;Пхеньян;kp.svg
Северная Македония;Скопье;mk.svg
Северные Марианские Острова;Сайпан;mp.svg
Сейшельские Острова;Виктория;sc.svg
Сенегал;Дакар;sn.svg
Сент-Винсент и Гренадины;Кингстаун;vc.svg
Сент-Китс и Невис;Бастер;kn.svg
Сент-Люсия;Кастри;lc
