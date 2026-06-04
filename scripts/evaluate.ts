const questions = [
  "Show spending by category",
  "Show health transactions",
  "Top 5 merchants by spend",
  "What is my portfolio worth today?",
  "Show holding return for fund_bluechip",
  "Show transactions for Apollo",
  "Show grocery expenses",
  "Show food expenses",
  "Top spending categories",
  "Portfolio gain loss",
  "Fund return analysis",
  "Monthly spending summary",
];

console.log("Evaluation Questions");
questions.forEach((q, i) => {
  console.log(`${i + 1}. ${q}`);
});