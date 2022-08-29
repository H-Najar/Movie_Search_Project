import "../style.css";
// State + Reusable Component things
import "./comment.js";
import store from "./store/index.js";
import Comment from "./components/comments.js";
// IDB things
import { openDB } from "idb";

window.addEventListener("DOMContentLoaded", async () => {
  // Set up Database.
  openDB("comment-store", 1, {
    upgrade(db) {
      // Creates 'comments' Object Store if it doesn't already exist.
      db.createObjectStore("comments", { autoIncrement: true });
      console.log("hi");
    },
  });

  // Get comments from database, and add to state (see ./store/state.js).
  const db = await openDB("comment-store", 1);
  const comments = (await db.getAll("comments")) || {};
  for (let i = 0; i < comments.length; i++) {
    store.dispatch("addComment", comments[i]);
  }
  db.close();
});

const formElement = document.querySelector(".comment-form");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const commentElement = document.querySelector("#new-comment-field");

formElement.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  let name = nameElement.value.trim();
  let email = emailElement.value.trim();
  let contents = commentElement.value.trim();
  if (name.length && email.length && contents.length) {
    let comment = { name: name, email: email, contents: contents };
    // Add comment to state.
    store.dispatch("addComment", comment);
    // Add comment to database.
    const db = await openDB("comment-store", 1);
    await db.put("comments", comment);
    db.close();
    // Prepare form to recieve another comment.
    commentElement.value = "";
    commentElement.focus();
  }
});

const commentInstance = new Comment();
commentInstance.render();
