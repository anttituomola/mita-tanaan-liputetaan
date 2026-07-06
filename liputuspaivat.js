import dayjs from "dayjs"
import "dayjs/locale/fi"
dayjs.locale("fi")

import { mothersDay, juhannus, fathersDay, kaatuneittenMuistopaiva, suomenLuonnonPaiva } from "./dateCalculations"

export const liputuspaivat = [
    {
        name: "J. L. Runebergin päivä",
        date: dayjs(dayjs().year() + "-02-05"),
        description: `Runebergin päivää vietetään 5. helmikuuta Suomen kansallisrunoilijan Johan Ludvig Runebergin syntymäpäivänä. Päivä on vakiintunut liputuspäivä, jonka juhlaperinteet ulottuvat 1800-luvun loppuun. Runebergin tuotannosta tunnetuimpia ovat Vänrikki Stoolin tarinat ja Maamme-laulun alkuperäinen ruotsinkielinen teksti. Perinteisesti päivää juhlistetaan runebergintortuilla, mantelilla ja rommilla maustetuilla leivonnaisilla, jotka tuovat mieleen runoilijan kotipöydän.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Johan_Ludvig_Runeberg"]
    },
    {
        name: "Minna Canthin päivä",
        date: dayjs(dayjs().year() + "-3-19"),
        description: `Minna Canthin päivä eli tasa-arvon päivä vietetään 19. maaliskuuta kirjailija ja yhteiskunnallinen vaikuttaja Minna Canthin syntymäpäivänä. Päivä on vakiintunut liputuspäivä, joka nostaa esiin tasa-arvon ja naisten aseman edistämisen. Canth oli yksi ensimmäisiä suomalaisia ammattikirjailijoita, jonka näytelmät ja novellit ravistelivat aikansa porvarillisia arvoja. Päivänä liputetaan ja järjestetään keskusteluja, tapahtumia sekä esityksiä, jotka kantavat tasa-arvon viestiä eteenpäin.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Minna_Canthin_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Mikael Agricolan päivä",
        date: dayjs(dayjs().year() + "-4-9"),
        description: `Mikael Agricolan päivää eli suomen kielen päivää vietetään 9. huhtikuuta. Päivä on vakiintunut liputuspäivä, joka kunnioittaa suomen kirjakielen isänä pidetyn Mikael Agricolan työtä; samana päivänä syntyi myös runoilija Elias Lönnrot. Agricola loi pohjan suomen kirjakielelle muun muassa Abckirian ja Se Wsi Testamenti -käännöksellä. Liputuksen ohella päivää juhlistetaan kielen ja lukutaidon merkitystä korostavin tilaisuuksin.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Mikael_Agricolan_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Kansallinen veteraanipäivä",
        date: dayjs(dayjs().year() + "-4-27"),
        description: `Kansallinen veteraanipäivä vietetään 27. huhtikuuta Suomen sotien veteraanien kunniaksi ja rauhan muistoksi. Päivä on vakiintunut liputuspäivä, ja se sijoittuu Lapin sodan päättymispäivään. Eri puolilla maata järjestetään juhlallisuuksia, seppeleenlaskuja ja kirkkopalveluksia, joissa kiitetään veteraanien uhreja. Liputus ja muistotilaisuudet muistuttavat sodan päättymisestä ja vapauden hintaa.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Kansallinen_veteraanip%C3%A4iv%C3%A4"]
    },
    {
        name: "Eurooppa-päivä",
        date: dayjs(dayjs().year() + "-5-9"),
        description: `Eurooppa-päivää vietetään 9. toukokuuta Euroopan unionin rauhan ja yhteistyön juhlapäivänä. Päivä juontaa juurensa vuoteen 1950, jolloin Ranskan ulkoministeri Robert Schuman esitti aloitteen yhteiseurooppalaisesta hiili- ja teräsyhteistyöstä. Suomessa päivä on vakiintunut liputuspäivä, jolla korostetaan Suomen kuuluvuutta Eurooppaan ja kansainvälisen yhteistyön merkitystä. Päivänä liputetaan ja järjestetään tilaisuuksia, joissa tuodaan esiin eurooppalaisia arvoja.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Eurooppa-p%C3%A4iv%C3%A4"]
    },
    {
        name: "J. V. Snellmanin päivä",
        date: dayjs(dayjs().year() + "-5-12"),
        description: `J. V. Snellmanin päivää eli suomalaisuuden päivää vietetään 12. toukokuuta valtiomiehen ja filosofin Johan Vilhelm Snellmanin syntymäpäivänä. Päivä on vakiintunut liputuspäivä, joka korostaa suomen kielen ja suomalaisen kulttuuri-identiteetin merkitystä. Snellman vaikutti merkittävästi siihen, että suomen kieli sai virallisen aseman ja että kansakunnan itsetunto vahvistui. Liputuksen lisäksi päivänä järjestetään puheita, tilaisuuksia ja juhlia, jotka vahvistavat suomalaisuuden arvoja.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Suomalaisuuden_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Kaatuneitten muistopäivä",
        date: kaatuneittenMuistopaiva(),
        description: `Kaatuneitten muistopäivää vietetään toukokuun kolmantena sunnuntaina. Päivä on vakiintunut liputuspäivä, jolla kunnioitetaan Suomea ja suomalaisia puolustaneissa sodissa sekä rauhanturvaamistehtävissä menehtyneitä. Muistopäivänä järjestetään tilaisuuksia sankarihaudoilla ja muistomerkeillä ympäri maan. Liputus ja hiljainen hetki muistuttavat kaatuneiden uhrauksesta vapauden ja itsenäisyyden puolesta.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Kaatuneitten_muistop%C3%A4iv%C3%A4"]
    },
    {
        name: "Eino Leinon päivä",
        date: dayjs(dayjs().year() + "-7-6"),
        description: `Eino Leinon päivää eli runon ja suven päivää vietetään 6. heinäkuuta suuren runoilijan Eino Leinon syntymäpäivänä. Päivä on vakiintunut liputuspäivä, joka yhdistää runouden ja kesän huipentuman. Leinon tuotanto, kuten Helkavirret, on jättänyt kestävän jäljen suomalaiseen kulttuuriin. Päivänä liputetaan ja nautitaan runoudesta ulkoilmatilaisuuksissa sekä kotipihoilla.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Eino_Leinon_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Aleksis Kiven päivä",
        date: dayjs(dayjs().year() + "-10-10"),
        description: `Aleksis Kiven päivää eli suomalaisen kirjallisuuden päivää vietetään 10. lokakuuta Aleksis Kiven syntymäpäivänä. Päivä on vakiintunut liputuspäivä, joka kunnioittaa suomalaisen kirjallisuuden merkittävimmäksi romaaniksi noussutta Seitsemää veljestä ja Kiven koko tuotantoa. Teatterit ja kirjastot järjestävät lukutilaisuuksia, esityksiä ja keskusteluja. Liputus sekä lukeminen ovat päivän keskeisiä tapoja muistaa kansalliskirjailijaa.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Aleksis_Kivi"]
    },
    {
        name: "Yhdistyneiden Kansakuntien päivä",
        date: dayjs(dayjs().year() + "-10-24"),
        description: `Yhdistyneiden Kansakuntien päivää vietetään 24. lokakuuta YK:n perustamisen vuosipäivänä. Päivä on vakiintunut liputuspäivä Suomessa, ja se kuuluu kansainväliseen YK-viikkoon. Vuonna 1945 riittävä määrä jäsenvaltioita oli ratifioinut YK:n peruskirjan, jolloin se tuli voimaan. Päivänä liputetaan ja tuodaan esiin kansainvälistä yhteistyötä, rauhaa ja ihmisoikeuksia.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Yhdistyneiden_kansakuntien_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Ruotsalaisuuden päivä",
        date: dayjs(dayjs().year() + "-11-6"),
        description: `Ruotsalaisuuden päivää eli svenska dagenia vietetään 6. marraskuuta. Päivä on vakiintunut liputuspäivä, joka juhlistaa suomenruotsalaista kulttuuria ja kaksikielistä Suomea. Ajankohta liittyy Ruotsin kuningas Kustaa II Aadolfin muistopäivään, ja sitä on vietetty Suomessa jo 1900-luvun alusta. Liputuksen ohella järjestetään kulttuuritapahtumia, joissa korostetaan ruotsin kielen ja suomenruotsalaisen väestön asemaa.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Ruotsalaisuuden_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Lapsen oikeuksien päivä",
        date: dayjs(dayjs().year() + "-11-20"),
        description: `Kansainvälistä lapsen oikeuksien päivää vietetään 20. marraskuuta. Päivä on vakiintunut liputuspäivä Suomessa vuodesta 2020 lähtien, ja sitä juhlitaan usein koko viikon ajan. Päivä muistuttaa YK:n lapsen oikeuksien sopimuksesta, joka hyväksyttiin 20. marraskuuta 1989. Liputuksen lisäksi kouluissa, päiväkodeissa ja yhdistyksissä keskustellaan lasten oikeuksista ja lasten osallisuudesta.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Lapsen_oikeuksien_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Jean Sibeliuksen päivä",
        date: dayjs(dayjs().year() + "-12-8"),
        description: `Jean Sibeliuksen päivää eli suomalaisen musiikin päivää vietetään 8. joulukuuta säveltäjä Jean Sibeliuksen syntymäpäivänä. Päivä on vakiintunut liputuspäivä, joka on virallisesti merkitty kalentereihin vuodesta 2011 lähtien. Sibelius on Suomen tunnetuin säveltäjä, jonka teokset, kuten Finlandia, ovat vahvistaneet suomalaista musiikki-identiteettiä maailmalla. Päivänä liputetaan ja kuunnellaan konsertteja, jotka juhlistavat suomalaista musiikkia.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Jean_Sibeliuksen_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Kalevalan päivä",
        date: dayjs(dayjs().year() + "-2-28"),
        description: `Kalevalan päivää eli suomalaisen kulttuurin päivää vietetään 28. helmikuuta. Päivä on virallinen liputuspäivä, joka juhlistaa Suomen kansalliseeposta Kalevalaa ja sen kokoajaa Elias Lönnrotia. Päivämäärä perustuu siihen, että Lönnrot päiväsi Vanhan Kalevalan esipuheen 28. helmikuuta 1835. Liputuksen ohella järjestetään juhlia, runo- ja musiikkitilaisuuksia, joissa Kalevalan perintö elää.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Kalevalan_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Vappu",
        date: dayjs(dayjs().year() + "-5-1"),
        description: `Vappua eli suomalaisen työn päivää vietetään 1. toukokuuta. Päivä on virallinen liputuspäivä, joka yhdistää kevään ja työväen juhlan perinteitä. Suomessa vappua vietetään jo huhtikuun viimeisestä päivästä lähtien, ja päivään kuuluvat ylioppilaslakit, ilmapallot ja perinteinen sima. Virallisena liputuspäivänä liputetaan työn ja yhteiskunnallisen tasa-arvon kunniaksi.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Vappu"]
    },
    {
        name: "Äitienpäivä",
        date: mothersDay(),
        description: `Äitienpäivää vietetään Suomessa toukokuun toisena sunnuntaina äitien kunniaksi. Päivä on virallinen liputuspäivä, jolloin monissa kodeissa ja yhteisöissä nostetaan lippu salkoon. Perinteisiin kuuluvat kukat, käsin tehdyt kortit ja perheen yhteinen aamiainen tai brunssi. Äitienpäivä on yksi Suomen seitsemästä virallisesta jokavuotisesta liputuspäivästä.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/%C3%84itienp%C3%A4iv%C3%A4"]
    },
    {
        name: "Puolustusvoimain lippujuhlan päivä",
        date: dayjs(dayjs().year() + "-6-4"),
        description: `Puolustusvoimain lippujuhlan päivää vietetään 4. kesäkuuta. Päivä on virallinen liputuspäivä, joka samanaikaisesti muistuttaa Suomen marsalkka C. G. E. Mannerheimin syntymäpäivää. Puolustusvoimat järjestää päivänä valtakunnallisen paraatin ja tasavallan presidentti jakaa ylennykset sekä myöntää kunniamerkkejä. Liputus ja juhlallisuudet korostavat maanpuolustuksen arvoa ja yhteiskunnan tukea asevelvollisille.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Puolustusvoimain_lippujuhlan_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Juhannuspäivä",
        date: juhannus(),
        description: `Juhannuspäivää vietetään kesäkuun 20. ja 26. päivän välisenä lauantaina. Päivä on virallinen liputuspäivä ja tunnetaan myös Suomen lipun päivänä. Juhannusaattona liputus alkaa kello 18 ja päättyy juhannuspäivänä kello 21. Perinteisiin kuuluvat kokot, sauna, uiminen ja valoisan yön juhliminen ystävien ja perheen kesken.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Juhannus"]
    },
    {
        name: "Isänpäivä",
        date: fathersDay(),
        description: `Isänpäivää vietetään Suomessa marraskuun toisena sunnuntaina isien ja isoisien kunniaksi. Päivä on virallinen liputuspäivä vuodesta 2019 lähtien, sitä ennen se oli vakiintunut liputuspäivä vuosina 1987–2018. Perinteisiin kuuluvat liputus, kortit ja perheen yhteinen ruoka. Päivä on yksi Suomen seitsemästä virallisesta jokavuotisesta liputuspäivästä.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Is%C3%A4np%C3%A4iv%C3%A4"]
    },
    {
        name: "Itsenäisyyspäivä",
        date: dayjs(dayjs().year() + "-12-6"),
        description: `Suomen itsenäisyyspäivää vietetään 6. joulukuuta kansallispäivänä. Päivä on virallinen liputuspäivä, joka muistuttaa vuoden 1917 itsenäisyysjulistuksesta. Itsenäisyyspäivä on vakavamielinen juhla, johon liittyy kaatuneiden ja veteraanien muistelu. Perinteitä ovat tasavallan presidentin itsenäisyyspäivän vastaanotto, paraatit, soihtukulkueet, kynttilöiden sytyttäminen haudoille ja Tuntemattoman sotilaan televisioesitys.`,
        official: true,
        links: ["https://fi.wikipedia.org/wiki/Suomen_itsen%C3%A4isyysp%C3%A4iv%C3%A4"]
    },
    {
        name: "Suomen luonnon päivä",
        date: suomenLuonnonPaiva(),
        description: `Suomen luonnon päivää vietetään elokuun viimeisenä lauantaina. Päivä on vakiintunut liputuspäivä, joka on merkitty kalentereihin liputuspäiväksi vuodesta 2023 lähtien, vaikka päivää on juhlittu jo vuodesta 2013. Päivän tarkoituksena on koota suomalaisia yhteen juhlistamaan ja arvostamaan kotimaista luontoa. Metsät, järvet ja saaristo ovat päivän keskiössä, ja eri puolilla maata järjestetään luontoretkiä, talkoita ja kulttuuritapahtumia.`,
        official: false,
        links: ["https://fi.wikipedia.org/wiki/Suomen_luonnon_p%C3%A4iv%C3%A4"]
    },
    {
        name: "Miina Sillanpään ja kansalaisvaikuttamisen päivä",
        date: dayjs(dayjs().year() + "-10-1"),
        description: `Miina Sillanpään ja kansalaisvaikuttamisen päivää vietetään 1. lokakuuta. Päivä on vakiintunut liputuspäivä, joka muistuttaa kansanedustaja ja sosiaalivaikuttaja Miina Sillanpään elämäntyötä sekä korostaa kansalaisvaikuttamisen merkitystä. Koska Sillanpään syntymäpäivä 4. kesäkuuta on jo puolustusvoimain lippujuhlan päivä, liputuspäiväksi valittiin 1. lokakuuta, jolloin yleinen ja yhtäläinen äänioikeus tuli voimaan vuonna 1906. Päivää vietetään myös Järjestöjen päivänä liputuksen ja yhdistystoiminnan merkeissä.`,
        official: false,
        links: ["https://valtioneuvosto.fi/-/1410869/suomen-luonnon-paiva-ja-miina-sillanpaan-ja-kansalaisvaikuttamisen-paiva-liputuspaiviksi-kalenteriin-vuonna-2023"]
    },
]
