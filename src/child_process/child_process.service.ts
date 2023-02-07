import { Injectable, Logger } from '@nestjs/common';
import * as childProcesses from 'child_process';
import { resolve } from 'path';
import { ChildProcessServiceInterface, RunScriptOptions } from './interfaces';

@Injectable()
export class ChildProcessService implements ChildProcessServiceInterface {
  private readonly logger = new Logger(ChildProcessService.name);

  public spawn(
    options: RunScriptOptions,
    callback?: (...args: any[] | any) => any,
  ): Promise<any> {
    try {
      const { input, outDir, script: scriptName } = options;

      const currentDir = resolve(
        process.cwd(),
        'src',
        'child_process',
        'scripts',
        scriptName,
      );

      console.log(currentDir)
      return new Promise((resolve: any, reject: any) => {
        const script = childProcesses.spawn('bash', [
          currentDir,
          input,
          outDir,
        ]);

        script.stdout.on('data', (data) => {
          this.logger.log(`stdout: ${data}`);
        });

        script.stderr.on('err', (err) => {
          this.logger.log(`stderr: ${err}`);
          reject(err);
        });

        script.on('close', (code) => {
          this.logger.log(`child process exited with code ${code}`);
          resolve(code);
        });
      });
    } catch (error) {
      this.logger.error(`child process error ${error}`);
    }
  }
}
