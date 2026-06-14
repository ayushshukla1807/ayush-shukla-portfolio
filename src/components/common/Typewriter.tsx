import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        timer = setTimeout(handleTyping, speed);
      }
    };

    if (text === '' && !isDeleting) {
       // Start typing immediately if empty
       timer = setTimeout(handleTyping, typingSpeed);
    } else if (text === words[loopNum % words.length] && !isDeleting) {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        timer = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
};
