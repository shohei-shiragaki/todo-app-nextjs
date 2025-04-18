// ファイル名がtodoAPI.tsになっていて、少し違和感を感じました。
// Next.jsでは厳密にレターケースの指定がないですが、todo-api.tsにしたほうがよさそうです。
// 他のファイル全般にも同じことが言えます。
// 以下だとケバブケースになっているので、それに合わせるのがよさそうです。
// またディレクトリの構成も、以下を参考にする方と良いと思います。例えば、componentディレクトリをappの下に配置せず、appと同じ階層に配置するなどです。
// https://github.com/nextjs/saas-starter
import { Todo, TodoCreate } from "./types";

// 全TODOを取得
export const getAllTodos = async (): Promise<Todo[]> => {

    // https://todo-api-aa9t.onrender.comまでは他のAPI呼び出しでも同じ値を使うので、定数にしておくと良いです。
    // 同じ文字列を繰り返す書くのはコードの保守性を下げるので、定数化する習慣をつけましょう。
    const res = await fetch('https://todo-api-aa9t.onrender.com/todos', { cache: 'no-store' });
    // これはローカル用のコードですか？コメントアウトで残さない方が良いです。
    // 環境変数を読み込んで、ローカルと本番など、環境ごとにAPIの呼び出し先を使い分ける方が良いです。
    // https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/environment-variables
    // const res = await fetch('http://127.0.0.1:8000/todos', { cache: 'no-store' });
    const todos:Todo[] = await res.json();
    return todos;

};

// IDからTODOを取得
export const getTodoById = async (id: string): Promise<Todo> => {

  const res = await fetch(`https://todo-api-aa9t.onrender.com/todos/${id}`, { cache: 'no-store' });
  // const res = await fetch(`http://127.0.0.1:8000/todos/${id}`, { cache: 'no-store' });
  const todo:Todo = await res.json();
  return todo;

};

// TODOリストを削除
export const deleteTodoList = async (selectTodos: Todo[]) : Promise<Response> => {
    
    const res = await fetch('https://todo-api-aa9t.onrender.com/todo-delete', {
    // const res = await fetch('http://127.0.0.1:8000/todo-delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectTodos),
    });
    return res;

}

// TODOリストを更新
export const updateTodo = async (id:string, req:Todo) : Promise<Response> => {

    const res = await fetch(`https://todo-api-aa9t.onrender.com/todos/${id}`, {
    // const res = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
    return res;
};

// TODOを作成
export const createTodo = async (req:TodoCreate) : Promise<Response> => {

  const res = await fetch('https://todo-api-aa9t.onrender.com/todo-create', {
  // const res = await fetch('http://127.0.0.1:8000/todo-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
  return res;
  
}
