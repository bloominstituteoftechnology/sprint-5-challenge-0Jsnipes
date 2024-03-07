async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  

const mentorsURL = 'http://localhost:3003/api/mentors';
const learnersURL = 'http://localhost:3003/api/learners';

const fetchLearners = async () => {
  try {
    const learnerCard = await axios.get(learnersURL);
    const learnerData = learnerCard.data;
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
  } 
  catch (error) {
    console.error('Error fetching mentor data:', error);
    return [];
  }
};

const createLearnerCards = async () => {
  try {
    const learnerData = await fetchLearners();
    
    learnerData.forEach(element => {
      const card = document.createElement('div');
      card.classList.add('card');
      const cardsContainer = document.querySelector('.cards');

      const nCard = element.email;
      const lCard = element.fullName;
      const iCard = element.id;
      const mCard = element.mentors;

      const h3 = document.createElement('h3');
      const div = document.createElement('div');
      const h4 = document.createElement('h4');

      h3.textContent = `${lCard}, ${iCard}`;
      div.textContent = `Email: ${nCard}`;
      h4.textContent = `Mentors: ${mCard}`;
      h4.classList.add('closed');

      card.appendChild(h3);
      card.appendChild(div);
      card.appendChild(h4);

      cardsContainer.appendChild(card);
    });
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
