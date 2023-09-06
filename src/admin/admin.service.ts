import { Injectable } from '@nestjs/common';
import * as fs from 'fs'


const verifyFormatData = (data: any): any => {
    if (data.title == undefined || data.title == "") {
        return false
    }
    if (data.author == undefined || data.author == "") {
        return false
    }
    if (data.summary == undefined || data.summary == "") {
        return false
    }
    if (data.rating == undefined || data.rating == "") {
        return false
    }
    return true
}

@Injectable()
export class AdminService {
    
    async add(data: any, user: any): Promise<any> {
        if (user.role != "admin") {
            return { error: "Vous n'avez pas les droits" }
        }
        if (!verifyFormatData(data)) {
            return { error: "mauvais format de données" }
        }
        fs.readFile('src/user/data.json', function (err, datas : any) {
            var json = JSON.parse(datas)
            data.id = json.length + 1
            json.push(data)

            fs.writeFile("src/user/data.json", JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
                console.log('complete');
            }
            );
        })
    }
}