/*
Explanation:

This is brute force way to solve the question. It follow this steps:
1. Generate all possible permutations of the input numbers.
2. Generate all possible combinations of operators between the numbers.
3. Generate all possible combinations of parentheses in the expression. Parentheses always have * before and/or after it because parentheses without * have no effect on the result.

To get better performance, we can use dynamic programming to store the results of subproblems and reuse them when needed. But it would take longer to implement, so I stick to this solution.
*/
function generatePermutations(arr) {
    if (arr.length === 1) return [arr];

    const permutations = [];
    for (let i = 0; i < arr.length; i++) {
        const currentNum = arr[i];
        const remainingNums = arr.slice(0, i).concat(arr.slice(i + 1));
        const remainingPermutations = generatePermutations(remainingNums);

        for (let perm of remainingPermutations) {
            permutations.push([currentNum].concat(perm));
        }
    }
    return permutations;
}

function evalExpression(expr) {
    try {
        return eval(expr);
    } catch (e) {
        return null;
    }
}

function generateExpression(nums, target) {
    const operators = ['+', '-', '*'];
    const permutations = generatePermutations(nums);
    for (let perm of permutations) {

        const n = perm.length;
        const numOperators = n - 1;
        const operatorCombinations = generateOperatorCombinations(operators, numOperators);
        for (let operatorCombo of operatorCombinations) {
            let baseExpression = '' + perm[0];
            for (let i = 0; i < operatorCombo.length; i++) {
                baseExpression += operatorCombo[i] + perm[i + 1];
            }
            const expressionsWithParentheses = generateParenthesesCombinations(baseExpression);

            for (let expression of expressionsWithParentheses) {
                if (evalExpression(expression) === target) {
                    return expression;
                }
            }
        }
    }

    return "No valid expression found.";
}

function generateOperatorCombinations(operators, numOperators) {
    if (numOperators === 0) return [''];

    const results = [];
    for (let op of operators) {
        const subCombinations = generateOperatorCombinations(operators, numOperators - 1);
        for (let subCombo of subCombinations) {
            results.push(op + subCombo);
        }
    }
    return results;
}

function generateParenthesesCombinations(expression) {
    const results = [];
    const parts = expression.match(/\d+|\+|\-|\*/g);

    const length = parts.length;

    for (let len = 2; len < length; len++) {
        for (let i = 0; i <= length - len; i += 2) {
            if (i + len * 2 - 2 < length) {
                if (i > 0 && parts[i - 1] === '*' || i + len * 2 < length && parts[i + len * 2] === '*') {
                    const exprWithParentheses = [...parts];
                    exprWithParentheses.splice(i, 0, '(');
                    exprWithParentheses.splice(i + len * 2 + 1, 0, ')');
                    results.push(exprWithParentheses.join(''));
                }
            }
        }
    }

    results.push(expression);

    return results;
}

console.time('Brute Force');
console.log(generateExpression([1, 4, 5, 6], 16));
console.log(generateExpression([1, 4, 5, 6], 18));
console.log(generateExpression([1, 4, 5, 6], 50));
console.timeEnd('Brute Force');