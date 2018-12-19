// aloita js-skripti 'use strict':llä, jotta olet pakotettu käyttämään const:ia ja let:iä
'use strict';

//------------------------------------SELEKTORIT--------------------------------------------------------------------------
// valitse ensimmäinen formi id:n perusteella ja tee siitä muuttuja frmdata
const frmdata = document.querySelector('#form1');
// valitse toinen lomake id:n perusteella ja tee siitä muuttuja frm2data
const frm2data = document.querySelector('#form2');
// valitse toinen lomakkeen h6-elementti ja tallenna se muuttujaksi frm2h6. Tähän muutetaan vuoronsyötössä kyseinen päivämäärä
const frm2h6 = document.querySelector('#form2 h6');
//------------------------------------------------------------------------------------------------------------------------

// piilota div2 ja div3
document.querySelector('#div2').style.display = 'none';
document.querySelector('#div3').style.display = 'none';


//------------------------------------FUNKTIOT----------------------------------------------------------------------------
// tee funktio 'teeCSV', jota käytetään skriptin lopussa tapahtumankäsittelijässä
const teeCSV = (evt1) => {

  // estä klikatessa form1:n submit
  evt1.preventDefault();
  //-------------------------------

  // luo muuttujat, joihin poimitaan lomakkeesta käyttäjän syöttämät tiedot
  const tapahtumaNimi = frmdata.querySelector('input[name="nimi"]').value;
  const alkaapvm = frmdata.querySelector('input[name="alkaapvm"]').value;
  const loppuupvm = frmdata.querySelector('input[name="loppuupvm"]').value;

  // console loggaa käyttäjän syöttämä alkamispäivämäärä
  //console.log('Tämä on käyttäjän syöttämän ensimmäisen päivämäärän muoto JS:ssä: ' + alkaapvm);

  // luo moment-muuttujat alkamispäivämäärästä ja loppumispäivämäärästä
  let ap = moment('' + alkaapvm + '');
  let lp = moment('' + loppuupvm + '');
  //console.log('Tämä on käyttäjän syöttämän ensimmäisen päivämäärän muoto Momentissa: ' + ap);
  //console.log('Tämä on käyttäjän syöttämän viimeisen päivämäärän muoto Momentissa: ' + lp);

  // Moment laskee ensimmäisen ja viimeisen päivämäärän välisen eron päivissä
  const momentAikaero = lp.diff(ap, 'days')
  //console.log('Momentin laskema ensimmäisen ja viimeisen päivämäärän ero päivissä: ' + momentAikaero);

  // lisätään yksi päivä, jotta saadaan luku kuinka monta kertaa käyttäjältä pitää kysyä kyseisen päivän vuoro
  const paivatLkm = momentAikaero + 1;
  //console.log('Kuinka monta eri päivämäärää mahtuu annettujen päivämäärien väliin (mukaanlukien ensimmäinen ja viimeinen päivä): ' + paivatLkm);

  // näytä div2 ja piilota div1
  document.querySelector('#div2').style.display = 'block';
  document.querySelector('#div1').style.display = 'none';

  // luo string-muuttuja 'tulostettava', joka lopuksi printataan sivulle ja sisältää CSV-muotoisen tekstin
  let tulostettava = '';
  // lisää stringin perään string, jossa on tarvittava otsikkorivi rivinvaihdon kanssa
  tulostettava += 'Subject,Start date,Start time,End date,End time<br>';

  // !!! KIRJOITA TÄHÄN SOPIVA KOMMENTTI !!!
  let loppu = lp.format('L');


  // luo muuttuja 'juokseva', johon XXX...
  let juokseva = ap;
  // muuta toisen lomakkeen h6 vastaamaan käyttäjän syöttämää 'ensimmäistä päivää' juuri ennen kuin käyttäjä alkaa syöttämään ensimmäisen päivä työvuoroa
  frm2h6.innerHTML = juokseva.format("dddd, MMMM D YYYY");
  //
  console.log('Syötä nyt päivämäärän ' + juokseva.format("dddd, MMMM D YYYY") + ' työvuoro ja paina Lähetä!');




  //------------VUOROJEN KYSYMINEN----------------------------------------------------------

  // tee funktio 'kysyVuorot', jota käytetään skriptin lopussa tapahtumankäsittelijässä
  const kysyVuorot = (evtVuorot) => {

    // estä klikatessa form2:n submit
    evtVuorot.preventDefault();
    //-------------------------------

    // !!! KIRJOITA TÄHÄN SOPIVA KOMMENTTI !!!
    let juokseva2 = juokseva.format('L');





    // luo muuttuja, johon tallennetaan Nodelista kaikista vuoroista
    let valittuVuoro = frm2data.querySelectorAll('input[name="vuoro"]');
    // käy Nodelist läpi ja tallenna muuttujan 'valittuVuoro' arvoksi se, joka on valittu
    valittuVuoro.forEach((a) => {
      //console.log(a.checked);
      if (a.checked) {
        valittuVuoro = a.value;
        //console.log(valittuVuoro + 'moikka vaan');
      }
    });

    // käyttäjän valitessa custom-vuoron
    if (valittuVuoro == 'CUSTOM' && frm2data.querySelector('input[name="customStart"]').value != '' && frm2data.querySelector('input[name="customEnd"]').value != '') {
      
      let customAlkamisaika = frm2data.querySelector('input[name="customStart"]').value;
      console.log('CustomAlkamisaika:n arvo on: ' + customAlkamisaika);
      
      let customLoppumisaika = frm2data.querySelector('input[name="customEnd"]').value;
      console.log('CustomLoppumisaika:n arvo on: ' + customLoppumisaika);
      
      // luodaan apumuuttujat stringien muokkausta varten
      let part1, part2;

      // ajan ollessa iltapäivä, niin ei poisteta nollaa '0' tuntien edestä. Lisätään PM
      if (customAlkamisaika[0] != '0') {
        part1 = customAlkamisaika.concat(' ', 'PM');
      }

      if (customLoppumisaika[0] != '0') {
        part2 = customLoppumisaika.concat(' ', 'PM');
      }

      // ajan ollessa aamupäivä, niin poistetaan nolla '0' tuntien edestä. Lisätään AM
      if (customAlkamisaika[0] == '0') {
        part1 = customAlkamisaika.substr(0);
        part1 = customAlkamisaika.concat(' ', 'AM');
      }

      if (customLoppumisaika[0] == '0') {
        part2 = customLoppumisaika.substr(0);
        part2 = customLoppumisaika.concat(' ', 'AM');
      }

      let customValue = part1.concat('-', part2);
      console.log(customValue);
      
      // tallennetaan 'valittuVuoro'-muutujan 'CUSTOM'-arvon päälle customaika muuttujana 'customValue'
      valittuVuoro = customValue;
    }



    // konsoli loggaa valittuVuoro
    console.log('Syötit vuoron: ' + valittuVuoro + ' päivämäärälle: ' + juokseva.format("dddd, MMMM D YYYY") + ' KIITOS!');

    if (valittuVuoro != 'vapaa') {

      // lisää stringin jatkoksi tapahtuman tiedot
      tulostettava += tapahtumaNimi;
      tulostettava += ',';
      tulostettava += juokseva2;
      tulostettava += ',';


      // splittaa radiobuttonin value arrayksi käyttämällä separaattorina '-'
      let jaettu = valittuVuoro.split('-');

      tulostettava += jaettu[0];
      tulostettava += ',';
      tulostettava += juokseva2;
      tulostettava += ',';
      tulostettava += jaettu[1];
      tulostettava += ',<br>';

      console.log('Tässä on tähän asti kertynyt CSV-string: ' + tulostettava);

      console.log(juokseva2 + ' Tämä on juokseva2:n arvo, joka vastaa siitä, mikä on viimeisin päivä, joka on voitu lisätä CSV-stringiin');
      console.log(loppu + ' Tämä on loppu:n arvo, joka vastaa siitä, mikä on viimeinen päivä, joka tullaan lisäämään CSV-stringiin. Tämän jälkeen tulostetaan valmis string.');

    } 


    if (juokseva2 == loppu) {
      document.querySelector('#div3').style.display = 'block';
      document.querySelector('#div3 p').innerHTML = tulostettava;
      document.querySelector('#div2').style.display = 'none';
      return;
    }


    // kasvata muuttujaa 'juokseva' yhdellä päivällä
    juokseva = juokseva.add(1, 'days');
    // näytä 'Lähetä' klikkauksen jälkeen seuraavan päivä päivämäärä div2:n h6:ssa
    frm2h6.innerHTML = juokseva.format("dddd, MMMM D YYYY");
    console.log('Syötä nyt päivämäärän ' + juokseva.format("dddd, MMMM D YYYY") + ' työvuoro ja paina Lähetä!');

  };


  //------------------------------------TAPAHTUMANKÄSITTELIJÄT--------------------------------------------------------------
  // tapahtumankäsittelijä, joka kuuntelee toisen lomakkeen submit-käskyä ja tällöin suorittaa funktion 'kysyVuorot'
  frm2data.addEventListener('submit', kysyVuorot);
  //------------------------------------------------------------------------------------------------------------------------  
};


//------------------------------------TAPAHTUMANKÄSITTELIJÄT--------------------------------------------------------------
// tapahtumankäsittelijä, joka kuuntelee ensimmäisen lomakkeen submit-käskyä ja tällöin suorittaa funktion 'teeCSV'
frmdata.addEventListener('submit', teeCSV);
//------------------------------------------------------------------------------------------------------------------------
