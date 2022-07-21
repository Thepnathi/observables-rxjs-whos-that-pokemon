import React, { useState } from "react";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  mergeMap,
  Observable,
  observable,
} from "rxjs";

const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";

const getPokemonName = async (name: string) => {
  const { results: allPokemons } = await fetch(apiUrl)
    .then((res) => res.json())
  const searched = allPokemons ? allPokemons.find((pokemon: any) => pokemon.name === name) : "None"
  return searched
};

const useObservable = (
  observable: Observable<string>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  React.useEffect(() => {
    const subscription = observable.subscribe((result) => {
      setState(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setState]);
};

const searchSubject = new BehaviorSubject("");
const searchResultObservable = searchSubject.pipe(
  filter((val) => val.length > 1),
  debounceTime(750), // we do something after user stop typing for 750 milisec
  distinctUntilChanged(),
  mergeMap((val) => from(getPokemonName(val)))
);

export default function Pokemon() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  useObservable(searchResultObservable, setResult);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    searchSubject.next(newValue);
  };

  return (
    <React.Fragment>
      <img src="https://www.outcyders.net/images/quizzes/4/question1.jpg" />
      <h1>Who's That Pokemon!?</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <div>{JSON.stringify(result, null, 2)}</div>
    </React.Fragment>
  );
}
