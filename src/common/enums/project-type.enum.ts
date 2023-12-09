import { registerEnumType } from '@nestjs/graphql';

export enum PROJECT_TYPE {
  EASY = 'Easy',
  HARD = 'Hard',
  MISSION_IMPOSSIBLE = 'Mission impossible',
}

registerEnumType(PROJECT_TYPE, {
  name: 'ProjectType',
});
