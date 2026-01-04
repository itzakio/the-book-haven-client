import React from "react";
import { FaBookOpen, FaMoon, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <section className="min-h-screen max-w-[1440px] mx-auto bg-base-100 text-base-content">
      {/* Hero */}
      <div className="container mx-auto px-4 margin-y">
        <h1 className="headline">Welcome to The Book Haven</h1>
        <p className="text-center max-w-4xl mx-auto mt-4 text-accent leading-relaxed">
          The Book Haven is a calm digital space built for readers who love
          exploring stories, knowledge, and inspiration through books.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 margin-bottom">
        {/* Discover */}
        <div className="group card bg-base-200 shadow-md hover:shadow-xl transition-all">
          <div className="card-body text-center">
            <FaBookOpen className="text-4xl mx-auto text-primary group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mt-3 text-primary">
              Discover Books
            </h3>
            <p className="text-accent mt-2">
              Explore a curated collection of books that spark curiosity and
              inspire learning.
            </p>
          </div>
        </div>

        {/* Comfort */}
        <div className="group card bg-base-200 shadow-md hover:shadow-xl transition-all">
          <div className="card-body text-center">
            <FaMoon className="text-4xl mx-auto text-primary group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mt-3 text-primary">
              Read Comfortably
            </h3>
            <p className="text-accent mt-2">
              Enjoy a smooth reading experience with light and dark mode support.
            </p>
          </div>
        </div>

        {/* Inspire */}
        <div className="group card bg-base-200 shadow-md hover:shadow-xl transition-all">
          <div className="card-body text-center">
            <FaLightbulb className="text-4xl mx-auto text-primary group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mt-3 text-primary">
              Stay Inspired
            </h3>
            <p className="text-accent mt-2">
              Books open doors to new ideas, creativity, and personal growth.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="container mx-auto px-4 margin-bottom">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body text-center">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Story
            </h2>
            <p className="max-w-4xl mx-auto text-accent leading-relaxed">
              The Book Haven was created with simplicity and readers in mind.
              Instead of overwhelming users, we focus on clarity, accessibility,
              and a peaceful browsing experience.
            </p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="text-center pb-16">
        <p className="italic text-accent">
          “So many books, so little time.”
        </p>
      </div>
    </section>
  );
};

export default About;
