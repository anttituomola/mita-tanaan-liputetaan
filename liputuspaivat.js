import dayjs from "dayjs"
import "dayjs/locale/fi"
dayjs.locale("fi")

import { mothersDay, juhannus, fathersDay, kaatuneittenMuistopaiva } from "./dateCalculations"

export const liputuspaivat = {
    "J. L. Runebergin päivä": {
        name: "J. L. Runebergin päivä",
        date: dayjs(dayjs().year() + "-02-05"),
        description: `Runebergin päivää vietetään vuosittain runoilijan syntymäpäivänä 5. helmikuuta, joka on vakiintunut liputuspäivä. Professori Matti Klingen mukaan Runebergin päivästä muodostui ensimmäisen sortokauden aikana Suomen ensimmäinen todellinen kansallispäivä koulujuhlineen, soihtukulkueineen ja seppeleenlaskuineen. Päivää juhlistetaan syömällä runebergintorttuja, makeita leivonnaisia, joita Runebergin kerrotaan mielellään nauttineen.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Johan_Ludvig_Runeberg"]
    },
    "Minna Canthin päivä eli tasa-arvon päivä": {
        name: "Minna Canthin päivä eli tasa-arvon päivä",
        date: dayjs(dayjs().year() + "-3-19"),
        description: "Minna Canthin päivä, tasa-arvon päivä (ruots. Minna Canth-dagen, jämställdhetsdagen) on vakiintunut liputuspäivä Suomessa joka vuosi 19. maaliskuuta. Tasa-arvon päivä on kirjailija Minna Canthin (1844–1897) syntymäpäivä.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Minna_Canthin_p%C3%A4iv%C3%A4"]
    },
    "Mikael Agricolan päivä": {
        name: "Mikael Agricolan päivä eli suomen kielen päivä",
        date: dayjs(dayjs().year() + "-4-9"),
        description: "Mikael Agricolan päivää eli suomen kielen päivää vietetään Suomessa 9. huhtikuuta. Kyseessä on vakiintunut liputuspäivä. Päivää vietetään Mikael Agricolan kuolinpäivänä, vaikka yleensä henkilön kunniaksi liputetaan tämän syntymäpäivänä. Syynä tähän on se, että Agricolan tarkka syntymäaika ei ole tiedossa. Mikael Agricolan päivä tuli kalenteriin vuonna 1960 ja vuodesta 1980 lähtien se on merkitty myös liputuspäiväksi, jollaiseksi se olikin jo vakiintunut. Vuonna 1978 Agricolan päivä sai lisämääreen suomen kielen päivä.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Mikael_Agricolan_p%C3%A4iv%C3%A4"]
    },
    "kansallinen veteraanipäivä": {
        name: "kansallinen veteraanipäivä",
        date: dayjs(dayjs().year() + "-4-27"),
        description: "Kansallinen veteraanipäivä on Suomessa sotaveteraanien kunniaksi 27. huhtikuuta vietettävä juhlapäivä ja yleinen liputuspäivä. Sitä vietettiin ensimmäisen kerran vuonna 1987 Lahdessa osana Suomen itsenäisyyden 70-vuotisjuhlavuotta. Ehdotuksen kansallisesta veteraanipäivästä teki pääministeri Kalevi Sorsa ja asia vahvistettiin valtioneuvostossa puolustusministeri Veikko Pihlajamäen esityksestä 1986. Tehtävä siirtyi Keski-Suomen lääninhallituksen sosiaali- ja terveysosastolle, jossa Keski-Suomen läänin veteraanipäivän järjestelyt hoiti Pekka Kaura-aho käyttäen tapahtumaan 32 000 markkaa.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Kansallinen_veteraanip%C3%A4iv%C3%A4"]
    },
    "Eurooppa-päivä": {
        name: "Eurooppa-päivä",
        date: dayjs(dayjs().year() + "-5-9"),
        description: "Eurooppa-päivää vietetään Euroopassa 9. toukokuuta. 9. toukokuuta 1950 Robert Schuman esitti ehdotuksensa yhtenäisen Euroopan luomisesta välttämättömänä rauhanomaisten suhteiden ylläpitämiseksi.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Eurooppa-p%C3%A4iv%C3%A4"]
    },    
    "J. V. Snellmanin päivä eli suomalaisuuden päivä": {
        name: "J. V. Snellmanin päivä eli suomalaisuuden päivä",
        date: dayjs(dayjs().year() + "-5-12"),
        description: "Suomalaisuuden päivää eli J. V. Snellmanin päivää vietetään Suomessa 12. toukokuuta. Päivä on suomen kielen asemaan merkittävästi vaikuttaneen J. V. Snellmanin syntymäpäivä ja vakiintunut liputuspäivä.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Suomalaisuuden_p%C3%A4iv%C3%A4"]
    },  
    "kaatuneitten muistopäivä": {
        name: "kaatuneitten muistopäivä",
        date: kaatuneittenMuistopaiva(),
        description: "Kaatuneitten muistopäivä, jota vietetään toukokuun kolmantena sunnuntaina, on Suomen aluetta ja suomalaisia koskettaneissa sodissa tai muissa taisteluluonteisissa toimissa, kuten rauhanturvaamistehtävissä, kaatuneiden sekä taistelujen aikana ja niiden päättymisen jälkeen muillakin tavoin sodan takia kuolleiden, kuten teloitettujen ja vankileireillä menehtyneiden, muistoksi vietettävä päivä.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Kaatuneitten_muistop%C3%A4iv%C3%A4"]
    },
    "Eino Leinon päivä eli runon ja suven päivä": {
        name: "Eino Leinon päivä eli runon ja suven päivä",
        date: dayjs(dayjs().year() + "-7-6"),
        description: "Eino Leinon päivää vietetään runoilija Eino Leinon syntymäpäivänä 6. heinäkuuta. Se on ollut vuodesta 1992 vakiintunut liputuspäivä, jota vietetään runon ja suven päivänä.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Eino_Leinon_p%C3%A4iv%C3%A4"]
    },
    "Aleksis Kiven päivä eli suomalaisen kirjallisuuden päivä": {
        name: "Aleksis Kiven päivä eli suomalaisen kirjallisuuden päivä",
        date: dayjs(dayjs().year() + "-10-10"),
        description: "Aleksis Kivi (oik. Alexis Stenvall 10. lokakuuta 1834 Nurmijärvi – 31. joulukuuta 1872 Tuusula) oli suomalainen kirjailija. Kivi kirjoitti kansallisromaanin aseman saavuttaneen romaanin Seitsemän veljestä (1870), näytelmiä kuten Nummisuutarit (1864) ja runoja.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Aleksis_Kivi"]
    },
    "Yhdistyneiden Kansakuntien päivä": {
        name: "Yhdistyneiden Kansakuntien päivä",
        date: dayjs(dayjs().year() + "-10-24"),
        description: "Yhdistyneiden kansakuntien päivä on 24. lokakuuta vietettävä vuosipäivä, jota vietetään Yhdistyneiden kansakuntien (YK) perustamisen kunniaksi. Sanottuun päivään mennessä vuonna 1945 oli riittävän suuri määrä jäsenvaltioita vahvistanut YK:n perustamissopimuksen niin, että se tuli voimaan. Useissa maissa se on nykyisin myös liputuspäivä ja osa kansainvälistä YK-viikkoa, jota vietetään aina 20.–26. lokakuuta, alkoi viikko 20. lokakuuta tai ei.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Yhdistyneiden_kansakuntien_p%C3%A4iv%C3%A4"]
    },
    "svenska dagen, ruotsalaisuuden päivä": {
        name: "svenska dagen, ruotsalaisuuden päivä",
        date: dayjs(dayjs().year() + "-11-6"),
        description: "Ruotsalaisuuden päivä (ruots. svenska dagen) on Suomessa 6. marraskuuta vietettävä yleinen liputuspäivä. Päivä juhlistaa suomenruotsalaisten oikeutta käyttää ruotsin kieltä Suomessa. Tarkoituksena on Folktingetin mukaan myös kunnioittaa Suomen kieliryhmien yhteistä kaksikielistä isänmaata.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Ruotsalaisuuden_p%C3%A4iv%C3%A4"]
    },
    "Lapsen oikeuksien päivä": {
        name: "Lapsen oikeuksien päivä",
        date: dayjs(dayjs().year() + "-11-20"),
        description: "Lapsen oikeuksien päivä (joskus myös Kansainvälinen lasten päivä) on YK:n yleiskokouksen aloitteesta vuodesta 1954 vietetty kansainvälinen vuosipäivä. Päivän ajankohta vaihtelee maittain. Useissa maissa, myös Suomessa sitä vietetään 20. marraskuuta, sillä tuona päivänä vuonna 1959 hyväksyttiin lasten oikeuksien julistus ja 20. marraskuuta 1989 lapsen oikeuksien sopimus.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Lapsen_oikeuksien_p%C3%A4iv%C3%A4"]
    },
    "Jean Sibeliuksen päivä eli suomalaisen musiikin päivä": {
        name: "Jean Sibeliuksen päivä eli suomalaisen musiikin päivä",
        date: dayjs(dayjs().year() + "-12-8"),
        description: "Jean Sibeliuksen päivää eli suomalaisen musiikin päivää vietetään Jean Sibeliuksen syntymäpäivänä 8. joulukuuta. Sisäministeriö antoi suosituksen liputuksesta vuonna 2005 ja teki Helsingin yliopiston almanakkatoimistolle esityksen päivän lisäämisestä kalentereihin vuonna 2007. Jean Sibeliuksen päivä on merkitty kalentereihin liputuspäiväksi vuosikerrasta 2011 lähtien.",
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Jean_Sibeliuksen_p%C3%A4iv%C3%A4"]
    },
    "Kalevalan päivä eli suomalaisen kulttuurin päivä": {
        name: "Kalevalan päivä eli suomalaisen kulttuurin päivä",
        date: dayjs(dayjs().year() + "-2-28"),
        description: "Kalevalan päivä on suomalaisen kulttuurin päivä, jota vietetään Suomen kansalliseepoksen, Kalevalan kunniaksi 28. helmikuuta. Päivä on virallinen liputuspäivä.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Kalevalan_p%C3%A4iv%C3%A4"]
    },
    "Vappu eli suomalaisen työn päivä": {
        name: "Vappu eli suomalaisen työn päivä",
        date: dayjs(dayjs().year() + "-1-5"),
        description: "Vappu on vuosittain 1. toukokuuta vietettävä enimmäkseen länsimaalainen kansainvälinen juhlapäivä ja monissa maissa yleinen vapaapäivä. Se on kevään loppupuolen juhlapäivä sekä kansainvälinen työväen juhlapäivä. Suomessa vapunpäivää aattopäivineen vietetään työväen, ylioppilaiden ja kevään karnevaalijuhlana. Vuodesta 1979 lähtien vappu on ollut Suomessa virallinen liputuspäivä, suomalaisen työn päivä. Juhlapäivä on saanut nimensä pyhästä Valburgista, jonka muistopäivä on 1. päivä toukokuuta.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Vappu"]
    },
    "Äitienpäivä": {
        name: "Äitienpäivä",
        date: mothersDay(),
        description: "Äitienpäivä on äitien kunniaksi vuosittain vietettävä juhlapäivä. Sen ajankohta vaihtelee maittain. Suomessa äitienpäivä on toukokuun toisena sunnuntaina, ja se on yksi virallisista liputuspäivistä.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/%C3%84itienp%C3%A4iv%C3%A4"]
    },
    "puolustusvoimain lippujuhlan päivä eli Suomen marsalkka C.G.E. Mannerheimin syntymäpäivä": {
        name: "puolustusvoimain lippujuhlan päivä eli Suomen marsalkka C.G.E. Mannerheimin syntymäpäivä",
        date: dayjs(dayjs().year() + "-6-4"),
        description: "Puolustusvoimain lippujuhlan päivä on Suomessa vuosittain 4. kesäkuuta vietettävä puolustusvoimien juhlapäivä ja virallinen liputuspäivä. Lippujuhlapäivänä jaetaan myönnetyt kunniamerkit ja ylennetään ansioituneita sotilaita ja reserviläisiä.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Puolustusvoimain_lippujuhlan_p%C3%A4iv%C3%A4"]
    },
    "Juhannuspäivä": {
        name: "Juhannuspäivä",
        date: juhannus(),
        description: "Juhannus on valon ja keskikesän juhla, jota vietetään kesäkuussa kesäpäivänseisauksen tienoilla. Suomessa juhannus on yöttömän yön juhla, kun pohjoisen napapiirin pohjoispuolella aurinko ei laske lainkaan kesäpäivänseisauksena. Suomessa juhannus on myös virallinen liputuspäivä, jolloin liputetaan koko juhannusyön ajan.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Juhannus"]
    },
    "Isänpäivä": {
        name: "Isänpäivä",
        date: fathersDay(),
        description: "Isänpäivä on juhlapäivä, jota vietetään isien kunniaksi ja muistoksi. Suomessa, muissa Pohjoismaissa Tanskaa lukuun ottamatta sekä Virossa päivää vietetään marraskuun toisena sunnuntaina, puoli vuotta äitienpäivän jälkeen. Muualla maailmassa ajankohta vaihtelee. Isänpäivä on ollut Suomessa virallinen liputuspäivä vuodesta 2019, sitä aiemmin se oli vakiintunut liputuspäivä vuosina 1987–2018. Myös isoisiä usein juhlistetaan isänpäivänä.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Is%C3%A4np%C3%A4iv%C3%A4"]
    },
    "Itsenäisyyspäivä": {
        name: "Itsenäisyyspäivä",
        date: dayjs(dayjs().year() + "-12-6"),
        description: "Suomen itsenäisyyspäivä on Suomen kansallispäivä, jota vietetään 6. joulukuuta 1917 tapahtuneen itsenäistymisen kunniaksi. Itsenäisyyspäivä on vakavamielinen juhla, johon liittyy sodan ja kaatuneiden muisteleminen. Päivään liittyy monia jokavuotisia perinteitä, kuten jo ensimmäisen presidentin ajoista vietetty tasavallan presidentin itsenäisyyspäivän vastaanotto, paraateja, soihtukulkueita ja uudempana perinteenä Tuntemattoman sotilaan televisioesitys.",
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Suomen_itsen%C3%A4isyysp%C3%A4iv%C3%A4"]
    },
}