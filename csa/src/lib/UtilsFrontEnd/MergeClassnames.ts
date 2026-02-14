/**
 * Mescla classnames, filtrando valores falsy
 * @param classnames - Lista de classnames (strings, undefined, null, false)
 * @returns String com classnames concatenadas separadas por espaço
 */
const MergeClassnames = (...classnames: (string | undefined | null | false)[]): string => {
    return classnames.filter(Boolean).join(" ");
};

export default MergeClassnames;