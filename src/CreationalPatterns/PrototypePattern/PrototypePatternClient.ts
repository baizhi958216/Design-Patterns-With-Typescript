import { Attachment } from "./Attachment";
import { WeeklyLog } from "./WeeklyLog";

export const PrototypePatternClient = () => {
  let log_previous: WeeklyLog,
    log_new1: WeeklyLog,
    log_new2: WeeklyLog,
    log_new3: WeeklyLog,
    log_new4: WeeklyLog;

  const attachment: Attachment = new Attachment(); //创建附件对象
  attachment.setName("123");

  log_previous = new WeeklyLog(); //创建原型对象
  log_previous.setAttachment(attachment); //添加附件到周报中

  log_new1 = log_previous.clone()!; //调用克隆方法创建克隆对象
  log_new2 = log_previous.clone()!; //调用克隆方法创建克隆对象
  log_new3 = log_previous.clone()!; //调用克隆方法创建克隆对象
  log_new4 = log_previous.clone()!; //调用克隆方法创建克隆对象

  console.log(`周报1是否相同？：${log_previous === log_new1}`);
  console.log(`周报2是否相同？：${log_previous === log_new2}`);
  console.log(`周报3是否相同？：${log_previous === log_new3}`);
  console.log(`周报4是否相同？：${log_previous === log_new4}`);
  console.log(
    `附件1是否相同：${
      log_previous.getAttachment() === log_new1.getAttachment()
    }`
  );
  console.log(
    `附件2是否相同：${
      log_previous.getAttachment() === log_new2.getAttachment()
    }`
  );
  console.log(
    `附件3是否相同：${
      log_previous.getAttachment() === log_new3.getAttachment()
    }`
  );
  console.log(
    `附件4是否相同：${
      log_previous.getAttachment() === log_new4.getAttachment()
    }`
  );

  const log_new5 = log_previous.cloneDeep(log_previous)!; //深克隆
  console.log(`周报5是否相同：${log_previous === log_new5}`);
  console.log(
    `附件5是否相同：${
      log_previous.getAttachment() === log_new5.getAttachment()
    }`
  );
};
