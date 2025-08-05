import PhoneShop_home from "./projectImages/PhoneStore-home.png";
import PhoneShop_admin from "./projectImages/PhoneStore-admin.png";
import PhoneShop_order from "./projectImages/PhoneStore-order.png";
import PhoneShop_payment from "./projectImages/PhoneStore-payment.png";
import MovieNest_home from "./projectImages/MovieNest-home.png";
import MovieNest_detail from "./projectImages/MovieNest-detail.png";
import Portfolio_home from "./projectImages/Portfolio-home.png";
import Portfolio_tech from "./projectImages/Portfolio-tech.png";
import Portfolio_project from "./projectImages/Portfolio-project.png";

export const projects = [
  {
    title: "PhoneShop E-commerce",
    description:
      "A full-stack e-commerce web application for browsing and purchasing mobile phones. Built with a Node.js backend, Express server, and MongoDB database for robust data management. The frontend includes Redux for state management, enabling efficient handling of global state such as the shopping cart and user information. Key data like cart items and userInfo are persisted using localStorage to enhance user experience and ensure data retention across sessions",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubLink: "https://github.com/user/project-beta",
    liveLink: "https://phonestore-pravin.netlify.app/",
    imageUrls: [
      PhoneShop_home,
      PhoneShop_order,
      PhoneShop_payment,
      PhoneShop_admin,
    ],
  },
  {
    title: "MovieNest",
    description:
      "MovieNest is a dynamic movie search and discovery app built with React. It connects to The Movie Database (TMDb) API to let users search for films, view ratings, read overviews, and explore top-rated, popular, and upcoming movies",
    techStack: ["React", "Bootstrap", "API", "CSS"],
    githubLink: "https://github.com/Pravin671231/movies.git",
    liveLink: "https://im-db-movie.netlify.app/",
    imageUrls: [MovieNest_home, MovieNest_detail],
  },

  {
    title: "Portfolio",
    description:
      "A full‑stack MERN portfolio designed to showcase projects seamlessly. The frontend is built with React, and the backend using Express.js handles contact form submissions only. Projects are displayed using static frontend data (not stored in a database). The UI is styled with React‑Bootstrap for a clean, responsive look.",
    techStack: ["React", "Node.js", "MongoDB", "Bootstrap"],
    githubLink: "https://github.com/Pravin671231/Portfolio.git",
    liveLink: "https://pravin-mern.netlify.app/",
    imageUrls: [Portfolio_home, Portfolio_tech, Portfolio_project],
  },
];
