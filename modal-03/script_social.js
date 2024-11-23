

const modalDialog = document.querySelector(".copy-link-dialog");
const shareBtn = document.querySelector(".share-btn");
const closeBtn = document.querySelector(".close-btn");
const copyBtn = document.querySelector(".copy-link-btn");
const shareTeamBtn = document.querySelector(".share-team-btn");

closeBtn.addEventListener("click", () => {
  modalDialog.togglePopover();
});

copyBtn.addEventListener("click", () => {
  const copyInput = document.getElementById("copy-link-input");
  copyInput.select();
  copyInput.setSelectionRange(0, 99999);
  
  navigator.clipboard.writeText(copyInput.value);
  const copyLinkBtn = document.getElementById("copy-link-btn");
  copyLinkBtn.innerHTML = "Copied!";
});

const accessList = document.querySelectorAll(".access-list");

const peopleWithPotentialAccess = [
  {
    id: 1,
    name: 'Elizabeth Fisher',
    src: 'assets/elizabeth.jpg',
  },
  // users
]

let peopleWithActualAccess = [
  {
    userId: 2,
    access: 'read',
  }
];

const svgIcon = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>`

const createAccessMarkup = (person) => {
  return DOMPurify.sanitize(`<div class="access">
    <img src="${person.src}" alt="${person.name}">
    <h4>${person.name}</h4>
    <div class="access-select">
      <select selected="${person.access}">
          <option value="read">read</option>
          <option value="readwrite">read & write</option>
          <option value="owner">owner</option>
      </select>
    </div>
  </div>`);
}

const accesses = peopleWithActualAccess.map(
  (access) => {
    const person = peopleWithPotentialAccess.find(
      (potentialPerson) => 
        potentialPerson.id === access.userId
    );
    return createAccessMarkup(person);
})

accessList[0].innerHTML = accesses;

//? autocomplete for sharing with teammates
const input = document.getElementById(
  'share-to-teammate'
);

let resultToSubmit = {};
const autoCompleteResults = document.getElementById(
  'autocomplete-results'
)

input.onkeyup = function(e) {
  inputVal = this.value;

  if (inputVal.length > 0) {
    const filteredResults = peopleWithPotentialAccess.filter(
      (person) => {
        if (person.name.toLowerCase()
            .includes(inputVal.toLowerCase())) {

          const isAlreadyShared = peopleWithActualAccess.find(
            (access) => access.userId === person.id
          );
          
          if (!isAlreadyShared) {
            return true
          }
        }
        
        return false;
    });

    autoCompleteResults.innerHTML = '';
    filteredResults.forEach((person) => {
      const li = document.createElement('li');
      li.innerHTML = DOMPurify.sanitize(
        `<img src="${person.src}" alt="${person.name}">${person.name}`
      );
      li.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = person.name;
        resultToSubmit = {
          userId: person.id,
          access: 'read',
          ...person
        };
        autoCompleteResults.innerHTML = '';
      });

      autoCompleteResults.appendChild(li);
    });

  } else {
    autoCompleteResults.innerHTML = '';
  }
}

shareTeamBtn.addEventListener('click', () => {
  const person = peopleWithPotentialAccess
    .find((potentialPerson) => 
      potentialPerson.name === input.value
  );
  const newAccess= createAccessMarkup(person);
  accessList[0].innerHTML += newAccess;
  peopleWithActualAccess.push(resultToSubmit);
  
  input.value = '';
});