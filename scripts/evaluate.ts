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

async function runEvaluation() {
  for (const question of questions) {
    try {
      const response = await fetch(
        "http://localhost:3000/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        }
      );

      const data = await response.json();

      console.log("\n================================");
      console.log("QUESTION:");
      console.log(question);

      console.log("\nANSWER:");
      console.log(data.answer || data.error);
      console.log("================================");
    } catch (err) {
      console.error(err);
    }
  }
}

runEvaluation();