async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  

const mentorsURL = 'http://localhost:3003/api/mentors';
const learnersURL = 'http://localhost:3003/api/learners';

const fetchLearners = async () => {
  try {
    const learnerCard = await axios.get(learnersURL);
    const learnerData = learnerCard.data;
    document.querySelector('.info').textContent = 'No learner is selected';
    return learnerData;
  } catch (error) {
    console.error('Error fetching learner data:', error);
    return [];
  }
};

const fetchMentors = async () => {
  try {
    const mentorCard = await axios.get(mentorsURL);
    const mentorData = mentorCard.data;
    return mentorData;
  } catch (error) {
    console.error('Error fetching mentor data:', error);
    return [];
  }
};

const createLearnerCards = async () => {
  try {
    const mentorData = await fetchMentors();

    const mentorMapFirst = new Map();
    const mentorMapLast = new Map();
    
    mentorData.forEach(mentor => {
      mentorMapFirst.set(mentor.id, mentor.firstName);
      mentorMapLast.set(mentor.id, mentor.lastName);
    });

    const learnerData = await fetchLearners();
    const cardsContainer = document.querySelector('.cards');

    learnerData.forEach(element => {
      const card = document.createElement('div');
      card.classList.add('card');

      const nCard = element.email;
      const lCard = element.fullName;
      const iCard = element.id;
      const mCard = element.mentors;

      const h3 = document.createElement('h3');
      const div = document.createElement('div');
      const h4 = document.createElement('h4');
      const ul = document.createElement('ul');

      h3.textContent = `${lCard}`;
      div.textContent = `${nCard}`;
      h4.textContent = `Mentors`;
      h4.classList.add('closed');

      mCard.forEach(id => {
        const mentorFirstName = mentorMapFirst.get(id);
        const mentorLastName = mentorMapLast.get(id);
        const li = document.createElement('li');
        li.textContent = `${mentorFirstName} ${mentorLastName}`;
        ul.appendChild(li);
      });

      card.appendChild(h3);
      card.appendChild(div);
      card.appendChild(h4);
      card.appendChild(ul);

      cardsContainer.appendChild(card);
      
      
      card.addEventListener('click', evt => {
        const isAlreadySelected = card.classList.contains('selected');
    
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.remove('selected'));
    
       
        card.classList.toggle('selected');
    
        if (!isAlreadySelected) {
            card.querySelector('h3').textContent = `${lCard}, ID ${iCard}`
            document.querySelector('.info').textContent = `The selected learner is ${lCard}`;

        } else {
            card.querySelector('h3').textContent = `${lCard}`
            document.querySelector('.info').textContent = 'No learner is selected';
            card.classList.remove('selected')
        }
      document.querySelectorAll('.card').forEach(otherCard => {
        otherCard.addEventListener('click',evt => {
          if (otherCard !==card) {
            card.querySelector('h3').textContent = `${lCard}`
          }
        })
      })
      
    })
    h4.addEventListener('click', evt => {
      h4.classList.toggle('closed')
      h4.classList.toggle('open')
      if (card.classList.contains('selected')){
        evt.stopPropagation();
      }
      })

    })


  } catch (error) {
    console.error('Error creating learner cards:', error);
  }

};

createLearnerCards();



const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();
footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
