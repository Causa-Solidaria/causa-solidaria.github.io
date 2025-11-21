

export default function capitalizarPrimeiraLetra(str: string) {
  if (typeof str !== 'string' || str.length === 0) {
    return ''; // Retorna string vazia para entradas inválidas
  }
  return (str.charAt(0).toUpperCase() + str.slice(1)) as string;
}