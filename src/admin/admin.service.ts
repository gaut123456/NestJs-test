import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { Guide, User } from 'src/user/user.type';
import { Error } from 'src/utils/types';

const verifyFormatData = (data: Guide): Boolean => {
    if (!data.title || !data.author || !data.summary || !data.rating) {
        return false
    }
    return true
}

@Injectable()
export class AdminService {

    async add(data: Guide, user: User): Promise<Error> {
        if (user.role != "admin") {
            return { error: "Vous n'avez pas les droits" }
        }
        if (!verifyFormatData(data)) {
            return { error: "mauvais format de données" }
        }
        fs.readFile('src/user/data.json', function (err, datas: any) {
            var json = JSON.parse(datas)
            data.id = json.length + 1
            json.push(data)

            fs.writeFile("src/user/data.json", JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
                console.log('complete');
            }
            );
        })
        return { error: "false" }
    }
}