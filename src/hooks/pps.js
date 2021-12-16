//import { watch } from 'vue';
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

    getComments: () => `/comments`,
    addComment: () => `/comment`,
    deleteComment: (id = '') => `/comment/${id}`
};

// APPLICATIONS
const { useFetch: getApps } = createFetch(urls.getApps, {
    method: 'get',
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
    method: 'get',
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
 * @returns {Function}
 */
const createApp = (version, repoType, name, repoName, logo, description, screenshots, permissions, categories) => 
    createFetch(urls.postApp, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Origin: window.location.href,
        },
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
            comments: []
        }
    }).useFetch;

const { useFetch: updateApp } = createFetch(urls.putApp, {
    method: 'put',
    headers: {
        'Content-Type': 'application/json',
        Origin: window.location.href
    }
});

const { useFetch: deleteApp } = createFetch(urls.deleteApp, {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        Origin: window.location.href
    }
});

// COMMENTS

/**
 * @param {Number} appId 
 * @param {String} message 
 * @param {Number} note 
 * @returns {Function}
 */
const createComment = (appId, message, note) => 
    createFetch(urls.putApp(appId) + urls.addComment(), {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Origin: window.location.href
        },
        body: {
            comment: message,
            note,
            date: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        }
    }).useFetch

// USERS

const { useFetch: getUsers } = createFetch(urls.getUsers, {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        Origin: window.location.href
    }
});

/**
 * @param {String} email 
 * @param {String} password 
 * @returns {Promise<any>}
 */
const userLogin = async (email, password) => {
    const { useFetch } = createFetch(urls.login, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Origin: window.location.href
        },
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
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Origin: window.location.href
        },
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
    method: 'put',
    headers: {
        'Content-Type': 'application/json',
        Origin: window.location.href
    }
});

export function usePPS() {
    return {
        // APPLICATIONS
        getApps,
        getAppFromId,
        createApp,
        updateApp,
        deleteApp,

        // COMMENTS

        createComment,

        // USERS
        getUsers,
        userLogin,
        userCreateAccount,
        userUpdateAccount
    }
}