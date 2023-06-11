declare module "key-listener" {
  export default class KeyListener {
    on(event: string, callback: (key: string) => void): void;
    off(event: string): void;
  }
}
declare module "keygraph" {
  export function build(s: string): void;
  export function next(key: string): boolean;
  export function is_finished(): boolean;
  export function key_candidate(): string;
  export function key_done(): string;
  export function seq_candidates(): string;
  export function seq_done(): string;
}
