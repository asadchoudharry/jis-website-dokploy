import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const { t } = useTranslation();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const correctAnswer = useMemo(() => num1 + num2, [num1, num2]);

  useEffect(() => {
    generateNewNumbers();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    onVerify(parseInt(userAnswer, 10) == correctAnswer);
  }, [userAnswer, correctAnswer, onVerify]);

  const generateNewNumbers = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setUserAnswer('');
  };

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center gap-3">
        <label htmlFor="captcha" className="text-lg font-semibold text-slate-800">
          {num1} + {num2} =
        </label>
        <input
          id="captcha"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-24 bg-white border border-slate-300 rounded-lg p-2 text-slate-900 text-center focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none"
          required
        />
      </div>
      <button
        type="button"
        onClick={generateNewNumbers}
        className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 text-sm"
        aria-label={t('captcha.refresh')}
      >
        <span className="material-symbols-outlined text-base">refresh</span>
      </button>
      <p className="text-sm text-slate-500 text-center sm:text-left flex-grow">
        {t('captcha.instruction')}
      </p>
    </div>
  );
};

export default Captcha;