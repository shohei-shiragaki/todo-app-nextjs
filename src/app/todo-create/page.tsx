// このページのURLが/todo-createになっていると思いますが、あまりこのようなURLにしないです。
// よくあるのは/todo/create、/todo/edit/[id] などの形式です。
// いかなる部分においても独自のやり方ではなく「一般的な方法」を好むエンジニアが多いので、そのあたり意識しておくと良いと思います。
// 参考: https://human-nature.hatenablog.com/entry/2016/10/16/000314
import CreatePage from "@/screen/create-page";

const page = () => {
  return <CreatePage />;
};

export default page;