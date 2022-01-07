import { usePPS } from '@/hooks';

/**
 * @param {{ id: Number, firstname: String, lastname: String, email: String, repo_pseudo: Record<'github'|'gitlab', String>, password: String }|null} user 
 */
export const getToken = async user => {
    const { userLogin } = usePPS();

    if (user) {
        await userLogin(user.email, user.password)('', {}, {
            before: () => null,
            /**
             * @param {{ status: Boolean, jwt: ?String }} json Retour de l'api
             * @param {String} url 
             * @param {Boolean} error 
             */
            after: (json, url, error) => {
                if (!error && json.status) {
                    localStorage.setItem('pps.auth.jwt', json.jwt);
                }
            }
        });

        return localStorage.getItem('pps.auth.jwt');
    }

    throw new TypeError('le paramètre user ne correspond pas au type User');
};

/**
 * @param {Function} resolve appelé lorseque l'utilisateur est connecté
 * @param {Function} reject appelé lorsque l'utilisateur n'est pas connecté
 * @returns {*}
 */
export const checkAuth = (resolve, reject) => {
    const jwt = localStorage.getItem('pps.auth.jwt');
    const keepConnect = localStorage.getItem('pps.auth.keep_connect');

    return jwt ? resolve(keepConnect) : reject();
};