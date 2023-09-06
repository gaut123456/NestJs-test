import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DlguidesService } from './dlguides/dlguides.service';
import { DlguidesController } from './dlguides/dlguides.controller';
import { DlguidesModule } from './dlguides/dlguides.module';
import { FormationService } from './formation/formation.service';
import { FormationController } from './formation/formation.controller';
import { FormationModule } from './formation/formation.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, AdminModule, DlguidesModule, FormationModule],
  controllers: [AppController, UserController, DlguidesController, FormationController],
  providers: [AppService, UserService, AdminService, DlguidesService, FormationService],
})
export class AppModule {}
