
export const maxPrice = 500;

/// @notice Calculate breakeven point(price) is for different kinds of options
/// @param strike This is strike price that option holder can exercise option
/// @param bid This is the highest price in the market that a buyer is willing to pay for purchasing options
/// @param ask This is the lowest price in the market that a seller is willing to sell their options
/// @param isLong whether option is long or short; long - true short -false
/// @param isCall whether option is call or put; call - true put -false
/// @return breakeven point (price) where the profit and loss are zero
export const calculateProfits = (option, price) => {
    const {strike_price, bid, ask, long_short, type} = option;
    const isLong = long_short == "long";
    const isCall = type == "Call";

    const premium = ask - bid;

    // Long Call Option
    if (isLong && isCall) {
        /* 
            For Long call Option
            if underlying(stock)'s price is less than strike price, 
            traders should pay premium only, so loss is premium.
                profit = -premium (loss)

            if underlying(stock)'s price is higher than strike price, 
            user can exercise strike price to purchase stock. 
            
                profit = (underlying's price - strike) - premium
        */
       
        if (price <= strike_price)
            return -premium;
        else
            return price - strike_price - premium;

    } else if (isLong && !isCall) {
        /* 
            For Long put Option
            if underlying(stock)'s price is higher than strike price, 
            traders should pay premium only so loss is premium.
                profit = -premium (loss)
            
            if underlying(stock)'s price is less than strike price, 
            user can exercise strike price to purchase stock. 

                profit = (strike - underlying's price) - premium
        */

        if (price >= strike_price)
            return -premium;
        else
            return strike_price - price - premium;


    } else if (!isLong && isCall) {
        /* 
            For Short Call Option
            if underlying(stock)'s price is less than strike price,
            a buyer doesn't purchase his asset, so seller only receives premium
                profit = premium 

            if underlying(stock)'s price is less than strike price,
            a buyer purchases his asset and he receives decreased premium. 

                profit = premium - (underlying's price - strike)
        */

        if (price <= strike_price)
            return premium
        else
            return premium - (price - strike_price)

    } else {
        /* 
            For Short Put Option
            if underlying(stock)'s price is higher than strike price,
            a buyer doesn't purchase his asset, so seller only receives premium

                profit = premium 

            if underlying(stock)'s price is less than strike price,
            a buyer purchases his asset and he receives decreased premium. 
            
                profit = premium - (strike - underlying's price)
        */

        if (price >= strike_price)
            return premium
        else
            return premium - (strike_price - price)

    }

}

export const calculateBreakeven = (option) => {
    const {strike_price, bid, ask, type} = option;
    const isCall = type == "Call";

    const premium = ask - bid;

    // Long Call Option
    if (isCall) {
        /*  
            profit = (underlying's price - strike) - premium
            profit = 0 (in breakeven) => underlying's price = strike + premium 
        */
        return strike_price + premium

    } else {
        /* 
            profit = (strike - underlying's price) - premium
            profit = 0 (in breakeven) => underlying's price = strike - premium 
        */
        return strike_price - premium
    } 
}

export const calculateMaxProfitLoss = (option) => {
    const {bid, ask, long_short, type} = option;
    const isLong = long_short == "long";
    const isCall = type == "Call";

    const premium = ask - bid;
    const max = {}

    if (isLong) {
        /*
            if option is not exercised, trader should pay premium only, so max of loss will be premium. 
        */
        max.loss = -premium
        /*
            function of profit will be linear, so we can denote it as the follwing
            Y = AX + B, 
            Y1 = AX1 + B
            Y2 = AX2 + B
            Y1 - Y2 = A(X1 - X2) => 
                A = (Y1 - Y2) / (X1 - X2), 
                B = Y1 - A * X1

            X1 = breakeven, X2 = strike => Y1 = 0, Y2 = -premium
            
            A = premium / (br - st)
            B = -A * X1 = -br * premium / (br - st) = br * premium / premium = br  

            in case of long call option
            B = br (max profit will be taken in zero price) 
        */
        if (isCall)
            max.profit = "infinite"
        else
            max.profit = calculateBreakeven(option)
        
    } else {
        /*
            if sell option is not exercised, trader will get paid premium only from a buyer.
        */
        max.profit = premium
        /*
            function of profit will be linear, so we can denote it as the follwing
            Y = AX + B, 
            Y1 = AX1 + B
            Y2 = AX2 + B
            Y1 - Y2 = A(X1 - X2) => 
                A = (Y1 - Y2) / (X1 - X2), 
                B = Y1 - A * X1

            X1 = breakeven, X2 = strike => Y1 = 0, Y2 = premium
                A = -premium / (br - st), 
                B = - A * br = premium * br / (br - st) = -br

            in case of short put option
            B = -br(max loss will be occured in zero price)              
        */
        if (isCall)
            max.loss = "infinite"
        else
            max.loss = -calculateBreakeven(option)
    }

    return max;
}





