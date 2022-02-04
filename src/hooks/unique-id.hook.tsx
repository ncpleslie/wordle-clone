/**
 * Generates a non-crypto-safe unique id.
 * @returns A unique id.
 */
const useUniqueId = (): number => {
  return Math.floor(100 + Math.random() * 900);
};

export default useUniqueId;
