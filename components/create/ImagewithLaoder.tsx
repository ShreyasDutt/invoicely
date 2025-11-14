'use client'
import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export function ImageWithLoader({ src, alt = "", className }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={` ${className || ""}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
