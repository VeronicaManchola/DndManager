import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Card {
    children: Element[];
  }
}