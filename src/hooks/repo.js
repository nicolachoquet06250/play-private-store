const GITHUB = 'github';
const GITLAB = 'gitlab';

export const useRepos = () => {
    return {
        GITHUB, GITLAB,
        [GITHUB]: 'https://github.com',
        [GITLAB]: 'https://gitlab.com'
    };
};