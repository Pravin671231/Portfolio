import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
const ScrollRouterLink = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      // Wait for the DOM to finish rendering
      setTimeout(() => {
        scroller.scrollTo(location.state.scrollTo, {
          duration: 500,
          smooth: true,
          offset: -70,
        });
        navigate(location.pathname, { replace: true, state: {} });
      }, 100); // Small delay
    }
  }, [location, navigate]);

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: to } });
    } else {
      scroller.scrollTo(to, {
        duration: 500,
        smooth: true,
        offset: -70,
      });
    }
  };
 
  return (
    <button
      onClick={handleClick}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      {children}
    </button>
  );
};
export default ScrollRouterLink;
