import React from "react";
import { FaBookOpen, FaStar } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="w-full py-16 px-6">
        <h2 className="headline margin-bottom">About The Book Haven</h2>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.pinimg.com/1200x/bd/8c/ec/bd8ceca130de4dccfc47171d0a160018.jpg"
            alt="Readers"
            className="shadow-lg object-cover w-full"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full lg:w-1/2">
          <p className="text-accent  leading-relaxed mb-6 text-lg">
            <span className="text-primary font-semibold">The Book Haven</span> is an online reading sanctuary created for readers
            who believe every story opens a new world. Whether you’re a devoted
            book lover or a curious explorer, our platform offers a peaceful
            experience to dive into imagination.
          </p>

          <p className="text-accent leading-relaxed mb-6 text-lg">
            Discover beautifully curated collections, explore new favorites, and
            enjoy distraction-free reading—all in one friendly and modern
            platform.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <FaBookOpen className="w-8 h-8 text-primary" />
              <p className=" font-medium">
                Discover weekly featured books
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaStar className="w-8 h-8 text-primary" />
              <p className=" font-medium">
                Smooth & clean reading interface
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaBookOpen className="w-8 h-8 text-primary" />
              <p className=" font-medium">
                Save and manage your favorites
              </p>
            </div>

            <div className="flex items-start gap-3">
              <FaStar className="w-8 h-8 text-primary" />
              <p className=" font-medium">
                Share your stories with the community
              </p>
            </div>
          </div>

          <p className="mt-10 text-xl font-semibold ">
            ✨ Welcome to your next chapter.
          </p>
          <p className="text-lg text-primary font-bold">
            Welcome to The Book Haven.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
