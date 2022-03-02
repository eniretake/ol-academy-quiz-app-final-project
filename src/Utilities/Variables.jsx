export const API =
  "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db";

export const setDataWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getDataWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const localData = {
  questions: [
    {
      id: 1,
      type: "single",
      question: "ერთპასუხიანი კითხვა",
      options: [
        "სავარაუდო პასუხი 1",
        "სავარაუდო პასუხი 2",
        "სავარაუდო პასუხი 3",
        "სავარაუდო პასუხი 4",
      ],
    },
    {
      id: 2,
      type: "multiple",
      question: "მრავალპასუხიანი კითხვა",
      options: [
        "სავარაუდო პასუხი 3",
        "სავარაუდო პასუხი 1",
        "სავარაუდო პასუხი 4",
        "სავარაუდო პასუხი 2",
      ],
    },
    {
      id: 3,
      type: "boolean",
      question: "დისკრეტული კითხვა",
    },
  ],
  answers: [
    {
      id: 1,
      answer: 3,
    },
    {
      id: 2,
      answer: [2, 4],
    },
    {
      id: 3,
      answer: true,
    },
  ],
};
