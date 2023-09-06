import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { format } from 'path';
import { Formation } from './type';

const verifyFormatData = (data: any): any => {
    if (data.name == undefined || data.name == "") {
        return false
    }
    if (data.date == undefined || data.date == "") {
        return false
    }
    if (data.instructor == undefined || data.instructor == "") {
        return false
    }
    if (data.guides == undefined || data.guides == "") {
        return false
    }
    return true
}

const data = JSON.parse(fs.readFileSync('src/formation/data.json', 'utf8')) 

const fetchFormationById = (id: any): any => {
    const formation = data.find((formation) => formation.id == id)
    return formation
}

@Injectable()
export class FormationService {
    getFormationById(id: any): any {
        const formation = fetchFormationById(id)
        return formation
    }
    getAllFormation(): any {
        const allData = JSON.parse(fs.readFileSync('src/formation/data.json', 'utf8')) 
        console.log("allData", allData)
        return allData
    }

    async add(data: any, user: any): Promise<any> {
        if (user.role != "admin") {
            return { error: "Vous n'avez pas les droits" }
        }
        fs.readFile('src/formation/data.json', function (err, datas : any) {
            var json = JSON.parse(datas)
            data.id = json.length + 1
            json.push(data)
            console.log(data)
            console.log(json)
            fs.writeFile("src/formation/data.json", JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
                console.log('complete');
            }
            );
        })
    }



    async join(data: any, user: any): Promise<any> {
        if (data.id == undefined || data.id == "") {
            return { error: "mauvais format de données" }
        }
        if (data.motivation == undefined || data.motivation == "") {
            return { error: "mauvais format de données" }
        }
        if (user == undefined || user == "") {
            return { error: "mauvais format de données" }
        }
        const formation = fetchFormationById(data.id)
        if (formation == undefined) {
            return { error: "formation introuvable" }
        }
        
        fs.readFile('src/formation/data.json', function (err, datas : any) {
            let json = JSON.parse(JSON.stringify(JSON.parse(datas)))
            console.log("json", typeof(json[formation.id - 1].attendees))
            if (typeof(json[formation.id - 1].attendees) == "object") {
                const attendees = json[formation.id - 1].attendees
                json[formation.id - 1].attendees = []
                json[formation.id-1].attendees.push({id: user.id, motivation: data.motivation})
            }  else {
                json[formation.id-1].attendees.push({id: user.id, motivation: data.motivation})
            }  
            console.log("json", json)
            fs.writeFile("src/formation/data.json", JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
            }
            );
        })
        return "success"
    }
}

