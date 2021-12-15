import { createFetch } from '@/hooks';
import env from '../../env.json';

const slugify = value => value.replace(/\./g, '-').replace(/ /g, '-').replace(/'/g, '-');

const urls = {
    getUsers: () => `${env.WEBSERVICE_URL}/users`,
    getUserFromEmailAndPassword: (email, password) => `${env.WEBSERVICE_URL}/user/${email}/${password}`,
    postUser: () => `${env.WEBSERVICE_URL}/user`,
    putUser: (id = '') => `${env.WEBSERVICE_URL}/user/${id}`,
    deleteUser: (id = '') => `${env.WEBSERVICE_URL}/user/${id}`,
    login: () => `${env.WEBSERVICE_URL}/user/login`,

    getApps: () => `${env.WEBSERVICE_URL}/apps`,
    getAppFromId: (id = '') => `${env.WEBSERVICE_URL}/app/${id}`,
    postApp: () => `${env.WEBSERVICE_URL}/app`,
    putApp: (id = '') => `${env.WEBSERVICE_URL}/app/${id}`,
    deleteApp: (id = '') => `${env.WEBSERVICE_URL}/app/${id}`,
};

// APPLICATIONS

const { useFetch: getApps } = createFetch(urls.getApps, {
    headers: {
        'Content-Type': 'application/json',
        Origin: window.location.href
    }
});

/**
 * @param {Number} id 
 * @returns {Promise<any>}
 */
const { useFetch: getAppFromId } = createFetch(urls.getAppFromId, {
    headers: {
        'Content-Type': 'application/json',
        Origin: window.location.href
    }
});

/**
 * @param {String} version version de l'application
 * @param {'github'|'gitlab'} repo_type de répository utilisé
 * @param {String} name nom de l'application
 * @param {String} repoName nom du répo git
 * @param {String} logo vers le logo de l'application
 * @param {String} description desription de l'application
 * @param {Array<String>} screenshots screenshots de l'application afin d'avoir un apercu
 * @param {Array<String>} permissions permissions demandées à l'utilisateur par l'application pour qu'il soit au courrent avant de l'installée
 * @param {Array<String>} categories catégories de l'application pour faciliter la recherche
 */
const createApp = async (version, repoType, name, repoName, logo, description, screenshots, permissions, categories) => {
    const { useFetch } = createFetch(urls.postApp, {
        'Content-Type': 'application/json',
        Origin: window.location.href,
        body: {
            name,
            repo_type: repoType,
            nameSlug: slugify(name),
            repoName,
            logo,
            version,
            versionSlug: slugify(version),
            stars: 0,
            description,
            screenshots,
            permissions,
            categories,
            comments: [],
            author: guest.value.id
        }
    });

    return await useFetch();
};

const { useFetch: updateApp } = createFetch(urls.putApp, {
    'Content-Type': 'application/json',
    Origin: window.location.href
});

const { useFetch: deleteApp } = createFetch(urls.deleteApp, {
    'Content-Type': 'application/json',
    Origin: window.location.href
});

// USERS

/**
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<any>}
 */
const userLogin = async (email, password) => {
    const { useFetch } = createFetch(urls.login, {
        'Content-Type': 'application/json',
        Origin: window.location.href,
        body: { email, password }
    });

    return await useFetch();
};

/**
 * @param {String} firstname 
 * @param {String} lastname 
 * @param {String} email 
 * @param {String} password 
 * @param {Record<'github'|'gitlab', any>} repo_pseudo 
 */
const userCreateAccount = async (firstname, lastname, email, password, repo_pseudo = {}) => {
    const { useFetch } = createFetch(urls.postUser, {
        'Content-Type': 'application/json',
        Origin: window.location.href,
        body: {
            firstname,
            lastname,
            email,
            password,
            repo_pseudo: (() => {
                if (!('github' in repo_pseudo)) repo_pseudo.github = '';
                if (!('gitlab' in repo_pseudo)) repo_pseudo.gitlab = '';
                return repo_pseudo;
            })()
        }
    });

    return await useFetch();
};

const { useFetch: userUpdateAccount } = createFetch(urls.putUser, {
    'Content-Type': 'application/json',
    Origin: window.location.href
});

export const usePPS = () => ({
    // APPLICATIONS
    getApps,
    getAppFromId,
    createApp,
    updateApp,
    deleteApp,

    // USERS
    userLogin,
    userCreateAccount,
    userUpdateAccount
});