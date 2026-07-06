import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, Google Pay and all major debit and credit cards.",
  },
  {
    question: "How long does the product shipping take?",
    answer:
      "Standard shipping usually takes between 3–7 business days depending on your location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes! We ship worldwide. Shipping charges and delivery time vary by destination.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely! Once your order has been shipped, we'll send you a tracking number and a link to our carrier's website where you can track your package in real-time. You can also check the status of your order by logging into your account and viewing your order history.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(3);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F7F6F5] dark:bg-[#121214] py-16 px-5 transition-colors duration-300 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-center text-[28px] sm:text-[36px] font-semibold text-[#222222] dark:text-white mb-10 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl sm:rounded-3xl transition-all duration-300 border border-transparent
                  ${
                    isOpen
                      ? "bg-[#FFF1EC] dark:bg-[#201816] dark:border-[#4A2E25] shadow-sm"
                      : "bg-white dark:bg-[#1A1A1E] dark:border-[#2E2E33] hover:shadow-sm"
                  }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start gap-4 sm:gap-5 px-6 sm:px-8 py-6 sm:py-7 text-left focus:outline-none"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${
                      isOpen
                        ? "border border-[#1600A0] dark:border-[#1600A0] bg-white dark:bg-[#2A1F1C]"
                        : "bg-[#1600A0] dark:bg-[#1600A0]"
                    }`}
                  >
                    {isOpen ? (
                      <ChevronDown
                        size={14}
                        className="text-[#1600A0] dark:text-[#1600A0]"
                      />
                    ) : (
                      <ChevronRight
                        size={14}
                        className="text-white relative left-[0.5px]"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#222222] dark:text-gray-100 leading-snug">
                      {item.question}
                    </h3>

                    <div
                      className={`grid transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "grid-rows-[1fr] mt-3 sm:mt-4"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[14px] sm:text-[16px] leading-6 sm:leading-7 text-[#757575] dark:text-[#B0B0B5] max-w-[95%]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}