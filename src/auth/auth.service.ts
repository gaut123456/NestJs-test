import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
      ) {}  
    async login(Body: any) {
        let users = [
            {
                "id": 1,
                "email": "john.doe@example.com",
                "password": "mC2vSHcfmk6L0e4",
                "role": "admin"
            },
            {
                "id": 2,
                "email": "jane.smith@example.com",
                "password": "Ev6FVW6vafvVKyk",
                "role": "user"
            },
            {
                "id": 3,
                "email": "robert.jackson@example.com",
                "password": "f1XGBmbZlBtZXVe",
                "role": "user"
            },
            {
                "id": 4,
                "email": "karen.petersen@example.com",
                "password": "gmLFJetCzEx980",
                "role": "user"
            },
            {
                "id": 5,
                "email": "david.johnson@example.com",
                "password": "GitPKhfaA9pCN4T",
                "role": "user"
            },
            {
                "id": 6,
                "email": "emily.rodriguez@example.com",
                "password": "HF7Fwn6nNuvrKrM",
                "role": "user"
            },
            {
                "id": 7,
                "email": "william.miller@example.com",
                "password": "h6X8yY3ZyjQ6Z2H",
                "role": "user"
            },
            {
                "id": 8,
                "email": "olivia.garcia@example.com",
                "password": "i6QXQ3aYy2v4e2B",
                "role": "user"
            },
            {
                "id": 9,
                "email": "daniel.brown@example.com",
                "password": "jH3Rm2cX8gW8j3A",
                "role": "user"
            },
            {
                "id": 10,
                "email": "sophia.thomas@example.com",
                "password": "k3Zg5uZ7b3WY2nW",
                "role": "user"
            }
        ];
        let user = users.find((users) => users.email === Body.email && users.password === Body.password);
        if (user) {
            const payload = { id: user.id, email: user.email, role: user.role };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return "user not found";

    }
}
