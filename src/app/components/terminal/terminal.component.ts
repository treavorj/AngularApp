import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent implements AfterViewInit {
  lines = signal<string[]>([]);
  promptEnd = '> ';
  promptSuffix = signal<string>('');
  prompt = signal<string>(this.promptSuffix() + this.promptEnd);
  currentInput = signal<string>('');
  commandHistory = signal<string[]>([]);
  historyIndex = signal<number>(0);
  inputWidth = signal<string>('1ch');

  @ViewChild('terminalInput') terminalInput!: ElementRef<HTMLInputElement>;
  ngAfterViewInit(): void {}

  constructor() {
    effect(
      () => {
        this.onInputChange();
        this.prompt.set(this.promptSuffix() + this.promptEnd);
      },
      { allowSignalWrites: true }
    );
  }

  onInputChange() {
    this.inputWidth.set(`${Math.max(1, this.currentInput().length + 1)}ch`);
  }

  executeCommand() {
    const directories = {
      Resume: { Schooling: 'University of Tennessee' },
      History: {},
    };
    let command = this.currentInput().split(' ')[0];
    let input = this.currentInput().split(' ', 2)[1];
    switch (command) {
      case 'help':
        this.appendResult([
          'Available commands:',
          '  General:',
          '- help: Gives you available commands.',
          '- clear: Clears the terminal.',
          '- history: Gives a list of all executed commands.',
          '- info: Gives info about the current session.',
          '- ls: Lists file system.',
          '- cd: Change directory.',
          '- echo: Repeat what was provided.',
        ]);
        break;
      case 'clear':
        this.lines.set(['']);
        break;
      case 'history':
        this.appendResult([...this.commandHistory()]);
        break;
      case 'info':
        this.appendResult([
          `Current Time: ${Date().toString()}`,
          `Executed Commands: ${this.commandHistory().length}`,
          `User Agent: ${navigator.userAgent}`,
          `Platform: ${navigator.platform}`,
          `Language: ${navigator.language}`,
          `Online: ${navigator.onLine}`,
        ]);
        break;
      case 'ls': {
        let folders = this.promptSuffix().split('/');
        let currentDir: any = directories;
        let result: string[] = [];
        if (this.promptSuffix() != '') {
          for (let folder of folders) {
            currentDir = currentDir[folder];
          }
        }
        for (let dir in currentDir) {
          result.push(dir);
        }
        this.appendResult(result);
        break;
      }
      case 'cd': {
        let folders = this.promptSuffix().split('/');
        let currentDir: any = directories;
        if (this.promptSuffix() != '') {
          for (let folder of folders) {
            currentDir = currentDir[folder];
          }
        }
        for (let dir in currentDir) {
          if (dir === input) {
            this.promptSuffix.update((val) => (val ? val + '/' + dir : dir));
          }
        }
        this.appendResult(['']);
        break;
      }
      case 'echo': {
        this.appendResult([input]);
        break;
      }
      default:
        this.appendResult([
          'Command "' +
            this.currentInput() +
            '" is not recognized. Consider using "help" to get a list of available commands.',
        ]);
    }

    this.historyIndex.set(this.commandHistory().length + 1);
    this.commandHistory.update((commands) => [
      ...commands,
      this.currentInput(),
    ]);
    this.currentInput.set('');
  }

  appendResult(result: string[]) {
    this.lines.update((existingLines) => [
      ...existingLines,
      this.prompt() + this.currentInput(),
      ...result,
    ]);
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.navigateHistory(-1);
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.navigateHistory(1);
        event.preventDefault();
        break;
      case 'c':
        if (!event.ctrlKey) {
          break;
        }
        this.historyIndex.set(this.commandHistory().length + 1);
        this.currentInput.set('');
        break;
    }
  }

  navigateHistory(direction: number) {
    const newIndex = this.historyIndex() + direction;

    if (newIndex < 1) {
      this.historyIndex.set(0);
      this.currentInput.set(this.commandHistory()[0]);
    } else if (newIndex < this.commandHistory().length) {
      this.historyIndex.set(newIndex);
      this.currentInput.set(this.commandHistory()[newIndex]);
    } else {
      this.historyIndex.set(this.commandHistory().length);
      this.currentInput.set('');
    }
  }

  focusInput() {
    this.terminalInput.nativeElement.focus();
  }
}
