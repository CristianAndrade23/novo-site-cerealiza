import { cpfDigits, formatCpf, isValidCpf } from './cpf';

describe('cpf', () => {
  it('aplica a máscara de forma progressiva', () => {
    expect(formatCpf('529')).toBe('529');
    expect(formatCpf('5299')).toBe('529.9');
    expect(formatCpf('5299822')).toBe('529.982.2');
    expect(formatCpf('52998224725')).toBe('529.982.247-25');
  });

  it('ignora caracteres que não são dígitos e o excesso', () => {
    expect(cpfDigits('529.982.247-25 99')).toBe('52998224725');
    expect(formatCpf('abc529x982')).toBe('529.982');
  });

  it('aceita CPFs com dígitos verificadores corretos', () => {
    expect(isValidCpf('529.982.247-25')).toBe(true);
    expect(isValidCpf('11144477735')).toBe(true);
  });

  it('rejeita dígito verificador errado, tamanho errado e sequências repetidas', () => {
    expect(isValidCpf('529.982.247-24')).toBe(false);
    expect(isValidCpf('5299822472')).toBe(false);
    expect(isValidCpf('111.111.111-11')).toBe(false);
    expect(isValidCpf('')).toBe(false);
  });
});
