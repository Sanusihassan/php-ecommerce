import { makeAutoObservable } from "mobx";

class Store {
  baseUrl: string = "http://localhost:8080/";
  weGotComments: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  setWeGotComments(value: boolean) {
    this.weGotComments = value;
  }
}

export const store = new Store();
