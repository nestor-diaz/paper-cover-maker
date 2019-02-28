import { calculateAffiliationIndexes } from './affiliations';

describe('Affiliations utils', () => {
  describe('calculateAffiliationIndexes() method', () => {
    const authors = [];
    const affiliations = [];

    test('should not calculate indexes if there are not authors', () => {
      const indexes = calculateAffiliationIndexes({ authors, affiliations });

      expect(indexes).toEqual({
        institutionsIndexes: [],
        authorsIndexes: []
      });
    });
  });
});
