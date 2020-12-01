export interface Nazuki {
  assemble(source: string): Promise<string>;
  generate(x: number): Promise<string>;
  run(program: string, input: string): Promise<string>;
}
