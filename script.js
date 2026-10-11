// Initial blog posts displayed when the application opens.
let blogPosts = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This is my first blog post. I'm excited to share my thoughts and experiences with you all!"
  },
  {
    id: 2,
    title: "Learning JavaScript",
    content: "JavaScript is a powerful programming language that enables interactive web development. Today I learned about event listeners and DOM manipulation."
  },
  {
    id: 3,
    title: "Web Development Tips",
    content: "Always write clean and maintainable code. Use meaningful variable names and comment your code when necessary."
  }
];

let nextPostId = 4;

const postsContainer = document.getElementById("blog-posts");
const addPostButton = document.getElementById("add-post-btn");

// Display all blog posts on the page.
function renderPosts() {
  postsContainer.innerHTML = "";

  if (blogPosts.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No blog posts yet. Click Add Blog Post to create one.";
    postsContainer.appendChild(message);
    return;
  }

  blogPosts.forEach(function (post) {
    const card = document.createElement("article");
    card.className = "blog-card";

    const heading = document.createElement("div");
    heading.className = "post-heading";

    const title = document.createElement("h2");
    title.className = "post-title";
    title.textContent = post.title;

    const editTitleButton = document.createElement("button");
    editTitleButton.type = "button";
    editTitleButton.textContent = "Edit Title";
    editTitleButton.addEventListener("click", function () {
      editPostTitle(post.id);
    });

    heading.appendChild(title);
    heading.appendChild(editTitleButton);

    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = post.content;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const editContentButton = document.createElement("button");
    editContentButton.type = "button";
    editContentButton.textContent = "Edit Content";
    editContentButton.addEventListener("click", function () {
      editPostContent(post.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Post";
    deleteButton.addEventListener("click", function () {
      deletePost(post.id);
    });

    actions.appendChild(editContentButton);
    actions.appendChild(deleteButton);

    card.appendChild(heading);
    card.appendChild(content);
    card.appendChild(actions);
    postsContainer.appendChild(card);
  });
}

// Add a new post using information entered by the user.
function addPost() {
  const title = prompt("Enter the blog post title:");
  if (title === null) return;

  const trimmedTitle = title.trim();
  if (trimmedTitle === "") {
    alert("The title cannot be empty.");
    return;
  }

  const content = prompt("Enter the blog post content:");
  if (content === null) return;

  const trimmedContent = content.trim();
  if (trimmedContent === "") {
    alert("The content cannot be empty.");
    return;
  }

  blogPosts.push({
    id: nextPostId++,
    title: trimmedTitle,
    content: trimmedContent
  });

  renderPosts();
}

// Edit only the title of the selected post.
function editPostTitle(postId) {
  const post = blogPosts.find(function (item) {
    return item.id === postId;
  });

  if (!post) return;

  const newTitle = prompt("Edit the blog post title:", post.title);
  if (newTitle === null) return;

  const trimmedTitle = newTitle.trim();
  if (trimmedTitle === "") {
    alert("The title cannot be empty.");
    return;
  }

  post.title = trimmedTitle;
  renderPosts();
}

// Edit only the content of the selected post.
function editPostContent(postId) {
  const post = blogPosts.find(function (item) {
    return item.id === postId;
  });

  if (!post) return;

  const newContent = prompt("Edit the blog post content:", post.content);
  if (newContent === null) return;

  const trimmedContent = newContent.trim();
  if (trimmedContent === "") {
    alert("The content cannot be empty.");
    return;
  }

  post.content = trimmedContent;
  renderPosts();
}

// Remove the selected post after the user confirms.
function deletePost(postId) {
  const post = blogPosts.find(function (item) {
    return item.id === postId;
  });

  if (!post) return;

  const confirmed = confirm('Are you sure you want to delete "' + post.title + '"?');
  if (!confirmed) return;

  blogPosts = blogPosts.filter(function (item) {
    return item.id !== postId;
  });

  renderPosts();
}

// Event listener for the Add Blog Post button.
addPostButton.addEventListener("click", addPost);

// Show the three initial posts when the page loads.
renderPosts();
