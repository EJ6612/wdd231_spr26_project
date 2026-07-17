

// Return the user currency based on their IP Address
export async function getUserCurrency() {

    let userCurrency = localStorage.getItem("userCurrency");

    if (!userCurrency) {
        const response = await fetch('https://ipapi.co/currency/');

        if (!response.ok){
            throw new Error(`ipapi.co failed with status: ${response.status}`);
        }

        const currency = await response.text();

        userCurrency = currency.trim();
        localStorage.setItem("userCurrency", userCurrency);
        return userCurrency;
    }

    else {
        return userCurrency;
    }
}

export async function getExchangeRate(baseCurrency) {
    const RATES_EXPIRY_MS = 24 * 60 * 60 * 1000;
    
    const storageKey = `exchange_rates_${baseCurrency}`;

    const cached = localStorage.getItem(storageKey);
    const parsed = cached ? JSON.parse(cached) : null;

    if (parsed && (Date.now() - parsed.timestamp) < RATES_EXPIRY_MS) {
        return parsed.rates;
    }

    const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${import.meta.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`);

    const data = await response.json();

        if (data.result !== 'success') {
        throw new Error(`ExchangeRate API error: ${data['error-type']}`);
    }

    localStorage.setItem(storageKey, JSON.stringify({
        timestamp: Date.now(),
        rates: data.conversion_rates
    }));

    return data.conversion_rates;    
}

export function convertPrice(price, fromCurrency, toCurrency, rates) {

    if (fromCurrency === toCurrency) {
    const formatted = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: fromCurrency,
        maximumFractionDigits: 2
    }).format(price);

    return {
        convertedAmount: price,
        formattedConverted: formatted,
        formattedOriginal: formatted, // same value — no conversion happened
        rate: 1
    };
}

    const rate = rates[toCurrency];

    if (rate === undefined) {
        return { convertedAmount: null, rate: null };
    }

    const convertedAmount = price * rate;

    const formatCurrency = (amount, currency) => 
        new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(amount);

    return {
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        formattedConverted: formatCurrency(convertedAmount, toCurrency),
        formattedOriginal: formatCurrency(price, fromCurrency),
        rate: rate
    };

}


// API URL is messed up- it's calling upon itself