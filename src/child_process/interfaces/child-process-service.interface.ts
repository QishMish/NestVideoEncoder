import { RunScriptOptions } from './child-process.interface';

interface ChildProcessServiceInterface {
  spawn: (
    options: RunScriptOptions,
    callback?: (...args: any[] | any) => any,
  ) => Promise<any>;
}

export { ChildProcessServiceInterface };
