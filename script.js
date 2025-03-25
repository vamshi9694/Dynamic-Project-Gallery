document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { title: "Project 1", description: "A simple calculator application", link: "projects/project1/index.html", id: 1 },
        { title: "Project 2", description: "Todo list manager", link: "projects/project2/index.html", id: 2 },
        { title: "Project 3", description: "Weather dashboard", link: "projects/project3/index.html", id: 3 },
        { title: "Project 4", description: "Portfolio website", link: "projects/project4/index.html", id: 4 },
        { title: "Project 5", description: "E-commerce platform", link: "projects/project5/index.html", id: 5 },
        { title: "Project 6", description: "Chat application", link: "projects/project6/index.html", id: 6 },
        { title: "Project 7", description: "Game prototype", link: "projects/project7/index.html", id: 7 },
        { title: "Project 8", description: "Data visualization tool", link: "projects/project8/index.html", id: 8 }
    ];

    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);

    populateSidebar(projects);
    setupIframe(projects);
    
    const animatedElements = document.querySelectorAll('.project-viewer, .about-section, .contact-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => observer.observe(element));

    const searchInput = document.getElementById('project-search');
    let debounceTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProjects = projects.filter(project => 
                project.title.toLowerCase().includes(searchTerm)
            );
            populateSidebar(filteredProjects);
        }, 300);
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offset = navbarHeight + 20;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navToggle.textContent = '☰';
            }
        });
    });

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! (Demo)');
    });
});

function populateSidebar(projects) {
    const sidebarList = document.getElementById('project-list');
    sidebarList.innerHTML = '';
    const iframe = document.getElementById('project-iframe');
    const projectSection = document.getElementById('projects');
    
    projects.forEach((project, index) => {
        const listItem = document.createElement('li');
        listItem.style.setProperty('--index', index);
        const link = document.createElement('a');
        link.href = `#${project.id}`;
        link.textContent = project.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            iframe.style.opacity = '0';
            setTimeout(() => {
                iframe.src = project.link;
                iframe.onload = () => {
                    iframe.style.opacity = '1';
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const offset = navbarHeight + 20;
                    const projectPosition = projectSection.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: projectPosition, behavior: 'smooth' });
                };
            }, 500);
        });
        listItem.appendChild(link);
        sidebarList.appendChild(listItem);
    });
    
    if (projects.length > 0) {
        const firstLink = sidebarList.firstChild.querySelector('a');
        firstLink.classList.add('active');
        iframe.src = projects[0].link;
        iframe.onload = () => {
            iframe.style.opacity = '1';
        };
    }
}

function setupIframe(projects) {
    const iframe = document.getElementById('project-iframe');
    iframe.style.opacity = '0';
}
