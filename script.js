// 1. STORY HIGHLIGHTS: clicking a circle scrolls to its section.
// Each button stores the section's id in data-target.
var stories = document.querySelectorAll(".story");            // select all story buttons (DOM)
stories.forEach(function (btn) {
  btn.addEventListener("click", function () {                   // event listener for click
    var section = document.getElementById(btn.dataset.target);  // find the section by id
    section.scrollIntoView({ behavior: "smooth" });             // smooth scroll to it
  });
});

// 2. LIKE BUTTON: toggles ♡ / ❤️ and changes the likes count by 1.
var likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var post = btn.closest(".post-card");                       // the post this button belongs to
    var countSpan = post.querySelector(".count");
    var heart = btn.querySelector(".heart");
    var count = parseInt(countSpan.textContent);
    if (btn.classList.contains("liked")) {
      btn.classList.remove("liked");
      heart.textContent = "♡";
      countSpan.textContent = count - 1;
    } else {
      btn.classList.add("liked");
      heart.textContent = "❤️";
      countSpan.textContent = count + 1;
    }
  });
});

// 3. COMMENT BUTTON: opens/closes a comment box and lets the visitor add a comment.
// Comments only appear on the page (no database), and disappear on refresh.
var commentButtons = document.querySelectorAll(".comment-btn");
commentButtons.forEach(function (btn) {
  var post = btn.closest(".post-card");
  // add a hidden comment box at the bottom of the post
  post.insertAdjacentHTML("beforeend",
    '<div class="comments d-none">' +
      '<div class="comment-list"></div>' +
      '<div class="input-group input-group-sm mt-2">' +
        '<input type="text" class="form-control comment-input" placeholder="Add a comment...">' +
        '<button class="btn btn-sky post-comment">Post</button>' +
      '</div>' +
    '</div>');
  var box = post.querySelector(".comments");
  var input = post.querySelector(".comment-input");
  var list = post.querySelector(".comment-list");
  var total = 0;

  // click 💬 -> show or hide the comment box
  btn.addEventListener("click", function () {
    box.classList.toggle("d-none");
  });

  // click Post -> add the comment to the list (ignore empty text)
  function addComment() {
    var text = input.value.trim();
    if (text === "") { return; }
    var item = document.createElement("div");
    item.innerHTML = "<strong>you</strong> ";
    item.appendChild(document.createTextNode(text));            // textContent-safe
    list.appendChild(item);
    input.value = "";
    total = total + 1;
    btn.textContent = "💬 " + total;                            // show number of comments
  }
  post.querySelector(".post-comment").addEventListener("click", addComment);
  input.addEventListener("keydown", function (e) {              // Enter key also posts
    if (e.key === "Enter") { addComment(); }
  });
});

// 4. CONTACT FORM VALIDATION: blocks empty fields.
// The form does NOT send an email (frontend-only project).
var form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();                                       // stop page reload
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();
  var msgBox = document.getElementById("formMsg");
  if (name === "" || email === "" || message === "") {
    msgBox.style.color = "red";
    msgBox.textContent = "Please fill in all fields.";
  } else {
    msgBox.style.color = "green";
    msgBox.textContent = "Thanks " + name + "! Your message is ready (demo only, not sent).";
    form.reset();
  }
});