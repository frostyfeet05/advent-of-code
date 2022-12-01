export const input = ``;

type ModuleMass = number;

export const Modules = {
    parse: (input: string): ModuleMass[] => {
        return input.split('\n').map(Number);
    },
    calculateFuelForModules: (modules: ModuleMass[]): number => {
        return modules.reduce((sum: number, mass) => sum + calculateFuel(mass), 0);
    },
    calculateTotalFuel: (modules: ModuleMass[]): number => {
        return modules.reduce((sum: number, mass) => {
            let totalFuel = calculateFuel(mass);
            let fuel = calculateFuel(totalFuel);

            console.log('fuel for mass', totalFuel);
            while(fuel > 0) {
                console.log('fuel', fuel);
                totalFuel += fuel;
                fuel = calculateFuel(fuel);
            }

            return sum + totalFuel;
        }, 0);

    }
}

const calculateFuel = (mass: number): number => {
    return (Math.floor(mass / 3) - 2);
}
