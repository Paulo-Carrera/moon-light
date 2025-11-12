import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5–10 business days.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'We do not offer refunds or returns. All sales are final. Please double-check your order before checkout.',
  },
  {
    question: 'Is checkout secure?',
    answer: 'Absolutely. We use Stripe for encrypted, secure payment processing.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="gradient-wrapper">
      <div className="star"></div>
    <div className="page">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggle(index)}>
            {faq.question}
          </button>
          {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
        </div>

      ))}
    </div>
    </div>
  );
}