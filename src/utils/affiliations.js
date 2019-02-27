export function calculateAffiliationIndexes({ authors, affiliations }) {
  const institutionsIndexes = [];
  const authorsIndexes = [];

  authors.forEach((author) => {
    const { id } = author;
    const authorAffialiations = affiliations.filter((affiliation) => affiliation.author.id === id);

    const authorIndexes = authorAffialiations.map((authorAffialiation) => {
      const { institution } = authorAffialiation;
      const institutionIndex = institutionsIndexes.findIndex((index) => index.institution.id === institution.id);

      if (institutionIndex > -1) {
        return institutionIndex + 1;
      }

      institutionsIndexes.push({ institution, index: institutionsIndexes.length + 1 });

      return institutionsIndexes.length;
    });

    authorsIndexes.push({ author, indexes: authorIndexes });
  });

  return { institutionsIndexes, authorsIndexes };
}
