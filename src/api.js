import crypto from "node:crypto"
import fetch from "node-fetch";

import * as dotenv from "dotenv";

dotenv.config({
    path : "../.env"
})


const publicKey = process.env.PUBKEY;
const privateKey = process.env.PRIKEY;

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const result = [];
    const ts = new Date().toISOString();
    url += "?ts=" + ts;
    url += "&apikey=" + publicKey;
    url += "&hash=" + await getHash(publicKey,privateKey,ts);
    url += "&limit=100"


    let response = await fetch(url);
    let data = await response.json();
    let characters = data.data.results;

    characters.forEach(chara => {
        if(!chara.thumbnail.path.includes("image_not_available")){
            let json = {
                name : chara.name,
                desc : chara.description,
                imageUrl : chara.thumbnail.path + "/portrait_xlarge." + chara.thumbnail.extension
            }
            result.push(json)
        }
    })

    return result;
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    return crypto.createHash('md5').update(timestamp+privateKey+publicKey).digest('hex');
}

export

let res = getData("https://gateway.marvel.com:443/v1/public/characters");
