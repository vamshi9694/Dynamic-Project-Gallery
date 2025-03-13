const tasks = {
  task1: { title: "Task 1", path: "/Dynamic-Project-Gallery/works/task1/index.html" },
  task2: { title: "Task 2", path: "/Dynamic-Project-Gallery/works/task2/index.html" },
  task3: { title: "Task 3", path: "/Dynamic-Project-Gallery/works/task3/index.html" },
};

function createMenu() {
  // Select the <ul> inside the navbar
  const menuList = document.querySelector(".navbar-nav.ms-auto");

  if (!menuList) {
    console.error("Navbar <ul> not found!");
    return;
  }

  // Clear any existing content in the <ul>
  menuList.innerHTML = "";

  // Dynamically create menu items
  Object.entries(tasks).forEach(([key, task]) => {
    const menuItem = document.createElement("li");
    menuItem.classList.add("nav-item");

    const link = document.createElement("a");
    link.classList.add("nav-link");
    link.textContent = task.title;
    link.href = "#";

    // Add click event listener
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove 'active' class from all links
      document.querySelectorAll(".navbar-nav .nav-link").forEach((navLink) => {
        navLink.classList.remove("active");
      });

      // Add 'active' class to the clicked link
      link.classList.add("active");

      // Load the project content into the iframe
      showTask(task.path);
    });

    menuItem.appendChild(link);
    menuList.appendChild(menuItem);
  });
}

function showTask(path) {
  console.log("Loading path:", path); // Debugging log

  let frame = document.querySelector("iframe");

  if (!frame) {
    frame = document.createElement("iframe");
    frame.style.width = "100%";
    frame.style.height = "500px";
    frame.style.border = "none";
    document.body.appendChild(frame);
  }

  // Reset opacity before loading new content
  frame.classList.remove("loaded");
  frame.src = ""; // Clear previous content
  setTimeout(() => {
    frame.src = path; // Set new content
    frame.onload = () => {
      console.log("Content loaded successfully"); // Debugging log
      frame.classList.add("loaded"); // Trigger fade-in animation
    };
  }, 100); // Small delay to ensure fade-out effect
}

// Load the landing page on initial page load
function loadLandingPage() {
  const landingPath = "/Dynamic-Project-Gallery/works/landing.html"; // Corrected path
  showTask(landingPath);
}

// Call createMenu and loadLandingPage when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  createMenu();
  loadLandingPage();
});
