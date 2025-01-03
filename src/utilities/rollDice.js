const crypto = require('crypto');

/**
 * Roll dice with various options
 * @param {number} numberOfDice - Number of dice to roll
 * @param {string} rollType - Type of roll: 'normal', 'advantage', or 'disadvantage'
 * @param {number} rerollCount - Number of dice to reroll (default 0)
 * @returns {number[]} Array of dice results
 */
function rollDice(numberOfDice = 1, rollType = null, rerollCount = 0) {
    // Initial roll
    let rolls = [];
    let maxRoll = minRoll = 1;
    let total = successCount = duongResult = binhResult = amResult = 0;
    for (let i = 0; i < numberOfDice; i++) {
        const roll = crypto.randomInt(0, 10);

        maxRoll = Math.max(maxRoll, roll);
        minRoll = Math.min(minRoll, roll);
        rolls.push({
            rerollFrom: null,
            value: roll,
        });
        total += roll;
        if (roll > 6) {
            successCount++;
        }

        const { duongCount, binhCount, amCount } = calculateDuongBinhAm(roll)
        duongResult += duongCount;
        binhResult += binhCount;
        amResult += amCount;
    }

    let result = {
        rolls: rolls,
        maxRoll: maxRoll,
        minRoll: minRoll,
        total: total,
        successCount: successCount,
        duongResult: duongResult,
        binhResult: binhResult,
        amResult: amResult,
    }

    
    if (rollType === null) {
        return result;
    }

    let tempRolls = []
    
    if (rollType === 'advantage') {
        tempRolls = [...rolls].sort((b, a) => b.value - a.value)
    } else if (rollType === 'disadvantage') {
        tempRolls = [...rolls].sort((b, a) => a.value - b.value)
    } else {
        return result;
    }

    // Create a copy of tempRolls to track which values have been replaced
    let replacedValues = new Set();
    
    // Replace values up to the replacement count
    for (let i = 0; i < rerollCount; i++) {
        const valueToReplace = tempRolls[i];

        if (!valueToReplace) {
            break;
        }

        // Find first unreplaced instance of this value in rolls
        const indexToReplace = rolls.findIndex((roll, idx) => 
            roll.value === valueToReplace.value && !replacedValues.has(idx)
        );
        
        if (indexToReplace !== -1) {
            const rerolled = crypto.randomInt(0, 10);
            rolls[indexToReplace] = {
                value: rerolled,
                rerollFrom: valueToReplace.value,
            }
            replacedValues.add(indexToReplace);
        }
    }

    // recalculate total, minRoll, and maxRoll
    total = successCount = 0;

    rolls.forEach(roll => {

        total += roll.value;
        minRoll = Math.min(minRoll, roll.value);
        maxRoll = Math.max(maxRoll, roll.value);
        if (roll.value > 6) {
            successCount++;
        }

        const { duongCount, binhCount, amCount } = calculateDuongBinhAm(roll.value)
        duongResult += duongCount;
        binhResult += binhCount;
        amResult += amCount;
    });

    return {
        rolls: rolls,
        maxRoll: maxRoll,
        minRoll: minRoll,
        total: total,
        successCount: successCount,
        duongResult: duongResult,
        binhResult: binhResult,
        amResult: amResult,
    }
}

function calculateDuongBinhAm(roll) {
    let duongCount = binhCount = amCount = 0;

    if (roll >= 6 && roll <= 8) {
        duongCount = 1;
    } else if (roll === 9) {
        duongCount = 2;
    } else if (roll === 4 || roll === 5) {
        binhCount = 1;
    } else if (roll >= 1 && roll <= 3) {
        amCount = 1;
    } else {
        amCount = 2;
    }

    return {
        duongCount, 
        binhCount, 
        amCount,
    }
}

module.exports = rollDice;
