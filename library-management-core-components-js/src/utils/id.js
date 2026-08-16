let sequence = 1;

// Reusable utility for generating simple transaction identifiers.
export function generateId(prefix = "ID") {
  return `${prefix}-${sequence++}`;
}
