// aloita js-skripti 'use strict':llä, jotta olet pakotettu käyttämään const:ia ja let:iä
'use strict';

//------------------------------------SELEKTORIT--------------------------------------------------------------------------
// valitse ensimmäinen formi id:n perusteella ja tee siitä muuttuja frmdata
const frmdata = document.querySelector('#formEssi');
// valitse toinen lomake id:n perusteella ja tee siitä muuttuja frm2data
const frm2data = document.querySelector('#form2');
// valitse toinen lomakkeen h6-elementti ja tallenna se muuttujaksi frm2h6
const frm2h6 = document.querySelector('#form2 h6');
//------------------------------------------------------------------------------------------------------------------------

// piilota div2 ja div3
document.querySelector('#div2').style.display = 'none';
document.querySelector('#div3').style.display = 'none';


//------------------------------------FUNKTIOT----------------------------------------------------------------------------
// tee funktio 'teeCSV', jota käytetään skriptin lopussa tapahtumankäsittelijässä
const teeCSV = (evtEssi) => {

  // estä klikatessa formin submit
  evtEssi.preventDefault();


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

  // muuta toisen lomakkeen h6 vastaamaan käyttäjän syöttämää ensimmäistä päivää
  frm2h6.innerHTML = ap.format("dddd, MMMM D YYYY");


  document.querySelector('#div2').style.display = 'block';
  document.querySelector('#div1').style.display = 'none';

  let tulostettava = '';
  tulostettava += 'Subject,Start date,Start time,End date,End time<br>';
  const pvmJostaAlkaa = frmdata.querySelector('input[name="alkaapvm"]').value;

  const pvmJohonLoppuu = frmdata.querySelector('input[name="loppuupvm"]').value;

  let juoksevaPaivaTEST = moment('' + pvmJostaAlkaa + '');
  let endDay = moment('' + pvmJohonLoppuu + '');
  let loppu = endDay.format('L');
  //console.log(juoksevaPaivaTEST + ' <- Tämä on muuttuja juoksevaPaivaTEST');



  // tee funktio 'kysyVuorot', jota käytetään skriptin lopussa tapahtumankäsittelijässä
  const kysyVuorot = (evtVuorot) => {

    // estä klikatessa formin2 submit
    evtVuorot.preventDefault();
    //-------------------------------


    let p = juoksevaPaivaTEST.format('L');
    console.log(p);


    tulostettava += tapahtumaNimi;
    tulostettava += ',';
    tulostettava += juoksevaPaivaTEST.format('L');
    tulostettava += ',';


    // luo muuttuja, johon tallennetaan Nodelista kaikista vuoroista
    let valittuVuoro = frm2data.querySelectorAll('input[name="vuoro"]');
    valittuVuoro.forEach((a) => {
      //console.log(a.checked);
      if (a.checked) {
        valittuVuoro = a.value;
        //console.log(valittuVuoro + 'moikka vaan');
      }
    });
    // TESTI konsoli loggaa valittuVuoro
    console.log(valittuVuoro + ' <- toi oli käyttäjän syöttämä eka vuoro?');

    let jaettu = valittuVuoro.split('-');

    tulostettava += jaettu[0];
    tulostettava += ',';
    tulostettava += juoksevaPaivaTEST.format('L');
    tulostettava += ',';
    tulostettava += jaettu[1];
    tulostettava += ',<br>';

    console.log(tulostettava);

    console.log(p + ' Tämä on p:n arvo');
    console.log(loppu + ' Tämä on loppu:n arvo');

    if (p == loppu) {

      document.querySelector('#div3').style.display = 'block';
      document.querySelector('#div3 p').innerHTML = tulostettava;
      document.querySelector('#div2').style.display = 'none';

      return;

    }

    //console.log(juoksevaPaivaTEST);
    juoksevaPaivaTEST = juoksevaPaivaTEST.add(1, 'day');
    //console.log(juoksevaPaivaTEST.format());


    //vuorot[p] = valittuVuoro;
    //console.log(vuorot + 'moi moi moi');
    // tais toimia



  };


  frm2data.addEventListener('submit', kysyVuorot);
};



// tehdään olio, mihin laitetaan käyttäjän syöttämät vuorot ja niitä vastaavat päivämäärät
let vuorot = {};
console.log(vuorot);


//------------------------------------TAPAHTUMANKÄSITTELIJÄT--------------------------------------------------------------
// tapahtumankäsittelijä, joka kuuntelee ensimmäisen lomakkeen submit-käskyä ja tällöin suorittaa funktion 'teeCSV'
frmdata.addEventListener('submit', teeCSV);
// tapahtumankäsittelijä, joka kuuntelee toisen lomakkeen submit-käskyä ja tällöin suorittaa funktion 'kysyVuorot'
//frm2data.addEventListener('submit', kysyVuorot);
//------------------------------------------------------------------------------------------------------------------------















































//-----------------------Kommentteja-------------------------------------------



// Mitä tietoja tarvitaan käyttäjältä: tapahtuman nimi, työvuorojen alkamispvm, työvuorojen päättymispvm


//-----------------Villen kokeilu alkaa---------------------------------------

/*
// poimitaan formista alkamisajat ja päättymisajat
 const tapahtumaNimi = frmdata.querySelector('input[name="nimi"]').value;
 const alkaapvm = frmdata.querySelector('input[name="alkaapvm"]').value;
 const loppuupvm = frmdata.querySelector('input[name="loppuupvm"]').value;

// splitataan ne arrayksi
 const ap = alkaapvm.split('-');
 const ak = alkaaklo.split(':');
 const lp = loppuupvm.split('-');
 const lk = loppuuklo.split(':');

// luodaan uudet aika-objektit (Date-object), johon laitetaan arvoiksi edellisen indeksejä
 const d1 = new Date(ap[0],ap[1],ap[2],ak[0],ak[1]);
 const d2 = new Date(lp[0],lp[1],lp[2],lk[0],lk[1]);

 if (d1 >= d2) {
   alert('INVALID DATES!!!');
 } else {
   alert('yay!');
 }

 console.log(ap);
 console.log(ak);
 console.log(lp);
 console.log(lk);

 console.log(d1);
 console.log(d2);
*/

//-----------------Villen kokeilu loppuu---------------------------------------