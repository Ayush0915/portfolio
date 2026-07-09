import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayush Kumar Bhadani Portfolio",
    short_name: "Ayush Portfolio",
    description: "Portfolio of Ayush Kumar Bhadani - final-year Computer Science (Data Science) student and AI/ML Developer",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b", // zinc-950
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
