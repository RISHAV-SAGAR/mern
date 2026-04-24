import React from "react";
import { Link, useLocation } from "react-router-dom";
import { librarySections } from "./data/libraryData";
import "./css/ProductListing.css";

const pageContent = {
  books: {
    eyebrow: "Books & PDFs",
    title: "Choose a category to continue",
    description:
      "Click any book or PDF category below. The next screen will show the items with price, author name, release year, and a short description.",
    types: ["books", "pdfs"],
  },
  software: {
    eyebrow: "Software",
    title: "Choose a software category",
    description:
      "Open any software category to view useful student tools with price, publisher name, release year, and a short description.",
    types: ["software"],
  },
  games: {
    eyebrow: "Games",
    title: "Choose a game category",
    description:
      "Open any game category to explore educational games with pricing, studio name, release year, and a short description.",
    types: ["games"],
  },
  courses: {
    eyebrow: "Online Courses",
    title: "Choose a course category",
    description:
      "Open any course category to explore online learning programs with price, instructor name, release year, and a short description.",
    types: ["courses"],
  },
};

export default function ProductListing() {
  const { pathname } = useLocation();
  const currentPage = pathname.startsWith("/software")
    ? "software"
    : pathname.startsWith("/games")
      ? "games"
      : pathname.startsWith("/courses")
        ? "courses"
        : "books";

  const currentContent = pageContent[currentPage];
  const visibleSections = librarySections.filter((section) =>
    currentContent.types.includes(section.type)
  );

  return (
    <div className="catalogPage">
      <section className="catalogHero">
        <p className="catalogEyebrow">{currentContent.eyebrow}</p>
        <h1>{currentContent.title}</h1>
        <p>{currentContent.description}</p>
      </section>

      {visibleSections.map((section) => (
        <section key={section.type} className="catalogSection">
          <div className="catalogHeading">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>

          <div className="categoryGrid">
            {section.categories.map((category) => (
              <Link
                key={`${section.type}-${category.slug}`}
                to={`/products/${section.type}/${category.slug}`}
                className="categoryCard"
              >
                <span className="categoryIcon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.blurb}</p>
                <span className="browseText">Browse {category.name}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
