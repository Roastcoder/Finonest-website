import { useState, useEffect } from "react";

const rotatingWords = ["Credit Card", "Home Loan", "Personal Loan", "Car Loan"];

const HomeTagline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-card">
      <div className="container px-4 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
          Upgrade the Way You Choose
        </h2>
        <p
          key={currentIndex}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-accent animate-fade-in"
        >
          {rotatingWords[currentIndex]}
        </p>
      </div>
    </section>
  );
};

export default HomeTagline;
