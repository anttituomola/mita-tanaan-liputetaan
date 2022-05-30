import dayjs from "dayjs"
import "dayjs/locale/fi"
dayjs.locale("fi")

import { mothersDay, juhannus, fathersDay } from "./dateCalculations"


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
        description: "Minna Canthin päivä eli tasa-arvon päivä",
        official: false
    },
    "Mikael Agricolan päivä": {
        name: "Mikael Agricolan päivä eli suomen kielen päivä",
        date: dayjs(dayjs().year() + "-4-9"),
        description: "Mikael Agricolan päivä eli suomen kielen päivä, joka on myös Elias Lönnrotin syntymäpäivä",
        official: false
    },
    "kansallinen veteraanipäivä": {
        name: "kansallinen veteraanipäivä",
        date: dayjs(dayjs().year() + "-4-27"),
        description: "kansallinen veteraanipäivä",
        official: false
    },
    "Eurooppa-päivä": {
        name: "Eurooppa-päivä",
        date: dayjs(dayjs().year() + "-5-9"),
        description: "Eurooppa-päivä",
        official: false
    },    
    "J. V. Snellmanin päivä eli suomalaisuuden päivä": {
        name: "J. V. Snellmanin päivä eli suomalaisuuden päivä",
        date: dayjs(dayjs().year() + "-5-12"),
        description: "J. V. Snellmanin päivä eli suomalaisuuden päivä",
        official: false
    },  
    "kaatuneitten muistopäivä": {
        name: "kaatuneitten muistopäivä",
        date: dayjs(dayjs().year() + "-5-15"),
        description: "kaatuneitten muistopäivä",
        official: false
    },
    "Eino Leinon päivä eli runon ja suven päivä": {
        name: "Eino Leinon päivä eli runon ja suven päivä",
        date: dayjs(dayjs().year() + "-7-6"),
        description: "Eino Leinon päivä eli runon ja suven päivä",
        official: false
    },
    "Aleksis Kiven päivä eli suomalaisen kirjallisuuden päivä": {
        name: "Aleksis Kiven päivä eli suomalaisen kirjallisuuden päivä",
        date: dayjs(dayjs().year() + "-10-10"),
        description: "Aleksis Kiven päivä eli suomalaisen kirjallisuuden päivä",
        official: false
    },
    "Yhdistyneiden Kansakuntien päivä": {
        name: "Yhdistyneiden Kansakuntien päivä",
        date: dayjs(dayjs().year() + "-10-24"),
        description: "Yhdistyneiden Kansakuntien päivä",
        official: false
    },
    "svenska dagen, ruotsalaisuuden päivä": {
        name: "svenska dagen, ruotsalaisuuden päivä",
        date: dayjs(dayjs().year() + "-11-6"),
        description: "svenska dagen, ruotsalaisuuden päivä",
        official: false
    },
    "Lapsen oikeuksien päivä": {
        name: "Lapsen oikeuksien päivä",
        date: dayjs(dayjs().year() + "-11-20"),
        description: "Lapsen oikeuksien päivä",
        official: false
    },
    "Jean Sibeliuksen päivä eli suomalaisen musiikin päivä": {
        name: "Jean Sibeliuksen päivä eli suomalaisen musiikin päivä",
        date: dayjs(dayjs().year() + "-12-8"),
        description: "Jean Sibeliuksen päivä eli suomalaisen musiikin päivä",
        official: false
    },
    "Kalevalan päivä eli suomalaisen kulttuurin päivä": {
        name: "Kalevalan päivä eli suomalaisen kulttuurin päivä",
        date: dayjs(dayjs().year() + "-2-28"),
        description: "",
        official: true
    },
    "Vappu eli suomalaisen työn päivä": {
        name: "Vappu eli suomalaisen työn päivä",
        date: dayjs(dayjs().year() + "-1-5"),
        description: "",
        official: true
    },
    "Äitienpäivä": {
        name: "Äitienpäivä",
        date: mothersDay(),
        description: "",
        official: true
    },
    "puolustusvoimain lippujuhlan päivä eli Suomen marsalkka C.G.E. Mannerheimin syntymäpäivä": {
        name: "puolustusvoimain lippujuhlan päivä eli Suomen marsalkka C.G.E. Mannerheimin syntymäpäivä",
        date: dayjs(dayjs().year() + "-6-4"),
        description: "",
        official: true
    },
    "Juhannuspäivä": {
        name: "Juhannuspäivä",
        date: juhannus(),
        description: "",
        official: true
    },
    "Isänpäivä": {
        name: "Isänpäivä",
        date: fathersDay(),
        description: "",
        official: true
    },
    "Itsenäisyyspäivä": {
        name: "Itsenäisyyspäivä",
        date: dayjs(dayjs().year() + "-12-6"),
        description: "",
        official: true
    },
}