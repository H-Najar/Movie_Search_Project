let userSection = document.querySelector(".movie-notes");
let isShow = true;

function showHideNotes() {
  if (isShow) {
    userSection.style.display = "none";
    isShow = false;
  } else {
    userSection.style.display = "block";
    isShow = true;
  }
}
