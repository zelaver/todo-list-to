'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

type ListTodo = {
  id: number;
  name: string;
  checked: boolean;
};

export default function Home() {
  const [list, setList] = useState([
    { id: 1, name: 'belajar js', checked: false },
    { id: 2, name: 'belajar ts', checked: true },
  ]);

  function handleInput(input: string): void {
    // console.log(list.length);
    let newItem: ListTodo = { id: list.length + 1, name: input, checked: false };
    let newList = [...list, newItem];
    setList(newList);
  }

  return (
    <main className="flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold leading-9">Todo-List-To</h1>
      <div className="group flex flex-col gap-6">
        <Input handleInput={(input) => handleInput(input)} />
        <ListGroup list={list} setList={setList} />
      </div>
    </main>
  );
}

function Input({ handleInput }: { handleInput: (input: string) => void }) {
  const [curInput, setCurInput] = useState('');

  function handleInputChange(e: string) {
    setCurInput(e);
  }

  return (
    <div className="input-group flex gap-6">
      <input
        className="mih-h-[40px] min-w-[240px] rounded-lg border border-gray-800 p-2 text-base placeholder:text-base"
        type="text"
        placeholder="isi list ini"
        value={curInput}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <button
        className="rounded-lg border border-gray-800 bg-green-500 p-2 text-white"
        onClick={() => handleInput(curInput)}
      >
        Tambah
      </button>
    </div>
  );
}

function ListGroup({
  list,
  setList,
}: {
  list: Array<ListTodo>;
  setList: Dispatch<SetStateAction<ListTodo[]>>;
}) {
  function handleCheck(id: number) {
    let newList: Array<ListTodo> = list.map((val, key) => {
      if (val.id == id) {
        return { ...val, checked: !val.checked };
      } else {
        return { id: val.id, name: val.name, checked: val.checked };
      }
    });
    console.log(newList);
    setList(newList);
  }

  return (
    <div className="list-group rounded-xl border border-slate-800 bg-green-50">
      {list.map((val: ListTodo, key) => {
        return (
          <li key={key} className="flex justify-between border-b px-4 py-2">
            <p>{val.name}</p>
            <input
              type="checkbox"
              name=""
              id=""
              checked={val.checked ? true : false}
              onChange={() => handleCheck(val.id)}
            />
          </li>
        );
      })}
    </div>
  );
}
