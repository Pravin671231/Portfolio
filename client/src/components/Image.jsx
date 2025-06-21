import { useState } from "react";

const Image = ({ src, alt, style }) => {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!src) return "/placeholder.png";
    if (src.startsWith("http")) return src;
    if (src.startsWith("/uploads/"))
      return `${import.meta.env.VITE_UPLOADS_URL}/${src.replace(
        "/uploads/",
        ""
      )}`;
    return `${import.meta.env.VITE_UPLOADS_URL}/${src}`;
  });

  const handleError = (e) => {
    console.error("Failed to load image:", src);
    // Prevent infinite loop if placeholder.png also fails to load
    if (imgSrc !== "/placeholder.png") {
      setImgSrc("/placeholder.png");
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={handleError}
      style={style}
    />
  );
};

export default Image;
