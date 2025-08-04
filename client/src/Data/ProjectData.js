import PhoneShop_home from "./projectImages/PhoneStore-home.png";
import PhoneShop_admin from "./projectImages/PhoneStore-admin.png";
import PhoneShop_order from "./projectImages/PhoneStore-order.png";
import PhoneShop_payment from "./projectImages/PhoneStore-payment.png";
import MovieNest_home from "./projectImages/MovieNest-home.png";
import MovieNest_detail from "./projectImages/MovieNest-detail.png";

export const projects = [
  {
    title: "PhoneShop E-commerce",
    description:
      "An e-commerce web app for browsing and purchasing mobile phones. Built with a Node.js backend, Express server, and MongoDB database.",
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
    title: "Plant Identifier V2",
    description: "An app that identifies plants using image upload.",
    techStack: ["React", "Node.js", "MongoDB"],
    githubLink: "https://github.com/czar/plant-id",
    liveLink: "https://plantid.czar.com",
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
      "./projectImage/plant-id/plant-id2.png",
    ],
  },
];
