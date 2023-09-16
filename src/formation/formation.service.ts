import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { format } from 'path';
import { Formation, FormationInput, FormationJoin } from './type';
import formatDate from 'src/utils/formatDate';
import { User } from 'src/user/user.type';
import { Error } from 'src/utils/types';

const data = JSON.parse(fs.readFileSync('src/formation/data.json', 'utf8'))

const fetchFormationById = (id: string): Formation => {
    const rawFormation = data.find((formation) => formation.id == id)
    const formation = {
        date: formatDate(rawFormation.date),
        ...rawFormation
    }
    return formation
}

@Injectable()
export class FormationService {
    getFormationById(id: string): Formation {
        const formation = fetchFormationById(id)
        return formation
    }
    getAllFormation(): Formation[] {
        const rawAllData = JSON.parse(fs.readFileSync('src/formation/data.json', 'utf8')) as Formation[]
        const allData = rawAllData.map((formation: Formation) => {
            return {
                date: formatDate(formation.date),
                ...formation
            }
        })
        return allData
    }

    async add(data: FormationInput, user: User): Promise<Error> {
        if (user.role != "admin") {
            return { error: "Vous n'avez pas les droits" }
        }
        fs.readFile('src/formation/data.json', function (err, datas: any) {
            const rawJson = JSON.parse(datas)
            data.id = rawJson.length + 1
            const json = [...rawJson, data]
            fs.writeFile("src/formation/data.json", JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
                console.log('complete');
            }
            );
        })
    }



    async join(data: FormationJoin, user: User): Promise<Error> {
        if (!data.id || !data.motivation || !user) {
            return { error: "mauvais format de données" }
        }
        const formation = fetchFormationById(data.id.toString())
        if (!formation) {
            return { error: "formation introuvable" }
        }

        fs.readFile('src/formation/data.json', function (err, datas: any) {
            let json = JSON.parse(JSON.stringify(JSON.parse(datas)))
            console.log("json", typeof (json[formation.id - 1].attendees))
            if (typeof (json[formation.id - 1].attendees) == "object") {
                const attendees = json[formation.id - 1].attendees
                json[formation.id - 1].attendees = []
                json[formation.id - 1].attendees.push({ id: user.id, motivation: data.motivation })
            } else {
                json[formation.id - 1].attendees.push({ id: user.id, motivation: data.motivation })
            }
            console.log("json", json)
            fs.writeFile("src/formation/data.json", JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
            }
            );
        })
        return { error: "false" }
    }
}

