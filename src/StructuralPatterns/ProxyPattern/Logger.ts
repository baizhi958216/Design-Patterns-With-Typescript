export class Logger {
  log(userId: string): void {
    console.log(`更新数据库，用户${userId}查询次数加1！`);
  }
}
