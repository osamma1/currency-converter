import inquirer from 'inquirer';

// Sample currency rates (could be fetched from an API in a real-world application)
const currencyRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110,
    AUD: 1.35
};

async function convertCurrency() {
    const questions = [
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount of money:',
            validate: (value: string) => {
                const valid = !isNaN(Number(value));
                return valid || 'Please enter a valid number';
            }
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency you have:',
            choices: Object.keys(currencyRates)
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the currency you want:',
            choices: Object.keys(currencyRates)
        }
    ];

    const answers = await inquirer.prompt(questions);

    const amount = parseFloat(answers.amount);
    const fromCurrency = answers.fromCurrency;
    const toCurrency = answers.toCurrency;

    const convertedAmount = (amount / currencyRates[fromCurrency]) * currencyRates[toCurrency];
    
    console.log(`\n${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}\n`);
}

convertCurrency();
