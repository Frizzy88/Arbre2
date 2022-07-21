//// HEADING //////
const today = new Date();
const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

document.getElementById("heading").innerHTML = today.toLocaleDateString(
  "fr-FR",
  options
);

//// DATA /////

// for making birth date to current date to show content
// you can change birth dates to current dates to see person in results
var d = new Date();
var currentMonthAndDate =
  (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
  "/" +
  d.getDate();

// Date :  MM/DD/YYYY
const data = [
  {
    id: 1,
    name: "JOB Ayden Chrismaëlys",
    date: "01/04/2018",
    image: "Hinconnu.png",
  },
  {
    id: 2,
    name: "JOB Isabelle Laure",
    date: "01/16/1987",
    image: "Job_Isabelle_Laure.png",
  },
  {
    id: 3,
    name: "JOB Eirine Peace Déborah",
    date: "01/29/2016",
    image: "Finconnu.png",
  },
  {
    id: 4,
    name: "ELOUNDOU Elena Solange Crescence",
    date: "02/11/2019",
    image: "Finconnu.png",
  },
  {
    id: 5,
    name: "JOB Marie-Ivana Karen",
    date: "03/01/2000",
    image: "Job_Marie_Ivana_Karen.PNG",
  },
  {
    id: 6,
    name: "FOULQUIER Anne-Marie",
    date: "03/15/2017",
    image: "Finconnu.png",
  },
  {
    id: 7,
    name: "NDONGO Jana Francine Laure",
    date: "03/23/1991",
    image: "Ndongo_Jana_Francine_Laure.PNG",
  },
  {
    id: 8,
    name: "JOB Agnès Christelle",
    date: "04/11/1988",
    image: "Job_Agnes_Christelle.PNG",
  },
  {
    id: 9,
    name: "JOB Jean Jules Audry",
    date: "04/20/1990",
    image: "Job_Jean_Jules_Audry.PNG",
  },
  {
    id: 10,
    name: "JOB Jean Charles Benjamin",
    date: "05/02/1961",
    image: "Job_Jean_Charles_Benjamin.PNG",
  },
  {
    id: 11,
    name: "JOB Maeva Ange Julie",
    date: "04/05/2004",
    image: "Job_Maeva_Ange_Julie.PNG",
  },
  {
    id: 12,
    name: "JOB Yannick Aimé",
    date: "04/07/1985",
    image: "job_Yannick_Aime.PNG",
  },
  {
    id: 13,
    name: "JOB Marie-Lucresse Alexandra",
    date: "04/08/1999",
    image: "Job_Marie_Lucresse_Alexandra.PNG",
  },
  {
    id: 14,
    name: "NANA DJIKE Léa Julia Gailla",
    date: "04/25/1998",
    image: "Nana_Njike_Lea_Julia_Gailla.PNG",
  },
  {
    id: 15,
    name: "JOB Charles Junior",
    date: "05/05/1989",
    image: "Job_Charles_Junior.PNG",
  },
  {
    id: 16,
    name: "JOB Yolande Sally",
    date: "05/18/1991",
    image: "Job_Yolande_Sally.PNG",
  },
  {
    id: 17,
    name: "JOB Daniel Frank Junior",
    date: "05/20/2003",
    image: "Job_Daniel_Franck_Junior.PNG",
  },
  {
    id: 18,
    name: "JOB Marie Hélène",
    date: "05/27/1977",
    image: "Job_Marie_Helene.PNG",
  },
  {
    id: 19,
    name: "JOB Rose Blanche",
    date: "06/23/1945",
    image: "Job_Rose_Blanche.PNG",
  },
  {
    id: 20,
    name: "JOB BAHIDA Jean Calvin",
    date: "06/30/1982",
    image: "Job_Bahida_Jean_Calvin_Nop.PNG",
  },
  {
    id: 21,
    name: "BAHIDA Idriss Raoul",
    date: "07/04/1987",
    image: "Bahida_Idriss_Raoul.PNG",
  },
  {
    id: 22,
    name: "JOB Frantz Rudolf",
    date: "07/17/1989", 
    image: "Job_Frantz_Rudolf.PNG",
  },
  {
    id: 23,
    name: "JOB Frédéric Charles",
    date: "07/17/1989", 
    image: "Job_Frederic_Charles.PNG",
  },
  {
    id: 24,
    name: "BAPA Julienne Tatiana",
    date: "07/18/1995", 
    image: "Bapa_Julienne_Tatiana.PNG",
  },
  {
    id: 25,
    name: "BISSECK Michel Philippe",
    date: "07/18/1980",
    image: "Hinconnu.png",
  },
  {
    id: 26,
    name: "JOB Jean Michel",
    date: "07/18/1951",
    image: "Hinconnu.png",
  },
  {
    id: 27,
    name: "JOB Yohan-Hélène",
    date: "07/25/1998",
    image: "job_Yohan_Helene.PNG",
  },
  {
    id: 28,
    name: "JOB Charles Rebecca",
    date: "08/21/1998",
    image: "Job_Charles_Rebecca.PNG",
  },
  {
    id: 29,
    name: "NGO BAKONGO July Christelle",
    date: "08/25/1993",
    image: "Ngo_Bakongo_July_Christelle.PNG",
  },
  {
    id: 30,
    name: "JOB BEKOK Sangal Mankay",
    date: "08/25/2004",
    image: "job_Bekok_Sangal_Mankay.PNG",
  },
  {
    id: 31,
    name: "BAHIDA Reine Cornelie",
    date: "09/02/1986",
    image: "Bahida_Reine_Cornelie.PNG",
  },
  {
    id: 32,
    name: "NDJOCK Alice Joelle",
    date: "09/03/1989",
    image: "Ndjock_Alice_Joelle.PNG",
  },
  {
    id: 33,
    name: "YAMSI JOB Gabe-Denzel Manaël",
    date: "09/19/2021",
    image: "Hinconnu.png",
  },
  {
    id: 34,
    name: "JOB LI LIBOG Jean Calvin",
    date: "09/20/1984",
    image: "Job_Li_Libog_Jean_Calvin.PNG",
  },
  {
    id: 35,
    name: "JOB Moïse Hermann",
    date: "09/25/1990",
    image: "Job_Moise_Hermann.PNG",
  },
  {
    id: 36,
    name: "JOB Fabien Yann Paul",
    date: "09/26/1984",
    image: "Job_Fabien_Yann_Paul.PNG",
  },
  {
    id: 37,
    name: "NJOH JOB Etienne Yannick",
    date: "09/30/2019",
    image: "Hinconnu.png",
  },
  {
    id: 38,
    name: "JOB Marie Johanna C.",
    date: "10/04/1984",
    image: "Job_Marie_Johanna_C.PNG",
  },
  {
    id: 39,
    name: "NGO JOB Rose nous a quitté le 21/02/2004",
    date: "10/21/1946",
    image: "Finconnu.png",
  },
  {
    id: 40,
    name: "JOB Louis Ebwadu",
    date: "10/26/2018",
    image: "Hinconnu.png",
  },
  {
    id: 41,
    name: "JOB KAMGA Lima Isabelle",
    date: "11/13/1988",
    image: "Finconnu.png",
  },
  {
    id: 42,
    name: "JOB Yolande Nadine",
    date: "11/17/1986",
    image: "Job_Yolande_Nadine.PNG",
  },
  {
    id: 43,
    name: "JOB Nelly Cynthia",
    date: "11/26/1979",
    image: "Finconnu.png",
  },
  {
    id: 44,
    name: "NGO BAKONGO Céline Yolaine",
    date: "12/03/1989",
    image: "ngo_Bakongo_Celine_Yolaine.PNG",
  },
  {
    id: 45,
    name: "JOB Marie Paule",
    date: "12/12/1987",
    image: "Finconnu.png",
  },
  {
    id: 46,
    name: "JOB Jean Charles, Johnny",
    date: "12/16/1992",
    image: "Hinconnu.png",
  },
  {
    id: 47,
    name: "Exemple: Larry Little",
    date: currentMonthAndDate + "/1996", // changing date and month to current date to show initial content
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
  },
  {
    id: 48,
    name: "Exemple: Hester Hogan",
    date: currentMonthAndDate + "/1997", // changing date and month to current date to show initial content
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-3_rxtqvi.jpg",
  },
  
  /*
  {
    id: 4,
    name: "",
    date: "",
    image: "",
  },*/
];

/// TODAY BIRTHDAY DATA FILTER////

var todayData = [];

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();

todayData = data.filter((person, index) => {
  const { date } = person;
  return (
    parseInt(date.substring(3, 5)) === currentDate &&
    parseInt(date.substring(0, 2)) === currentMonth + 1
  );
});

/// DISPLAY ////

var noOfBirthdays = document.getElementById("noOfBirthdays");
noOfBirthdays.innerHTML = "Nous avons, " + todayData.length + " anniversaires aujourd'hui";

var people = document.getElementById("people");

todayData.forEach((person) => {
  const { id, name, date, image } = person;

  var article = document.createElement("article");
  article.setAttribute("class", "person");

  var img = new Image();
  img.src = image;
  img.setAttribute("alt", name);

  var info = document.createElement("div");

  var h4 = document.createElement("h4");
  h4.setAttribute("id", "name");
  h4.innerHTML = name;

  var p = document.createElement("p");
  var dob = new Date(date);
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);
  p.innerHTML = age + " years";

  info.appendChild(h4);
  info.appendChild(p);

  article.appendChild(img);
  article.appendChild(info);

  people.appendChild(article);
});

//// clear ////

function clearAll() {
  people.innerHTML = "";
  noOfBirthdays.innerHTML = "0 birthdays today";
}