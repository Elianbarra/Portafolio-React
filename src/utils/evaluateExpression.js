// Small recursive-descent parser for basic arithmetic (+ - * / parentheses).
// Avoids eval()/Function() so the calculator never executes arbitrary input.
function tokenize(input) {
  const tokens = input.match(/\d+\.?\d*|[+\-*/()]/g);
  if (!tokens || tokens.join("") !== input.replace(/\s/g, "")) {
    throw new Error("Invalid expression");
  }
  return tokens;
}

function parseExpression(tokens) {
  let value = parseTerm(tokens);
  while (tokens[0] === "+" || tokens[0] === "-") {
    const op = tokens.shift();
    const rhs = parseTerm(tokens);
    value = op === "+" ? value + rhs : value - rhs;
  }
  return value;
}

function parseTerm(tokens) {
  let value = parseFactor(tokens);
  while (tokens[0] === "*" || tokens[0] === "/") {
    const op = tokens.shift();
    const rhs = parseFactor(tokens);
    if (op === "/" && rhs === 0) throw new Error("Division by zero");
    value = op === "*" ? value * rhs : value / rhs;
  }
  return value;
}

function parseFactor(tokens) {
  if (tokens[0] === "-") {
    tokens.shift();
    return -parseFactor(tokens);
  }
  if (tokens[0] === "(") {
    tokens.shift();
    const value = parseExpression(tokens);
    if (tokens.shift() !== ")") throw new Error("Mismatched parentheses");
    return value;
  }
  const token = tokens.shift();
  const value = Number(token);
  if (token === undefined || Number.isNaN(value)) throw new Error("Invalid expression");
  return value;
}

export function evaluateExpression(input) {
  const tokens = tokenize(input);
  const result = parseExpression(tokens);
  if (tokens.length > 0) throw new Error("Invalid expression");
  return result;
}

export default evaluateExpression;
