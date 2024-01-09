export class AccessValidator {
  validate(userId: string): boolean {
    console.log(`在数据库中验证用户${userId}是否为合法用户？`);
    if (userId === "用户") {
      console.log("登录成功");
      return true;
    }
    console.log("登录失败");
    return false;
  }
}
