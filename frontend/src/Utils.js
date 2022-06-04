/**
 * Petite classe utilitaire façon "Service" qui permet de centraliser 
 * certains appels a des fonctions qui peuvent être appelée d'un peu partout. 
 */
export class Utils {
    /**
     * Cette méthode prend un objet de type date en paramètre et retourne 
     * la date formatée
     * @param {Date} dateSource : la date au format : 2022-02-25 17:12:39
     * @return {String} : la date au format jj/mm/aaaa
     */
    static formatDateToJJMMAAAA(dateSource) {
        let date = new Date(dateSource);
        let day = Number(date.getDate()) >= 10 ? date.getDate() : '0' + date.getDate()
        let month = Number(date.getMonth()) >= 10 ? date.getMonth() : '0' + date.getMonth()
        return `${day}/${month}/${date.getFullYear()}`
    }
}