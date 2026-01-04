import React from "react";

const Terms = () => {
  return (
    <section className="min-h-screen max-w-[1440px] mx-auto bg-base-100 text-base-content">
      {/* Header */}
      <div className=" mx-auto px-4 margin-y">
        <h1 className="headline">Terms & Conditions</h1>
        <p className="text-center max-w-4xl mx-auto mt-4 text-accent">
          Please read these terms carefully before using The Book Haven.
        </p>
      </div>

      {/* Terms Content */}
      <div className=" mx-auto px-4 margin-bottom">
        <div className="p-4 lg:p-8 bg-base-200 shadow-md">
          <div className=" space-y-4 text-accent">
            <p>
              By accessing or using The Book Haven, you agree to be bound by
              these Terms and Conditions. If you do not agree, please do not
              use our platform.
            </p>

            <h2 className="text-xl font-semibold text-primary">
              User Accounts
            </h2>
            <p>
              Users may be required to create an account to publish books or
              access certain features. You are responsible for maintaining
              the confidentiality of your account information.
            </p>

            <h2 className="text-xl font-semibold text-primary">
              Publishing Content
            </h2>
            <p>
              Users are solely responsible for the books and content they
              publish on The Book Haven. You confirm that you own the rights
              to the content or have proper permission to publish it.
            </p>

            <h2 className="text-xl font-semibold text-primary">
              Prohibited Content
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Copyrighted material without authorization</li>
              <li>Illegal, harmful, or offensive content</li>
              <li>Spam, misleading, or abusive material</li>
            </ul>

            <h2 className="text-xl font-semibold text-primary">
              Content Moderation
            </h2>
            <p>
              The Book Haven reserves the right to review, edit, or remove
              any content that violates these terms without prior notice.
            </p>

            <h2 className="text-xl font-semibold text-primary">
              Termination
            </h2>
            <p>
              We may suspend or terminate user accounts that violate these
              terms or misuse the platform.
            </p>

            <h2 className="text-xl font-semibold text-primary">
              Limitation of Liability
            </h2>
            <p>
              The Book Haven is not responsible for any loss or damage arising
              from the use of the platform or user-published content.
            </p>

            <h2 className="text-xl font-semibold text-primary">
              Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time. Continued
              use of the platform indicates acceptance of the updated terms.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-16">
        <p className="text-sm text-accent">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default Terms;
