export { };

declare global {
  interface Array<T> {
    /**
     * Encuentra el último índice que cumple con una condición dada en un array.
     * @template T El tipo de elementos en el array.
     * @param {function(T, number, T[]): boolean} callback Una función de callback que se ejecuta en cada elemento del array.
     * @returns {number} El índice del último elemento que cumple con la condición dada, o -1 si no se encuentra ningún elemento que coincida.
     */
    findLastIndexCustom(callback: (value: T, index: number, array: T[]) => boolean): number;
  }
  namespace Express {
    interface Request {
      userData: {
        userId: string;
        username: string;
      };
    }
  }
}