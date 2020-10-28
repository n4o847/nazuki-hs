export interface Nazuki {
  generate(x: number): Promise<string>;
  run(program: string, input: string): Promise<string>;
}
