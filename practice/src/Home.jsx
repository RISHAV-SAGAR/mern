import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  return (
    <div className="page">

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">
          <h1>All Your Study Resources. One Marketplace.</h1>
          <p>
            Books, courses, software, and educational games — everything you need
            to learn faster and smarter.
          </p>

          <div className="ctaGroup">
            <Link to="/books" className="btnPrimary">Explore Books & PDFs</Link>
            <Link to="/signup" className="btnSecondary">Get Started Free</Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
<section className="features">
  <div className="sectionTitle">
    <h2>Everything You Need to Succeed</h2>
    <p>High-quality learning resources curated for every student.</p>
  </div>

  <div className="grid">
    <Link to="/books" className="card">
      <h3>📘 Books & PDFs</h3>
      <p>Open book categories and downloadable PDFs, then explore each collection in detail.</p>
    </Link>

    <Link to="/courses" className="card">
      <h3>📚 Online Courses</h3>
      <p>Learn from industry experts with step-by-step video lessons.</p>
    </Link>

    <Link to="/games" className="card">
      <h3>🎮 Educational Games</h3>
      <p>Sharpen your skills using fun interactive challenges.</p>
    </Link>

    <Link to="/software" className="card">
      <h3>💻 Software Tools</h3>
      <p>Access productivity and coding tools built for students.</p>
    </Link>
  </div>
</section>

{/* FAQ SECTION */}
<section className="faqSection">
  <div className="sectionTitle">
    <h2>Frequently Asked Questions</h2>
    <p>Everything you need to know about EduMart.</p>
  </div>

  <div className="faqGrid">
    <div className="faqItem">
      <h4>Is EduMart free to use?</h4>
      <p>Yes! You can browse and access free resources without any cost.</p>
    </div>

    <div className="faqItem">
      <h4>How do I purchase paid content?</h4>
      <p>Create an account, choose your resource, and checkout securely.</p>
    </div>

    <div className="faqItem">
      <h4>Are the courses certified?</h4>
      <p>Many courses provide certificates after successful completion.</p>
    </div>

    <div className="faqItem">
      <h4>Can I sell my own study materials?</h4>
      <p>Yes, creators can upload and monetize their educational content.</p>
    </div>
  </div>
</section>

{/* TESTIMONIALS */}
<section className="testimonials">
  <div className="sectionTitle">
    <h2>Loved by Students Worldwide</h2>
    <p>See how EduMart is helping learners achieve more.</p>
  </div>

  <div className="testimonialGrid">
    <div className="testimonialCard">
      <p>
        “EduMart helped me find affordable textbooks and amazing programming
        courses. My grades improved within weeks!”
      </p>
      <div className="author">
        <span className="name">Ayesha Khan</span>
        <span className="role">Computer Science Student</span>
      </div>
    </div>

    <div className="testimonialCard">
      <p>
        “The educational games made learning fun again. I actually enjoy
        studying now.”
      </p>
      <div className="author">
        <span className="name">Daniel Moore</span>
        <span className="role">High School Student</span>
      </div>
    </div>

    <div className="testimonialCard">
      <p>
        “As a creator, selling my notes on EduMart has been effortless. The
        platform is clean and professional.”
      </p>
      <div className="author">
        <span className="name">Sara Ahmed</span>
        <span className="role">Content Creator</span>
      </div>
    </div>
  </div>
</section>


     {/* FINAL CTA */}
<section className="finalCta">
  <div className="ctaBox">
    <h2>Ready to Upgrade Your Learning?</h2>
    <p>
      Join over <strong>50,000+</strong> students already learning smarter with
      EduMart.
    </p>

    <div className="ctaButtons">
      <Link to="/signup" className="btnPrimary large">
        Create Free Account
      </Link>
      <Link to="/books" className="btnOutline large">
        Browse Books & PDFs
      </Link>
    </div>
  </div>
</section>


    </div>
  );
}
