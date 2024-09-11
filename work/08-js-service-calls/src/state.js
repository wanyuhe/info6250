const state = {
    username: null,
    word: '',
    error: null,
    isLoggedIn: function() {
        return this.username !== null;
    },
    setUser: function(username) {
        this.username = username;
    },
    setWord: function(word) {
        this.word = word;
    },
    setError: function(error) {
        this.error = error;
    },
    clearUser: function() {
        this.username = null;
        this.word = '';
    },
};

export default state;
