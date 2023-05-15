function cutAddress(address, amount, amountEnd) {
    amount = amount || 4;
    amountEnd = amountEnd || 4;

    return address ? address.slice(0, amount) + '...' + address.slice(-amountEnd) : '';
}

export default cutAddress;
