import {NoArgsConstructor, NoArgsFunction, SingleArgFunction} from "@/types";



export interface InjectableProperties {
  factory?: NoArgsFunction | SingleArgFunction;
  cls?: NoArgsConstructor;
  instance?: any;
  passInstance?: boolean;
  multiInstance?: boolean;
  id?: symbol;
}

