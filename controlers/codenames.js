const code = require('../models/codenames');

const idDest = {
    Michał: '5ff763fb572173f01c986421',
    Ala: '5ff872e07151ab09306c6dc7',
    Tomek: '5ff871cce1b9b10be4889e77',
    Grześ: "5ff87324acfd011fe47bd759", 
    Gosia: "5ff87337d361983b60736019",
}

const codenamesURL = 'http://localhost:3000/?'

const home = (req, res) => {
    res.render('index')
}
const add_room_direct = (req,res) => {
    res.sendFile('../views/add.html', { root: __dirname}) 
}

const add_room = (req, res) => {
    const roomname = req.body.roomname

    const room = new code({
        roomname: roomname,
        curwords: [],
        previevwords: [],
        key: [],
    });

    room.save()
        .then((result) => {
            idDest[roomname] = result._id
            res.send('Set: { ' + roomname + ': "' + idDest[roomname] + '", }')
        })
        .catch((err) => {
            console.log(err)
        })
}

const transName= (req,res) => {
    console.log('trasName')
    var id = ''
    const roomname = req.params.roomname
    console.log('Conect to: ' + roomname)

    id = idDest[roomname]
    if(!id){id = ''}

    console.log(id)

    var url = '/?' + id;
    console.log(id)
    res.send({id})
}

