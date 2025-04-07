import { useState } from "react";
import AccordionItem from "./AccordionItem";

const FAQAccordion = () => {
  // Manage open/close state for all FAQ items
  const [openItems, setOpenItems] = useState({
    item1: true,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    nested1: false,
    nested2: false,
  });

  const toggleItem = (item) => {
    setOpenItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="bg-light-primary-50 dark:bg-dark-primary-100">
      <div className="w-full max-w-3xl mx-auto py-24 px-4">
        {/* FAQ 1 */}
        <AccordionItem
          id="item1"
          title="What is Job Connect?"
          isOpen={openItems.item1}
          onToggle={toggleItem}
        >
          <p className="text-light-text-primary dark:text-dark-text-primary">
            Job Connect is a platform that bridges the gap between job seekers and employers. Our goal is to simplify the job search process with personalized recommendations, advanced filters, and an intuitive user interface.
          </p>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem
          id="item2"
          title="How do I sign up for an account?"
          isOpen={openItems.item2}
          onToggle={toggleItem}
        >
          <p className="text-light-text-primary dark:text-dark-text-primary">
            Signing up is quick and easy. Click the <strong>Sign Up</strong> button on the top-right, fill in your details, and verify your email. Once registered, you can create your profile, upload your resume, and start applying for jobs.
          </p>
        </AccordionItem>

        {/* FAQ 3 with Nested Accordion */}
        <AccordionItem
          id="item3"
          title="Can I upgrade to a premium account?"
          isOpen={openItems.item3}
          onToggle={toggleItem}
        >
          <p className="mb-4 text-light-text-primary dark:text-dark-text-primary">
            Yes! Our premium subscription unlocks advanced features like priority job listings, enhanced profile visibility, and personalized career coaching.
          </p>

          {/* Nested Accordion */}
          <div className="border border-light-primary-100 dark:border-dark-primary-300 rounded-xl">
            <AccordionItem
              id="nested1"
              title="What are the benefits?"
              isOpen={openItems.nested1}
              onToggle={toggleItem}
            >
              <ul className="list-disc pl-5 text-light-text-primary dark:text-dark-text-primary">
                <li>Priority visibility on job listings</li>
                <li>Access to exclusive job postings</li>
                <li>Enhanced profile features</li>
                <li>One-on-one career coaching sessions</li>
              </ul>
            </AccordionItem>
            <AccordionItem
              id="nested2"
              title="How do I upgrade?"
              isOpen={openItems.nested2}
              onToggle={toggleItem}
            >
              <p className="text-light-text-primary dark:text-dark-text-primary">
                To upgrade, log in to your account and navigate to the <strong>Premium</strong> section. Choose a subscription plan and follow the on-screen instructions for secure payment.
              </p>
            </AccordionItem>
          </div>
          {/* End Nested Accordion */}
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem
          id="item4"
          title="How do I reset my password?"
          isOpen={openItems.item4}
          onToggle={toggleItem}
        >
          <p className="text-light-text-primary dark:text-dark-text-primary">
            If you forgot your password, click on the <strong>Forgot Password</strong> link on the login page. Enter your registered email address, and we will send you instructions on how to reset your password.
          </p>
        </AccordionItem>

        {/* FAQ 5 */}
        <AccordionItem
          id="item5"
          title="How can I update my profile?"
          isOpen={openItems.item5}
          onToggle={toggleItem}
        >
          <p className="text-light-text-primary dark:text-dark-text-primary">
            Once logged in, navigate to your account settings. From there, you can update your personal details, upload a new resume, and customize your job preferences.
          </p>
        </AccordionItem>

        {/* FAQ 6 */}
        <AccordionItem
          id="item6"
          title="Is my personal information secure?"
          isOpen={openItems.item6}
          onToggle={toggleItem}
        >
          <p className="text-light-text-primary dark:text-dark-text-primary">
            Absolutely. We take your security very seriously and use state-of-the-art encryption and security protocols to ensure that your data remains safe and confidential.
          </p>
        </AccordionItem>
      </div>
    </div>
  );
};

export default FAQAccordion;