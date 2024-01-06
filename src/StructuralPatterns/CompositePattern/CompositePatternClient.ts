import { Folder } from "./Folder";
import { ImageFile } from "./ImageFile";
import { TextFile } from "./TextFile";
import { VideoFile } from "./VideoFile";

export const CompositePatternClient = () => {
  const file1 = new ImageFile("小龙女.jpg"),
    file2 = new ImageFile("张无忌.jpg"),
    file3 = new TextFile("九阴真经.txt"),
    file4 = new TextFile("葵花宝典.txt"),
    file5 = new VideoFile("笑傲江湖.rmvb");

  const folder1 = new Folder("Sunny 的资料"),
    folder2 = new Folder("图像文件"),
    folder3 = new Folder("文本文件"),
    folder4 = new Folder("视频文件");

  folder1.add(file1);
  folder2.add(file2);
  folder3.add(file3);
  folder3.add(file4);
  folder4.add(file5);
  folder1.add(folder2);
  folder1.add(folder3);
  folder1.add(folder4);

  //   从"Sunny 的资料"结点开始杀毒
  folder1.killVirus();

  // 仅对视频文件夹进行杀毒
  folder4.killVirus();
};
