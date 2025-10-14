import { DataSource } from 'typeorm';
import {DATA_SOURCE} from "@/share";
import * as process from "node:process";
import { UserEntity } from '@/modules/user/entities';
import { ClassEntity } from '@/modules/class/entities';
import {UserClassEntity} from "@/modules/user_class/entities";
import {addTransactionalDataSource} from "typeorm-transactional";
import {ClassSubscriber} from "@/modules/class/subcriber";
import { ExamEntity } from '@/modules/exam/entities';
import { ExamSubscriber } from '@/modules/exam/subcriber';
import { QuestionEntity } from '@/modules/question/entities';
import { QuestionSubscriber } from '@/modules/question/subcriber';
import {FileEntity} from "@/modules/file/entities";

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          UserEntity,
          ClassEntity,
          UserClassEntity,
          ExamEntity,
          QuestionEntity,
          FileEntity,
        ],
        subscribers: [
          ClassSubscriber,
          ExamSubscriber,
          QuestionSubscriber,
          ExamSubscriber,
        ],
        synchronize: true,
      });

      await dataSource.initialize();

      addTransactionalDataSource(dataSource);

      return dataSource;
    },
  },
];
