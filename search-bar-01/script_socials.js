

const actionList = [
	{
		name: "New document",
		description: "Create a brand new document",
    // icon in svg
    link: '/#new-document'
	},
  // action list
];

const resultBox = document.querySelector(".results");
const inputBox = document.querySelector(".search-bar");

const displayResults = function (result) {
  if (result.length > 0) {
    const resultHTML = result.map(function (action, i) {
      return `<li>
        <a href="${action.link}">
          ${action.icon}${action.name}
        </a>
      </li>`;
    });

    resultBox.innerHTML = '<ul>' + resultHTML.join("") + '</ul>';
  } else {
    resultBox.innerHTML = `<div class="container">
      <div class="icon-wrapper">
        <!-- icon -->
      </div>
      <p>${input.value} did not match any results.</p>
    </div>`;
  }
}

inputBox.onkeyup = function (e) {
  let result = [];

  const input = inputBox.value.toLowerCase();
  if (input.length === 0) {
    resultBox.innerHTML = ``;
  }

  if (input.length) {

    result = actionList.filter((action) => {
      return action.name.toLowerCase().includes(input);
    });

    displayResults(result);
  }
};
