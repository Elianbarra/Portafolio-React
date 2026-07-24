import { useEffect, useState } from "react";

const useTypewriter = (words, { typingSpeed = 90, deletingSpeed = 40, pause = 1500 } = {}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const atWordEnd = !isDeleting && text === currentWord;
    const atWordStart = isDeleting && text === "";

    const delay = atWordEnd ? pause : isDeleting ? deletingSpeed : typingSpeed;

    const timeout = setTimeout(() => {
      if (atWordEnd) {
        setIsDeleting(true);
        return;
      }
      if (atWordStart) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      setText((prev) =>
        isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
};

export default useTypewriter;
