/** Mantém só os dígitos (no máximo 11). */
export function cpfDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11);
}

/** Aplica a máscara 000.000.000-00 enquanto o usuário digita. */
export function formatCpf(value: string): string {
  const d = cpfDigits(value);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** Valida os dois dígitos verificadores. Rejeita sequências repetidas (111.111.111-11). */
export function isValidCpf(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;

  const digits = [...d].map(Number);
  const checkDigit = (length: number) => {
    const sum = digits.slice(0, length).reduce((acc, n, i) => acc + n * (length + 1 - i), 0);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === digits[9] && checkDigit(10) === digits[10];
}
