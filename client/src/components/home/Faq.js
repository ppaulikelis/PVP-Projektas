import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react'
import Background from '../additional/Background'
import MainHeader from '../headers/MainHeader';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faq = [
  {
    topic: 'Prenumerata',
    questions: [
      {
        question: 'Kokia prenumeratos kaina?',
        answer: '75 eurai per mėnesį.',
      },
      {
        question: 'Kaip užsisakyti prenumeratą?',
        answer: 'Įsigyti prenumeratą galite susisiekę su mumis el. paštu: pvp.projektas@pvp.pvp arba telefonu: +37061111111.',
      },
      {
        question: 'Ką aš gaunu su prenumerata?',
        answer: 'Užsisakę prenumeratą gaunate licencijos raktą, kuris leidžia užregistruoti 20 skirtingų vartotojų. Užsiregistravęs vartotojas gali kurti orientacines varžybas, pridėti neribotą kiekį klausimų ir užduočių, stebėti bei redaguoti rezultatus žaidimo metu ar jam pasibaigus.',
      },
      {
        question: 'Kada galima atsisakyti prenumeratos?',
        answer: 'Atsisakyti prenumeratos galite bet kuriuo Jums patogiu metu.',
      },
      {
        question: 'Kaip atsisakyti prenumeratos?',
        answer: 'Atsisakyti prenumeratos galite susisiekę su mumis el. paštu: pvp.projektas@pvp.pvp arba telefonu: +37061111111.',
      },
      {
        question: 'Ką daryti užsisakius prenumeratą?',
        answer: 'Užsisakę prenumeratą gaunate licencijos raktą su kuriuo galite sukurti ir užregistruoti iki 20 vartotojų. Susikūrus paskyrą galite pradėti kurti varžybas bei jas leisti žaisti mokiniams.',
      },
    ]
  },
  {
    topic: 'Varžybų kūrimas',
    questions: [
      {
        question: 'Kaip pradėti kurti varžybas?',
        answer: 'Norint pradėti kurti varžybas reikia prisijungti ir pasirinkti „Kurti naujas varžybas“ pagrindiniame meniu arba meniu juostoje.',
      },
      {
        question: 'Kiek galiu sukurti varžybų?',
        answer: 'Varžybų kiekis yra neribotas.',
      },
      {
        question: 'Kiek klausimų ar užduočių gali sudaryti vienerias varžybas?',
        answer: 'Klausimų kiekis yra neribotas. Tačiau rekomenduojame, jog klausimų/užduočių kiekis būtų toks, jog varžybos truktų nuo 1 iki 2 valandų.',
      },
      {
        question: 'Ar galiu peržiūrėti sukurtas varžybas?',
        answer: 'Sukurtas varžybas gali peržiūrėti ir koreguoti bet kuriuo Jums patogiu metu.',
      },
      {
        question: 'Ar galiu koreguoti sukurtas varžybas?',
        answer: 'Sukurtas varžybas gali peržiūrėti ir koreguoti bet kuriuo Jums patogiu metu.',
      },
      {
        question: 'Ar klausimo – užduoties atsakymas turi būti tik vienas žodis?',
        answer: 'Klausimo atsakymas gali būti bet kokio ilgio, tačiau reikia įvertinti ir tai, jog mokinių įrašytas atsakymas turi visiškai sutapti su Jūsų pateiktu.',
      },
      {
        question: 'Ar varžybų klausimas gali būti tik užuomina į užduoties vietą?',
        answer: 'Klausimas ir jo atsakymas tiesiogiai priklauso nuo jų. Norint paįvairinti žaidimą, rekomenduojame vietoj klausimų pateikti užuominas į tam tikras vietas, kuriose lauks atitinkama užduotis, o atsakymo eilutę reiks įrašyti šios užduoties atsakymą.',
      },
      {
        question: 'Kas yra klausimų – užduočių vertė?',
        answer: 'Vertė nusako, kiek balų gaus žaidėjai teisingai atsakę į atitinkamą klausimą.',
      },
    ]
  },
  {
    topic: 'Varžybų žaidimas',
    questions: [
      {
        question: 'Kaip į žaidimą prisijungti žaidėjams?',
        answer: 'Varžybų organizatoriui pradėjus varžybas, jis ekrane išvys žaidimo kodą. Šį kodą įvedus mokiniams į žaidimo kodo laukelį, jie bus prijungti į žaidimą.',
      },
      {
        question: 'Kaip registruoti komandą?',
        answer: 'Suvedus kodą žaidėjai bus perkelti į varžybų laukimo langą, kuriame bus pateiktos taisyklės ir komandos registravimas. Komandos narius registruoti galima paspaudus mygtuką „Pridėti“ ir įvedus komandos nario vardą.',
      },
      {
        question: 'Kiek mokinių gali žaisti vienerias varžybas?',
        answer: 'Vienerias varžybas gali žaisti neribotas kiekis mokinių ir komandų.',
      },
      {
        question: 'Kaip vyksta varžybos mokinių atžvilgiu?',
        answer: 'Mokiniai mato varžybų klausimų sąrašą, atvertus klausimą į jį atsako, patvirtina atsakymą. Atsakius į visus klausimus gali baigti varžybas. Pasibaigus laikui varžybos yra stabdomos, nepatvirtinti atsakymai nėra įrašomi.',
      },
      {
        question: '• Ar žaidimo metu varžybų organizatorius mato rezultatus?',
        answer: 'Organizatorius varžybų metu ir joms pasibaigus mato komandas ir jas sudarančius narius, jų rezultatą bei pateiktus atsakymus. Jei yra būtinybė, organizatorius gali keisti komandų gautus taškus.',
      },
      {
        question: 'Ar varžybas galima nutraukti anksčiau pabaigos laiko?',
        answer: 'Organizatorius bet kuriuo varžybų metu gali nutraukti vykstantį žaidimą.',
      },
      {
        question: 'Ar žaidėjas gali redaguoti savo pateiktą atsakymą į klausimą/užduotį?',
        answer: 'Jei žaidėjas jau buvo patvirtinęs atsakymą, jo keisti jau nebegalima.',
      },
    ]
  },
  {
    topic: 'Patarimai',
    questions: [
      {
        question: 'Orientacinių varžybų trukmė',
        answer: 'Rekomenduojama varžybų trukmė 1 – 2 valandos.',
      },
      {
        question: 'Tematikos, kurios labiausiai patinka mokiniams',
        answer: 'Mokiniams labiausiai patinka įvairūs galvosūkiai, menai ir kalbos. Vaikai dažniausiai vengia ar nėra patenkinti matematikos klausimais.',
      },
      {
        question: 'Mokinių žinios apie orientacines varžybas',
        answer: 'Daugelyje mokyklų mokiniai nėra susipažinę su orientacinėmis varžybomis ir jų vykdymo eiga, tad rekomenduojame prieš pradedant varžybas papasakoti apie žaidimo taisykles, kaip jis vyksta, galbūt atlikti bandomąjį žaidimą.',
      },
      {
        question: 'Telefonų baterija',
        answer: 'Įsitikinkite, kad žaidėjų telefonai yra pakankamai įkrauti ir baterijos užteks visai žaidimo trukmei. Rekomenduojame žaidimo metu atsargai turėti nešiojamą pakrovėją, kad būtų išvengta nesklandumų.',
      },
      {
        question: 'Saugus elgesys ir drausmė',
        answer: 'Prieš žaidimo pradžią organizatorius turėtų priminti saugių varžybų ir drausmės taisykles, kad būtų išvengta įvairių nelaimių ir nesklandumų. Varžybų dalyviai turėtų būti su tinkama avalyne.',
      },
    ]
  },
]

export default function Faq() {
  return (
    <Background>
      <MainHeader/>
      <Container maxWidth="md" sx={{pb: 5}}>
        <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{backgroundColor: '#AFC139'}}>
            <Box py={1} px={2}>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                Dažnai užduodami klausimai
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {faq.map((topic, index) => (
          <Card sx={{my: 5, borderRadius: '20px'}}>
          <CardContent sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}>
            <Box py={5} px={2} display="flex" flexDirection='column'>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                {topic.topic}
              </Typography>
              <br/>
              {topic.questions.map((question) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white'}}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}
                >
                  <Typography sx={{ color: 'white'}}>{question.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}>
                  <Typography sx={{ color: 'white'}}>
                    {question.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              ))}
            </Box>
          </CardContent>
        </Card>
        ))}
      </Container>
    </Background>
  )
}
