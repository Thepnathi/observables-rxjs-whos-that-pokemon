import React from "react";
import { Observable } from "rxjs";


export default function useObservable(
    observable: Observable<number>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) {
    React.useEffect(() => {
      const subscription = observable.subscribe((res) => {
        setState(res);
      });
  
      return () => subscription.unsubscribe();
    }, []);
  }