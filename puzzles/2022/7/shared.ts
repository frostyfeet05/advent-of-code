export const input = ``;

type File = {
    name: string;
    size: number;
}
type Directory = {
    name: string;
    contents: (Directory | File)[];
    parent: Directory | undefined;
};

export const FileSystem = {
    parse: (input: string): Directory => {
        const commands = input
            .split(/\n\$/)
            .map((command, index) => index === 0 ? command : `$${command}`)
            .map(commands => commands.split('\n'));

        let root: Directory;
        let currentDir: Directory;

        commands.forEach(command => {
            const args = command[0].split(' ');
            if (args[1] === 'cd') {
                if (args[2] === '..') {
                    currentDir = currentDir.parent!;
                } else if (args[2] === '/') {
                    root = {
                        name: '/',
                        parent: undefined,
                        contents: [],
                    };
                    currentDir = root;
                } else {
                    currentDir = currentDir.contents
                        .filter(isDir)
                        .find(d => d.name === args[2])!;
                }
            }
            if (args[1] === 'ls') {
                currentDir.contents = command.slice(1).map(c => createDirOrFile(c, currentDir));
            }
        });

        return root!;
    },
    calculateDirSize: (dir: Directory): number => {
        return dir.contents.reduce((sum: number, content) => {
            if (isDir(content)) {
                return sum + FileSystem.calculateDirSize(content);
            } else if (isFile(content)) {
                return sum + content.size;
            }
            return sum;
        }, 0);
    },
    getDirectorySizes: (root: Directory): number[] => {
        return root.contents.filter(isDir).flatMap(dir => {
            return [
                ...FileSystem.getDirectorySizes(dir),
                FileSystem.calculateDirSize(dir)
            ];
        });
    }
};

const isDir = (value: Directory | File): value is Directory => {
    return 'parent' in value;
}
const isFile = (value: Directory | File): value is File => {
    return 'size' in value;
}

const createDirOrFile = (input: string, parent: Directory): Directory | File => {
    const args = input.split(' ');
    if (args[0] === 'dir') {
        return createDir(args[1], parent);
    } else {
        return createFile(args[1], parseInt(args[0]));
    }
}

const createDir = (name: string, parent: Directory): Directory => ({name, parent, contents: []});
const createFile = (name: string, size: number): File => ({name, size});
