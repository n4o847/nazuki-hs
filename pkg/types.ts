export interface Nazuki {
  assemble(source: string): Promise<string>;
  run(program: string, input: string): Promise<string>;
}
