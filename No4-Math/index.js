function findExpressionWithParentheses(nums, target) {
    const operators = ['+', '-', '*'];
    const memo = new Map();

    // Helper function for recursive backtracking
    function backtrack(start, end) {
        const key = `${start}-${end}`;
        if (memo.has(key)) return memo.get(key);

        let results = [];

        // If only one number in the range, return it as a number and a string
        if (start === end) {
            return [[nums[start], `${nums[start]}`]];
        }

        // Try splitting the array at each position
        for (let i = start; i < end; i++) {
            const leftResults = backtrack(start, i);
            const rightResults = backtrack(i + 1, end);

            // Combine left and right results with each operator
            for (const [leftValue, leftExpr] of leftResults) {
                for (const [rightValue, rightExpr] of rightResults) {
                    for (const op of operators) {
                        let newValue;
                        let newExpr;

                        if (op === '+') {
                            newValue = leftValue + rightValue;
                        } else if (op === '-') {
                            newValue = leftValue - rightValue;
                        } else if (op === '*') {
                            newValue = leftValue * rightValue;
                        }

                        // Add parentheses around the combined expression
                        newExpr = `(${leftExpr} ${op} ${rightExpr})`;

                        results.push([newValue, newExpr]);
                    }
                }
            }
        }

        memo.set(key, results);
        return results;
    }

    // Get all possible expressions from the entire array
    const allResults = backtrack(0, nums.length - 1);

    // Find and return the expression that matches the target
    for (const [value, expr] of allResults) {
        if (value === target) {
            return expr;
        }
    }

    return null;
}

// Contoh penggunaan:
const numbers = [1, 4, 5, 6];
const target = 18;
const result = findExpressionWithParentheses(numbers, target);

if (result) {
    console.log(`Expression: ${result}`);
} else {
    console.log("Tidak ditemukan cara untuk mencapai target...");
}
