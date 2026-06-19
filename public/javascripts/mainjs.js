const projects = [
  {
    title: "Explore Hub Platform",
    desc: "A modern platform to explore places with responsive UI.",
    image:"./images/explorehub.webp",
    live: "https://explorehub-ten.vercel.app/",
    code: "https://github.com/Sachin8757/ExploreHub"
  },
  // {
  //   title: "Portfolio Website",
  //   desc: "Personal portfolio to showcase skills and projects.",
  //   image: "/images/pathsala.jpg",
  //   live: "#",
  //   code: "#"
  // }
];

const container = document.getElementById("projectContainer");
projects.forEach(project => {
  const card = `
    <div class="project-card">
      <img src="${project.image}" alt="project">
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="project-links">
          <a href="${project.live}" target="_blank">Live</a>
          <a href="${project.code}" target="_blank">Code</a>
        </div>
      </div>
    </div>
  `;
  container.innerHTML += card;
});
