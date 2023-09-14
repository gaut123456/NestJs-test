import { Injectable } from '@nestjs/common';
import { Guide } from './user.type';
import * as fs from 'fs'

const data = JSON.parse(fs.readFileSync('src/user/data.json', 'utf8')) as Guide[]

const fetchGuideById = (id: any): any => {
    const guide = data.find((guide) => guide.id == id)
    return guide
}

@Injectable()

export class UserService {
    
    getGuideById(id: any): any {
        const guide = fetchGuideById(id)
        return guide
    }
    getAllGuides(): any {
        const Alldata = JSON.parse(fs.readFileSync('src/user/data.json', 'utf8')) as Guide[]
        return Alldata
    }
}