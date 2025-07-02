import React from "react";

const Terms = () => {
  return (
    <div className="container my-5 px-3 px-md-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Terms & Conditions</h1>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">1. Introduction</h4>
        <p>
          Welcome to <strong>Fllipy</strong>. By accessing or using our website, you agree to be bound
          by these terms and conditions. Please read them carefully before using our services.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">2. Account Responsibility</h4>
        <p>
          You are responsible for maintaining the confidentiality of your account and password.
          You agree to accept responsibility for all activities that occur under your account.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">3. Product Information</h4>
        <p>
          We strive to provide accurate product information. However, we do not warrant that
          product descriptions, pricing, or other content is accurate or error-free.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">4. Payment & Billing</h4>
        <p>
          All payments must be made through authorized payment gateways. Fllipy is not
          responsible for any third-party transaction failures.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">5. Returns & Refunds</h4>
        <p>
          Our return policy allows you to return products within 7 days of delivery.
          Refunds will be processed within 5-7 business days after product inspection.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">6. Prohibited Activities</h4>
        <p>
          You agree not to misuse the website, post offensive content, or engage in fraudulent activity.
          Violations may lead to termination of your account and legal action.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">7. Modifications</h4>
        <p>
          Fllipy reserves the right to modify these terms at any time. Changes will be
          effective immediately upon posting on the website.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold">8. Contact Us</h4>
        <p>
          If you have any questions about these Terms, feel free to contact us at{" "}
          <a href="mailto:support@fllipy.in">support@fllipy.in</a>.
        </p>
      </div>
    </div>
  );
};

export default Terms;
