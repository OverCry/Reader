import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import { stdout } from 'process';
import { exec } from 'child_process';

export const main = async () => {
  stdout.write(chalk.bold.cyanBright(`\nReader Scripts\n\n`));

  const answer = await select({
    message: 'Select command',
    choices: [
      {
        name: 'Run',
        value: 'start',
        description: 'Run the application',
      },
      {
        name: 'Build',
        value: 'build',
        description: 'Build the application for deployment',
      },
      {
        name: 'Deploy',
        value: 'deploy',
        description: 'Deploy the application',
      },
      {
        name: 'Exit',
        value: 'exit',
        description: 'Close options',
      },
    ],
  });

  if (answer === 'exit') {
    return;
  }

  const command = `npm run ${answer}`;

  stdout.write(chalk.bold.greenBright(`\nOption: ${answer}\n`));
  stdout.write(chalk.bold.yellow(`Command: ${command}\n\n`));

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Command Result: ${stdout}`);
    main();
  });
};

main();
