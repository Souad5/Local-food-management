import React from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: 'Click the "Sign Up" button in the top right corner and follow the registration process.',
  },
  {
    question: "I forgot my password. What should I do?",
    answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
  },
  {
    question: "How do I update my profile information?",
    answer: 'Go to "My Account" settings and select "Edit Profile" to make changes.',
  },
];

const FAQ = () => {
  return (
    <div className="lg:max-w-7xl md:max-w-4xl mx-auto space-y-3 p-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" defaultChecked={idx === 0} />
          <div className="collapse-title font-semibold">{faq.question}</div>
          <div className="collapse-content text-sm">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
