function minTransfers(transactions) {
    const balancesMap = new Map();
    
    // Calculate the overall balance for each member
    for (const transaction of transactions) {
        const from = transaction[0];
        const to = transaction[1];
        const amount = transaction[2];
        balancesMap.set(from, (balancesMap.get(from) || 0) - amount);
        balancesMap.set(to, (balancesMap.get(to) || 0) + amount);
    }
    
    const balances = Array.from(balancesMap.values()).filter(balance => balance !== 0);
    
    return settleDebts(balances, 0);
}

function settleDebts(balanceList, currentIndex) {
    if (balanceList.length === 0 || currentIndex >= balanceList.length) return 0;
    if (balanceList[currentIndex] === 0) {
        return settleDebts(balanceList, currentIndex + 1);
    }
    
    const currentBalance = balanceList[currentIndex];
    let minTransactionCount = Number.MAX_SAFE_INTEGER;
    
    for (let nextIndex = currentIndex + 1; nextIndex < balanceList.length; nextIndex++) {
        const nextBalance = balanceList[nextIndex];
        if (currentBalance * nextBalance < 0) {
            balanceList[nextIndex] = currentBalance + nextBalance;
            minTransactionCount = Math.min(minTransactionCount, 1 + settleDebts(balanceList, currentIndex + 1));
            balanceList[nextIndex] = nextBalance;
            if (currentBalance + nextBalance === 0) {
                break;
            }
        }
    }
    
    return minTransactionCount;
}
