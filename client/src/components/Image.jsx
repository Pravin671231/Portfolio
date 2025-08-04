import { useState } from "react";

const Image = ({ src, alt, style }) => {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!src) return "/placeholder.png";

    // If src is an external URL
    if (src.startsWith("http")) return src;

    // If src is a public image (like /projectImages/)
    if (src.startsWith("/")) return src;

    // If src is an upload (e.g., /uploads/image.png)
    if (src.startsWith("/uploads/")) {
      return `${import.meta.env.VITE_UPLOADS_URL}/${src.replace("/uploads/", "")}`;
    }

    // Fallback to uploads URL
    return `${import.meta.env.VITE_UPLOADS_URL}/${src}`;
  });

  const handleError = () => {
    console.error("Failed to load image:", imgSrc);
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
