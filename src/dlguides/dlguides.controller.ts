import { Controller, Get, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('dlguides')
export class DlguidesController {
    constructor() { }

    @Get(':id')
    async getFile(@Param('id') id, @Res() res: Response): Promise<void> {
        const filePath = join(process.cwd(), './src/guides', id + '.txt');
        
        const filename = 'guide ' + id + '.txt';

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'text/plain');

        const fileStream = createReadStream(filePath);
        fileStream.pipe(res);
    }
}
