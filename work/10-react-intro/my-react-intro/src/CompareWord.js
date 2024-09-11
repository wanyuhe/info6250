export function compareWords(word1, word2) {
    let count = 0;
    const word1Letters = word1.toUpperCase().split('');
    const word2Letters = new Set(word2.toUpperCase().split(''));
    
    word1Letters.forEach(letter => {
        if (word2Letters.has(letter)) {
            count++;
        }
    });
    
    return count;
}
