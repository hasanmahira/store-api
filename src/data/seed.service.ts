import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seedAdminUser(): Promise<void> {
    const adminData = {
      username: 'admin',
      password: 'admin_password',
      email: 'admin@mail.com',
      salt: 'asfasfa',
    };

    const existingAdmin = await this.userRepository.findOne({
      where: { username: adminData.username },
    });

    if (!existingAdmin) {
      // Create the admin user only if it doesn't exist
      const adminUser = this.userRepository.create(adminData);
      await this.userRepository.save(adminUser);
    }
  }
}
