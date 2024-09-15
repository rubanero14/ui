import React, {useState } from 'react';
import s from './TransferCalculator.module.scss';

const conversationRate = 0.90;
const feeRate = 0.004;

const fieldRound = (value: number) => {
    return Math.round(value * 100) / 100;
}

const TransferCalculator = () => {
    const [fromCurrency, setFromCurrency] = useState({
        currency: 'USD',
        value: 1000,
        rate: conversationRate,
        currencyImg: 'https://wise.com/web-art/assets/flags/usd.svg'
    });

    const [toCurrency, setToCurrency] = useState({
        currency: 'EUR',
        value: fromCurrency.value * conversationRate,
        rate: 1 / conversationRate,
        currencyImg: 'https://wise.com/web-art/assets/flags/eur.svg'
    });

    toCurrency.value = fieldRound(fromCurrency.value * fromCurrency.rate);

    const fee = fromCurrency.value * feeRate;

    return <div className={s['container']}>
        <div className={s['transfer-calculator']}>
            <h1>Transfer Calculator</h1>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('form submission');
                }}
            >
                <div className={s['current-rate']}>
                    1{fromCurrency.currency} = {fromCurrency.rate.toFixed(2)}{toCurrency.currency}
                </div>
                <fieldset className={s['input__wrapper']}>
                    <input 
                        type="text"
                        inputMode='decimal' 
                        className={s['input--rate']}
                        value={fromCurrency.value}
                        onChange={(e) => {
                            if (isNaN(parseFloat(e.target.value))) {
                                setFromCurrency({
                                    ...fromCurrency,
                                    value: 1
                                });

                                return
                            }

                            setFromCurrency({
                                ...fromCurrency,
                                value: parseFloat(e.target.value)
                            });
                        }}
                    />
                    <div className={s['currency__select']}>
                        <img 
                            src={fromCurrency.currencyImg}
                            alt={fromCurrency.currency}
                        />
                        {fromCurrency.currency}
                    </div>
                </fieldset>
                <button 
                    className={s['switch__button']} 
                    onClick={() =>{
                        setFromCurrency(toCurrency);
                        setToCurrency(fromCurrency);
                    }}
                >
                    {/* svg button */}
                </button>
                <fieldset className={s['input__wrapper']}>
                    <input 
                        type="text"
                        inputMode='decimal' 
                        className="input-rate"
                        disabled
                        value={toCurrency.value.toFixed(2)}
                    />
                    <div className={s['currency__select']}>
                        <img 
                            src={toCurrency.currencyImg}
                            alt={toCurrency.currency}
                        />
                        {toCurrency.currency}
                        </div>
                </fieldset>
                <dl className={s['fee-rate']}>
                    <dt>
                        Transfer Fee 
                    </dt>
                    <dt>{fee.toFixed(2)} {fromCurrency.currency}</dt>
                </dl>
                <button className={s["primary--btn"]} type="submit">
                    Send
                </button>
            </form>
        </div>
    </div>
}

export default TransferCalculator;