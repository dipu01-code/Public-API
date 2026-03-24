/* =============================================
   Public API Playground — JavaScript
   Each API has its own async function.
   All functions handle loading + error states.
   ============================================= */

// ----- Helper: show a toast notification -----
function showToast(message) {
  var toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(function() { toast.classList.remove("show"); }, 2000);
}

// ────────────────────────────────────────────
// 1. DOG API
// ────────────────────────────────────────────
var lastDogUrl = "";

async function getDog() {
  var placeholder = document.getElementById("dogPlaceholder");
  var result      = document.getElementById("dogResult");
  var btn         = document.getElementById("btnDog");
  var copyBtn     = document.getElementById("btnCopyDog");

  // Show loading state
  result.style.display      = "none";
  placeholder.style.display = "block";
  placeholder.className     = "loading-text";
  placeholder.innerText     = "Loading...";
  btn.classList.add("loading");

  try {
    var res  = await fetch("https://dog.ceo/api/breeds/image/random");
    var data = await res.json();
    var img  = data.message;
    lastDogUrl = img;

    // Extract breed from URL: .../breeds/<breed>/image.jpg
    var breed = img.split("/")[4].replace(/-/g, " ");

    document.getElementById("dogImg").src     = img;
    document.getElementById("dogBreed").innerText = breed;

    // Show result, hide placeholder
    placeholder.style.display = "none";
    result.style.display      = "block";
    copyBtn.style.display     = "inline-flex";
  } catch (err) {
    console.error("Dog API error:", err);
    placeholder.className = "error-text";
    placeholder.innerText = "Error loading data";
  } finally {
    btn.classList.remove("loading");
  }
}

// Copy the dog image URL to clipboard
function copyDogImage() {
  if (!lastDogUrl) return;
  navigator.clipboard.writeText(lastDogUrl).then(function() {
    showToast("🐕 Image URL copied!");
  });
}

// ────────────────────────────────────────────
// 2. JOKE API
// ────────────────────────────────────────────
var lastJokeText = "";

async function getJoke() {
  var placeholder = document.getElementById("jokePlaceholder");
  var result      = document.getElementById("jokeResult");
  var btn         = document.getElementById("btnJoke");
  var copyBtn     = document.getElementById("btnCopyJoke");

  // Show loading
  result.style.display      = "none";
  placeholder.style.display = "block";
  placeholder.className     = "loading-text";
  placeholder.innerText     = "Loading...";
  btn.classList.add("loading");

  try {
    var res  = await fetch("https://official-joke-api.appspot.com/random_joke");
    var data = await res.json();

    document.getElementById("setup").innerText     = data.setup;
    document.getElementById("punchline").innerText = data.punchline;
    lastJokeText = data.setup + "\n" + data.punchline;

    placeholder.style.display = "none";
    result.style.display      = "block";
    copyBtn.style.display     = "inline-flex";
  } catch (err) {
    console.error("Joke API error:", err);
    placeholder.className = "error-text";
    placeholder.innerText = "Error loading data";
  } finally {
    btn.classList.remove("loading");
  }
}

// Copy joke text to clipboard
function copyJoke() {
  if (!lastJokeText) return;
  navigator.clipboard.writeText(lastJokeText).then(function() {
    showToast("😂 Joke copied!");
  });
}

// ────────────────────────────────────────────
// 3. RANDOM USER API
// ────────────────────────────────────────────
var lastUserInfo = "";

async function getUser() {
  var placeholder = document.getElementById("userPlaceholder");
  var result      = document.getElementById("userResult");
  var btn         = document.getElementById("btnUser");
  var copyBtn     = document.getElementById("btnCopyUser");

  // Show loading
  result.style.display      = "none";
  placeholder.style.display = "block";
  placeholder.className     = "loading-text";
  placeholder.innerText     = "Loading...";
  btn.classList.add("loading");

  try {
    var res  = await fetch("https://randomuser.me/api/");
    var data = await res.json();
    var user = data.results[0];
    var fullName = user.name.first + " " + user.name.last;

    document.getElementById("userName").innerText    = fullName;
    document.getElementById("userEmail").innerText   = "📧 " + user.email;
    document.getElementById("userCountry").innerText = "🌍 " + user.location.country;
    document.getElementById("userPhone").innerText   = "📞 " + user.phone;
    document.getElementById("userImg").src           = user.picture.large;

    lastUserInfo = fullName + "\n" + user.email + "\n" + user.location.country + "\n" + user.phone;

    placeholder.style.display = "none";
    result.style.display      = "flex";
    copyBtn.style.display     = "inline-flex";
  } catch (err) {
    console.error("User API error:", err);
    placeholder.className = "error-text";
    placeholder.innerText = "Error loading data";
  } finally {
    btn.classList.remove("loading");
  }
}

// Copy user info to clipboard
function copyUser() {
  if (!lastUserInfo) return;
  navigator.clipboard.writeText(lastUserInfo).then(function() {
    showToast("👤 User info copied!");
  });
}

// ────────────────────────────────────────────
// 4. JSONPLACEHOLDER API
// ────────────────────────────────────────────
var lastPostsText = "";

async function getPosts() {
  var placeholder = document.getElementById("jsonPlaceholder");
  var result      = document.getElementById("jsonResult");
  var btn         = document.getElementById("btnJson");
  var copyBtn     = document.getElementById("btnCopyJson");

  // Show loading
  result.style.display      = "none";
  placeholder.style.display = "block";
  placeholder.className     = "loading-text";
  placeholder.innerText     = "Loading...";
  btn.classList.add("loading");

  try {
    var res  = await fetch("https://jsonplaceholder.typicode.com/posts");
    var data = await res.json();

    // Display the first 3 post titles
    var list = document.getElementById("postsList");
    list.innerHTML = "";
    lastPostsText  = "";

    for (var i = 0; i < 3; i++) {
      var li       = document.createElement("li");
      li.innerText = data[i].title;
      list.appendChild(li);
      lastPostsText += (i + 1) + ". " + data[i].title + "\n";
    }

    placeholder.style.display = "none";
    result.style.display      = "block";
    copyBtn.style.display     = "inline-flex";
  } catch (err) {
    console.error("JSONPlaceholder API error:", err);
    placeholder.className = "error-text";
    placeholder.innerText = "Error loading data";
  } finally {
    btn.classList.remove("loading");
  }
}

// Copy posts text to clipboard
function copyPosts() {
  if (!lastPostsText) return;
  navigator.clipboard.writeText(lastPostsText).then(function() {
    showToast("📦 Posts copied!");
  });
}
