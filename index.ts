
import inquirer from "inquirer";
import chalk from "chalk";

// Currency exchange rates relative to USD (base currency)
const Currency: { [key: string]: number } = {
  USD: 1,    // Base currency
  EUR: 0.91, // Exchange rate to USD
  GBP: 0.76, // Exchange rate to USD
  INR: 74.57, // Exchange rate to USD
  PKR: 280,  // Exchange rate to USD
  DIN: 4.68  // Example exchange rate (1 USD = 4.68 DIN)

};

// Function to perform currency conversion
async function convertCurrency() {
 try {
    // Prompt the user for currency and amount inputs
    const userAnswer = await inquirer.prompt([
      {
        name: "from",
        message: "Enter From Currency",
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR","DIN"],
      },
      {
        name: "to",
        message: "Enter To Currency",
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR","DIN"],
      },
      {
        name: "amount",
        message: "Enter Your Amount",
        type: "number",
      },
    ]);

    // Extract user inputs
    const fromCurrency = userAnswer.from as keyof typeof Currency;
    const toCurrency = userAnswer.to as keyof typeof Currency;
    const amount = userAnswer.amount;

    // Retrieve exchange rates for the selected currencies
    const fromAmount = Currency[fromCurrency];
    const toAmount = Currency[toCurrency];

    // Calculate the base amount in USD equivalent
    const baseAmount = amount / fromAmount;

    // Calculate the converted amount in the target currency and round down to the nearest integer
    const convertedAmount = Math.floor(baseAmount * toAmount);

    // Output the results with colorful console messages
    console.log(chalk.bold.rgb(255, 165, 0)(`Converted ${chalk.green (amount)} ${chalk.cyan(fromCurrency)} to ${chalk.green (convertedAmount)} ${chalk.cyan(toCurrency)}`));

   } catch (error) {
  console.error(chalk.red("Error occurred:"), error);
   }}

// Call the function to start the currency conversion process
convertCurrency();