const findByID = (req,res) => {
    const id = req.params.id
    
    code.findById(id)
        .then((result) => {
            console.log('-----Get game Data Base: \n' + result)
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
}

const draw = (req,res) => {
    const id = req.params.id
    code.findById(id)
        .then((result) => {
            const words = ["MILONER","MYSZ","SOCZEWKA","MASA","PAZUR","GOTYK","PRACA","GRZYB","WIATR","PŁOT","DZIĘCIOŁ","BAWEŁNA","BICZ","NOWY JORK","KOŁO","ROBAK","KARTA","PASTA","PODKOWA","LINA","KLATKA","TUSZA","TABLICA","LÓD","SZKOŁA","JEDNOROŻEC","BOMBA","PUNKT","HAK","FRANCUZ","SIEĆ","KONTAKT","OLIWA","FUNT","NOC","ANTARKTYKA","KOŚCIÓŁ","SAMOCHÓD","OŚMIORNICA","KSIĘŻYC","RYBA","GRZMOT","POCHODNIA","ŚNIEG","MISTRZ","SPADEK","HOLLYWOOD","FIGURA","ZMYWACZ","TUBA","MATERIAŁ","SZCZĘŚCIE","ŚLIMAK","CHOCHLIK","TOKIO","KOT","PAS","TRÓJKĄT","POCIECHA","POCZTA","ŁUK","CZEKOLADA","KASYNO","KANGUR","KRASNAL","SATURN","OPERA","AMAZONKA","RULETKA","RZĄD","HOTEL","KROPKA","HUMOR","DIAMENT","DOKTOR","KLAMKA","BUT","RÓG","PODKŁAD","WIDELEC","TCHÓRZ","KOD","GNIAZDKO","NAUCZYCIEL","BAR","KOZIOŁ","PIRAT","SZPILKA","BERLIN","ŻABKA","ORZECH","FENIKS","SIANO","KRZYŻ","NOGA","WYBUCH","WIELORYB","NORA","NIEBO","GOŁĄB","DZWON","OBCY","DZIOBAK","GŁADKI","PLIK","DUCH","MIÓD","OJAZD","OLIMP","WSTĘP","PŁYTA","CZAPA","USTA","MIKROSKOP","GRA","KOSTIUM","KORONA","JAGODA","SZCZYT","LEW","GOLF","ŻYCIE","GŁOWA","PLASTIK","WIEŻA","OGIEŃ","WAGA","POCIĄG","WKŁAD","CENTAUR","BASEN","KECZUP","PAJĄK","ZĄB","OBSADA","PTERODAKTYL","PUDŁO","MOSKWA","FARTUCH","LAKIER","BECZKA","SILNIKTRAWA","MAKS","ŚMIEĆ","STADION","TRUTEŃ","GRABARZ","NIEDŹWIEDŹ","EKRAN","NEKTAR","ŁOŻYSKO","PROMIEŃ","ŁÓDŻ","KLUCZ","ZŁODZIEJ","TALIA","KAMIŃ","BLAT","AFRYKA","BĄK","NÓŻ","BABKA","GÓRA","SIŁA","AUSTRALIA","NINJA","FILM","MUSZLA","PERŁA","LIS","BAWEŁNA","UCHO","SERCE","ANGLIA","ŚWINIA","RĘKA","GRECJA","KRĘGI","JOWISZ","IGŁA","SŁUP","REKIN","LODY","KARAWAN","ZIELEŃ","RZYM"," KRAKÓW","RUDA","ŻURAW","ZWOJE","POWIETRZE","BANK","ZAMEK","KONTAKT","ŻUBR","KSIĘŻNICZKA","BERMUDY","NAPAD","GAZ","KIWI","DZIURA","LACH NESS","EUROPA","SZEKSPIR","WIEŻOWIEC","KRÓWKA","RZĘSA","LOT","STRONA","HELIKOPTER","PRAWO","BELKA","KOLEC","GRACJA","KASA","NOS","ROBOT","ZŁOTO","MODEL","HOLENDER","ZMIANA","KRZESŁO","REWOLUCJA","PLASTIK","CIEŃ","STOPA","STATEK","WĄŻ","MUCHA","BUTELKA","KOMÓRKA","ŁAWA","MERKURY","SPADOCHRON","CZUJKA","KONCERT","PIES","BUDOWA","DWÓR","KONAR","SZPIEG","ANIOŁ","SKORUPA","KWADRAT","GUMA","MUR","AS","PORT","POŁĄCZENIE","NIEMCY","RÓŻA","MAMUT","BLOK","WACHLARZ","PIELĘGNIARKA","KRET","OGIER","PUSTKA","CZAS","GIGANT","STRZAŁ","PIRAMIDA","RAMA","AMBULANS","PIERŚCIEŃ","TUSZ","ZEBRA","RZUT","ZIEMIA","RĘKAWICA","SZKŁO","SZTUKA","RAK","SATELITA","TALERZ","FOKA","PLACEK","FRANCJA","STAN","HIMALAJE","PISTOLET","JĘZYK","CZAR","NIĆ","WIEDŻMA","LIMUZYNA","PAN","TOREBKA","SKORPION","AZTEK","KOŃ","KLAWISZ","KUCHARZ","LASKA","KRÓLOWA","OPOKA","ZESPÓŁ","KACZOR","WODA","AMBASADA","PRAWNIK","PÓŁNOC","OKO","RYCERZ","SZNUR","KOŚĆ","ORZEŁ","CENTRUM","PINGWIN","KRÓL","ORGANY","SUPERBOHATER","ŻUK","GENIUSZ","PALETA","MEKSYK","JABŁKO","OLEJ","LASER","TRĄBA","GWIAZDA","SIEKACZ","OGON","KAPTUR","POLE","GUZIK","WYDECH","DRZEWO","PILOT","GROSZEK","SUKIENKA","ŚWIERSZCZ","DUSZA","POKRYWKA","SZPITAL","TELESKOP","GNAT","TEATR","SOKÓŁ","MAJ","MARCHEW","CHINY","SZKOCJA","FALA","WIOSNA","SZMUGIEL","ZNAK","CIAŁO","EGIPT","KCIUK","TOALETA","SMOK","SZAFA","TRUCIZNA","DZIEŃ","PRZEWODNIK","NAUKOWIEC","LONDYN","ATLANTYDA","CEBULA","WOJNA","BAL","DNO","WASZYNGTON","PEKIN","STRUNIEŃ","DANIA","RURA","TWARZ","KRÓLIK","TANIEC","KORZENIE","PUPIL","CHOROBA","PALUSZKI","RAKIETA","DONICE","POLICJA","DYWAN","JATKA","STOŁEK","NUREK","JAJA","PAPIER","SAMOLOT","DINOZAUR","AMERYKA","SPLOT","MIEDŹ","LINA","STOPIEŃ","AWARIA","ŻELAZO","POLSKA","ŻOŁNIERZ","KALOSZ","ŻEBRO","STÓŁ"]

            const newrecord = {
                curwords: '',
                previevwords: result.previevwords,
                key: [3,3,2,1,2,2,3,2,3,1,2,0,3,3,1,2,2,1,3,1,1,1,1,2,1],
                roomname: result.roomname,
            }

            if(newrecord.previevwords.length >= 100){
                newrecord.previevwords.splice(0,25)
            }
            
            newrecord.curwords = []

            var j, x, i;
            for (i = newrecord.key.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = newrecord.key[i];
                newrecord.key[i] = newrecord.key[j];
                newrecord.key[j] = x;
            }

            (Math.random() < 0.5) ? newrecord.key.push(true) : newrecord.key.push(false);

            while(newrecord.curwords.length < 25){
                var tempword = words[Math.floor(Math.random() * 398)]
                if(newrecord.curwords.indexOf(tempword) === -1){
                    if(newrecord.previevwords.indexOf(tempword) === -1){
                        newrecord.curwords.push(tempword)
                    }
                }
            }
            
            newrecord.previevwords = newrecord.previevwords.concat(newrecord.curwords)

            code.findByIdAndUpdate(id,newrecord,function (err, docs) { 
                if (err){ 
                    console.log(err) 
                } 
                else{ 
                    console.log("Update " + id + ": " + docs); 
                    res.send(docs)
                }
            })

            //var url = codenamesURL + id
            //res.redirect(url);
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    home,
    findByID,
    transName,
    draw,
    add_room,
    add_room_direct,
}