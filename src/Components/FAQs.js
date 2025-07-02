import React, { useState } from "react";

const faqsList = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order in the 'Orders' section of your account. We also send email updates with tracking details once your product is shipped.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy. If you're not satisfied, you can return the item in its original condition and get a refund or replacement.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on orders above ₹999. For orders below that, a small delivery fee applies.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, debit/credit cards, net banking, and cash on delivery (COD) in select locations.",
  },
  {
    question: "Is it safe to shop on Fllipy?",
    answer:
      "Absolutely! We use 128-bit SSL encryption and trusted payment gateways to keep your data safe and secure.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container my-5 px-3 px-md-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Frequently Asked Questions</h1>
        <p className="text-muted">Find answers to common questions about shopping with Fllipy.</p>
      </div>

      <div className="accordion" id="faqAccordion">
        {faqsList.map((faq, index) => (
          <div key={index} className="card mb-3">
            <div
              className="card-header"
              onClick={() => toggle(index)}
              style={{ cursor: "pointer" }}
            >
              <h6 className="mb-0 fw-bold d-flex justify-content-between align-items-center">
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </h6>
            </div>
            {openIndex === index && (
              <div className="card-body">
                <p className="mb-0">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
