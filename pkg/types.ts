export interface Nazuki {
  compile(source: string): Promise<string>;
  assemble(source: string): Promise<string>;
  run(program: string, input: string): Promise<string>;
  createBanner(source: string): Promise<string>;
}
